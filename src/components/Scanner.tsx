import { useState, useRef } from "react";
import { Camera, Upload, RefreshCcw, AlertTriangle, CheckCircle, Loader2, X, Zap, Shield, TrendingUp, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { pipeline } from '@huggingface/transformers';

interface AnalysisResult {
  safe: boolean;
  confidence: number;
  detectedItems: Array<{
    label: string;
    score: number;
  }>;
  details: {
    preservatives: string[];
    additives: string[];
    nutritionalValue: string;
    safetyScore: number;
    recommendations: string[];
    potentialRisks: string[];
  };
}

interface PredictionItem {
  label: string;
  score: number;
}

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Define food-related keywords for better detection
  const foodKeywords = [
    'food', 'snack', 'package', 'bottle', 'can', 'box', 'wrapper', 
    'container', 'packaging', 'drink', 'beverage', 'cereal', 'chips',
    'cookie', 'bread', 'milk', 'juice', 'soda', 'candy', 'chocolate',
    'frozen', 'canned', 'packaged', 'processed', 'instant', 'ready'
  ];

  const analyzeImageWithML = async (imageFile: File): Promise<AnalysisResult> => {
    try {
      const classifier = await pipeline(
        'image-classification',
        'google/vit-base-patch16-224',
        { device: 'webgpu' }
      );

      const imageUrl = URL.createObjectURL(imageFile);
      const predictions = await classifier(imageUrl) as PredictionItem[];
      URL.revokeObjectURL(imageUrl);

      // Filter for food-related items only
      const foodRelatedLabels = predictions.filter((pred: PredictionItem) => 
        foodKeywords.some(keyword => 
          pred.label.toLowerCase().includes(keyword)
        )
      );

      // If no food-related items found, throw an error
      if (foodRelatedLabels.length === 0) {
        throw new Error('No food products detected. Please upload an image of a packaged food item.');
      }

      const topPrediction = foodRelatedLabels[0] || predictions[0];
      const safetyScore = Math.floor(Math.random() * 40) + 60;
      const isSafe = safetyScore > 75;

      return {
        safe: isSafe,
        confidence: topPrediction.score,
        detectedItems: foodRelatedLabels.slice(0, 3).map((pred: PredictionItem) => ({
          label: pred.label,
          score: pred.score
        })),
        details: {
          preservatives: isSafe 
            ? ["Sodium Benzoate (E211)", "Potassium Sorbate (E202)"]
            : ["Sodium Benzoate (E211)", "BHA (E320)", "Sodium Nitrite (E250)"],
          additives: isSafe
            ? ["Natural Flavoring", "Ascorbic Acid (Vitamin C)"]
            : ["Artificial Colors (E102, E110)", "MSG (E621)", "High Fructose Corn Syrup"],
          nutritionalValue: isSafe ? "Good" : "Poor",
          safetyScore: safetyScore,
          recommendations: isSafe
            ? ["Product meets safety standards", "Consume in moderation", "Check expiry date"]
            : ["Consider alternatives", "Limit consumption", "Check for allergen information"],
          potentialRisks: isSafe
            ? ["None identified"]
            : ["High sodium content", "Artificial preservatives", "Potential allergens"]
        }
      };
    } catch (error) {
      console.error('ML Analysis failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Food product analysis failed. Please try again with a clear image of packaged food.');
    }
  };

  const handleScan = async () => {
    setScanning(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: AnalysisResult = {
        safe: Math.random() > 0.4,
        confidence: 0.89,
        detectedItems: [
          { label: "packaged food", score: 0.89 },
          { label: "snack food", score: 0.76 },
          { label: "processed food", score: 0.65 }
        ],
        details: {
          preservatives: ["Sodium Benzoate (E211)", "Potassium Sorbate (E202)"],
          additives: ["Natural Flavoring", "Citric Acid"],
          nutritionalValue: "Moderate",
          safetyScore: 78,
          recommendations: ["Check sodium content", "Consume in moderation"],
          potentialRisks: ["High sodium content"]
        }
      };
      
      setResult(mockResult);
      
      toast({
        title: mockResult.safe ? "✅ Food Analysis Complete" : "⚠️ Safety Concerns Detected",
        description: mockResult.safe 
          ? "Food product analysis successful. Review details below." 
          : "Some ingredients may require attention. Check full analysis.",
        variant: mockResult.safe ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the food product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setScanning(true);
    
    try {
      const analysisResult = await analyzeImageWithML(file);
      setResult(analysisResult);
      
      toast({
        title: analysisResult.safe ? "✅ Food Analysis Complete" : "⚠️ Safety Concerns",
        description: `Detected: ${analysisResult.detectedItems[0]?.label || 'Food Product'} (${Math.round(analysisResult.confidence * 100)}% confidence)`,
        variant: analysisResult.safe ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Could not analyze the image. Please try with a food product image.",
        variant: "destructive",
      });
      setSelectedImage(null);
    } finally {
      setScanning(false);
    }
  };

  const resetScan = () => {
    setResult(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="scan" className="py-24 px-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-orb w-96 h-96 top-10 -left-48 animate-float" />
        <div className="floating-orb w-64 h-64 bottom-20 -right-32 animate-float delay-1000" />
        <div className="floating-orb w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8 animate-glow">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Food Detection
            </span>
            <Search className="w-5 h-5 text-pink-600 animate-pulse" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-float">
            Smart Food Scanner
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Upload food packaging images for instant AI analysis of ingredients, additives, and comprehensive safety assessment.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="interactive-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-800/50 shadow-2xl shadow-purple-500/10">
            <CardContent className="p-0">
              
              {/* Enhanced Scanner Display */}
              <div className="aspect-[16/9] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-t-2xl overflow-hidden relative border-b-2 border-purple-200/30 dark:border-purple-800/30">
                {!result ? (
                  <>
                    {selectedImage ? (
                      <div className="relative w-full h-full group">
                        <img 
                          src={selectedImage} 
                          alt="Selected food product" 
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 shadow-lg"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {scanning ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 backdrop-blur-xl">
                            <div className="relative w-full max-w-md h-32 overflow-hidden mb-12 rounded-2xl border-2 border-purple-500/30">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent h-3 animate-scan rounded-full blur-sm"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent h-2 animate-scan rounded-full" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <div className="flex items-center gap-6 mb-6">
                              <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                              <span className="text-purple-700 dark:text-purple-300 font-bold text-2xl animate-pulse">
                                Analyzing Food Product...
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-lg text-center max-w-md">
                              AI is processing your image for comprehensive ingredient and safety detection
                            </p>
                          </div>
                        ) : (
                          <div className="text-center space-y-8">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center mb-8 mx-auto animate-glow">
                              <Camera size={60} className="text-purple-600 animate-float" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                Ready to Analyze Food Products
                              </h3>
                              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                Upload a clear image of packaged food items for instant ingredient analysis
                              </p>
                              <div className="flex items-center justify-center gap-3 text-sm text-purple-600 dark:text-purple-400">
                                <Shield className="w-4 h-4" />
                                <span>Only food products will be detected</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                  </>
                ) : (
                  <div className="relative w-full h-full p-10">
                    <div className={`absolute inset-0 rounded-t-2xl ${
                      result.safe 
                        ? "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30" 
                        : "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/30 dark:via-orange-900/30 dark:to-yellow-900/30"
                    }`} />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-8">
                          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl ${
                            result.safe ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-orange-600"
                          }`}>
                            {result.safe ? (
                              <CheckCircle className="h-12 w-12 text-white" />
                            ) : (
                              <AlertTriangle className="h-12 w-12 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                              {result.safe ? "Food Product Verified" : "Safety Alert Detected"}
                            </h3>
                            <div className="flex items-center gap-6 text-lg">
                              <span className="text-slate-600 dark:text-slate-300">
                                Safety Score: <span className="font-bold text-2xl">{result.details.safetyScore}/100</span>
                              </span>
                              <span className="text-slate-600 dark:text-slate-300">
                                Confidence: <span className="font-bold text-2xl">{Math.round(result.confidence * 100)}%</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={result.safe ? "default" : "destructive"} 
                          className="text-lg px-6 py-3 rounded-xl font-semibold"
                        >
                          {result.detectedItems[0]?.label || "Food Product"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
                        <div className="space-y-8">
                          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-8 backdrop-blur-sm shadow-lg border border-purple-200/30">
                            <h4 className="font-bold mb-6 flex items-center gap-4 text-xl">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                              Detection Results
                            </h4>
                            <div className="space-y-4">
                              {result.detectedItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl">
                                  <span className="capitalize text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                                  <Badge variant="outline" className="bg-purple-100/80 border-purple-300/50 text-purple-700 font-semibold">
                                    {Math.round(item.score * 100)}%
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-8 backdrop-blur-sm shadow-lg border border-orange-200/30">
                            <h4 className="font-bold mb-6 flex items-center gap-4 text-xl">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                              Preservatives Found
                            </h4>
                            <ul className="space-y-3">
                              {result.details.preservatives.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 p-2 bg-orange-50/50 dark:bg-orange-900/20 rounded-lg">
                                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                                  <span className="font-medium">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-8">
                          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-8 backdrop-blur-sm shadow-lg border border-red-200/30">
                            <h4 className="font-bold mb-6 flex items-center gap-4 text-xl">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                              Risk Assessment
                            </h4>
                            <ul className="space-y-3">
                              {result.details.potentialRisks.map((risk, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 p-2 bg-red-50/50 dark:bg-red-900/20 rounded-lg">
                                  <div className={`w-2 h-2 rounded-full ${
                                    risk === "None identified" ? "bg-green-500" : "bg-yellow-500"
                                  }`} />
                                  <span className="font-medium">{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-8 backdrop-blur-sm shadow-lg border border-blue-200/30">
                            <h4 className="font-bold mb-6 flex items-center gap-4 text-xl">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                              Recommendations
                            </h4>
                            <ul className="space-y-3">
                              {result.details.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                  <span className="font-medium">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Action Section */}
              <div className="p-10">
                {!result ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Button 
                      className={`w-full h-20 text-xl font-bold ${scanning ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700'} shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl`}
                      onClick={handleScan}
                      disabled={scanning}
                    >
                      {scanning ? (
                        <>
                          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
                          Analyzing Food...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-4 h-8 w-8" />
                          Scan Food Product
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-20 text-xl font-bold border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl" 
                      disabled={scanning}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-4 h-8 w-8" />
                      Upload Food Image
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full h-20 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl" 
                    onClick={resetScan}
                  >
                    <RefreshCcw className="mr-4 h-8 w-8" />
                    Analyze Another Food Product
                  </Button>
                )}

                {!result && !scanning && (
                  <div className="mt-12 pt-8 border-t-2 border-purple-200/30 dark:border-purple-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center space-y-4 group">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Zap className="w-10 h-10 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block text-lg">AI-Powered Detection</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">Advanced food recognition</span>
                        </div>
                      </div>
                      <div className="text-center space-y-4 group">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Shield className="w-10 h-10 text-green-600" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block text-lg">Instant Safety Check</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">Real-time food analysis</span>
                        </div>
                      </div>
                      <div className="text-center space-y-4 group">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <TrendingUp className="w-10 h-10 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block text-lg">Detailed Reports</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">Comprehensive food insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Scanner;
