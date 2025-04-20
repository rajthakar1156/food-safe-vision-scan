
import { useState } from "react";
import { Camera, Upload, RefreshCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | {
    safe: boolean;
    details: {
      preservatives: string[];
      additives: string[];
      nutritionalValue: string;
      safetyScore: number;
      recommendations: string[];
    };
  }>(null);
  const { toast } = useToast();
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate a scan
    setTimeout(() => {
      setScanning(false);
      
      // Simulated detailed analysis results
      const isSafe = Math.random() > 0.5;
      setResult({
        safe: isSafe,
        details: {
          preservatives: ["Sodium Benzoate", "Potassium Sorbate"],
          additives: ["Artificial Colors", "MSG"],
          nutritionalValue: "Moderate",
          safetyScore: isSafe ? 85 : 45,
          recommendations: [
            "Consider natural alternatives",
            "Check for allergen information",
            "Verify product certification"
          ]
        }
      });
      
      toast({
        title: isSafe ? "Product Analysis Complete" : "Warning: Concerns Found",
        description: isSafe 
          ? "This product meets safety standards. Check detailed analysis below." 
          : "Some concerning ingredients detected. Review full analysis for details.",
        variant: isSafe ? "default" : "destructive",
      });
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setScanning(true);
      // Simulate processing the uploaded image
      setTimeout(() => {
        handleScan();
      }, 2000);
    }
  };

  const resetScan = () => {
    setResult(null);
  };

  return (
    <section id="scan" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Scan Product Barcode</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Point your camera at a product barcode or upload a product image to instantly analyze its ingredients for harmful chemicals.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-background/50">
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6 relative">
                {!result ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                      {scanning ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="w-full h-24 relative overflow-hidden">
                            <div className="h-1 w-full bg-primary animate-scan"></div>
                          </div>
                          <div className="text-primary font-medium mt-4">Analyzing product...</div>
                        </div>
                      ) : (
                        <Camera size={48} className="text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      ref={(el) => fileInputRef[1](el)}
                    />
                  </>
                ) : (
                  <div className={`absolute inset-0 flex flex-col p-6 ${
                    result.safe ? "bg-safe/10" : "bg-danger/10"
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        result.safe ? "bg-safe" : "bg-danger"
                      }`}>
                        {result.safe ? (
                          <ShieldCheck className="h-8 w-8 text-white" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {result.safe ? "Product Meets Safety Standards" : "Safety Concerns Detected"}
                        </h3>
                        <p className="text-muted-foreground">
                          Safety Score: {result.details.safetyScore}/100
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Preservatives Found:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {result.details.preservatives.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Additives Detected:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {result.details.additives.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {result.details.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {!result ? (
                  <>
                    <Button 
                      className={`w-full ${scanning ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                      onClick={handleScan}
                      disabled={scanning}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {scanning ? "Analyzing..." : "Scan Now"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled={scanning}
                      onClick={() => fileInputRef[0]?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </>
                ) : (
                  <Button className="w-full col-span-2" onClick={resetScan}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Scan Another Product
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Helper component for the shield check icon
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

export default Scanner;
