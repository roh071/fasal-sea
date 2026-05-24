"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Mail, Copy, Check } from "lucide-react";
import { StatusBadge, STATUS_OPTIONS, STATUS_CONFIG } from "./StatusBadge";
import type { LeadRow, LeadStatus } from "@/lib/db/leads";

interface LeadRowProps {
  lead: LeadRow;
  onUpdate: (id: string, type: "enterprise" | "distributor", payload: Record<string, string>) => Promise<void>;
}

interface DraftEmail {
  subject: string;
  body: string;
}

export function LeadRowComponent({ lead, onUpdate }: LeadRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [assignedTo, setAssignedTo] = useState(lead.assigned_to ?? "");
  const [remark, setRemark] = useState(lead.remark1 ?? "");
  const [saving, setSaving] = useState(false);
  const [draftEmail, setDraftEmail] = useState<DraftEmail | null>(null);
  const [drafting, setDrafting] = useState(false);
  const [draftError, setDraftError] = useState("");
  const [copied, setCopied] = useState(false);

  const name = lead.type === "enterprise"
    ? `${lead.first_name} ${lead.last_name}`
    : lead.full_name;

  const company = lead.type === "enterprise" ? lead.company : (lead.company ?? "—");
  const date = new Date(lead.created_at).toLocaleDateString("en-SG", {
    day: "2-digit", month: "short", year: "numeric",
  });

  async function handleStatusChange(newStatus: LeadStatus) {
    setStatus(newStatus);
    setSaving(true);
    await onUpdate(lead.id, lead.type, { status: newStatus }).finally(() => setSaving(false));
  }

  async function handleRemarkBlur() {
    if (remark === (lead.remark1 ?? "")) return;
    setSaving(true);
    await onUpdate(lead.id, lead.type, { remark1: remark }).finally(() => setSaving(false));
  }

  async function handleAssignBlur() {
    if (assignedTo === (lead.assigned_to ?? "")) return;
    setSaving(true);
    await onUpdate(lead.id, lead.type, { assigned_to: assignedTo }).finally(() => setSaving(false));
  }

  async function handleDraftEmail() {
    setDrafting(true);
    setDraftError("");
    setDraftEmail(null);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/draft-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: lead.type }),
      });
      if (res.status === 401) { window.location.href = "/admin/login"; return; }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to generate email");
      setDraftEmail(json);
    } catch (err) {
      setDraftError(err instanceof Error ? err.message : "Error generating email");
    } finally {
      setDrafting(false);
    }
  }

  function handleCopyEmail() {
    if (!draftEmail) return;
    const full = `Subject: ${draftEmail.subject}\n\n${draftEmail.body}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const aiRemark1 = lead.remark1?.startsWith("[AI]") ? lead.remark1 : null;
  const aiRemark2 = lead.remark2?.startsWith("[AI]") ? lead.remark2 : null;

  return (
    <>
      <tr className="border-b border-[#f5f5f4] hover:bg-[#fafaf9] transition-colors">
        <td className="px-4 py-3 text-xs text-[#78716c] whitespace-nowrap">{date}</td>
        <td className="px-4 py-3">
          <p className="text-sm font-medium text-[#1c1917]">{name}</p>
          <p className="text-xs text-[#78716c]">{lead.email}</p>
        </td>
        <td className="px-4 py-3 text-sm text-[#44403c]">{company}</td>
        <td className="px-4 py-3 text-sm text-[#44403c]">{lead.country}</td>
        <td className="px-4 py-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
            lead.type === "enterprise"
              ? "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]"
              : "bg-[#f0fdfa] text-[#0f766e] border-[#99f6e4]"
          }`}>
            {lead.type === "enterprise" ? "Enterprise" : "Distributor"}
          </span>
        </td>
        <td className="px-4 py-3">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            className={`text-xs font-medium px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none ${STATUS_CONFIG[status]?.classes ?? ""}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3">
          <input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            onBlur={handleAssignBlur}
            placeholder="Assign…"
            className="text-xs border border-[#e7e5e4] rounded px-2 py-1 w-24 focus:outline-none focus:ring-1 focus:ring-[#16a34a] bg-white"
          />
        </td>
        <td className="px-4 py-3">
          {saving && <span className="text-xs text-[#78716c]">Saving…</span>}
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#78716c] hover:text-[#1c1917]"
            aria-label="Expand"
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-[#fafaf9]">
          <td colSpan={9} className="px-4 pb-5 pt-2">
            {/* AI scoring notes */}
            {(aiRemark1 || aiRemark2) && (
              <div className="mb-3 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 space-y-1">
                {aiRemark1 && <p className="text-xs text-[#15803d]">{aiRemark1}</p>}
                {aiRemark2 && <p className="text-xs text-[#166534]">{aiRemark2}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs mb-3">
              {lead.type === "enterprise" ? (
                <>
                  <Detail label="Job Title" value={lead.job_title} />
                  <Detail label="Land Area" value={lead.land_area} />
                  <Detail label="Crops" value={lead.crops.join(", ")} />
                  <Detail label="Challenge" value={lead.challenge} />
                  <Detail label="How Heard" value={lead.lead_source} />
                  <Detail label="Campaign" value={lead.campaign_name} />
                  <Detail label="Ad Name" value={lead.ad_name} />
                </>
              ) : (
                <>
                  <Detail label="Phone" value={lead.phone} />
                  <Detail label="Business Type" value={lead.business_type} />
                  <Detail label="Farmer Network" value={lead.farmer_network} />
                  <Detail label="Budget" value={lead.budget} />
                  <Detail label="Existing Business" value={lead.existing_business} />
                  <Detail label="City" value={lead.city} />
                  <Detail label="Investment Range" value={lead.investment_range} />
                  <Detail label="Message" value={lead.message} />
                </>
              )}
              <Detail label="Source" value={lead.source} />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-xs font-medium text-[#44403c]">Remark</label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                onBlur={handleRemarkBlur}
                rows={2}
                placeholder="Add a follow-up note…"
                className="text-xs border border-[#e7e5e4] rounded-lg px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-1 focus:ring-[#16a34a] bg-white resize-none"
              />
            </div>

            {/* Draft Email section */}
            <div className="border-t border-[#e7e5e4] pt-4">
              <button
                onClick={handleDraftEmail}
                disabled={drafting}
                className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#e7e5e4] text-[#44403c] hover:bg-white hover:border-[#16a34a] hover:text-[#16a34a] disabled:opacity-50 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {drafting ? "Generating…" : "Draft Email with AI"}
              </button>

              {draftError && (
                <p className="mt-2 text-xs text-red-500">{draftError}</p>
              )}

              {draftEmail && (
                <div className="mt-3 rounded-lg border border-[#e7e5e4] bg-white overflow-hidden max-w-2xl">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#f5f5f4] border-b border-[#e7e5e4]">
                    <p className="text-xs font-semibold text-[#44403c]">Subject: {draftEmail.subject}</p>
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1 text-xs text-[#78716c] hover:text-[#1c1917] transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-[#16a34a]" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="px-4 py-3 text-xs text-[#1c1917] whitespace-pre-wrap font-sans leading-relaxed">
                    {draftEmail.body}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[#78716c] mb-0.5">{label}</p>
      <p className="text-[#1c1917] font-medium">{value}</p>
    </div>
  );
}
