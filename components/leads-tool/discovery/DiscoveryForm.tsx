"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { discoverySchema, COUNTRIES, CROPS, SIZE_FILTERS } from "@/lib/validations/leads-tool.schema";
import type { DiscoveryInput } from "@/lib/validations/leads-tool.schema";

interface DiscoveryFormProps {
  onSubmit: (data: DiscoveryInput) => void;
  isLoading: boolean;
}

export function DiscoveryForm({ onSubmit, isLoading }: DiscoveryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscoveryInput>({
    resolver: zodResolver(discoverySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">Country</label>
          <select
            {...register("country")}
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-xs text-red-600">{errors.country.message}</p>
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

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1c1917]">
            Estate Size <span className="text-[#78716c] font-normal">(optional)</span>
          </label>
          <select
            {...register("sizeFilter")}
            className="rounded-lg border border-[#e7e5e4] bg-white px-3 py-2 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
          >
            {SIZE_FILTERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
            Researching…
          </>
        ) : (
          "Find Companies"
        )}
      </button>
    </form>
  );
}
