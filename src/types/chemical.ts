
export type ChemicalSeverity = "low" | "medium" | "high";

export type HealthImpact = {
  description: string;
  severity: ChemicalSeverity;
  timeframe: "immediate" | "short-term" | "long-term";
  symptoms: string[];
};

export type ChemicalData = {
  name: string;
  category: string;
  description: string;
  healthImpacts: HealthImpact[];
  safetyGuidelines: string[];
  alternatives: string[];
};

export const chemicalData: ChemicalData[] = [
  {
    name: "MSG (Monosodium Glutamate)",
    category: "Flavor Enhancers",
    description: "A common flavor enhancer that can trigger adverse reactions in sensitive individuals",
    healthImpacts: [
      {
        description: "MSG Complex symptoms",
        severity: "medium",
        timeframe: "immediate",
        symptoms: ["Headaches", "Nausea", "Chest pain", "Weakness", "Sweating"]
      },
      {
        description: "Neurological effects",
        severity: "medium",
        timeframe: "short-term",
        symptoms: ["Numbness", "Tingling sensations", "Drowsiness"]
      }
    ],
    safetyGuidelines: [
      "Check product labels for MSG or other glutamate compounds",
      "Start with small portions to test sensitivity",
      "Choose MSG-free alternatives when available"
    ],
    alternatives: ["Natural spices", "Herbs", "Seaweed-based seasonings"]
  },
  {
    name: "TBHQ (Tertiary Butylhydroquinone)",
    category: "Preservatives",
    description: "A synthetic preservative used to extend shelf life of processed foods",
    healthImpacts: [
      {
        description: "Immediate reactions",
        severity: "medium",
        timeframe: "immediate",
        symptoms: ["Nausea", "Vomiting", "Ringing in the ears"]
      },
      {
        description: "Long-term exposure risks",
        severity: "high",
        timeframe: "long-term",
        symptoms: ["Liver enlargement", "Neurotoxic effects", "Vision disturbances"]
      }
    ],
    safetyGuidelines: [
      "Avoid products with TBHQ listed in ingredients",
      "Limit consumption of processed foods",
      "Choose fresh or naturally preserved alternatives"
    ],
    alternatives: ["Natural antioxidants", "Vitamin E", "Rosemary extract"]
  },
  {
    name: "Sodium Nitrite",
    category: "Preservatives",
    description: "Used in processed meats for preservation and color enhancement",
    healthImpacts: [
      {
        description: "Methemoglobinemia risk",
        severity: "high",
        timeframe: "immediate",
        symptoms: ["Bluish skin color", "Shortness of breath", "Fatigue"]
      },
      {
        description: "Long-term health risks",
        severity: "high",
        timeframe: "long-term",
        symptoms: ["Increased cancer risk", "Cardiovascular issues"]
      }
    ],
    safetyGuidelines: [
      "Limit processed meat consumption",
      "Choose nitrite-free products",
      "Store foods properly to prevent bacterial growth"
    ],
    alternatives: ["Celery powder", "Beet juice powder", "Sea salt"]
  }
];
