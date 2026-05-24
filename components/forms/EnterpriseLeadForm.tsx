"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { enterpriseLeadSchema, type EnterpriseLeadInput } from "@/lib/validations/enterprise-lead.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const CROPS = ["Palm Oil", "Banana", "Sugarcane", "Durian", "Rubber", "Coconut", "Cacao", "Coffee/Tea", "Pineapple", "Other"];

const REGIONS: Record<string, string[]> = {
  Malaysia: ["Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "Other"],
  Philippines: ["Mindanao", "Visayas", "Luzon", "NCR (Metro Manila)", "Cordillera (CAR)", "Ilocos Region", "Cagayan Valley", "Bicol Region", "Western Visayas", "Eastern Visayas", "Zamboanga Peninsula", "Northern Mindanao", "Davao Region", "SOCCSKSARGEN", "Caraga", "BARMM", "Other"],
  Indonesia: ["Sumatra", "Java", "Kalimantan", "Sulawesi", "Papua", "Bali & Nusa Tenggara", "Maluku", "Other"],
  Vietnam: ["Northern Vietnam", "Central Vietnam", "Southern Vietnam", "Mekong Delta", "Central Highlands", "Other"],
  Other: ["Other"],
};

const INVESTMENT_RANGES = ["$0 – $3,000", "$3,000 – $5,000", "$5,000 – $10,000", "$10,000 and above"];

const SELECT_CLS = "w-full rounded-lg border border-[#e7e5e4] bg-white px-3 py-2.5 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent";

export function EnterpriseLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnterpriseLeadInput>({
    resolver: zodResolver(enterpriseLeadSchema),
    defaultValues: { crops: [], consent: undefined as unknown as true },
  });

  const selectedCrops = watch("crops") ?? [];
  const selectedCountry = watch("country");
  const regionOptions = selectedCountry ? (REGIONS[selectedCountry] ?? REGIONS["Other"]) : [];

  function toggleCrop(crop: string) {
    const current = selectedCrops;
    const next = current.includes(crop) ? current.filter((c) => c !== crop) : [...current, crop];
    setValue("crops", next, { shouldValidate: true });
  }

  async function onSubmit(data: EnterpriseLeadInput) {
    setServerError("");
    try {
      const res = await fetch("/api/leads/enterprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmittedName(data.firstName);
        setSubmitted(true);
      } else {
        const json = await res.json();
        setServerError(json.error ?? "Something went wrong. Please try again.");
        toast.error("Submission failed. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection.");
      toast.error("Network error. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#16a34a] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#1c1917] mb-2">Thank you, {submittedName}!</h3>
        <p className="text-[#44403c]">Your pilot request has been received. Rohan will be in touch within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-[#44403c] mb-1.5 block">First Name *</Label>
          <Input id="firstName" {...register("firstName")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#16a34a]" />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-[#44403c] mb-1.5 block">Last Name *</Label>
          <Input id="lastName" {...register("lastName")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#16a34a]" />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-[#44403c] mb-1.5 block">Work Email *</Label>
        <Input id="email" type="email" {...register("email")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#16a34a]" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobTitle" className="text-sm font-medium text-[#44403c] mb-1.5 block">Job Title *</Label>
          <Input id="jobTitle" {...register("jobTitle")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#16a34a]" />
          {errors.jobTitle && <p className="text-xs text-red-500 mt-1">{errors.jobTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="company" className="text-sm font-medium text-[#44403c] mb-1.5 block">Company / Estate Name *</Label>
          <Input id="company" {...register("company")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#16a34a]" />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country" className="text-sm font-medium text-[#44403c] mb-1.5 block">Country *</Label>
          <select id="country" {...register("country")} onChange={(e) => { register("country").onChange(e); setValue("region", ""); }} className={SELECT_CLS}>
            <option value="">Select country</option>
            {["Malaysia", "Philippines", "Indonesia", "Vietnam", "Other"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
        </div>
        <div>
          <Label htmlFor="region" className="text-sm font-medium text-[#44403c] mb-1.5 block">
            Region <span className="text-[#78716c] font-normal">(optional)</span>
          </Label>
          <select id="region" {...register("region")} disabled={!selectedCountry} className={SELECT_CLS + (!selectedCountry ? " opacity-50 cursor-not-allowed" : "")}>
            <option value="">Select region</option>
            {regionOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="landArea" className="text-sm font-medium text-[#44403c] mb-1.5 block">Farm / Estate Area *</Label>
          <select id="landArea" {...register("landArea")} className={SELECT_CLS}>
            <option value="">Select area</option>
            {["50–499 ha", "500–999 ha", "1,000–4,999 ha", "5,000–49,999 ha", "50,000+ ha"].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {errors.landArea && <p className="text-xs text-red-500 mt-1">{errors.landArea.message}</p>}
        </div>
        <div>
          <Label htmlFor="investmentRange" className="text-sm font-medium text-[#44403c] mb-1.5 block">
            Investment Range <span className="text-[#78716c] font-normal">(optional)</span>
          </Label>
          <select id="investmentRange" {...register("investmentRange")} className={SELECT_CLS}>
            <option value="">Select range</option>
            {INVESTMENT_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-[#44403c] mb-2 block">Primary Crop(s) *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CROPS.map((crop) => (
            <label key={crop} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={selectedCrops.includes(crop)}
                onCheckedChange={() => toggleCrop(crop)}
                className="data-[state=checked]:bg-[#16a34a] data-[state=checked]:border-[#16a34a]"
              />
              <span className="text-sm text-[#44403c] group-hover:text-[#1c1917]">{crop}</span>
            </label>
          ))}
        </div>
        {errors.crops && <p className="text-xs text-red-500 mt-1">{errors.crops.message}</p>}
      </div>

      <div>
        <Label htmlFor="challenge" className="text-sm font-medium text-[#44403c] mb-1.5 block">Biggest Operational Challenge <span className="text-[#78716c] font-normal">(optional)</span></Label>
        <select id="challenge" {...register("challenge")} className={SELECT_CLS}>
          <option value="">Select challenge</option>
          {["Water/irrigation costs", "Disease/pest management", "Yield improvement", "ESG/sustainability reporting", "Labour costs", "Other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="source" className="text-sm font-medium text-[#44403c] mb-1.5 block">How did you hear about Fasal? <span className="text-[#78716c] font-normal">(optional)</span></Label>
        <select id="source" {...register("source")} className={SELECT_CLS}>
          <option value="">Select source</option>
          {["LinkedIn", "Google", "Referred by partner", "Industry event", "Other"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="consent"
          onCheckedChange={(checked) =>
            setValue("consent", checked === true ? true : (undefined as unknown as true), { shouldValidate: true })
          }
          className="mt-0.5 data-[state=checked]:bg-[#16a34a] data-[state=checked]:border-[#16a34a]"
        />
        <label htmlFor="consent" className="text-sm text-[#44403c] leading-relaxed cursor-pointer">
          I agree to Fasal&apos;s{" "}
          <Link href="/privacy-policy" className="text-[#16a34a] underline" target="_blank">
            Privacy Policy
          </Link>{" "}
          and consent to being contacted about my enquiry.
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-500">{errors.consent.message}</p>}

      {serverError && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">{serverError}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold rounded-xl min-h-[52px] text-base"
      >
        {isSubmitting ? "Sending..." : "Request a Pilot →"}
      </Button>
    </form>
  );
}
