import { z } from "zod";

export const enterpriseLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid work email"),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company / estate name is required"),
  country: z.enum(["Malaysia", "Philippines", "Indonesia", "Vietnam", "Other"] as const, {
    error: "Select a country",
  }),
  crops: z.array(z.string()).min(1, "Select at least one crop"),
  landArea: z.enum(["50–499 ha", "500–999 ha", "1,000–4,999 ha", "5,000–49,999 ha", "50,000+ ha"] as const, {
    error: "Select land area",
  }),
  challenge: z.string().optional(),
  source: z.string().optional(),
  consent: z.literal(true, { error: "You must agree to be contacted" }),
});

export type EnterpriseLeadInput = z.infer<typeof enterpriseLeadSchema>;
