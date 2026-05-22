export interface CompanyDiscoveryItem {
  name: string;
  icpScore: "High" | "Medium" | "Low";
  icpReason: string;
  crops: string[];
  estimatedScale: string;
  linkedinHint: string;
  targetTitles: string[];
  fasalHook: string;
}

export interface EmailPackResult {
  subjects: [string, string, string];
  initialEmail: string;
  followUp1: string;
  followUp2: string;
}
