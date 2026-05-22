"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailGenSchema, CROPS, PAIN_POINTS } from "@/lib/validations/leads-tool.schema";
import type { EmailGenInput } from "@/lib/validations/leads-tool.schema";

const PAIN_POINT_LABELS: Record<string, string> = {
  "water costs": "Water / Irrigation Costs",
  "disease risk": "Disease / Pest Risk",
  "ESG reporting": "ESG / RSPO Reporting",
  "yield improvement": "Yield Improvement",
  "manual scouting": "Manual Scouting at Scale",
};

interface EmailGeneratorFormProps {
  onSubmit: (data: EmailGenInput) => void;
  isLoading: boolean;
}

export function EmailGeneratorForm({ onSubmit, isLoading }: EmailGeneratorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailGenInput>({
    resolver: zodResolver(emailGenSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">Company Name</label>
          <input
            {...register("companyName")}
            placeholder="e.g. Del Monte Philippines"
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          />
          {errors.companyName && (
            <p className="text-xs text-red-600">{errors.companyName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">Contact Name</label>
          <input
            {...register("contactName")}
            placeholder="e.g. Maria Santos"
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          />
          {errors.contactName && (
            <p className="text-xs text-red-600">{errors.contactName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">Contact Title</label>
          <input
            {...register("contactTitle")}
            placeholder="e.g. Head of Plantations"
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          />
          {errors.contactTitle && (
            <p className="text-xs text-red-600">{errors.contactTitle.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">Primary Crop</label>
          <select
            {...register("crop")}
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          >
            <option value="">Select crop</option>
            {CROPS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.crop && (
            <p className="text-xs text-red-600">{errors.crop.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-sm font-medium text-[#1c1917]">Core Pain Point</label>
          <select
            {...register("painPoint")}
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          >
            <option value="">Select pain point</option>
            {PAIN_POINTS.map((p) => (
              <option key={p} value={p}>{PAIN_POINT_LABELS[p]}</option>
            ))}
          </select>
          {errors.painPoint && (
            <p className="text-xs text-red-600">{errors.painPoint.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16a34a] text-white text-sm font-medium hover:bg-[#15803d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Writing emails…
          </>
        ) : (
          "Generate Email Sequence"
        )}
      </button>
    </form>
  );
}
