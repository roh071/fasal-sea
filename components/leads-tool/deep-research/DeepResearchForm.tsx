"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deepResearchSchema, COUNTRIES, CROPS, type DeepResearchInput } from "@/lib/validations/leads-tool.schema";

const REGIONS: Record<string, string[]> = {
  Malaysia: ["Sabah", "Sarawak", "Johor", "Pahang", "Perak", "Selangor", "Kedah", "Kelantan", "Other"],
  Philippines: ["Mindanao", "Visayas", "Luzon", "Davao Region", "SOCCSKSARGEN", "Caraga", "Other"],
  Indonesia: ["Sumatra", "Kalimantan", "Java", "Sulawesi", "Papua", "Other"],
  Vietnam: ["Mekong Delta", "Central Highlands", "Northern Vietnam", "Southern Vietnam", "Other"],
};

const SELECT_CLS = "w-full rounded-lg border border-[#e7e5e4] bg-white px-3 py-2.5 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent";

interface Props {
  onSubmit: (data: DeepResearchInput) => void;
  loading: boolean;
}

export function DeepResearchForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeepResearchInput>({
    resolver: zodResolver(deepResearchSchema),
  });

  const selectedCountry = watch("country");
  const regionOptions = selectedCountry ? (REGIONS[selectedCountry] ?? []) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="rounded-lg border border-[#e7e5e4] bg-[#fafaf9] px-4 py-3 text-sm text-[#44403c]">
        <p className="font-medium text-[#1c1917] mb-1">Deep Research Mode</p>
        <p className="text-xs text-[#78716c]">AI researches 8–10 companies with 1,000+ ha minimum. Includes production history, team structure, technology usage, and investment plans. Takes ~30–60 seconds.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-[#44403c] mb-1.5 block">Country *</label>
          <select {...register("country")} className={SELECT_CLS}>
            <option value="">Select country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-[#44403c] mb-1.5 block">
            Region <span className="text-[#78716c] font-normal">(optional)</span>
          </label>
          <select
            {...register("region")}
            disabled={!selectedCountry}
            className={SELECT_CLS + (!selectedCountry ? " opacity-50 cursor-not-allowed" : "")}
          >
            <option value="">All regions</option>
            {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-[#44403c] mb-1.5 block">
            Primary Crop <span className="text-[#78716c] font-normal">(optional)</span>
          </label>
          <select {...register("crop")} className={SELECT_CLS}>
            <option value="">All crops</option>
            {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-60 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Researching companies…
          </span>
        ) : (
          "Deep Research →"
        )}
      </button>
    </form>
  );
}
