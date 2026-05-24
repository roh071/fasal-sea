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

export interface DeepResearchItem {
  name: string;
  country: string;
  region: string;
  icpScore: "High" | "Medium" | "Low";
  crops: string[];
  estimatedScale: string;
  teamStructure: string;
  productionCapacity: string;
  last5YearProduction: string;
  next5YearPlan: string;
  budget: string;
  investmentPlan: string;
  currentChallenges: string[];
  smartFarmingTech: string;
  dripIrrigation: string;
  farmStructure: string;
  terrainSlope: string;
  farmerCount: string;
  keyContact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  linkedinHint: string;
  fasalHook: string;
}

export interface EnrichedContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  source: "apollo";
}
