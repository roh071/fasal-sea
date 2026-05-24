"use client";

import { DeepProfileCard } from "./DeepProfileCard";
import type { DeepResearchItem } from "@/lib/ai/types";

interface Props {
  items: DeepResearchItem[];
  streaming: boolean;
}

const ICP_ORDER: Record<string, number> = { High: 0, Medium: 1, Low: 2 };

export function DeepResearchResults({ items, streaming }: Props) {
  if (items.length === 0) return null;

  const highCount = items.filter((i) => i.icpScore === "High").length;
  const medCount = items.filter((i) => i.icpScore === "Medium").length;

  const sorted = [...items].sort(
    (a, b) => (ICP_ORDER[a.icpScore] ?? 2) - (ICP_ORDER[b.icpScore] ?? 2)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-semibold text-[#1c1917]">
          {items.length} companies researched{streaming ? "…" : ""}
        </p>
        <div className="flex gap-2">
          {highCount > 0 && (
            <span className="text-xs px-2 py-1 rounded-full bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] font-medium">
              {highCount} High ICP
            </span>
          )}
          {medCount > 0 && (
            <span className="text-xs px-2 py-1 rounded-full bg-[#fffbeb] text-[#92400e] border border-[#fde68a] font-medium">
              {medCount} Medium ICP
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((item, i) => (
          <DeepProfileCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
