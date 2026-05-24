"use client";

import { useState, useEffect, useCallback } from "react";
import { LeadsFilters } from "./LeadsFilters";
import { LeadRowComponent } from "./LeadRow";
import { ImportModal } from "./ImportModal";
import type { Filters } from "./LeadsFilters";
import type { LeadRow } from "@/lib/db/leads";

const DEFAULT_FILTERS: Filters = {
  type: "all",
  status: "",
  country: "",
  from: "",
  to: "",
};

interface LeadsResponse {
  leads: LeadRow[];
  total: number;
}

export function LeadsDashboard() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<LeadsResponse>({ leads: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);
    if (filters.country) params.set("country", filters.country);
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);
    params.set("page", String(page));

    try {
      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load leads");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading leads");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleFilterChange(f: Filters) {
    setFilters(f);
    setPage(1);
  }

  async function handleUpdate(
    id: string,
    type: "enterprise" | "distributor",
    payload: Record<string, string>
  ) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...payload }),
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  const totalPages = Math.ceil(data.total / 50);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <LeadsFilters filters={filters} onChange={handleFilterChange} total={data.total} />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImport(true)}
            className="text-xs font-medium text-[#16a34a] hover:text-[#15803d] border border-[#bbf7d0] bg-[#f0fdf4] hover:bg-[#dcfce7] px-3 py-1.5 rounded-lg transition-colors"
          >
            Import Leads
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-[#78716c] hover:text-[#1c1917] underline"
          >
            Log out
          </button>
        </div>
      </div>

      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onSuccess={() => { setShowImport(false); fetchLeads(); }}
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-[#78716c]">
          <span className="h-5 w-5 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin mr-2" />
          Loading leads…
        </div>
      ) : data.leads.length === 0 ? (
        <div className="text-center py-16 text-sm text-[#78716c]">No leads found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#e7e5e4]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f5f5f4] border-b border-[#e7e5e4]">
                {["Date", "Contact", "Company", "Country", "Type", "Status", "Assigned To", "Saving", ""].map((h, i) => (
                  <th key={`${h}-${i}`} className="px-4 py-3 text-xs font-semibold text-[#78716c] uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.leads.map((lead) => (
                <LeadRowComponent
                  key={`${lead.type}-${lead.id}`}
                  lead={lead}
                  onUpdate={handleUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#e7e5e4] text-[#44403c] disabled:opacity-40 hover:bg-[#f5f5f4]"
          >
            Previous
          </button>
          <span className="text-[#78716c]">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-[#e7e5e4] text-[#44403c] disabled:opacity-40 hover:bg-[#f5f5f4]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
