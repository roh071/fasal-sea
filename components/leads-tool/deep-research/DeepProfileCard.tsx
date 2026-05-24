"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Mail, Phone, Zap } from "lucide-react";
import type { DeepResearchItem, EnrichedContact } from "@/lib/ai/types";

const ICP_CONFIG = {
  High: { label: "High ICP", classes: "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]" },
  Medium: { label: "Medium ICP", classes: "bg-[#fffbeb] text-[#92400e] border-[#fde68a]" },
  Low: { label: "Low ICP", classes: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]" },
};

interface Props {
  item: DeepResearchItem;
}

export function DeepProfileCard({ item }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [enriched, setEnriched] = useState<EnrichedContact[] | null>(null);
  const [enrichError, setEnrichError] = useState<string | null>(null);

  const icp = ICP_CONFIG[item.icpScore] ?? ICP_CONFIG.Medium;
  const linkedinUrl = `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(item.linkedinHint)}`;

  async function handleEnrich() {
    setEnriching(true);
    setEnrichError(null);
    try {
      const res = await fetch("/api/ai/enrich-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: item.name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Enrichment failed");
      setEnriched(json.contacts ?? []);
    } catch (err) {
      setEnrichError(err instanceof Error ? err.message : "Failed to fetch contacts");
    } finally {
      setEnriching(false);
    }
  }

  // AI key contact (from deep research)
  const aiContact = item.keyContact?.name &&
    item.keyContact.name !== "Not publicly available" &&
    item.keyContact.name.trim() !== "";

  return (
    <div className="rounded-xl border border-[#e7e5e4] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-[#1c1917]">{item.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${icp.classes}`}>
              {icp.label}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#78716c]">{item.country}</span>
            {item.region && item.region !== item.country && (
              <>
                <span className="text-xs text-[#d6d3d1]">·</span>
                <span className="text-xs text-[#78716c]">{item.region}</span>
              </>
            )}
            {item.crops.map((c) => (
              <span key={c} className="text-xs bg-[#f5f5f4] text-[#44403c] px-2 py-0.5 rounded-full border border-[#e7e5e4]">{c}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#78716c] hover:text-[#1c1917] mt-0.5 flex-shrink-0"
          aria-label="Toggle details"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Scale + Fasal hook + Contacts always visible */}
      <div className="px-5 pb-3 space-y-2">
        <p className="text-xs text-[#44403c]"><span className="font-medium text-[#78716c]">Scale:</span> {item.estimatedScale}</p>
        <div className="rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] px-3 py-2">
          <p className="text-xs text-[#15803d] font-medium">Fasal Hook</p>
          <p className="text-xs text-[#166534] mt-0.5">{item.fasalHook}</p>
        </div>

        {/* Contacts section */}
        <div className="rounded-lg border border-[#e7e5e4] bg-[#fafaf9] px-3 py-2.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#44403c] uppercase tracking-wide">Key Contacts</p>
            {enriched === null && (
              <button
                onClick={handleEnrich}
                disabled={enriching}
                className="flex items-center gap-1 text-xs font-medium text-[#7c3aed] hover:text-[#6d28d9] disabled:opacity-50"
              >
                {enriching ? (
                  <>
                    <span className="h-3 w-3 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
                    Searching Apollo…
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3" />
                    Enrich via Apollo
                  </>
                )}
              </button>
            )}
            {enriched !== null && (
              <span className="text-xs text-[#78716c]">{enriched.length} found via Apollo</span>
            )}
          </div>

          {/* Apollo enriched contacts */}
          {enriched !== null && enriched.length > 0 && (
            <div className="space-y-2">
              {enriched.map((c, i) => (
                <ContactRow key={i} contact={c} />
              ))}
            </div>
          )}

          {enriched !== null && enriched.length === 0 && (
            <p className="text-xs text-[#78716c]">No contacts found on Apollo for this company.</p>
          )}

          {enrichError && (
            <p className="text-xs text-red-500">{enrichError}</p>
          )}

          {/* AI key contact (shown only if no Apollo enrichment yet) */}
          {enriched === null && aiContact && (
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="text-xs font-medium text-[#1c1917]">{item.keyContact.name}</span>
                {item.keyContact.designation && (
                  <span className="text-xs text-[#78716c]">{item.keyContact.designation}</span>
                )}
                <span className="text-xs text-[#d6d3d1] italic">AI estimate</span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {item.keyContact.email && (
                  <a href={`mailto:${item.keyContact.email}`} className="text-xs text-[#16a34a] hover:underline">
                    {item.keyContact.email}
                  </a>
                )}
                {item.keyContact.phone && (
                  <a href={`tel:${item.keyContact.phone}`} className="text-xs text-[#44403c] hover:underline">
                    {item.keyContact.phone}
                  </a>
                )}
              </div>
            </div>
          )}

          {enriched === null && !aiContact && !enriching && (
            <p className="text-xs text-[#a8a29e]">Click "Enrich via Apollo" to find verified contacts.</p>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#f5f5f4] px-5 py-4 space-y-4">
          <Section title="Operations">
            <Row label="Team Structure" value={item.teamStructure} />
            <Row label="Production Capacity" value={item.productionCapacity} />
            <Row label="Farm Structure" value={item.farmStructure} />
            <Row label="Terrain" value={item.terrainSlope} />
            <Row label="Farmer Count" value={item.farmerCount} />
          </Section>

          <Section title="Production History & Plans">
            <Row label="Last 5 Years" value={item.last5YearProduction} />
            <Row label="Next 5 Years" value={item.next5YearPlan} />
          </Section>

          <Section title="Investment & Budget">
            <Row label="Budget Estimate" value={item.budget} />
            <Row label="Investment Signals" value={item.investmentPlan} />
          </Section>

          <Section title="Technology">
            <Row label="Smart Farming Tech" value={item.smartFarmingTech} />
            <Row label="Drip Irrigation" value={item.dripIrrigation} />
          </Section>

          {item.currentChallenges.length > 0 && (
            <Section title="Current Challenges">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {item.currentChallenges.map((c, i) => (
                  <span key={i} className="text-xs bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </Section>
          )}

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#0a66c2] hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Search on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}

function ContactRow({ contact }: { contact: EnrichedContact }) {
  return (
    <div className="rounded-lg bg-white border border-[#e7e5e4] px-3 py-2 space-y-1">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-semibold text-[#1c1917]">{contact.name}</span>
          {contact.title && (
            <span className="text-xs text-[#78716c] ml-2">{contact.title}</span>
          )}
        </div>
        {contact.linkedin && (
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0a66c2] hover:opacity-75 flex-shrink-0"
            title="LinkedIn"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-xs text-[#16a34a] hover:underline">
            <Mail className="h-3 w-3" />
            {contact.email}
          </a>
        )}
        {contact.phone && (
          <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-xs text-[#44403c] hover:underline">
            <Phone className="h-3 w-3" />
            {contact.phone}
          </a>
        )}
        {!contact.email && !contact.phone && (
          <span className="text-xs text-[#a8a29e]">No contact details available</span>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#44403c] uppercase tracking-wide mb-2">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value || value === "Unknown" || value === "unknown") return null;
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-[#78716c] min-w-[120px] flex-shrink-0">{label}</span>
      <span className="text-[#1c1917]">{value}</span>
    </div>
  );
}
