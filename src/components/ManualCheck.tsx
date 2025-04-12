
import { useState } from "react";
import { Search, Image, Check, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PRODUCT_IMAGES = {
  "lays": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1740&auto=format&fit=crop",
  "kurkure": "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?q=80&w=1287&auto=format&fit=crop",
  "thums up": "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1365&auto=format&fit=crop",
  "frooti": "https://images.unsplash.com/photo-1622766815178-641bef2b4630?q=80&w=1287&auto=format&fit=crop",
  "haldiram": "https://images.unsplash.com/photo-1612196808214-3d7f8d3f3e80?q=80&w=1287&auto=format&fit=crop",
  "parle": "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=1300&auto=format&fit=crop",
  "maggi": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1287&auto=format&fit=crop",
  "amul": "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
  "default": "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1305&auto=format&fit=crop"
};

const SAMPLE_PRODUCTS = {
  "lays": {
    name: "Lay's Magic Masala",
    brand: "Lay's India",
    safeIngredients: ["Potatoes", "Vegetable Oil", "Salt"],
    cautionIngredients: ["Natural Flavors", "Citric Acid"],
    harmfulIngredients: ["Yellow 5", "TBHQ", "Sodium Diacetate"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 160,
      fat: 10,
      sodium: 170,
      carbs: 15,
    }
  },
  "kurkure": {
    name: "Kurkure Masala Munch",
    brand: "PepsiCo India",
    safeIngredients: ["Rice Meal", "Edible Vegetable Oil", "Corn Meal"],
    cautionIngredients: ["Spice Mix", "Salt"],
    harmfulIngredients: ["MSG", "Acidity Regulators", "Artificial Colors"],
    overallRisk: "high",
    nutritionalInfo: {
      calories: 170,
      fat: 9,
      sodium: 190,
      carbs: 18,
    }
  },
  "thums up": {
    name: "Thums Up",
    brand: "Coca-Cola India",
    safeIngredients: ["Carbonated Water", "Caffeine"],
    cautionIngredients: ["Caramel Color", "Natural Flavors"],
    harmfulIngredients: ["High Fructose Corn Syrup", "Phosphoric Acid"],
    overallRisk: "high",
    nutritionalInfo: {
      calories: 140,
      fat: 0,
      sodium: 45,
      carbs: 39,
    }
  },
  "frooti": {
    name: "Mango Frooti",
    brand: "Parle Agro",
    safeIngredients: ["Water", "Mango Pulp", "Sugar"],
    cautionIngredients: ["Acidity Regulators", "Flavor"],
    harmfulIngredients: ["Artificial Colors", "Sodium Benzoate"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 130,
      fat: 0,
      sodium: 30,
      carbs: 32,
    }
  },
  "haldiram": {
    name: "Haldiram's Aloo Bhujia",
    brand: "Haldiram's",
    safeIngredients: ["Gram Flour", "Potato", "Vegetable Oil", "Salt"],
    cautionIngredients: ["Spices", "Mango Powder"],
    harmfulIngredients: ["Acidity Regulators", "Antioxidants"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 150,
      fat: 8,
      sodium: 180,
      carbs: 16,
    }
  },
  "parle": {
    name: "Parle-G Biscuits",
    brand: "Parle Products",
    safeIngredients: ["Wheat Flour", "Sugar", "Edible Vegetable Oil"],
    cautionIngredients: ["Invert Syrup", "Leavening Agents"],
    harmfulIngredients: ["Artificial Flavors", "Emulsifiers"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 120,
      fat: 5,
      sodium: 40,
      carbs: 20,
    }
  },
  "maggi": {
    name: "Maggi 2-Minute Noodles",
    brand: "Nestlé India",
    safeIngredients: ["Wheat Flour", "Palm Oil", "Salt"],
    cautionIngredients: ["Wheat Gluten", "Sugar"],
    harmfulIngredients: ["TBHQ", "Taste Enhancers", "Hydrolyzed Proteins"],
    overallRisk: "high",
    nutritionalInfo: {
      calories: 180,
      fat: 8,
      sodium: 340,
      carbs: 25,
    }
  },
  "amul": {
    name: "Amul Kool Milk",
    brand: "Gujarat Cooperative Milk Marketing Federation",
    safeIngredients: ["Milk Solids", "Sugar", "Cocoa Solids"],
    cautionIngredients: ["Stabilizers", "Emulsifiers"],
    harmfulIngredients: ["Artificial Flavors"],
    overallRisk: "low",
    nutritionalInfo: {
      calories: 140,
      fat: 3,
      sodium: 80,
      carbs: 22,
    }
  }
};

const ManualCheck = () => {
  const [productName, setProductName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName) return;
    
    setIsChecking(true);
    
    // Simulate processing
    setTimeout(() => {
      const normalizedInput = productName.toLowerCase();
      const productKey = Object.keys(SAMPLE_PRODUCTS).find(key => 
        normalizedInput.includes(key) || key.includes(normalizedInput)
      );
      
      if (productKey) {
        setResult({
          ...SAMPLE_PRODUCTS[productKey as keyof typeof SAMPLE_PRODUCTS],
          imageUrl: PRODUCT_IMAGES[productKey as keyof typeof PRODUCT_IMAGES] || PRODUCT_IMAGES.default
        });
        toast({
          title: "Product found!",
          description: `We've analyzed ${SAMPLE_PRODUCTS[productKey as keyof typeof SAMPLE_PRODUCTS].name}.`,
        });
      } else {
        toast({
          title: "Product not found",
          description: "Try entering a common Indian brand like Lays, Kurkure, Thums Up, Frooti, Haldiram, Parle, Maggi, or Amul",
          variant: "destructive",
        });
        setResult(null);
      }
      
      setIsChecking(false);
    }, 1500);
  };

  return (
    <section id="manual-check" className="py-20 px-4 gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Quick Product Check</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Enter an Indian product name to check for potential harmful chemicals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <form onSubmit={handleCheck} className="glass-card p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-name" className="text-lg">Product Name</Label>
                  <div className="relative mt-2">
                    <Input
                      id="product-name"
                      placeholder="e.g., Lay's Magic Masala, Kurkure, Maggi"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try: Lays, Kurkure, Thums Up, Frooti, Haldiram, Parle, Maggi, Amul
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  disabled={!productName || isChecking}
                >
                  {isChecking ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Check Product
                    </>
                  )}
                </Button>
              </div>
            </form>

            {result && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={`h-5 w-5 ${
                    result.overallRisk === "high" 
                      ? "text-danger" 
                      : result.overallRisk === "medium" 
                        ? "text-caution" 
                        : "text-safe"
                  }`} />
                  <h3 className="font-medium">Nutritional Information</h3>
                </div>
                <Card className="glass-card overflow-hidden">
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-xs text-muted-foreground">Calories</span>
                      <span className="text-xl font-bold">{result.nutritionalInfo.calories}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-xs text-muted-foreground">Fat (g)</span>
                      <span className="text-xl font-bold">{result.nutritionalInfo.fat}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-xs text-muted-foreground">Sodium (mg)</span>
                      <span className="text-xl font-bold">{result.nutritionalInfo.sodium}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <span className="text-xs text-muted-foreground">Carbs (g)</span>
                      <span className="text-xl font-bold">{result.nutritionalInfo.carbs}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          <div>
            {result ? (
              <Card className="glass-card overflow-hidden h-full">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={result.imageUrl} 
                    alt={result.name}
                    className="w-full h-64 object-cover"
                  />
                  <div 
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      result.overallRisk === "high" 
                        ? "bg-danger/80 text-white" 
                        : result.overallRisk === "medium" 
                          ? "bg-caution/80 text-black" 
                          : "bg-safe/80 text-black"
                    }`}
                  >
                    {result.overallRisk === "high" 
                      ? "High Risk" 
                      : result.overallRisk === "medium" 
                        ? "Medium Risk" 
                        : "Low Risk"
                    }
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{result.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">by {result.brand}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Chemical Analysis:</h4>
                      <div className="h-3 w-full rounded-full overflow-hidden bg-white/10 mb-4">
                        <div 
                          className={`h-full ${
                            result.overallRisk === "high" 
                              ? "bg-danger w-4/5" 
                              : result.overallRisk === "medium" 
                                ? "bg-caution w-1/2" 
                                : "bg-safe w-1/5"
                          }`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm flex items-center">
                          <Check className="h-4 w-4 text-safe mr-1" />
                          Safe Ingredients:
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.safeIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-safe/10 text-safe rounded-full text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 text-caution mr-1" />
                          Use with Caution:
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.cautionIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-caution/10 text-caution rounded-full text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 text-danger mr-1" />
                          Potentially Harmful:
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.harmfulIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-danger/10 text-danger rounded-full text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white/5 rounded-lg text-sm">
                      <p className="font-medium">Recommendation:</p>
                      <p className="mt-1">
                        {result.overallRisk === "high" 
                          ? "Consider alternatives with fewer artificial additives."
                          : result.overallRisk === "medium"
                            ? "Consume in moderation and be aware of artificial additives."
                            : "Generally safe for consumption based on ingredients analysis."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center glass-card rounded-lg p-6">
                <div className="text-center">
                  <div className="bg-white/5 inline-flex p-6 rounded-full mb-4">
                    <Image className="h-12 w-12 text-muted-foreground opacity-70" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Product Selected</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Enter a popular Indian snack or beverage name and click "Check Product" to see a detailed analysis of potentially harmful ingredients.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManualCheck;
