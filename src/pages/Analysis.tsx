
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as AnalysisResult;
  const image = location.state?.image as string;

  if (!result) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Scanner
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Analysis Results
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image and Status */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                {image && (
                  <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src={image} 
                      alt="Analyzed product" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    result.safe ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {result.safe ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {result.safe ? "Product Verified Safe" : "Safety Concerns Detected"}
                    </h2>
                    <p className="text-gray-600">Safety Score: {result.details.safetyScore}/100</p>
                  </div>
                </div>

                <Badge 
                  variant={result.safe ? "default" : "destructive"} 
                  className="text-sm px-4 py-2"
                >
                  {result.detectedItems[0]?.label || "Food Product"}
                </Badge>
              </CardContent>
            </Card>

            {/* Detection Results */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Detection Results
                </h3>
                <div className="space-y-3">
                  {result.detectedItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="capitalize font-medium">{item.label}</span>
                      <Badge variant="outline">
                        {Math.round(item.score * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preservatives */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Preservatives Found
                </h3>
                <ul className="space-y-2">
                  {result.details.preservatives.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Risk Assessment
                </h3>
                <ul className="space-y-2">
                  {result.details.potentialRisks.map((risk, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className={`w-2 h-2 rounded-full ${
                        risk === "None identified" ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      {risk}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.details.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3"
            >
              Analyze Another Product
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analysis;
