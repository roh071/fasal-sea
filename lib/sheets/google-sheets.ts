import { google } from "googleapis";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function append(sheetName: string, values: (string | null)[]) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID not set");

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values.map((v) => v ?? "")] },
  });
}

export async function appendEnterpriseRow(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company: string;
  jobTitle: string;
  country: string;
  landArea: string;
  crops: string[];
  challenge?: string | null;
  source?: string | null;
}) {
  const date = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });

  await append("Enterprise Leads", [
    date,
    "Website",
    `${data.firstName} ${data.lastName}`,
    data.email,
    data.phone ?? "",
    data.company,
    data.jobTitle,
    data.country,
    data.landArea,
    data.crops.join(", "),
    data.challenge ?? "",
    data.source ?? "",
    "new",
    "",
    "",
  ]);
}

export async function appendDistributorRow(data: {
  fullName: string;
  email: string;
  phone: string;
  company?: string | null;
  country: string;
  businessType: string;
  farmerNetwork: string;
  budget: string;
  existingBusiness: string;
  city?: string | null;
}) {
  const date = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });

  await append("Distributor Leads", [
    date,
    "Website",
    data.fullName,
    data.email,
    data.phone,
    data.company ?? "",
    data.country,
    data.businessType,
    data.farmerNetwork,
    data.budget,
    data.existingBusiness,
    data.city ?? "",
    "new",
    "",
    "",
  ]);
}
