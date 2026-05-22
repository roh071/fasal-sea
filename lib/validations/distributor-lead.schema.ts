import { z } from "zod";

export const distributorLeadSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  country: z.enum(["Malaysia", "Philippines", "Other"] as const, {
    error: "Select a country",
  }),
  businessType: z.enum(
    ["Agri input supplier", "Farm equipment", "Agri consultancy", "Farmer co-op", "Other"] as const,
    { error: "Select your business type" }
  ),
  farmerNetwork: z.enum(["<10 farmers", "10–50 farmers", "50–200 farmers", "200+ farmers"] as const, {
    error: "Select farmer network size",
  }),
  budget: z.enum(["$0", "$1K–$5K", "$5K–$15K", "$15K+"] as const, {
    error: "Select budget range",
  }),
  existingBusiness: z.enum(["Yes", "Currently building", "No"] as const, {
    error: "Please select one",
  }),
  message: z.string().optional(),
  consent: z.literal(true, { error: "You must agree to be contacted" }),
});

export type DistributorLeadInput = z.infer<typeof distributorLeadSchema>;
