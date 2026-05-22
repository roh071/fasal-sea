"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { distributorLeadSchema, type DistributorLeadInput } from "@/lib/validations/distributor-lead.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const SELECT_CLS = "w-full rounded-lg border border-[#e7e5e4] bg-white px-3 py-2.5 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent";

export function DistributorLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DistributorLeadInput>({
    resolver: zodResolver(distributorLeadSchema),
    defaultValues: { consent: undefined as unknown as true },
  });

  const existingBusiness = watch("existingBusiness");

  async function onSubmit(data: DistributorLeadInput) {
    setServerError("");
    try {
      const res = await fetch("/api/leads/distributor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmittedName(data.fullName.split(" ")[0]);
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
      <div className="rounded-2xl bg-[#f0fdfa] border border-[#99f6e4] p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#0d9488] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#1c1917] mb-2">Thank you, {submittedName}!</h3>
        <p className="text-[#44403c]">Your distributor application has been received. Rohan will be in touch within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="fullName" className="text-sm font-medium text-[#44403c] mb-1.5 block">Full Name *</Label>
        <Input id="fullName" {...register("fullName")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#0d9488]" />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-[#44403c] mb-1.5 block">Phone *</Label>
          <Input id="phone" type="tel" placeholder="+60..." inputMode="tel" {...register("phone")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#0d9488]" />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="distEmail" className="text-sm font-medium text-[#44403c] mb-1.5 block">Email *</Label>
          <Input id="distEmail" type="email" {...register("email")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#0d9488]" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="distCompany" className="text-sm font-medium text-[#44403c] mb-1.5 block">Company / Business Name <span className="text-[#78716c] font-normal">(optional)</span></Label>
          <Input id="distCompany" {...register("company")} className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#0d9488]" />
        </div>
        <div>
          <Label htmlFor="distCountry" className="text-sm font-medium text-[#44403c] mb-1.5 block">Country *</Label>
          <select id="distCountry" {...register("country")} className={SELECT_CLS}>
            <option value="">Select country</option>
            {["Malaysia", "Philippines", "Other"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="businessType" className="text-sm font-medium text-[#44403c] mb-1.5 block">Current Business Type *</Label>
        <select id="businessType" {...register("businessType")} className={SELECT_CLS}>
          <option value="">Select type</option>
          {["Agri input supplier", "Farm equipment", "Agri consultancy", "Farmer co-op", "Other"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="farmerNetwork" className="text-sm font-medium text-[#44403c] mb-1.5 block">Farmer Network Size *</Label>
          <select id="farmerNetwork" {...register("farmerNetwork")} className={SELECT_CLS}>
            <option value="">Select size</option>
            {["<10 farmers", "10–50 farmers", "50–200 farmers", "200+ farmers"].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {errors.farmerNetwork && <p className="text-xs text-red-500 mt-1">{errors.farmerNetwork.message}</p>}
        </div>
        <div>
          <Label htmlFor="budget" className="text-sm font-medium text-[#44403c] mb-1.5 block">Budget to Start *</Label>
          <select id="budget" {...register("budget")} className={SELECT_CLS}>
            <option value="">Select budget</option>
            {["$0", "$1K–$5K", "$5K–$15K", "$15K+"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-[#44403c] mb-2 block">Do you have an existing agriculture business? *</Label>
        <div className="flex flex-wrap gap-3">
          {["Yes", "Currently building", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={opt}
                {...register("existingBusiness")}
                className="accent-[#0d9488]"
              />
              <span className="text-sm text-[#44403c]">
                {opt === "No" ? "No (yet)" : opt}
              </span>
            </label>
          ))}
        </div>
        {existingBusiness === "No" && (
          <p className="text-xs text-[#0d9488] mt-2 bg-[#f0fdfa] rounded-lg px-3 py-2">
            Great — &quot;No&quot; means you don&apos;t have an existing dealership, not that you&apos;re uninterested. We&apos;d love to help you get started.
          </p>
        )}
        {errors.existingBusiness && <p className="text-xs text-red-500 mt-1">{errors.existingBusiness.message}</p>}
      </div>

      <div>
        <Label htmlFor="distMessage" className="text-sm font-medium text-[#44403c] mb-1.5 block">Message <span className="text-[#78716c] font-normal">(optional)</span></Label>
        <Textarea
          id="distMessage"
          rows={3}
          placeholder="Tell us a bit about your business and the region you operate in..."
          {...register("message")}
          className="rounded-lg border-[#e7e5e4] focus-visible:ring-[#0d9488]"
        />
      </div>

      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="distConsent"
          onCheckedChange={(checked) =>
            setValue("consent", checked === true ? true : (undefined as unknown as true), { shouldValidate: true })
          }
          className="mt-0.5 data-[state=checked]:bg-[#0d9488] data-[state=checked]:border-[#0d9488]"
        />
        <label htmlFor="distConsent" className="text-sm text-[#44403c] leading-relaxed cursor-pointer">
          I agree to Fasal&apos;s{" "}
          <Link href="/privacy-policy" className="text-[#0d9488] underline" target="_blank">
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
        className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold rounded-xl min-h-[52px] text-base"
      >
        {isSubmitting ? "Sending..." : "Apply as Distributor →"}
      </Button>
    </form>
  );
}
