import { useState } from "react";
import { Image, Check, AlertCircle } from "lucide-react";
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

// More accurate product images for Indian products
const PRODUCT_IMAGES = {
  "lays": "https://images.unsplash.com/photo-1613919113640-25632e2d5bd0?q=80&w=1470&auto=format&fit=crop",
  "kurkure": "https://images.unsplash.com/photo-1621447504864-d8686e12698c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "thums up": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "frooti": "https://images.unsplash.com/photo-1571913384368-69177288b9c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "haldiram": "https://images.unsplash.com/photo-1589731119540-8f93f4072723?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "parle": "https://images.unsplash.com/photo-1610354559669-d258b5faa76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "maggi": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1287&auto=format&fit=crop",
  "amul": "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
  "britannia": "https://images.unsplash.com/photo-1615588835104-ad9ea6c2e3f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "mtc": "https://images.unsplash.com/photo-1618507221667-8cacea1544c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "dabur": "https://images.unsplash.com/photo-1591168213836-77e9bd7fe377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "cadbury": "https://images.unsplash.com/photo-1626697556362-a440cf876b6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "ching's": "https://images.unsplash.com/photo-1617622141573-83519d598838?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "default": "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1305&auto=format&fit=crop"
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
}

const ManualCheck = () => {
  const [productName, setProductName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ProductResult | null>(null);
  const { toast } = useToast();

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
          // Simulate more data based on chemicals
          overallRisk: matchedProduct.riskLevel,
          safeIngredients: ["Natural flavors", "Salt", "Potato starch"],
          cautionIngredients: ["Edible oil", "Modified starch"],
          harmfulIngredients: matchedProduct.chemicals || [],
          nutritionalInfo: matchedProduct.healthInfo?.nutritionalValue
        });
        
        toast({
          title: "Product found!",
          description: `We've analyzed ${matchedProduct.name}.`,
        });
      } else {
        toast({
          title: "Product not found",
          description: "Try entering a popular Indian brand like Britannia, Parle-G, Lay's, or Balaji",
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
            Enter an Indian product name to check for potential harmful chemicals and nutritional information.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
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
                        const form = document.querySelector('form');
                        if (form) form.requestSubmit();
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try: Lays, Kurkure, Thums Up, Frooti, Haldiram, Parle, Maggi, Amul, Britannia, MTR, Dabur, Cadbury, Ching's
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

            {result && (
              <div className="space-y-6">
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
          
          <div>
            {result ? (
              <Card className="glass-card overflow-hidden h-full">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-64 object-cover"
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
            ) : (
              <div className="h-full flex items-center justify-center glass-card rounded-lg p-6">
                <div className="text-center">
                  <div className="bg-white/5 inline-flex p-6 rounded-full mb-4">
                    <Image className="h-12 w-12 text-muted-foreground opacity-70" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Product Selected</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Enter a popular Indian snack or beverage name and click "Check Product" to see a detailed analysis of ingredients and nutritional information.
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
