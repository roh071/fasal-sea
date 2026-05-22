import { NextRequest, NextResponse } from "next/server";
import { distributorLeadSchema } from "@/lib/validations/distributor-lead.schema";
import { sendDistributorLeadEmail } from "@/lib/email/send-lead-email";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = distributorLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    await sendDistributorLeadEmail(result.data as unknown as Record<string, unknown>);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
