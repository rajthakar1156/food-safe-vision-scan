
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { MapPin } from "lucide-react";

// Indian regional data for food chemical analysis
const regionalData = [
  { region: "North India", chemicalExposure: 65, organicAdoption: 35, highRisk: 40, mediumRisk: 35, lowRisk: 25 },
  { region: "South India", chemicalExposure: 48, organicAdoption: 52, highRisk: 30, mediumRisk: 38, lowRisk: 32 },
  { region: "East India", chemicalExposure: 70, organicAdoption: 30, highRisk: 45, mediumRisk: 30, lowRisk: 25 },
  { region: "West India", chemicalExposure: 55, organicAdoption: 45, highRisk: 35, mediumRisk: 40, lowRisk: 25 },
  { region: "Central India", chemicalExposure: 62, organicAdoption: 38, highRisk: 42, mediumRisk: 33, lowRisk: 25 },
  { region: "Northeast India", chemicalExposure: 50, organicAdoption: 50, highRisk: 32, mediumRisk: 35, lowRisk: 33 },
];

// State-wise data
const stateData = [
  { state: "Punjab", chemicalExposure: 68, organicAdoption: 32, preservatives: 75, colors: 60, flavors: 70 },
  { state: "Kerala", chemicalExposure: 45, organicAdoption: 55, preservatives: 50, colors: 45, flavors: 40 },
  { state: "Maharashtra", chemicalExposure: 58, organicAdoption: 42, preservatives: 65, colors: 55, flavors: 60 },
  { state: "West Bengal", chemicalExposure: 72, organicAdoption: 28, preservatives: 70, colors: 75, flavors: 65 },
  { state: "Gujarat", chemicalExposure: 52, organicAdoption: 48, preservatives: 60, colors: 50, flavors: 55 },
  { state: "Tamil Nadu", chemicalExposure: 50, organicAdoption: 50, preservatives: 55, colors: 50, flavors: 45 },
  { state: "Uttar Pradesh", chemicalExposure: 70, organicAdoption: 30, preservatives: 80, colors: 65, flavors: 75 },
  { state: "Karnataka", chemicalExposure: 47, organicAdoption: 53, preservatives: 55, colors: 45, flavors: 40 },
];

// Common food items with regional prevalence
const regionalFoodData = [
  { 
    region: "North India", 
    foodItems: [
      { name: "Samosa", chemicalScore: 75, popularItems: ["MSG", "TBHQ", "Artificial Colors"] },
      { name: "Aloo Tikki", chemicalScore: 65, popularItems: ["Preservatives", "Artificial Flavors"] },
      { name: "Packaged Paneer", chemicalScore: 60, popularItems: ["Sodium Nitrate", "Emulsifiers"] }
    ]
  },
  { 
    region: "South India", 
    foodItems: [
      { name: "Packaged Dosa Mix", chemicalScore: 55, popularItems: ["Stabilizers", "Acidity Regulators"] },
      { name: "Instant Sambhar", chemicalScore: 70, popularItems: ["MSG", "Flavor Enhancers", "Colors"] },
      { name: "Packaged Idli", chemicalScore: 45, popularItems: ["Preservatives", "Emulsifiers"] }
    ]
  },
  { 
    region: "East India", 
    foodItems: [
      { name: "Rasgulla Tins", chemicalScore: 65, popularItems: ["Preservatives", "Artificial Sweeteners"] },
      { name: "Packaged Mishti Doi", chemicalScore: 60, popularItems: ["Stabilizers", "Artificial Flavors"] },
      { name: "Ready-to-eat Fish Curry", chemicalScore: 80, popularItems: ["Sodium Benzoate", "MSG", "Colors"] }
    ]
  },
  { 
    region: "West India", 
    foodItems: [
      { name: "Packaged Dhokla", chemicalScore: 50, popularItems: ["Preservatives", "Acidity Regulators"] },
      { name: "Khakhra", chemicalScore: 55, popularItems: ["Flavors", "Preservatives"] },
      { name: "Farsan Mix", chemicalScore: 75, popularItems: ["Artificial Colors", "MSG", "TBHQ"] }
    ]
  }
];

// Chemical exposure trend data over years
const trendData = [
  { year: "2018", north: 75, south: 60, east: 80, west: 70, central: 72, northeast: 65 },
  { year: "2019", north: 73, south: 58, east: 78, west: 68, central: 70, northeast: 62 },
  { year: "2020", north: 70, south: 55, east: 75, west: 65, central: 68, northeast: 58 },
  { year: "2021", north: 68, south: 50, east: 72, west: 60, central: 65, northeast: 55 },
  { year: "2022", north: 65, south: 48, east: 70, west: 55, central: 62, northeast: 50 },
  { year: "2023", north: 65, south: 48, east: 70, west: 55, central: 62, northeast: 50 },
];

// Urban vs Rural data
const urbanRuralData = [
  { category: "Urban", chemical: 70, organic: 30 },
  { category: "Rural", chemical: 45, organic: 55 },
];

const COLORS = ["#EF4444", "#FBBF24", "#2DD4BF"];

const RegionalAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  
  const filteredStateData = selectedRegion === "all" 
    ? stateData 
    : stateData.filter(item => {
        // Map region selection to states (simplified mapping)
        const regionToStates = {
          "north": ["Punjab", "Uttar Pradesh"],
          "south": ["Kerala", "Tamil Nadu", "Karnataka"],
          "east": ["West Bengal"],
          "west": ["Maharashtra", "Gujarat"],
        };
        return regionToStates[selectedRegion as keyof typeof regionToStates]?.includes(item.state);
      });

  const chartConfig = {
    high: { color: "#EF4444", label: "High Risk" },
    medium: { color: "#FBBF24", label: "Medium Risk" },
    low: { color: "#2DD4BF", label: "Low Risk" },
    chemical: { color: "#EF4444", label: "Chemical Exposure" },
    organic: { color: "#2DD4BF", label: "Organic Adoption" },
    preservatives: { color: "#8884d8", label: "Preservatives" },
    colors: { color: "#82ca9d", label: "Artificial Colors" },
    flavors: { color: "#ffc658", label: "Flavor Enhancers" },
  };
  
  return (
    <section id="regional-analysis" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Indian Regional Food Chemical Analysis
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Understand the distribution and impact of chemical additives in packaged foods across different regions of India.
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Regional Overview</TabsTrigger>
            <TabsTrigger value="states">State-wise Analysis</TabsTrigger>
            <TabsTrigger value="trends">Historical Trends</TabsTrigger>
            <TabsTrigger value="urban-rural">Urban vs Rural</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Chemical Presence in Indian Regional Foods</CardTitle>
                <CardDescription>
                  Comparison of food chemical exposure and organic food adoption across major Indian regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer 
                    config={chartConfig}
                    className="h-full"
                  >
                    <ComposedChart
                      data={regionalData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid stroke="#444" />
                      <XAxis dataKey="region" stroke="#999" />
                      <YAxis stroke="#999" label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar 
                        dataKey="chemicalExposure" 
                        name="Chemical Exposure" 
                        fill="#EF4444" 
                        opacity={0.8}
                      />
                      <Bar 
                        dataKey="organicAdoption" 
                        name="Organic Adoption" 
                        fill="#2DD4BF" 
                        opacity={0.8}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="highRisk" 
                        name="High Risk Chemicals" 
                        stroke="#FFA500" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-8">
                  {regionalFoodData.map((region, index) => (
                    <Card key={index} className="glass-card card-hover">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {region.region}
                        </CardTitle>
                        <CardDescription>
                          Common packaged foods and their chemical makeup
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {region.foodItems.map((item, idx) => (
                            <li key={idx} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{item.name}</span>
                                <span 
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    item.chemicalScore > 70 
                                      ? "bg-danger/20 text-danger" 
                                      : item.chemicalScore > 50 
                                        ? "bg-caution/20 text-caution" 
                                        : "bg-safe/20 text-safe"
                                  }`}
                                >
                                  Score: {item.chemicalScore}/100
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Common chemicals: {item.popularItems.join(", ")}
                              </div>
                              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    item.chemicalScore > 70 
                                      ? "bg-danger" 
                                      : item.chemicalScore > 50 
                                        ? "bg-caution" 
                                        : "bg-safe"
                                  }`}
                                  style={{ width: `${item.chemicalScore}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="states">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>State-wise Chemical Prevalence</CardTitle>
                <CardDescription>
                  Analysis of food chemical additives across different Indian states
                </CardDescription>
                <RadioGroup 
                  defaultValue="all" 
                  className="flex flex-wrap gap-4 mt-4"
                  onValueChange={setSelectedRegion}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All States</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="north" id="north" />
                    <Label htmlFor="north">North India</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="south" id="south" />
                    <Label htmlFor="south">South India</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="east" id="east" />
                    <Label htmlFor="east">East India</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="west" id="west" />
                    <Label htmlFor="west">West India</Label>
                  </div>
                </RadioGroup>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer 
                    config={chartConfig}
                    className="h-full"
                  >
                    <ComposedChart
                      data={filteredStateData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid stroke="#444" />
                      <XAxis dataKey="state" stroke="#999" />
                      <YAxis stroke="#999" label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="preservatives" name="Preservatives" fill="#8884d8" />
                      <Bar dataKey="colors" name="Artificial Colors" fill="#82ca9d" />
                      <Bar dataKey="flavors" name="Flavor Enhancers" fill="#ffc658" />
                      <Line 
                        type="monotone" 
                        dataKey="chemicalExposure" 
                        name="Overall Chemical Exposure" 
                        stroke="#ff7300" 
                        strokeWidth={2}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Historical Chemical Exposure Trends (2018-2023)</CardTitle>
                <CardDescription>
                  Changes in chemical additives prevalence across Indian regions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer 
                    config={chartConfig}
                    className="h-full"
                  >
                    <AreaChart
                      data={trendData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid stroke="#444" />
                      <XAxis dataKey="year" stroke="#999" />
                      <YAxis stroke="#999" label={{ value: 'Chemical Exposure (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area type="monotone" dataKey="north" name="North India" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="south" name="South India" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="east" name="East India" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="west" name="West India" stackId="4" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="central" name="Central India" stackId="5" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="northeast" name="Northeast India" stackId="6" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                    </AreaChart>
                  </ChartContainer>
                </div>
                <div className="mt-8 text-center text-muted-foreground">
                  <p>
                    Over the past five years, there has been a gradual decrease in chemical additives 
                    across all Indian regions, with South India showing the most significant reduction.
                    East India continues to have the highest prevalence of chemical additives in packaged foods.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="urban-rural">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Urban vs Rural Food Chemical Analysis</CardTitle>
                <CardDescription>
                  Comparing chemical additives presence in urban and rural packaged foods
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-80 w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Chemical", value: urbanRuralData[0].chemical },
                          { name: "Organic", value: urbanRuralData[0].organic }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell key={`cell-urban-${index}`} fill={index === 0 ? "#EF4444" : "#2DD4BF"} />
                        ))}
                      </Pie>
                      <text x="50%" y="25" textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium">
                        Urban Areas
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-80 w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Chemical", value: urbanRuralData[1].chemical },
                          { name: "Organic", value: urbanRuralData[1].organic }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell key={`cell-rural-${index}`} fill={index === 0 ? "#EF4444" : "#2DD4BF"} />
                        ))}
                      </Pie>
                      <text x="50%" y="25" textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium">
                        Rural Areas
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-full">
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="text-danger">•</span>
                          <span>Urban packaged foods contain up to 25% more chemical additives than rural counterparts</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-safe">•</span>
                          <span>Rural areas show higher consumption of locally-produced foods with fewer preservatives</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-caution">•</span>
                          <span>Urban areas have better access to imported organic products despite higher general chemical exposure</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Metro cities show twice the consumption of ultra-processed foods compared to rural settlements</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RegionalAnalysis;
