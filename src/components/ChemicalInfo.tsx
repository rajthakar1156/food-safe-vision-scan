
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

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

const ChemicalInfo = () => {
  return (
    <section id="chemicals" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Understanding Harmful Chemicals</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Learn about common chemicals found in packaged foods and their potential health impacts.
          </p>
        </div>

        <Tabs defaultValue="common" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="common">Common Chemicals</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="comparison">Food Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="common">
            <div className="grid md:grid-cols-2 gap-6">
              {commonChemicals.map((chemical, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{chemical.name}</span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          chemical.risk === "High" 
                            ? "bg-danger/10 text-danger" 
                            : chemical.risk === "Medium" 
                              ? "bg-caution/10 text-caution" 
                              : "bg-safe/10 text-safe"
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
            <Card>
              <CardHeader>
                <CardTitle>Distribution of Chemical Risk Levels</CardTitle>
                <CardDescription>
                  Breakdown of chemicals by potential health risk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
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
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="harmful" name="Potentially Harmful" stackId="a" fill="#EF4444" />
                      <Bar dataKey="safe" name="Generally Safe" stackId="a" fill="#2DD4BF" />
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

export default ChemicalInfo;
