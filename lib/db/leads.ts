import { getSupabase } from "./supabase";

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

export interface EnterpriseLead {
  id: string;
  created_at: string;
  source: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  job_title: string;
  company: string;
  country: string;
  land_area: string;
  crops: string[];
  challenge: string | null;
  lead_source: string | null;
  city: string | null;
  ad_name: string | null;
  campaign_name: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  remark1: string | null;
  remark2: string | null;
  remark3: string | null;
  remark4: string | null;
  remark5: string | null;
  remark6: string | null;
}

export interface DistributorLead {
  id: string;
  created_at: string;
  source: string;
  full_name: string;
  phone: string;
  email: string;
  company: string | null;
  country: string;
  business_type: string;
  farmer_network: string;
  budget: string;
  existing_business: string;
  message: string | null;
  city: string | null;
  district: string | null;
  province: string | null;
  primary_region: string | null;
  ad_name: string | null;
  campaign_name: string | null;
  investment_range: string | null;
  what_looking_for: string | null;
  agribusiness_type: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  remark1: string | null;
  remark2: string | null;
  remark3: string | null;
  remark4: string | null;
  remark5: string | null;
  remark6: string | null;
}

export type LeadRow = (EnterpriseLead & { type: "enterprise" }) | (DistributorLead & { type: "distributor" });

export type InsertEnterpriseLead = Omit<EnterpriseLead, "id" | "created_at" | "status" | "assigned_to" | "remark1" | "remark2" | "remark3" | "remark4" | "remark5" | "remark6">;
export type InsertDistributorLead = Omit<DistributorLead, "id" | "created_at" | "status" | "assigned_to" | "remark1" | "remark2" | "remark3" | "remark4" | "remark5" | "remark6">;

export async function insertEnterpriseLead(data: InsertEnterpriseLead): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: row, error } = await (getSupabase().from("enterprise_leads") as any)
    .insert({ ...data, source: data.source ?? "website" })
    .select("id")
    .single();

  if (error) throw new Error(`DB insert enterprise: ${error.message}`);
  return row.id;
}

export async function insertDistributorLead(data: InsertDistributorLead): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: row, error } = await (getSupabase().from("distributor_leads") as any)
    .insert({ ...data, source: data.source ?? "website" })
    .select("id")
    .single();

  if (error) throw new Error(`DB insert distributor: ${error.message}`);
  return row.id;
}

export interface GetLeadsOptions {
  type?: "enterprise" | "distributor" | "all";
  status?: string;
  country?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export async function getLeads(opts: GetLeadsOptions = {}): Promise<{ leads: LeadRow[]; total: number }> {
  const { type = "all", status, country, from, to, page = 1, pageSize = 50 } = opts;
  const offset = (page - 1) * pageSize;

  async function queryTable<T>(table: string, leadType: "enterprise" | "distributor") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let q = (getSupabase().from(table) as any).select("*", { count: "exact" });
    if (status) q = q.eq("status", status);
    if (country) q = q.eq("country", country);
    if (from) q = q.gte("created_at", from);
    if (to) q = q.lte("created_at", to);
    q = q.order("created_at", { ascending: false });
    const { data, error, count } = await q;
    if (error) throw new Error(`DB getLeads ${table}: ${error.message}`);
    return {
      rows: (data ?? []).map((r: T) => ({ ...r, type: leadType })) as unknown as LeadRow[],
      count: count ?? 0,
    };
  }

  if (type === "enterprise") {
    const { rows, count } = await queryTable<EnterpriseLead>("enterprise_leads", "enterprise");
    return { leads: rows.slice(offset, offset + pageSize), total: count };
  }

  if (type === "distributor") {
    const { rows, count } = await queryTable<DistributorLead>("distributor_leads", "distributor");
    return { leads: rows.slice(offset, offset + pageSize), total: count };
  }

  // all — fetch both and merge-sort by created_at descending
  const [ent, dis] = await Promise.all([
    queryTable<EnterpriseLead>("enterprise_leads", "enterprise"),
    queryTable<DistributorLead>("distributor_leads", "distributor"),
  ]);

  const merged = [...ent.rows, ...dis.rows].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    leads: merged.slice(offset, offset + pageSize),
    total: ent.count + dis.count,
  };
}

export interface UpdateLeadPayload {
  status?: LeadStatus;
  assigned_to?: string;
  remark1?: string;
  remark2?: string;
  remark3?: string;
  remark4?: string;
  remark5?: string;
  remark6?: string;
}

export async function updateLead(
  type: "enterprise" | "distributor",
  id: string,
  payload: UpdateLeadPayload
): Promise<void> {
  const table = type === "enterprise" ? "enterprise_leads" : "distributor_leads";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (getSupabase().from(table) as any).update(payload).eq("id", id);
  if (error) throw new Error(`DB updateLead ${table}: ${error.message}`);
}
