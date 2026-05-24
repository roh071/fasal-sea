import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LeadsDashboard } from "@/components/admin/LeadsDashboard";

export const metadata: Metadata = {
  title: "Lead Dashboard — Fasal SEA",
  robots: { index: false, follow: false },
};

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;
  return token === Buffer.from(adminPassword).toString("base64");
}

export default async function AdminPage() {
  const authed = await isAuthed();
  if (!authed) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-1">
              Internal · Not Indexed
            </p>
            <h1 className="text-2xl font-bold text-[#1c1917]">Lead Dashboard</h1>
            <p className="text-sm text-[#78716c] mt-1">
              All enterprise and distributor leads — website form submissions and Facebook Ads imports.
            </p>
          </div>
        </div>

        <LeadsDashboard />
      </div>
    </main>
  );
}
