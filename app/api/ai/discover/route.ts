import { NextRequest, NextResponse } from "next/server";
import { discoverySchema } from "@/lib/validations/leads-tool.schema";
import { buildDiscoveryPrompt, SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { getAnthropicClient } from "@/lib/ai/client";

// Simple in-memory rate limiter: 10 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = discoverySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const prompt = buildDiscoveryPrompt(result.data);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let buffer = "";
      let depth = 0;
      let inString = false;
      let escape = false;
      let objectStart = -1;

      try {
        const anthropicStream = getAnthropicClient().messages.stream({
          model: "claude-sonnet-4-5",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = event.delta.text;
            buffer += chunk;

            // Scan buffer for complete JSON objects
            for (let i = buffer.length - chunk.length; i < buffer.length; i++) {
              const ch = buffer[i];

              if (escape) { escape = false; continue; }
              if (ch === "\\" && inString) { escape = true; continue; }
              if (ch === '"') { inString = !inString; continue; }
              if (inString) continue;

              if (ch === "{") {
                if (depth === 0) objectStart = i;
                depth++;
              } else if (ch === "}") {
                depth--;
                if (depth === 0 && objectStart !== -1) {
                  const jsonStr = buffer.slice(objectStart, i + 1);
                  try {
                    const item = JSON.parse(jsonStr);
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(item)}\n\n`)
                    );
                  } catch {
                    // malformed object — skip
                  }
                  objectStart = -1;
                }
              }
            }

            // Trim fully-processed prefix from buffer
            if (objectStart > 0) {
              buffer = buffer.slice(objectStart);
              objectStart = 0;
            } else if (objectStart === -1) {
              buffer = buffer.slice(-200); // keep a small tail for overlap safety
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "AI error";
        controller.enqueue(encoder.encode(`data: {"error":"${msg}"}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
