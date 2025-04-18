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

export type ProductBrand = "Balaji" | "Lay's" | "Parle" | "Britannia";

export type ProductCategory = "Chips" | "Namkeen" | "Snacks" | "Biscuits" | "Breads" | "Ready to Cook/Eat" | "Beverages" | "Dairy" | "Confectionery";

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
  },
  {
    name: "Modified Starch",
    category: "Thickeners",
    description: "A chemically altered form of starch used to improve texture and stability",
    healthImpacts: [
      {
        description: "Digestive issues",
        severity: "low",
        timeframe: "immediate",
        symptoms: ["Bloating", "Gas", "Mild stomach discomfort"]
      }
    ],
    safetyGuidelines: [
      "Generally recognized as safe (GRAS)",
      "Consume in moderation",
      "Check product labels for specific types"
    ],
    alternatives: ["Natural starches", "Guar gum", "Pectin"]
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
