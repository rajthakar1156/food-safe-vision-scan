
import { useState } from "react";
import { Search, Image, Check, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  },
  "britannia": {
    name: "Britannia Good Day",
    brand: "Britannia Industries",
    safeIngredients: ["Wheat Flour", "Sugar", "Vegetable Oil"],
    cautionIngredients: ["Raising Agents", "Milk Solids"],
    harmfulIngredients: ["Artificial Flavors", "Emulsifiers"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 140,
      fat: 7,
      sodium: 65,
      carbs: 19,
    }
  },
  "mtc": {
    name: "MTR Sambar Powder",
    brand: "MTR Foods",
    safeIngredients: ["Coriander", "Turmeric", "Cumin", "Fenugreek"],
    cautionIngredients: ["Salt"],
    harmfulIngredients: [],
    overallRisk: "low",
    nutritionalInfo: {
      calories: 30,
      fat: 1,
      sodium: 150,
      carbs: 5,
    }
  },
  "dabur": {
    name: "Dabur Honey",
    brand: "Dabur India",
    safeIngredients: ["Honey"],
    cautionIngredients: [],
    harmfulIngredients: [],
    overallRisk: "low",
    nutritionalInfo: {
      calories: 60,
      fat: 0,
      sodium: 5,
      carbs: 17,
    }
  },
  "cadbury": {
    name: "Cadbury Dairy Milk",
    brand: "Mondelēz International",
    safeIngredients: ["Milk Solids", "Cocoa Butter", "Cocoa Mass"],
    cautionIngredients: ["Sugar", "Vegetable Fats"],
    harmfulIngredients: ["Emulsifiers", "Artificial Flavors"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 230,
      fat: 13,
      sodium: 50,
      carbs: 25,
    }
  },
  "ching's": {
    name: "Ching's Secret Hakka Noodles",
    brand: "Capital Foods",
    safeIngredients: ["Wheat Flour", "Salt"],
    cautionIngredients: ["Palm Oil", "Wheat Gluten"],
    harmfulIngredients: ["TBHQ", "Sodium Metabisulphite"],
    overallRisk: "medium",
    nutritionalInfo: {
      calories: 160,
      fat: 7,
      sodium: 290,
      carbs: 22,
    }
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 text-xs">
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
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

  const getNutritionalData = (info: any) => {
    if (!info) return [];
    
    return [
      { name: 'Calories', value: info.calories },
      { name: 'Fat (g)', value: info.fat },
      { name: 'Sodium (mg)', value: info.sodium },
      { name: 'Carbs (g)', value: info.carbs }
    ];
  };

  const getIngredientChartData = (result: any) => {
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
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Check Product
                    </>
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
