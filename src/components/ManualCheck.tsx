import { useState } from "react";
import { Image, Check, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ProductSearchInput from "./ProductSearchInput";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { productDatabase } from "@/types/chemical";

// Define CustomTooltip component for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const normalizeProductName = (name: string): string => {
  return name.toLowerCase().trim();
};

const findProductMatch = (input: string): string | null => {
  const normalized = normalizeProductName(input);
  
  // Direct match
  if (normalized in productDatabase) {
    return normalized;
  }
  
  // Partial match
  for (const key of Object.keys(productDatabase)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return key;
    }
  }
  
  return null;
};

interface ProductResult {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  riskLevel: "low" | "medium" | "high";
  chemicals: string[];
  healthInfo: any;
  overallRisk?: "low" | "medium" | "high";
  safeIngredients: string[];
  cautionIngredients: string[];
  harmfulIngredients: string[];
  nutritionalInfo?: any;
  alternatives?: {
    name: string;
    brand: string;
    image: string;
    whyBetter: string;
    riskLevel: "low" | "medium" | "high";
    price?: string;
  }[];
}

const ManualCheck = () => {
  const [productName, setProductName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ProductResult | null>(null);
  const { toast } = useToast();

  const getHealthyAlternatives = (category: string, riskLevel: string) => {
    const alternatives = {
      "Chips": [
        {
          name: "Baked Sweet Potato Chips",
          brand: "24 Mantra Organic",
          image: "https://images.unsplash.com/photo-1618020185161-bb76e97ad9b8?w=400&q=80",
          whyBetter: "No artificial colors, baked not fried, natural sweet potato, high in fiber",
          riskLevel: "low" as const,
          price: "₹150/100g"
        },
        {
          name: "Roasted Chickpea Snacks",
          brand: "Soulfull",
          image: "https://images.unsplash.com/photo-1599909533730-9d3e58b98a88?w=400&q=80",
          whyBetter: "High protein, no MSG, gluten-free, roasted not fried",
          riskLevel: "low" as const,
          price: "₹120/100g"
        },
        {
          name: "Quinoa Puffs",
          brand: "True Elements",
          image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&q=80",
          whyBetter: "Superfood quinoa, no preservatives, high protein and fiber",
          riskLevel: "low" as const,
          price: "₹180/100g"
        }
      ],
      "Ready to Cook/Eat": [
        {
          name: "Organic Whole Wheat Pasta",
          brand: "Organic India",
          image: "https://images.unsplash.com/photo-1551462147-37abc8c5d95a?w=400&q=80",
          whyBetter: "No preservatives, organic whole wheat, lower sodium",
          riskLevel: "low" as const,
          price: "₹200/500g"
        },
        {
          name: "Millet Noodles",
          brand: "Slurrp Farm",
          image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80",
          whyBetter: "Ancient grains, no artificial flavors, high fiber, gluten-free",
          riskLevel: "low" as const,
          price: "₹160/200g"
        }
      ],
      "Biscuits": [
        {
          name: "Oats Digestive Biscuits",
          brand: "Britannia Nutrichoice",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
          whyBetter: "High fiber, no trans fat, added vitamins and minerals",
          riskLevel: "low" as const,
          price: "₹80/150g"
        },
        {
          name: "Multigrain Cookies",
          brand: "Unibic",
          image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80",
          whyBetter: "Multiple grains, no artificial colors, lower sugar content",
          riskLevel: "low" as const,
          price: "₹100/150g"
        }
      ],
      "Namkeen": [
        {
          name: "Roasted Makhana",
          brand: "Farmley",
          image: "https://images.unsplash.com/photo-1569197388831-15c4ea27b7a9?w=400&q=80",
          whyBetter: "Natural fox nuts, low calorie, high protein, no artificial additives",
          riskLevel: "low" as const,
          price: "₹200/100g"
        },
        {
          name: "Baked Moong Dal",
          brand: "Haldiram's Lite",
          image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
          whyBetter: "Baked not fried, high protein, natural spices",
          riskLevel: "low" as const,
          price: "₹90/150g"
        }
      ]
    };
    
    return alternatives[category as keyof typeof alternatives] || alternatives["Chips"];
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName) return;
    
    setIsChecking(true);
    
    // Simulate processing
    setTimeout(() => {
      const productKey = findProductMatch(productName);
      
      if (productKey) {
        const matchedProduct = productDatabase[productKey];
        
        setResult({
          id: Math.random(),
          name: matchedProduct.name,
          brand: matchedProduct.brand,
          category: matchedProduct.category,
          image: matchedProduct.image,
          riskLevel: matchedProduct.riskLevel,
          chemicals: matchedProduct.chemicals,
          healthInfo: matchedProduct.healthInfo,
          overallRisk: matchedProduct.riskLevel,
          safeIngredients: ["Natural flavors", "Salt", "Potato starch", "Vegetable oil"],
          cautionIngredients: ["Edible oil", "Modified starch", "Spices"],
          harmfulIngredients: matchedProduct.chemicals || [],
          nutritionalInfo: matchedProduct.healthInfo?.nutritionalValue,
          alternatives: getHealthyAlternatives(matchedProduct.category, matchedProduct.riskLevel)
        });
        
        toast({
          title: "Product found!",
          description: `We've analyzed ${matchedProduct.name}.`,
        });
      } else {
        toast({
          title: "Product not found",
          description: "Try entering a popular Indian brand like Lays, Parle-G, or Maggi",
          variant: "destructive",
        });
        setResult(null);
      }
      
      setIsChecking(false);
    }, 1500);
  };

  const getNutritionalData = (info: any) => {
    if (!info) return [];
    
    return [
      { name: 'Calories', value: info.calories || 0 },
      { name: 'Fat (g)', value: info.fat || 0 },
      { name: 'Carbs (g)', value: info.carbs || 0 },
      { name: 'Protein (g)', value: info.protein || 0 }
    ];
  };

  const getIngredientChartData = (result: ProductResult) => {
    if (!result) return [];
    
    return [
      { 
        name: 'Safe', 
        count: result.safeIngredients.length,
        color: '#4ade80'  // Green
      },
      { 
        name: 'Caution', 
        count: result.cautionIngredients.length,
        color: '#facc15'  // Yellow
      },
      { 
        name: 'Harmful', 
        count: result.harmfulIngredients.length,
        color: '#f87171'  // Red
      }
    ];
  };

  return (
    <section id="manual-check" className="py-20 px-4 gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Indian Product Checker</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Enter an Indian product name to check for potential harmful chemicals and get healthy alternatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Search Form */}
            <form onSubmit={handleCheck} className="glass-card p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-name" className="text-lg">Product Name</Label>
                  <div className="mt-2">
                    <ProductSearchInput
                      value={productName}
                      onChange={setProductName}
                      onSelect={(value) => {
                        setProductName(value);
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.requestSubmit();
                        }, 100);
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try: Lays, Parle-G, Maggi, Haldiram, Britannia
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
                    <>Check Product</>
                  )}
                </Button>
              </div>
            </form>

            {/* Charts Section */}
            {result && (
              <div className="space-y-6">
                {/* Nutritional Analysis */}
                <Card className="glass-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nutritional Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getNutritionalData(result.nutritionalInfo)} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={80} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar 
                            dataKey="value" 
                            fill="#8884d8" 
                            background={{ fill: '#3333' }}
                            animationDuration={1000}
                            barSize={20}
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Ingredient Analysis */}
                <Card className="glass-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ingredient Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[160px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getIngredientChartData(result)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Area 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#8884d8" 
                            fill="#8884d8" 
                            fillOpacity={0.3}
                            activeDot={{ r: 8 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Product Analysis Card */}
                <Card className="glass-card overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={result.image} 
                      alt={result.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.error('Product image failed to load');
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573740144720-dd5c9c53c3e3?w=400&q=80";
                      }}
                    />
                    <div 
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                        result.riskLevel === "high" 
                          ? "bg-red-500/80 text-white" 
                          : result.riskLevel === "medium" 
                            ? "bg-yellow-500/80 text-black" 
                            : "bg-green-500/80 text-black"
                      }`}
                    >
                      {result.riskLevel === "high" 
                        ? "High Risk" 
                        : result.riskLevel === "medium" 
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
                      {/* Chemical Analysis */}
                      <div>
                        <h4 className="font-medium mb-2">Chemical Analysis:</h4>
                        <div className="h-3 w-full rounded-full overflow-hidden bg-white/10 mb-4">
                          <div 
                            className={`h-full ${
                              result.overallRisk === "high" 
                                ? "bg-red-500 w-4/5" 
                                : result.overallRisk === "medium" 
                                  ? "bg-yellow-500 w-1/2" 
                                  : "bg-green-500 w-1/5"
                            }`}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            Safe Ingredients:
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {result.safeIngredients.map((ingredient: string, i: number) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm flex items-center">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                            Use with Caution:
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {result.cautionIngredients.map((ingredient: string, i: number) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                            Potentially Harmful:
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {result.harmfulIngredients.map((ingredient: string, i: number) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs"
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

                {/* Healthy Alternatives Card */}
                {result.alternatives && result.alternatives.length > 0 && (
                  <Card className="glass-card overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                        Healthier Alternatives
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Better options with lower health risks
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.alternatives.map((alt, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
                            <img 
                              src={alt.image} 
                              alt={alt.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              onError={(e) => {
                                console.error('Alternative image failed to load');
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&q=80";
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-green-800 dark:text-green-200 truncate">{alt.name}</h4>
                                  <p className="text-sm text-green-600 dark:text-green-300">{alt.brand}</p>
                                  {alt.price && (
                                    <p className="text-sm font-medium text-green-700 dark:text-green-400">{alt.price}</p>
                                  )}
                                </div>
                                <div className="px-2 py-1 bg-green-500 text-white text-xs rounded-full whitespace-nowrap">
                                  {alt.riskLevel} risk
                                </div>
                              </div>
                              <p className="text-xs text-green-700 dark:text-green-400 mt-2 leading-relaxed">{alt.whyBetter}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          💡 <strong>Tip:</strong> These alternatives contain fewer artificial additives and offer better nutritional value.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center glass-card rounded-lg p-6">
                <div className="text-center">
                  <div className="bg-white/5 inline-flex p-6 rounded-full mb-4">
                    <Image className="h-12 w-12 text-muted-foreground opacity-70" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Product Selected</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Enter a popular Indian snack or beverage name and click "Check Product" to see a detailed analysis and healthy alternatives.
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
