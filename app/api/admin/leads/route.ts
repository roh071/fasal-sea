import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/db/leads";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;
  return token === Buffer.from(adminPassword).toString("base64");
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") ?? "all") as "enterprise" | "distributor" | "all";
  const status = searchParams.get("status") ?? undefined;
  const country = searchParams.get("country") ?? undefined;
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "50");

  try {
    const result = await getLeads({ type, status, country, from, to, page, pageSize });
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
