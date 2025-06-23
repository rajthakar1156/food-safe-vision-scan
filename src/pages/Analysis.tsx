
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, Shield, Zap, TrendingUp, Info, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

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

  // Data for charts
  const safetyData = [
    { name: 'Safe', value: result.details.safetyScore, color: '#10B981' },
    { name: 'Risk', value: 100 - result.details.safetyScore, color: '#EF4444' }
  ];

  const ingredientAnalysis = [
    { name: 'Safe Ingredients', value: 75, color: '#10B981' },
    { name: 'Preservatives', value: 15, color: '#F59E0B' },
    { name: 'Harmful', value: 10, color: '#EF4444' }
  ];

  const confidenceData = [
    { name: 'Confidence', value: result.confidence * 100, fill: '#8B5CF6' }
  ];

  const riskTrend = [
    { time: '0h', risk: 10 },
    { time: '6h', risk: 25 },
    { time: '12h', risk: 40 },
    { time: '24h', risk: result.safe ? 15 : 60 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Navbar />
      
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smart Analysis Results
                </h1>
                <p className="text-sm text-gray-600">AI-powered food safety assessment</p>
              </div>
            </div>
            <Badge 
              variant={result.safe ? "default" : "destructive"} 
              className="px-4 py-2 text-sm font-medium"
            >
              {result.safe ? "✓ SAFE" : "⚠ CAUTION"}
            </Badge>
          </div>

          {/* Main Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Product Overview - Spans 2 columns on large screens */}
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 h-full">
                {/* Product Image & Status */}
                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-6 flex flex-col justify-center">
                  {image && (
                    <div className="aspect-square bg-white rounded-2xl mb-4 overflow-hidden shadow-lg">
                      <img 
                        src={image} 
                        alt="Analyzed product" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium ${
                      result.safe ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {result.safe ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                      {result.safe ? "Product Verified" : "Caution Required"}
                    </div>
                  </div>
                </div>

                {/* Analysis Data */}
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Safety Score</h3>
                    <div className="relative h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={confidenceData}>
                          <RadialBar
                            dataKey="value"
                            cornerRadius={10}
                            fill="#8B5CF6"
                          />
                          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-purple-600">
                            {result.details.safetyScore}%
                          </text>
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Detection Results</h3>
                    <div className="space-y-2">
                      {result.detectedItems.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                          <span className="text-sm font-medium">{item.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(item.score * 100)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats Panel */}
            <div className="space-y-6">
              {/* Ingredient Breakdown */}
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    Ingredient Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ingredientAnalysis}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          dataKey="value"
                        >
                          {ingredientAnalysis.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {ingredientAnalysis.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Timeline */}
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Risk Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrend}>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={10} />
                        <YAxis hide />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="#F59E0B" 
                          fill="#F59E0B" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Preservatives */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Preservatives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {result.details.preservatives.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {result.details.preservatives.length > 4 && (
                    <div className="text-xs text-gray-500 text-center pt-2">
                      +{result.details.preservatives.length - 4} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-400 to-red-500 text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {result.details.potentialRisks.slice(0, 4).map((risk, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        risk === "None identified" ? "bg-green-400" : "bg-red-400"
                      }`} />
                      <span className="truncate">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {result.details.recommendations.slice(0, 4).map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="leading-tight">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
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
