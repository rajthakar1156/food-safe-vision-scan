
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, RefreshCcw, AlertTriangle, CheckCircle, Loader2, X, Zap, Shield, TrendingUp, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { compareImageWithProducts, compareDominantColors } from "./ImageComparison";
import { productDatabase } from "@/types/chemical";

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

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(true);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const createAnalysisFromProduct = (productKey: string): AnalysisResult => {
    const product = productDatabase[productKey];
    const safetyScore = product.riskLevel === 'low' ? 85 : product.riskLevel === 'medium' ? 65 : 45;
    
    return {
      safe: product.riskLevel === 'low',
      confidence: 0.92,
      detectedItems: [
        { label: product.name, score: 0.92 },
        { label: product.category, score: 0.88 },
        { label: "Packaged Food", score: 0.85 }
      ],
      details: {
        preservatives: product.chemicals.filter(c => 
          c.includes('TBHQ') || c.includes('Benzoate') || c.includes('Sorbate')
        ),
        additives: product.chemicals,
        nutritionalValue: product.riskLevel === 'low' ? "Good" : product.riskLevel === 'medium' ? "Fair" : "Poor",
        safetyScore,
        recommendations: [
          product.riskLevel === 'high' ? "Consider alternatives" : "Consume in moderation",
          "Check expiry date",
          "Store as per instructions"
        ],
        potentialRisks: product.riskLevel === 'high' 
          ? ["High sodium content", "Artificial preservatives", "Potential allergens"]
          : product.riskLevel === 'medium'
          ? ["Moderate sodium content", "Some artificial additives"]
          : ["None identified"]
      }
    };
  };

  const handleExampleImage = async () => {
    try {
      const exampleImageUrl = "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&q=80";
      setSelectedImage(exampleImageUrl);
      setScanning(true);
      setShowExample(false);
      
      const analysisResult = createAnalysisFromProduct('lays magic masala');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/analysis', { 
        state: { 
          result: analysisResult, 
          image: exampleImageUrl 
        } 
      });
      
      toast({
        title: "Lays Masala Chips Analysis Complete!",
        description: "View the detailed food safety analysis results.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Example Failed",
        description: "Could not load example image. Please try uploading your own.",
        variant: "destructive",
      });
      setSelectedImage(null);
      setShowExample(true);
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
      // First try advanced image comparison
      console.log('Starting image comparison...');
      let comparisonResult = await compareImageWithProducts(file);
      
      // If no match, try dominant color comparison as fallback
      if (!comparisonResult.match) {
        console.log('Advanced comparison failed, trying color comparison...');
        comparisonResult = await compareDominantColors(file);
      }
      
      console.log('Comparison result:', comparisonResult);
      
      if (comparisonResult.match && comparisonResult.productKey) {
        // Product matched - create analysis
        const analysisResult = createAnalysisFromProduct(comparisonResult.productKey);
        const matchedProduct = productDatabase[comparisonResult.productKey];
        
        navigate('/analysis', { 
          state: { 
            result: analysisResult, 
            image: imageUrl 
          } 
        });
        
        toast({
          title: `${matchedProduct.name} Detected!`,
          description: `Analysis complete with ${Math.round(comparisonResult.confidence * 100)}% confidence.`,
          variant: "default",
        });
      } else {
        // No product match found - show error
        throw new Error('PRODUCT_NOT_FOUND');
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      
      if (error instanceof Error && error.message === 'PRODUCT_NOT_FOUND') {
        toast({
          title: "Product Not Available",
          description: "The uploaded image doesn't match any products in our database. Please upload an image of a product available on our website.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Could not analyze the uploaded image. Please ensure you're uploading a clear image of a food product available on our website.",
          variant: "destructive",
        });
      }
      
      setSelectedImage(null);
      URL.revokeObjectURL(imageUrl);
    } finally {
      setScanning(false);
    }
  };

  const resetScan = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setShowExample(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="scan" className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Food Detection
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Smart Food Scanner
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Upload food packaging images for instant AI analysis. Only products available on our website will be analyzed.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-purple-200/50 shadow-2xl">
            <CardContent className="p-0">
              
              {/* Scanner Display */}
              <div className="aspect-[16/10] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-t-2xl overflow-hidden relative">
                {selectedImage ? (
                  <div className="relative w-full h-full group">
                    <img 
                      src={selectedImage} 
                      alt="Selected food product" 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        toast({
                          title: "Image Load Error",
                          description: "Failed to load the selected image. Please try again.",
                          variant: "destructive",
                        });
                        resetScan();
                      }}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm"
                      onClick={resetScan}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {scanning ? (
                      <div className="text-center space-y-6">
                        <div className="relative w-full max-w-md h-24 overflow-hidden mb-8 rounded-2xl border-2 border-purple-500/30">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent h-2 animate-scan rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                          <span className="text-purple-700 font-bold text-xl">Comparing with Website Products...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
                          <Camera size={48} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Ready to Analyze Food Products
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            Upload a clear image of products available on our website
                          </p>
                        </div>
                        
                        {/* Example Image Section */}
                        {showExample && (
                          <div className="mt-6 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-purple-200/30">
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                              New to food scanning? Try our example:
                            </p>
                            <div className="flex items-center gap-4">
                              <img 
                                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&q=80" 
                                alt="Lays Masala Chips example"
                                className="w-16 h-16 rounded-lg object-cover border-2 border-purple-200"
                              />
                              <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                  Lays Masala Chips
                                </p>
                                <p className="text-xs text-slate-500">
                                  See detailed ingredient analysis
                                </p>
                              </div>
                              <Button
                                onClick={handleExampleImage}
                                size="sm"
                                variant="outline"
                                className="border-purple-300 hover:bg-purple-50"
                              >
                                <Search className="w-4 h-4 mr-1" />
                                Analyze
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Available Products Notice */}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                          <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">
                            📋 Available Products for Analysis:
                          </p>
                          <p className="text-blue-600 dark:text-blue-300 text-xs">
                            Lays, Maggi, Parle-G, Balaji, Haldiram, Britannia, Kurkure, Cadbury, Thums Up, Frooti, Amul, and more!
                          </p>
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
              </div>

              {/* Action Section */}
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-xl"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={scanning}
                  >
                    <Upload className="mr-3 h-6 w-6" />
                    Upload Food Image
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-16 text-lg font-bold border-2 border-purple-300 hover:bg-purple-50 shadow-lg"
                    onClick={resetScan}
                    disabled={scanning}
                  >
                    <RefreshCcw className="mr-3 h-6 w-6" />
                    Reset Scanner
                  </Button>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-purple-200/30">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Image Matching</span>
                      <span className="text-sm text-slate-500">Product comparison</span>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Safety Check</span>
                      <span className="text-sm text-slate-500">Verified products only</span>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Detailed Reports</span>
                      <span className="text-sm text-slate-500">Comprehensive insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Scanner;
