"use client";

import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/leads-tool/shared/CopyButton";
import type { CompanyDiscoveryItem } from "@/lib/ai/types";

const ICP_BADGE: Record<CompanyDiscoveryItem["icpScore"], { label: string; classes: string }> = {
  High: { label: "High ICP", classes: "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]" },
  Medium: { label: "Medium ICP", classes: "bg-[#fffbeb] text-[#92400e] border-[#fde68a]" },
  Low: { label: "Low ICP", classes: "bg-[#f5f5f4] text-[#78716c] border-[#e7e5e4]" },
};

interface CompanyCardProps {
  item: CompanyDiscoveryItem;
}

export function CompanyCard({ item }: CompanyCardProps) {
  const badge = ICP_BADGE[item.icpScore];

  return (
    <div className="bg-white rounded-xl border border-[#e7e5e4] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[#1c1917] text-base leading-snug">{item.name}</h3>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${badge.classes}`}>
          {badge.label}
        </span>
      </div>

      <p className="text-sm text-[#78716c]">{item.icpReason}</p>

      <div className="flex flex-wrap gap-1.5">
        {item.crops.map((crop) => (
          <span
            key={crop}
            className="text-xs px-2 py-0.5 rounded-full bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]"
          >
            {crop}
          </span>
        ))}
      </div>

      <p className="text-xs text-[#78716c]">
        <span className="font-medium text-[#44403c]">Scale: </span>
        {item.estimatedScale}
      </p>

      <div className="bg-[#fafaf9] rounded-lg p-3 border border-[#e7e5e4]">
        <p className="text-xs font-medium text-[#44403c] mb-1">Fasal Hook</p>
        <p className="text-xs text-[#78716c]">{item.fasalHook}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-[#44403c] mb-1.5">Target Titles</p>
        <div className="flex flex-wrap gap-1.5">
          {item.targetTitles.map((title) => (
            <span
              key={title}
              className="text-xs px-2 py-0.5 rounded-md bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]"
            >
              {title}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-[#f5f5f4]">
        <a
          href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(item.linkedinHint)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0d9488] hover:text-[#0f766e] transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Search LinkedIn
        </a>
        <CopyButton text={item.targetTitles.join(", ")} label="Copy titles" className="ml-auto" />
      </div>
    </div>
  );
}
