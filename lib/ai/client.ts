import Anthropic from "@anthropic-ai/sdk";

// If ANTHROPIC_API_KEY is set (personal key), connect directly to api.anthropic.com.
// Otherwise fall through to whatever the shell environment provides (corporate proxy).
export function getAnthropicClient(): Anthropic {
  const personalKey = process.env.ANTHROPIC_API_KEY;
  const isPlaceholder = !personalKey || personalKey.includes("REPLACE_WITH");

  if (!isPlaceholder) {
    return new Anthropic({
      apiKey: personalKey,
      baseURL: "https://api.anthropic.com",
    });
  }

  // No personal key — let the SDK pick up ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN
  // from the shell environment (corporate proxy / Claude Code session).
  return new Anthropic();
}
