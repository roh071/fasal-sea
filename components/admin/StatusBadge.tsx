import type { LeadStatus } from "@/lib/db/leads";

const STATUS_CONFIG: Record<LeadStatus, { label: string; classes: string }> = {
  new: { label: "New", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  contacted: { label: "Contacted", classes: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  qualified: { label: "Qualified", classes: "bg-purple-50 text-purple-700 border-purple-200" },
  proposal: { label: "Proposal", classes: "bg-orange-50 text-orange-700 border-orange-200" },
  won: { label: "Won", classes: "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]" },
  lost: { label: "Lost", classes: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

export const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
export { STATUS_CONFIG };
