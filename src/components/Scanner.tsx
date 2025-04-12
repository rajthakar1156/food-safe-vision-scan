
import { useState } from "react";
import { Camera, Upload, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { safe: boolean }>(null);
  const { toast } = useToast();

  const handleScan = () => {
    setScanning(true);
    
    // Simulate a scan
    setTimeout(() => {
      setScanning(false);
      
      // Randomly determine if the product is safe or not for demo purposes
      const isSafe = Math.random() > 0.5;
      setResult({ safe: isSafe });
      
      toast({
        title: isSafe ? "Product Analyzed" : "Warning!",
        description: isSafe 
          ? "This product contains no harmful chemicals." 
          : "This product contains potentially harmful additives.",
        variant: isSafe ? "default" : "destructive",
      });
    }, 3000);
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
            Point your camera at a product barcode to instantly analyze its ingredients for harmful chemicals.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4 relative">
                {!result ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                      {scanning ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="w-full h-24 relative overflow-hidden">
                            <div className="h-1 w-full bg-primary absolute animate-scan"></div>
                          </div>
                          <div className="text-primary font-medium mt-4">Scanning...</div>
                        </div>
                      ) : (
                        <Camera size={48} className="text-muted-foreground" />
                      )}
                    </div>
                  </>
                ) : (
                  <div 
                    className={`absolute inset-0 flex items-center justify-center ${
                      result.safe ? "bg-safe/10" : "bg-danger/10"
                    }`}
                  >
                    <div className="text-center p-6">
                      <div 
                        className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
                          result.safe ? "bg-safe/20" : "bg-danger/20"
                        }`}
                      >
                        <div 
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            result.safe ? "bg-safe" : "bg-danger"
                          }`}
                        >
                          {result.safe ? (
                            <ShieldCheck className="h-8 w-8 text-white" />
                          ) : (
                            <AlertTriangle className="h-8 w-8 text-white" />
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mt-4">
                        {result.safe ? "Product is Safe" : "Caution Advised"}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {result.safe 
                          ? "No harmful chemicals detected." 
                          : "Potentially harmful additives found."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {!result ? (
                  <>
                    <Button 
                      className={`w-full ${scanning ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}`}
                      onClick={handleScan}
                      disabled={scanning}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {scanning ? "Scanning..." : "Scan Now"}
                    </Button>
                    <Button variant="outline" className="w-full" disabled={scanning}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </>
                ) : (
                  <Button className="w-full col-span-2" onClick={resetScan}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Scan Another
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

// Icons for the result state
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

const AlertTriangle = ({ className }: { className?: string }) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

export default Scanner;
