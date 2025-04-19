export type ChemicalSeverity = "low" | "medium" | "high";

export type RiskEffect = {
  description: string;
  level: number; // 1-10 scale
  longTerm?: boolean;
};

export type ChemicalRisk = {
  name: string;
  level: number; // 1-10 scale
  effects: RiskEffect[];
};

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
  riskLevel: number; // 1-10 scale
  healthImpacts: HealthImpact[];
  safetyGuidelines: string[];
  alternatives: string[];
  risks: ChemicalRisk[];
};

export type ProductBrand = "Balaji" | "Lay's" | "Parle" | "Britannia";

export type ProductCategory = "Chips" | "Namkeen" | "Snacks" | "Biscuits" | "Breads" | "Ready to Cook/Eat" | "Beverages" | "Dairy" | "Confectionery";

export const chemicalData: ChemicalData[] = [
  {
    name: "MSG (Monosodium Glutamate)",
    category: "Flavor Enhancers",
    description: "A common flavor enhancer found in many processed foods",
    riskLevel: 5,
    healthImpacts: [
      {
        description: "MSG Symptom Complex",
        severity: "medium",
        timeframe: "immediate",
        symptoms: ["Headaches", "Nausea", "Flushing", "Sweating", "Chest pain"]
      },
      {
        description: "Long-term Health Concerns",
        severity: "medium",
        timeframe: "long-term",
        symptoms: ["Obesity risk", "Metabolic disorders", "Nervous system effects"]
      }
    ],
    safetyGuidelines: [
      "Check product labels for MSG or other glutamate compounds",
      "Start with small portions to test sensitivity",
      "Choose MSG-free alternatives when available"
    ],
    alternatives: ["Natural spices", "Herbs", "Seaweed-based seasonings"],
    risks: [
      {
        name: "Neurological Effects",
        level: 5,
        effects: [
          {
            description: "Headaches and migraines",
            level: 6,
            longTerm: false
          },
          {
            description: "Nervous system sensitivity",
            level: 5,
            longTerm: true
          }
        ]
      }
    ]
  },
  {
    name: "Acrylamide",
    category: "Process Contaminants",
    description: "A chemical formed when starchy foods are cooked at high temperatures",
    riskLevel: 7,
    healthImpacts: [
      {
        description: "Nervous System Effects",
        severity: "high",
        timeframe: "long-term",
        symptoms: ["Numbness", "Tingling", "Muscle weakness"]
      },
      {
        description: "Cancer Risk",
        severity: "high",
        timeframe: "long-term",
        symptoms: ["Potential carcinogenic effects"]
      }
    ],
    safetyGuidelines: [
      "Avoid overcooking starchy foods",
      "Prefer lower temperature cooking methods",
      "Store potatoes in a dark, cool place"
    ],
    alternatives: ["Baked snacks", "Air-fried alternatives", "Raw vegetables"],
    risks: [
      {
        name: "Cancer Risk",
        level: 7,
        effects: [
          {
            description: "Potential carcinogenic effects",
            level: 7,
            longTerm: true
          }
        ]
      },
      {
        name: "Neurological Impact",
        level: 6,
        effects: [
          {
            description: "Long-term nervous system effects",
            level: 6,
            longTerm: true
          }
        ]
      }
    ]
  },
  {
    name: "TBHQ (Tertiary Butylhydroquinone)",
    category: "Preservatives",
    description: "A synthetic preservative used to extend shelf life",
    riskLevel: 6,
    healthImpacts: [
      {
        description: "Immediate Reactions",
        severity: "medium",
        timeframe: "immediate",
        symptoms: ["Nausea", "Vomiting", "Ringing in ears"]
      },
      {
        description: "Long-term Effects",
        severity: "high",
        timeframe: "long-term",
        symptoms: ["Liver effects", "Vision problems", "Biochemical changes"]
      }
    ],
    safetyGuidelines: [
      "Avoid products with TBHQ listed",
      "Choose fresh foods when possible",
      "Read ingredient labels carefully"
    ],
    alternatives: ["Natural preservatives", "Vitamin E", "Rosemary extract"],
    risks: [
      {
        name: "Digestive Issues",
        level: 6,
        effects: [
          {
            description: "Nausea and vomiting",
            level: 6,
            longTerm: false
          }
        ]
      },
      {
        name: "Organ Effects",
        level: 6,
        effects: [
          {
            description: "Potential liver impact",
            level: 6,
            longTerm: true
          }
        ]
      }
    ]
  }
];

export const productDatabase = {
  "britannia bread pizza base": {
    name: "Britannia Bread Pizza Base",
    brand: "Britannia" as ProductBrand,
    category: "Ready to Cook/Eat" as ProductCategory,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop",
    riskLevel: "low" as const,
    chemicals: ["Modified Starch", "Preservatives"],
    healthInfo: {
      nutritionalValue: {
        calories: 120,
        protein: 4,
        carbs: 23,
        fat: 2,
        fiber: 1
      },
      allergens: ["Wheat", "May contain traces of milk"],
      shelfLife: "3 days at room temperature",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "parle g": {
    name: "Parle-G Original Glucose Biscuits",
    brand: "Parle" as ProductBrand,
    category: "Biscuits" as ProductCategory,
    image: "https://images.unsplash.com/photo-1614114825794-35330d6e7c67?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "low" as const,
    chemicals: ["Artificial Flavors", "Emulsifiers"],
    healthInfo: {
      nutritionalValue: {
        calories: 138,
        protein: 2,
        carbs: 24,
        fat: 4,
        fiber: 0
      },
      allergens: ["Wheat"],
      shelfLife: "6 months",
      storageInstructions: "Store in an airtight container"
    }
  },
  "lays magic masala": {
    name: "Lay's India's Magic Masala",
    brand: "Lay's" as ProductBrand,
    category: "Chips" as ProductCategory,
    image: "https://images.unsplash.com/photo-1613919113640-25632e2d5bd0?q=80&w=1470&auto=format&fit=crop",
    riskLevel: "medium" as const,
    chemicals: ["MSG", "Artificial Flavors", "TBHQ"],
    healthInfo: {
      nutritionalValue: {
        calories: 140,
        protein: 2,
        carbs: 15,
        fat: 8,
        fiber: 1
      },
      allergens: ["May contain milk"],
      shelfLife: "4 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "balaji wafers": {
    name: "Balaji Simply Salted Wafers",
    brand: "Balaji" as ProductBrand,
    category: "Chips" as ProductCategory,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    riskLevel: "medium" as const,
    chemicals: ["TBHQ", "Artificial Flavors"],
    healthInfo: {
      nutritionalValue: {
        calories: 130,
        protein: 2,
        carbs: 14,
        fat: 7,
        fiber: 1
      },
      allergens: ["None"],
      shelfLife: "3 months",
      storageInstructions: "Store in an airtight container"
    }
  }
};
