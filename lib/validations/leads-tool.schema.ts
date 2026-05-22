import { z } from "zod";

export const COUNTRIES = ["Malaysia", "Philippines"] as const;
export const CROPS = [
  "Palm Oil", "Banana", "Sugarcane", "Durian", "Rubber",
  "Coconut", "Cacao", "Coffee/Tea", "Pineapple", "Other",
] as const;
export const PAIN_POINTS = [
  "water costs",
  "disease risk",
  "ESG reporting",
  "yield improvement",
  "manual scouting",
] as const;
export const SIZE_FILTERS = [
  "Any size",
  "1,000–4,999 ha",
  "5,000–49,999 ha",
  "50,000+ ha",
] as const;

export const discoverySchema = z.object({
  country: z.enum(COUNTRIES, { error: "Select a country" }),
  crop: z.enum(CROPS, { error: "Select a crop" }),
  sizeFilter: z.enum(SIZE_FILTERS).optional(),
});

export const emailGenSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactTitle: z.string().min(1, "Contact title is required"),
  crop: z.enum(CROPS, { error: "Select a crop" }),
  painPoint: z.enum(PAIN_POINTS, { error: "Select a pain point" }),
});

export type DiscoveryInput = z.infer<typeof discoverySchema>;
export type EmailGenInput = z.infer<typeof emailGenSchema>;
