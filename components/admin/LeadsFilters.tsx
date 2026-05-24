"use client";

import { STATUS_OPTIONS } from "./StatusBadge";

const COUNTRIES = ["Malaysia", "Philippines", "Indonesia", "Vietnam", "Other"];

export interface Filters {
  type: "all" | "enterprise" | "distributor";
  status: string;
  country: string;
  from: string;
  to: string;
}

interface LeadsFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
}

const selectClass =
  "rounded-lg border border-[#e7e5e4] bg-white px-3 py-1.5 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a]";

export function LeadsFilters({ filters, onChange, total }: LeadsFiltersProps) {
  function update(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-[#78716c]">{total} leads</span>

      <select className={selectClass} value={filters.type} onChange={(e) => update("type", e.target.value)}>
        <option value="all">All types</option>
        <option value="enterprise">Enterprise</option>
        <option value="distributor">Distributor</option>
      </select>

      <select className={selectClass} value={filters.status} onChange={(e) => update("status", e.target.value)}>
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>

      <select className={selectClass} value={filters.country} onChange={(e) => update("country", e.target.value)}>
        <option value="">All countries</option>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="date"
        className={selectClass}
        value={filters.from}
        onChange={(e) => update("from", e.target.value)}
        title="From date"
      />
      <input
        type="date"
        className={selectClass}
        value={filters.to}
        onChange={(e) => update("to", e.target.value)}
        title="To date"
      />

      {(filters.status || filters.country || filters.from || filters.to || filters.type !== "all") && (
        <button
          onClick={() => onChange({ type: "all", status: "", country: "", from: "", to: "" })}
          className="text-xs text-[#78716c] underline hover:text-[#1c1917]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
