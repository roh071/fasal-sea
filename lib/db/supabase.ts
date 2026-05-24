import { createClient } from "@supabase/supabase-js";

/*
  Run this SQL in Supabase Dashboard → SQL Editor to create both tables:

  -- Enterprise leads
  create table enterprise_leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    source text not null default 'website',
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text,
    job_title text not null,
    company text not null,
    country text not null,
    land_area text not null,
    crops text[] not null default '{}',
    challenge text,
    lead_source text,
    city text,
    ad_name text,
    campaign_name text,
    status text not null default 'new',
    assigned_to text,
    remark1 text,
    remark2 text,
    remark3 text,
    remark4 text,
    remark5 text,
    remark6 text
  );

  -- Distributor leads
  create table distributor_leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    source text not null default 'website',
    full_name text not null,
    phone text not null,
    email text not null,
    company text,
    country text not null,
    business_type text not null,
    farmer_network text not null,
    budget text not null,
    existing_business text not null,
    message text,
    city text,
    district text,
    province text,
    primary_region text,
    ad_name text,
    campaign_name text,
    investment_range text,
    what_looking_for text,
    agribusiness_type text,
    status text not null default 'new',
    assigned_to text,
    remark1 text,
    remark2 text,
    remark3 text,
    remark4 text,
    remark5 text,
    remark6 text
  );
*/

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
