
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, CartesianGrid, Scatter, ScatterChart, ZAxis } from "recharts";
import { ChemicalCircle, ChemicalSlider } from "@/components/ChemicalVisualizers";

const commonChemicals = [
  { name: "MSG (Monosodium Glutamate)", level: "High", risk: "Medium", description: "Flavor enhancer that may cause headaches or discomfort in some people." },
  { name: "TBHQ", level: "Medium", risk: "High", description: "Preservative that prevents oils from going rancid, linked to potential health concerns." },
  { name: "Sodium Nitrite", level: "Low", risk: "High", description: "Preservative in processed meats, linked to increased cancer risk." },
  { name: "Artificial Food Coloring", level: "High", risk: "Medium", description: "Dyes that may contain carcinogens or cause hyperactivity in children." },
  { name: "BHA & BHT", level: "Medium", risk: "Medium", description: "Preservatives that may affect the neurological system or trigger allergic reactions." }
];

const pieChartData = [
  { name: "High Risk", value: 35, color: "#EF4444" },
  { name: "Medium Risk", value: 45, color: "#FBBF24" },
  { name: "Low Risk", value: 20, color: "#2DD4BF" }
];

const barChartData = [
  { name: "Potato Chips", harmful: 75, safe: 25 },
  { name: "Soda", harmful: 60, safe: 40 },
  { name: "Candy", harmful: 80, safe: 20 },
  { name: "Cookies", harmful: 65, safe: 35 },
  { name: "Frozen Meals", harmful: 70, safe: 30 }
];

const radarChartData = [
  { subject: "Preservatives", chips: 80, soda: 40, candy: 70, cookies: 65 },
  { subject: "Artificial Colors", chips: 60, soda: 90, candy: 95, cookies: 50 },
  { subject: "Flavor Enhancers", chips: 95, soda: 80, candy: 75, cookies: 60 },
  { subject: "Sweeteners", chips: 30, soda: 95, candy: 90, cookies: 75 },
  { subject: "Stabilizers", chips: 70, soda: 60, candy: 40, cookies: 65 },
];

const bubbleData = [
  { name: "MSG", value: 35, popularity: 90, risk: 60 },
  { name: "TBHQ", value: 25, popularity: 70, risk: 80 },
  { name: "Red 40", value: 40, popularity: 95, risk: 70 },
  { name: "BHA", value: 20, popularity: 60, risk: 75 },
  { name: "Yellow 5", value: 30, popularity: 80, risk: 65 },
  { name: "HFCS", value: 45, popularity: 85, risk: 60 },
];

const ChemicalInfo = () => {
  return (
    <section id="chemicals" className="py-20 px-4 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Understanding Harmful Chemicals</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Learn about common chemicals found in packaged foods and their potential health impacts.
          </p>
        </div>

        <Tabs defaultValue="common" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="common">Common Chemicals</TabsTrigger>
            <TabsTrigger value="stats">Risk Distribution</TabsTrigger>
            <TabsTrigger value="comparison">Food Comparison</TabsTrigger>
            <TabsTrigger value="categories">Category Analysis</TabsTrigger>
            <TabsTrigger value="impact">Chemical Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="common">
            <div className="grid md:grid-cols-2 gap-6">
              {commonChemicals.map((chemical, index) => (
                <Card key={index} className="glass-card card-hover">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{chemical.name}</span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          chemical.risk === "High" 
                            ? "bg-danger/20 text-danger" 
                            : chemical.risk === "Medium" 
                              ? "bg-caution/20 text-caution" 
                              : "bg-safe/20 text-safe"
                        }`}
                      >
                        {chemical.risk} Risk
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Prevalence: {chemical.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{chemical.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Distribution of Chemical Risk Levels</CardTitle>
                <CardDescription>
                  Breakdown of chemicals by potential health risk
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-8">
                <div className="h-80 w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80 w-full md:w-1/2">
                  <div className="grid grid-cols-1 gap-6 h-full place-content-center">
                    {pieChartData.map((item, index) => (
                      <ChemicalSlider 
                        key={index}
                        label={item.name}
                        value={item.value}
                        color={item.color}
                        total={100}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Chemical Composition by Food Category</CardTitle>
                <CardDescription>
                  Comparing harmful vs. safe ingredients across common snacks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#999' }} stroke="#999" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                        labelStyle={{ color: '#eee' }}
                      />
                      <Legend />
                      <Bar dataKey="harmful" name="Potentially Harmful" stackId="a" fill="#EF4444" />
                      <Bar dataKey="safe" name="Generally Safe" stackId="a" fill="#2DD4BF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Chemical Profiles by Food Category</CardTitle>
                <CardDescription>
                  Comparing chemical presence across different food types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={radarChartData}>
                      <PolarGrid stroke="#555" />
                      <PolarAngleAxis dataKey="subject" stroke="#999" />
                      <PolarRadiusAxis stroke="#999" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                      <Radar name="Potato Chips" dataKey="chips" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                      <Radar name="Soda" dataKey="soda" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.3} />
                      <Radar name="Candy" dataKey="candy" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
                      <Radar name="Cookies" dataKey="cookies" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="impact">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Chemical Impact & Prevalence</CardTitle>
                <CardDescription>
                  Analysis of chemical presence and potential health impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        type="number" 
                        dataKey="popularity" 
                        name="Prevalence" 
                        unit="%" 
                        stroke="#999"
                        label={{ value: 'Prevalence in Products (%)', position: 'bottom', fill: '#999' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="risk" 
                        name="Risk" 
                        unit="%" 
                        stroke="#999"
                        label={{ value: 'Potential Health Risk', angle: -90, position: 'left', fill: '#999' }}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="value" 
                        range={[50, 400]} 
                        name="Quantity" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                        formatter={(value, name) => [value, name]}
                      />
                      <Scatter 
                        name="Chemicals" 
                        data={bubbleData} 
                        fill="#8884d8"
                        shape={(props) => {
                          const { cx, cy, payload } = props;
                          return (
                            <ChemicalCircle 
                              cx={cx} 
                              cy={cy} 
                              name={payload.name} 
                              size={payload.value} 
                              risk={payload.risk}
                            />
                          );
                        }}
                      />
                    </ScatterChart>
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

export default ChemicalInfo;
