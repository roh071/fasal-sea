"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { X, Upload, CheckCircle } from "lucide-react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

type LeadType = "enterprise" | "distributor";

interface ParsedFile {
  type: LeadType;
  rows: Record<string, unknown>[];
  previewHeaders: string[];
  previewRows: string[][];
}

function parsePhone(val: unknown): string {
  if (val == null) return "";
  if (typeof val === "number") return String(Math.round(val));
  return String(val).trim();
}

function str(val: unknown): string {
  if (val == null) return "";
  const s = String(val).trim();
  // Skip Excel formula cells
  if (s.startsWith("=")) return "";
  return s;
}

function parseCrops(val: unknown): string[] {
  const s = str(val);
  if (!s) return [];
  return s.split(/[,;/]/).map((c) => c.trim()).filter(Boolean);
}

function detectType(headers: string[]): LeadType | null {
  if (headers.includes("Lead Name")) return "distributor";
  if (headers.includes("Company/Potential Partner")) return "enterprise";
  return null;
}

function mapEnterpriseRow(row: Record<string, unknown>) {
  return {
    company: str(row["Company/Potential Partner"]),
    crops: parseCrops(row["Core Crop"]),
    challenge: str(row["Issues"]) || null,
    remark3: str(row["Fasal Opportunities"]) || null,
    remark4: str(row["Key People"]) || null,
    remark5: str(row["Nature of Partnership"]) || null,
    remark6: str(row["Remarks"]) || null,
  };
}

function mapDistributorRow(row: Record<string, unknown>) {
  const investment = str(row["What is your preferred investment range?"]);
  const agriType = str(row["What type of agribusiness do you currently operate?"]);
  return {
    full_name: str(row["Lead Name"]),
    phone: parsePhone(row["Mob. No."]),
    email: str(row["Mail ID"]),
    country: str(row["Country"]) || str(row["Country Name"]),
    company: str(row["company_name"]) || null,
    ad_name: str(row["Ad Name"]) || null,
    campaign_name: str(row["Campaign Name"]) || null,
    primary_region: str(row["primary_operating_region"]) || null,
    what_looking_for: str(row["What Are You looking For?"]) || null,
    existing_business: str(row["Do you currently have a business or dealership"]) || "",
    investment_range: investment || null,
    budget: investment || "",
    farmer_network: str(row["what_is_your_network_with_farmers?"]) || "",
    agribusiness_type: agriType || null,
    business_type: agriType || "distributor",
    city: str(row["City"]) || null,
    district: str(row["District"]) || null,
    province: str(row["Province"]) || null,
    remark4: str(row["Standard Remark"]) || null,
    remark5: str(row["Marketing Remarks"]) || null,
    remark6: str(row["Descriptive Remark"]) || null,
    source: str(row["Source"]) || "Facebook Ads",
  };
}

export function ImportModal({ onClose, onSuccess }: Props) {
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ imported: number; skipped: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setParsed(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = ev.target?.result;
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: null });

        if (jsonRows.length === 0) {
          setError("File appears to be empty.");
          return;
        }

        const headers = Object.keys(jsonRows[0]);
        const type = detectType(headers);
        if (!type) {
          setError('Unrecognised file format. Expected "Lead Name" (distributor) or "Company/Potential Partner" (enterprise) column.');
          return;
        }

        const mappedRows = type === "enterprise"
          ? jsonRows.map(mapEnterpriseRow).filter((r) => r.company)
          : jsonRows.map(mapDistributorRow).filter((r) => r.full_name);

        // Build preview
        const previewHeaders = type === "enterprise"
          ? ["Company", "Crops", "Challenge"]
          : ["Name", "Phone", "Email", "Country", "Company"];

        const previewRows = mappedRows.slice(0, 5).map((r) => {
          if (type === "enterprise") {
            const e = r as ReturnType<typeof mapEnterpriseRow>;
            return [e.company, e.crops.join(", "), e.challenge ?? ""];
          } else {
            const d = r as ReturnType<typeof mapDistributorRow>;
            return [d.full_name, d.phone, d.email, d.country, d.company ?? ""];
          }
        });

        setParsed({ type, rows: mappedRows as Record<string, unknown>[], previewHeaders, previewRows });
      } catch {
        setError("Failed to parse file. Make sure it is a valid .xlsx file.");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function handleImport() {
    if (!parsed) return;
    setImporting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: parsed.type, rows: parsed.rows }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Import failed");
      setResult(json);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }

  const typeLabel = parsed?.type === "enterprise" ? "Enterprise" : "Distributor";
  const typeBadgeClasses = parsed?.type === "enterprise"
    ? "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]"
    : "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7e5e4]">
          <h2 className="text-sm font-semibold text-[#1c1917]">Import Leads from Excel</h2>
          <button onClick={onClose} className="text-[#78716c] hover:text-[#1c1917]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* File picker */}
          {!result && (
            <div>
              <p className="text-xs text-[#78716c] mb-3">
                Supports Facebook Ads distributor exports and enterprise CRM sheets. Auto-detects type from column headers.
              </p>
              <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e7e5e4] bg-[#fafaf9] px-6 py-8 cursor-pointer hover:border-[#16a34a] transition-colors">
                <Upload className="h-5 w-5 text-[#78716c]" />
                <span className="text-sm font-medium text-[#44403c]">Click to select .xlsx file</span>
                <span className="text-xs text-[#78716c]">or drag and drop</span>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-5 py-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#15803d]">Import complete</p>
                <p className="text-xs text-[#166534] mt-0.5">
                  {result.imported} rows imported · {result.skipped} skipped (duplicates or empty)
                </p>
                <p className="text-xs text-[#166534] mt-1">AI scoring will run in the background on new leads.</p>
              </div>
            </div>
          )}

          {/* Preview */}
          {parsed && !result && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeBadgeClasses}`}>
                  {typeLabel} leads detected
                </span>
                <span className="text-xs text-[#78716c]">{parsed.rows.length} rows ready to import</span>
              </div>

              {/* Preview table */}
              <div className="overflow-x-auto rounded-lg border border-[#e7e5e4]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#f5f5f4] border-b border-[#e7e5e4]">
                      {parsed.previewHeaders.map((h) => (
                        <th key={h} className="px-3 py-2 font-semibold text-[#78716c] uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.previewRows.map((row, i) => (
                      <tr key={i} className="border-b border-[#f5f5f4] last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 text-[#1c1917] max-w-[180px] truncate">
                            {cell || <span className="text-[#d6d3d1]">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsed.rows.length > 5 && (
                <p className="text-xs text-[#78716c]">Showing 5 of {parsed.rows.length} rows</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e7e5e4] bg-[#fafaf9]">
          {result ? (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#16a34a] text-white text-sm font-semibold hover:bg-[#15803d]"
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#e7e5e4] text-sm text-[#44403c] hover:bg-[#f5f5f4]"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!parsed || importing}
                className="px-4 py-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white text-sm font-semibold flex items-center gap-2"
              >
                {importing ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Importing…
                  </>
                ) : (
                  "Confirm Import →"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
