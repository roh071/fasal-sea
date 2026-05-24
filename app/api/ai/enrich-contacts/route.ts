import { NextRequest, NextResponse } from "next/server";

const APOLLO_BASE = "https://api.apollo.io/api/v1";
const TARGET_TITLES = [
  "Head of Plantations",
  "VP Estates",
  "Head of Agronomy",
  "Director of Plantations",
  "Plantation Manager",
  "Estate Manager",
  "Head of Agriculture",
  "Director of Agriculture",
  "Agronomy Manager",
  "Head of Operations",
  "Director of Operations",
  "Farm Manager",
];

interface ApolloPersonSearchResult {
  id: string;
  first_name: string;
  last_name_obfuscated?: string;
  name?: string;
  title: string | null;
}

interface ApolloEnrichedPerson {
  name: string;
  first_name: string;
  last_name: string;
  title: string | null;
  email: string | null;
  email_status: string | null;
  linkedin_url: string | null;
  contact?: {
    phone_numbers?: { sanitized_number?: string; raw_number?: string }[];
  };
  phone_numbers?: { sanitized_number?: string; raw_number?: string }[];
}

export interface EnrichedContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  source: "apollo";
}

async function apolloHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.APOLLO_API_KEY}`,
  };
}

async function searchPeople(companyName: string): Promise<ApolloPersonSearchResult[]> {
  const res = await fetch(`${APOLLO_BASE}/mixed_people/api_search`, {
    method: "POST",
    headers: await apolloHeaders(),
    body: JSON.stringify({
      q_organization_name: companyName,
      person_titles: TARGET_TITLES,
      page: 1,
      per_page: 5,
    }),
  });

  if (!res.ok) return [];
  const json = await res.json();
  return (json.people ?? []) as ApolloPersonSearchResult[];
}

async function enrichPerson(personId: string): Promise<ApolloEnrichedPerson | null> {
  const res = await fetch(`${APOLLO_BASE}/people/match`, {
    method: "POST",
    headers: await apolloHeaders(),
    body: JSON.stringify({
      id: personId,
      reveal_personal_emails: false,
    }),
  });

  if (!res.ok) return null;
  const json = await res.json();
  return (json.person ?? null) as ApolloEnrichedPerson | null;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Apollo API key not configured" }, { status: 503 });
  }

  let companyName: string;
  try {
    const body = await req.json();
    companyName = body.company;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!companyName?.trim()) {
    return NextResponse.json({ error: "company is required" }, { status: 400 });
  }

  try {
    const people = await searchPeople(companyName.trim());
    if (people.length === 0) {
      return NextResponse.json({ contacts: [] });
    }

    const contacts: EnrichedContact[] = [];
    for (const person of people.slice(0, 3)) {
      const enriched = await enrichPerson(person.id);
      if (!enriched) continue;

      const phone =
        enriched.contact?.phone_numbers?.[0]?.sanitized_number ||
        enriched.phone_numbers?.[0]?.sanitized_number ||
        "";

      contacts.push({
        name: enriched.name || `${enriched.first_name} ${enriched.last_name}`.trim(),
        title: enriched.title ?? "",
        email: enriched.email ?? "",
        phone,
        linkedin: enriched.linkedin_url ?? "",
        source: "apollo",
      });
    }

    return NextResponse.json({ contacts });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Enrichment failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
