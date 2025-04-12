
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManualCheck = () => {
  const [ingredients, setIngredients] = useState("");
  const [productType, setProductType] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ingredients) return;
    
    setIsChecking(true);
    
    // Simulate processing
    setTimeout(() => {
      // This is for demo purposes - would be replaced with actual analysis
      const sampleResults = {
        safeIngredients: ["Salt", "Sugar", "Potatoes", "Vegetable Oil"],
        cautionIngredients: ["Natural Flavors", "Citric Acid"],
        harmfulIngredients: ["Red 40", "Yellow 5", "TBHQ"],
        overallRisk: "medium",
      };
      
      setResult(sampleResults);
      setIsChecking(false);
    }, 2000);
  };

  return (
    <section id="manual-check" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Manual Ingredient Check</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Enter product ingredients to check for potential harmful chemicals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div>
            <form onSubmit={handleCheck}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select 
                    value={productType} 
                    onValueChange={setProductType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chips">Potato Chips</SelectItem>
                      <SelectItem value="candy">Candy</SelectItem>
                      <SelectItem value="soda">Soda</SelectItem>
                      <SelectItem value="snacks">Snack Foods</SelectItem>
                      <SelectItem value="frozen">Frozen Foods</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="ingredients">Ingredients List</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Paste the ingredients list here..."
                    className="h-40"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Copy the ingredients list exactly as shown on the packaging.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!ingredients || isChecking}
                >
                  {isChecking ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Ingredients
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            {result ? (
              <Card>
                <CardHeader>
                  <CardTitle>Ingredient Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Overall Risk:
                      </h4>
                      <div className="flex items-center">
                        <div 
                          className={`h-3 w-full rounded-full overflow-hidden bg-gray-200 ${
                            result.overallRisk === "high" 
                              ? "bg-gray-200" 
                              : result.overallRisk === "medium" 
                                ? "bg-gray-200" 
                                : "bg-gray-200"
                          }`}
                        >
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
                        <span className="ml-3 font-medium capitalize">{result.overallRisk}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">Safe Ingredients:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.safeIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-safe/10 text-safe rounded-full text-sm"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Use with Caution:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.cautionIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-caution/10 text-caution rounded-full text-sm"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Potentially Harmful:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.harmfulIngredients.map((ingredient: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-danger/10 text-danger rounded-full text-sm"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
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
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="bg-muted inline-flex p-6 rounded-full mb-4">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground">
                    Enter product ingredients and click "Check Ingredients" to analyze.
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
