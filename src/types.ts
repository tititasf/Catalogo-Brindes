export type PersonalizationTechnique = 
  | "laser" 
  | "uv" 
  | "silk" 
  | "debossing" 
  | "hot_stamping" 
  | "bordado" 
  | "tampografia" 
  | "dtg" 
  | "resinada" 
  | "sublimacao";

export interface PersonalizationOption {
  id: PersonalizationTechnique;
  name: string;
  description: string;
  materialApplied: string;
  visualEffect: string;
}

export interface Product {
  id: string;
  name: string;
  category: "onboarding" | "executivo" | "eventos" | "tech" | "lifestyle";
  description: string;
  longDescription: string;
  material: string;
  dimensions: string;
  minimumQuantity: number;
  techniques: PersonalizationTechnique[];
  colors: string[]; // HEX color suggestions
  isKit?: boolean;
  kitItems?: { name: string; icon: string; description: string; offset: { x: number; y: number } }[];
  perspectives: {
    id: string;
    name: string;
    technique: PersonalizationTechnique;
    description: string;
  }[];
}

export interface CuratedBrief {
  companyName: string;
  brandColor: string;
  logoType: "text" | "upload";
  logoText: string;
  logoUrl?: string;
  selectedProducts: string[];
  eventObjective: string;
  targetAudience: string;
  estimatedQuantity: string;
  submissionDate?: string;
}
