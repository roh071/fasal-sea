"use client";

import { CompanyCard } from "./CompanyCard";
import type { CompanyDiscoveryItem } from "@/lib/ai/types";

interface DiscoveryResultsProps {
  items: CompanyDiscoveryItem[];
  isLoading: boolean;
}

export function DiscoveryResults({ items, isLoading }: DiscoveryResultsProps) {
  if (items.length === 0 && !isLoading) return null;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Apollo / LinkedIn bridge callout */}
      <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4">
        <p className="text-sm font-semibold text-[#92400e] mb-1">Step 2: Find verified contact emails</p>
        <p className="text-sm text-[#78716c] mb-2">
          This tool finds and scores the companies. For verified emails use:
        </p>
        <ol className="text-sm text-[#78716c] list-decimal list-inside space-y-1">
          <li><span className="font-medium text-[#44403c]">LinkedIn Sales Navigator</span> — search company name + title from the cards below</li>
          <li><span className="font-medium text-[#44403c]">Apollo.io</span> — filter by company domain + title, export verified emails</li>
          <li><span className="font-medium text-[#44403c]">Hunter.io</span> — find the email pattern for the company domain</li>
        </ol>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#44403c]">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
              Finding companies…
            </span>
          ) : (
            `${items.length} companies found`
          )}
        </p>
        <div className="flex gap-2 text-xs text-[#78716c]">
          <span className="px-2 py-0.5 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d]">
            High: {items.filter((i) => i.icpScore === "High").length}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#fffbeb] border border-[#fde68a] text-[#92400e]">
            Medium: {items.filter((i) => i.icpScore === "Medium").length}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#f5f5f4] border border-[#e7e5e4] text-[#78716c]">
            Low: {items.filter((i) => i.icpScore === "Low").length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <CompanyCard key={`${item.name}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}
