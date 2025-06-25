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

export type ProductBrand = "Balaji" | "Lay's" | "Parle" | "Britannia" | "Nestle" | "Haldiram" | "PepsiCo India" | "Coca-Cola India" | "Parle Agro" | "Capital Foods" | "Amul" | "Mondelēz International";

export type ProductCategory = "Chips" | "Namkeen" | "Snacks" | "Biscuits" | "Breads" | "Ready to Cook/Eat" | "Beverages" | "Dairy" | "Confectionery" | "Noodles" | "Chocolate";

export const chemicalData: ChemicalData[] = [
  {
    name: "MSG (Monosodium Glutamate)",
    category: "Flavor Enhancers",
    description: "A common flavor enhancer found in many processed foods, particularly in Indian snacks and ready-to-eat meals",
    riskLevel: 5,
    healthImpacts: [
      {
        description: "MSG Symptom Complex (Chinese Restaurant Syndrome)",
        severity: "medium",
        timeframe: "immediate",
        symptoms: [
          "Severe headaches",
          "Heart palpitations",
          "Chest pain",
          "Nausea",
          "Excessive sweating",
          "Facial pressure",
          "Numbness/tingling"
        ]
      },
      {
        description: "Long-term Health Concerns",
        severity: "medium",
        timeframe: "long-term",
        symptoms: [
          "Increased risk of obesity",
          "Metabolic disorders",
          "Nervous system effects",
          "Potential reproductive issues",
          "Endocrine system disruption"
        ]
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
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
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
  },
  "parle monaco": {
    name: "Parle Monaco Salted Crackers",
    brand: "Parle" as ProductBrand,
    category: "Biscuits" as ProductCategory,
    image: "https://images.unsplash.com/photo-1571167963794-825c5d8eef0a?w=400&q=80",
    riskLevel: "low" as const,
    chemicals: ["Raising Agents", "Emulsifiers"],
    healthInfo: {
      nutritionalValue: {
        calories: 130,
        protein: 2,
        carbs: 20,
        fat: 5,
        fiber: 0
      },
      allergens: ["Wheat"],
      shelfLife: "6 months",
      storageInstructions: "Store in an airtight container"
    }
  },
  "maggi masala": {
    name: "Maggi Masala Instant Noodles",
    brand: "Nestle" as ProductBrand,
    category: "Ready to Cook/Eat" as ProductCategory,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80",
    riskLevel: "medium" as const,
    chemicals: ["MSG", "TBHQ", "Artificial Flavors"],
    healthInfo: {
      nutritionalValue: {
        calories: 350,
        protein: 8,
        carbs: 62,
        fat: 12,
        fiber: 2
      },
      allergens: ["Wheat"],
      shelfLife: "8 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "haldiram aloo bhujia": {
    name: "Haldiram's Aloo Bhujia",
    brand: "Haldiram" as ProductBrand,
    category: "Namkeen" as ProductCategory,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
    riskLevel: "medium" as const,
    chemicals: ["Artificial Colors", "Preservatives"],
    healthInfo: {
      nutritionalValue: {
        calories: 130,
        protein: 3,
        carbs: 15,
        fat: 8,
        fiber: 1
      },
      allergens: ["May contain traces of nuts"],
      shelfLife: "4 months",
      storageInstructions: "Store in an airtight container"
    }
  },
  // Adding all products from ProductGrid to ensure comprehensive coverage
  "balaji cream onion wafers": {
    name: "Balaji Cream & Onion Wafers",
    brand: "Balaji" as ProductBrand,
    category: "Chips" as ProductCategory,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1064&auto=format&fit=crop",
    riskLevel: "high" as const,
    chemicals: ["MSG", "TBHQ", "Red 40", "BHA"],
    healthInfo: {
      nutritionalValue: {
        calories: 150,
        protein: 2,
        carbs: 16,
        fat: 9,
        fiber: 1
      },
      allergens: ["May contain milk"],
      shelfLife: "4 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "thums up": {
    name: "Thums Up Cola",
    brand: "Coca-Cola India" as ProductBrand,
    category: "Beverages" as ProductCategory,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "high" as const,
    chemicals: ["Phosphoric Acid", "Caramel Color", "High Fructose Corn Syrup"],
    healthInfo: {
      nutritionalValue: {
        calories: 150,
        protein: 0,
        carbs: 39,
        fat: 0,
        fiber: 0
      },
      allergens: ["None"],
      shelfLife: "9 months",
      storageInstructions: "Store in a cool place"
    }
  },
  "mango frooti": {
    name: "Mango Frooti",
    brand: "Parle Agro" as ProductBrand,
    category: "Beverages" as ProductCategory,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "medium" as const,
    chemicals: ["Yellow 6", "Sodium Benzoate"],
    healthInfo: {
      nutritionalValue: {
        calories: 110,
        protein: 0,
        carbs: 28,
        fat: 0,
        fiber: 0
      },
      allergens: ["None"],
      shelfLife: "12 months",
      storageInstructions: "Store in a cool place"
    }
  },
  "britannia bourbon": {
    name: "Britannia Bourbon Biscuits",
    brand: "Britannia" as ProductBrand,
    category: "Biscuits" as ProductCategory,
    image: "https://images.unsplash.com/photo-1587940796248-6bf7c56a5e04?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "medium" as const,
    chemicals: ["TBHQ", "Artificial Flavors"],
    healthInfo: {
      nutritionalValue: {
        calories: 140,
        protein: 2,
        carbs: 22,
        fat: 5,
        fiber: 1
      },
      allergens: ["Wheat", "May contain milk"],
      shelfLife: "6 months",
      storageInstructions: "Store in an airtight container"
    }
  },
  "kurkure masala munch": {
    name: "Kurkure Masala Munch",
    brand: "PepsiCo India" as ProductBrand,
    category: "Snacks" as ProductCategory,
    image: "https://images.unsplash.com/photo-1599490659127-9ddf9882f935?q=80&w=1064&auto=format&fit=crop",
    riskLevel: "high" as const,
    chemicals: ["MSG", "Acidity Regulators", "Artificial Colors"],
    healthInfo: {
      nutritionalValue: {
        calories: 160,
        protein: 2,
        carbs: 18,
        fat: 9,
        fiber: 1
      },
      allergens: ["May contain milk"],
      shelfLife: "4 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "britannia marie gold": {
    name: "Britannia Marie Gold Biscuits",
    brand: "Britannia" as ProductBrand,
    category: "Biscuits" as ProductCategory,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "low" as const,
    chemicals: ["Emulsifiers"],
    healthInfo: {
      nutritionalValue: {
        calories: 120,
        protein: 2,
        carbs: 22,
        fat: 3,
        fiber: 1
      },
      allergens: ["Wheat"],
      shelfLife: "8 months",
      storageInstructions: "Store in an airtight container"
    }
  },
  "cadbury dairy milk": {
    name: "Cadbury Dairy Milk Chocolate",
    brand: "Mondelēz International" as ProductBrand,
    category: "Chocolate" as ProductCategory,
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1470&auto=format&fit=crop",
    riskLevel: "medium" as const,
    chemicals: ["Emulsifiers", "Artificial Flavors"],
    healthInfo: {
      nutritionalValue: {
        calories: 240,
        protein: 4,
        carbs: 28,
        fat: 13,
        fiber: 2
      },
      allergens: ["Milk", "May contain nuts"],
      shelfLife: "12 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "chings hakka noodles": {
    name: "Ching's Hakka Noodles",
    brand: "Capital Foods" as ProductBrand,
    category: "Noodles" as ProductCategory,
    image: "https://images.unsplash.com/photo-1634864572872-ace433219053?q=80&w=1334&auto=format&fit=crop",
    riskLevel: "medium" as const,
    chemicals: ["TBHQ", "Sodium Metabisulphite"],
    healthInfo: {
      nutritionalValue: {
        calories: 320,
        protein: 8,
        carbs: 58,
        fat: 8,
        fiber: 2
      },
      allergens: ["Wheat"],
      shelfLife: "8 months",
      storageInstructions: "Store in a cool, dry place"
    }
  },
  "amul kool milk": {
    name: "Amul Kool Flavored Milk",
    brand: "Amul" as ProductBrand,
    category: "Beverages" as ProductCategory,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "low" as const,
    chemicals: ["Stabilizers"],
    healthInfo: {
      nutritionalValue: {
        calories: 120,
        protein: 6,
        carbs: 18,
        fat: 3,
        fiber: 0
      },
      allergens: ["Milk"],
      shelfLife: "5 days refrigerated",
      storageInstructions: "Keep refrigerated"
    }
  }
};
