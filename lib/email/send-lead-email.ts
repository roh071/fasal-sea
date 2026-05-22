import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = process.env.RECIPIENT_EMAIL ?? "rohan.sharma@wolkus.com";
const FROM = process.env.FROM_EMAIL ?? "Fasal SEA Website <onboarding@resend.dev>";

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px;font-weight:600;color:#44403c;background:#f5f5f4;border:1px solid #e7e5e4;white-space:nowrap;">${label}</td><td style="padding:6px 12px;color:#1c1917;border:1px solid #e7e5e4;">${value}</td></tr>`;
}

export async function sendEnterpriseLeadEmail(data: Record<string, unknown>) {
  const crops = Array.isArray(data.crops) ? (data.crops as string[]).join(", ") : String(data.crops ?? "");
  const subject = `[Enterprise Lead] ${data.company} — ${data.country} — ${data.landArea}`;

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;">
      <div style="background:#16a34a;padding:20px 24px;">
        <h2 style="color:#fff;margin:0;font-size:18px;">🌿 New Enterprise Lead — Fasal SEA</h2>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", `${data.firstName} ${data.lastName}`)}
          ${row("Email", String(data.email ?? ""))}
          ${row("Job Title", String(data.jobTitle ?? ""))}
          ${row("Company", String(data.company ?? ""))}
          ${row("Country", String(data.country ?? ""))}
          ${row("Crop(s)", crops)}
          ${row("Land Area", String(data.landArea ?? ""))}
          ${row("Challenge", String(data.challenge ?? "—"))}
          ${row("Source", String(data.source ?? "—"))}
          ${row("Submitted", new Date().toLocaleString("en-GB", { timeZone: "Asia/Singapore" }) + " SGT")}
        </table>
        <p style="margin-top:20px;font-size:13px;color:#78716c;">
          Score hint — Area: <strong>${data.landArea}</strong> · Crop: <strong>${crops}</strong> · Country: <strong>${data.country}</strong>
        </p>
      </div>
    </div>`;

  return resend.emails.send({ from: FROM, to: RECIPIENT, subject, html });
}

export async function sendDistributorLeadEmail(data: Record<string, unknown>) {
  const subject = `[Distributor Lead] ${data.fullName} — ${data.country} — ${data.budget}`;

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;">
      <div style="background:#0d9488;padding:20px 24px;">
        <h2 style="color:#fff;margin:0;font-size:18px;">🤝 New Distributor Lead — Fasal SEA</h2>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", String(data.fullName ?? ""))}
          ${row("Phone", String(data.phone ?? ""))}
          ${row("Email", String(data.email ?? ""))}
          ${row("Company", String(data.company ?? "—"))}
          ${row("Country", String(data.country ?? ""))}
          ${row("Business Type", String(data.businessType ?? ""))}
          ${row("Farmer Network", String(data.farmerNetwork ?? ""))}
          ${row("Budget", String(data.budget ?? ""))}
          ${row("Existing Business?", String(data.existingBusiness ?? ""))}
          ${row("Message", String(data.message ?? "—"))}
          ${row("Submitted", new Date().toLocaleString("en-GB", { timeZone: "Asia/Singapore" }) + " SGT")}
        </table>
      </div>
    </div>`;

  return resend.emails.send({ from: FROM, to: RECIPIENT, subject, html });
}
