import { NextRequest, NextResponse } from "next/server";
import { updateLead } from "@/lib/db/leads";
import type { UpdateLeadPayload } from "@/lib/db/leads";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;
  return token === Buffer.from(adminPassword).toString("base64");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, ...payload } = body as { type: "enterprise" | "distributor" } & UpdateLeadPayload;

  if (type !== "enterprise" && type !== "distributor") {
    return NextResponse.json({ error: "type must be enterprise or distributor" }, { status: 400 });
  }

  try {
    await updateLead(type, id, payload);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
