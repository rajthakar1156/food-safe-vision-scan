
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, TrendingUp, TrendingDown, Users, ShoppingCart, 
  Zap, Star, AlertTriangle, Heart, Leaf, Sparkles
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line
} from "recharts";

const ModernRegionalAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionData = [
    {
      name: "North India",
      organicAdoption: 42,
      chemicalExposure: 58,
      healthScore: 65,
      population: 350,
      trend: "up",
      color: "#8B5CF6",
      gradient: "from-purple-500 to-indigo-600",
      topConcerns: ["Trans Fats", "MSG", "Artificial Colors"],
      healthyAlternatives: 78,
      avgIncome: 45000,
      awarenessLevel: 72
    },
    {
      name: "South India",
      organicAdoption: 58,
      chemicalExposure: 42,
      healthScore: 78,
      population: 280,
      trend: "up",
      color: "#059669",
      gradient: "from-emerald-500 to-teal-600",
      topConcerns: ["Preservatives", "TBHQ", "Palm Oil"],
      healthyAlternatives: 85,
      avgIncome: 52000,
      awarenessLevel: 81
    },
    {
      name: "West India",
      organicAdoption: 52,
      chemicalExposure: 48,
      healthScore: 72,
      population: 320,
      trend: "up",
      color: "#DC2626",
      gradient: "from-red-500 to-pink-600",
      topConcerns: ["High Sodium", "Artificial Flavors", "HFCS"],
      healthyAlternatives: 82,
      avgIncome: 48000,
      awarenessLevel: 76
    },
    {
      name: "East India",
      organicAdoption: 35,
      chemicalExposure: 65,
      healthScore: 58,
      population: 240,
      trend: "down",
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-600",
      topConcerns: ["Artificial Sweeteners", "Food Coloring", "BHA/BHT"],
      healthyAlternatives: 65,
      avgIncome: 38000,
      awarenessLevel: 63
    },
    {
      name: "Central India",
      organicAdoption: 28,
      chemicalExposure: 72,
      healthScore: 52,
      population: 180,
      trend: "stable",
      color: "#7C3AED",
      gradient: "from-violet-500 to-purple-600",
      topConcerns: ["Pesticide Residues", "Emulsifiers", "Nitrates"],
      healthyAlternatives: 58,
      avgIncome: 35000,
      awarenessLevel: 55
    }
  ];

  const trendData = [
    { month: "Jan", north: 38, south: 52, west: 45, east: 32, central: 25 },
    { month: "Mar", north: 40, south: 55, west: 48, east: 33, central: 26 },
    { month: "May", north: 41, south: 56, west: 50, east: 34, central: 27 },
    { month: "Jul", north: 42, south: 57, west: 51, east: 35, central: 28 },
    { month: "Sep", north: 42, south: 58, west: 52, east: 35, central: 28 },
    { month: "Nov", north: 42, south: 58, west: 52, east: 35, central: 28 }
  ];

  const chemicalImpactData = regionData.map(region => ({
    region: region.name.split(' ')[0],
    impact: region.chemicalExposure,
    awareness: region.awarenessLevel,
    alternatives: region.healthyAlternatives
  }));

  const consumptionPatterns = [
    { category: "Traditional Snacks", north: 45, south: 65, west: 55, east: 40, central: 35 },
    { category: "Processed Foods", north: 55, south: 35, west: 45, east: 60, central: 65 },
    { category: "Organic Products", north: 35, south: 55, west: 45, east: 30, central: 25 },
    { category: "Packaged Beverages", north: 60, south: 40, west: 55, east: 50, central: 45 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <span className="w-4 h-4 bg-yellow-500 rounded-full" />;
    }
  };

  const getHealthBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-100 text-green-700 border-green-200">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Good</Badge>;
    return <Badge className="bg-red-100 text-red-700 border-red-200">Needs Improvement</Badge>;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Regional Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Indian Regional Food Chemical Analysis
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover how food chemical exposure varies across different regions of India, 
            and explore the growing movement towards healthier, traditional alternatives.
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Trends
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Chemical Impact
            </TabsTrigger>
            <TabsTrigger value="consumption" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Consumption
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {regionData.map((region, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-xl hover:shadow-2xl ${
                    selectedRegion === region.name ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.gradient} opacity-5`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${region.gradient} flex items-center justify-center shadow-lg`}>
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {region.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {region.population}M people
                          </CardDescription>
                        </div>
                      </div>
                      {getTrendIcon(region.trend)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-4">
                    {/* Health Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Health Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${region.gradient} transition-all duration-1000`}
                            style={{ width: `${region.healthScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold" style={{ color: region.color }}>
                          {region.healthScore}
                        </span>
                      </div>
                    </div>

                    {/* Organic Adoption */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Organic Adoption</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        {region.organicAdoption}%
                      </span>
                    </div>

                    {/* Chemical Exposure */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Chemical Exposure</span>
                      </div>
                      <span className="text-sm font-bold text-orange-600">
                        {region.chemicalExposure}%
                      </span>
                    </div>

                    {/* Health Badge */}
                    <div className="pt-2">
                      {getHealthBadge(region.healthScore)}
                    </div>

                    {/* Expanded Details */}
                    {selectedRegion === region.name && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 animate-fade-in">
                        <div>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Top Concerns:</p>
                          <div className="flex flex-wrap gap-1">
                            {region.topConcerns.map((concern, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {concern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Healthy Options</p>
                            <p className="font-bold text-green-600">{region.healthyAlternatives}%</p>
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Awareness Level</p>
                            <p className="font-bold text-blue-600">{region.awarenessLevel}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="glass-card border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Organic Food Adoption Trends
                </CardTitle>
                <CardDescription className="text-lg">
                  Monthly progression of organic food adoption across Indian regions (2024)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="northGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="southGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="westGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="eastGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="centralGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(10px)'
                        }} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="south" stackId="1" stroke="#059669" fill="url(#southGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="west" stackId="1" stroke="#DC2626" fill="url(#westGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="north" stackId="1" stroke="#8B5CF6" fill="url(#northGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="east" stackId="1" stroke="#F59E0B" fill="url(#eastGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="central" stackId="1" stroke="#7C3AED" fill="url(#centralGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <Card className="glass-card border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Chemical Impact & Awareness Analysis
                </CardTitle>
                <CardDescription className="text-lg">
                  Correlation between chemical exposure, awareness levels, and available alternatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chemicalImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <PolarGrid stroke="#374151" opacity={0.3} />
                      <PolarAngleAxis dataKey="region" className="text-sm font-medium" />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <Radar
                        name="Chemical Impact"
                        dataKey="impact"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Awareness Level"
                        dataKey="awareness"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Healthy Alternatives"
                        dataKey="alternatives"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Legend />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consumption">
            <Card className="glass-card border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <ShoppingCart className="w-6 h-6 text-blue-500" />
                  Regional Consumption Patterns
                </CardTitle>
                <CardDescription className="text-lg">
                  Food category preferences and consumption habits across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consumptionPatterns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="category" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" label={{ value: 'Consumption (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="north" name="North" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="south" name="South" fill="#059669" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="west" name="West" fill="#DC2626" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="east" name="East" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="central" name="Central" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ModernRegionalAnalysis;
