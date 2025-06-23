
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  LineChart, Line, CartesianGrid, Scatter, ScatterChart, ZAxis, Area, AreaChart,
  ComposedChart, Treemap
} from "recharts";
import { ChemicalCircle, ChemicalSlider } from "@/components/ChemicalVisualizers";
import ChemicalDetails from "@/components/ChemicalDetails";
import ModernRegionalAnalysis from "@/components/ModernRegionalAnalysis";
import { chemicalData } from "@/types/chemical";

const commonChemicals = [
  { name: "MSG (Monosodium Glutamate)", level: "High", risk: "Medium", description: "Flavor enhancer commonly found in namkeen and packaged snacks that may cause headaches." },
  { name: "TBHQ", level: "Medium", risk: "High", description: "Preservative in fried snacks like bhujia and chips, linked to potential health concerns." },
  { name: "Sodium Nitrite", level: "Low", risk: "High", description: "Preservative in packaged paneer tikka and ready-to-eat meals, linked to increased cancer risk." },
  { name: "Tartrazine (Yellow 5)", level: "High", risk: "Medium", description: "Artificial color in many Indian sweets and snacks that may trigger allergic reactions." },
  { name: "BHA & BHT", level: "Medium", risk: "Medium", description: "Preservatives in packaged ghee and oils that may affect the neurological system." }
];

const pieChartData = [
  { name: "High Risk", value: 35, color: "#EF4444" },
  { name: "Medium Risk", value: 45, color: "#FBBF24" },
  { name: "Low Risk", value: 20, color: "#2DD4BF" }
];

const barChartData = [
  { name: "Namkeen", harmful: 75, safe: 25 },
  { name: "Soft Drinks", harmful: 60, safe: 40 },
  { name: "Packaged Sweets", harmful: 80, safe: 20 },
  { name: "Biscuits", harmful: 65, safe: 35 },
  { name: "Ready Meals", harmful: 70, safe: 30 }
];

const radarChartData = [
  { subject: "Preservatives", namkeen: 80, beverages: 40, sweets: 70, biscuits: 65 },
  { subject: "Artificial Colors", namkeen: 60, beverages: 90, sweets: 95, biscuits: 50 },
  { subject: "Flavor Enhancers", namkeen: 95, beverages: 80, sweets: 75, biscuits: 60 },
  { subject: "Sweeteners", namkeen: 30, beverages: 95, sweets: 90, biscuits: 75 },
  { subject: "Stabilizers", namkeen: 70, beverages: 60, sweets: 40, biscuits: 65 },
];

const bubbleData = [
  { name: "MSG", value: 35, popularity: 90, risk: 60 },
  { name: "TBHQ", value: 25, popularity: 70, risk: 80 },
  { name: "Yellow 5", value: 40, popularity: 95, risk: 70 },
  { name: "BHA", value: 20, popularity: 60, risk: 75 },
  { name: "Aspartame", value: 30, popularity: 80, risk: 65 },
  { name: "HFCS", value: 45, popularity: 85, risk: 60 },
];

const trendData = [
  { year: "2018", organic: 25, processed: 75 },
  { year: "2019", organic: 30, processed: 70 },
  { year: "2020", organic: 38, processed: 62 },
  { year: "2021", organic: 42, processed: 58 },
  { year: "2022", organic: 48, processed: 52 },
  { year: "2023", organic: 55, processed: 45 },
];

const marketShareData = [
  { name: "Traditional Snacks", size: 30, color: "#2DD4BF" },
  { name: "Processed Snacks", size: 70, color: "#EF4444" },
];

const TreemapCustomContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, colors, rank, name } = props;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: marketShareData[index].color,
          stroke: '#444',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 10}
        textAnchor="middle"
        fill="#fff"
        fontSize={width > 100 ? 16 : 12}
        fontWeight="bold"
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        textAnchor="middle"
        fill="#fff"
        fontSize={width > 100 ? 14 : 10}
      >
        {`${marketShareData[index].size}%`}
      </text>
    </g>
  );
};

const ChemicalInfo = () => {
  return (
    <section id="chemicals" className="py-20 px-4 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Food Chemical Analysis</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Understand chemicals in common Indian packaged foods and their potential health impacts.
          </p>
        </div>

        <Tabs defaultValue="regional" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-7 mb-8 h-auto md:h-12">
            <TabsTrigger value="regional" className="text-xs md:text-sm">Regional Analysis</TabsTrigger>
            <TabsTrigger value="trends" className="text-xs md:text-sm">Market Trends</TabsTrigger>
            <TabsTrigger value="common" className="text-xs md:text-sm">Common Chemicals</TabsTrigger>
            <TabsTrigger value="stats" className="text-xs md:text-sm">Risk Distribution</TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs md:text-sm">Food Comparison</TabsTrigger>
            <TabsTrigger value="impact" className="text-xs md:text-sm">Chemical Impact</TabsTrigger>
            <TabsTrigger value="details" className="text-xs md:text-sm">Health Details</TabsTrigger>
          </TabsList>

          <TabsContent value="regional">
            <ModernRegionalAnalysis />
          </TabsContent>

          <TabsContent value="trends">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Processed vs Organic Food Trends in India</CardTitle>
                <CardDescription>
                  Shift in consumption patterns over recent years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="year" stroke="#999" fontSize={12} />
                      <YAxis stroke="#999" fontSize={12} label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', fontSize: '14px' }} />
                      <Legend />
                      <Area type="monotone" dataKey="organic" name="Organic Foods" stackId="1" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="processed" name="Processed Foods" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Market Share Distribution</h3>
                  <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <Treemap
                        data={marketShareData}
                        dataKey="size"
                        stroke="#444"
                        fill="#8884d8"
                        content={<TreemapCustomContent />}
                      />
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="common">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {commonChemicals.map((chemical, index) => (
                <Card key={index} className="glass-card card-hover">
                  <CardHeader>
                    <CardTitle className="flex flex-col md:flex-row md:justify-between gap-2">
                      <span className="text-lg">{chemical.name}</span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full w-fit ${
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
                    <p className="text-sm md:text-base">{chemical.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Distribution of Chemical Risk Levels</CardTitle>
                <CardDescription>
                  Breakdown of chemicals by potential health risk
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-8">
                <div className="h-64 md:h-80 w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={window.innerWidth < 768 ? 80 : 100}
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
                <div className="h-64 md:h-80 w-full lg:w-1/2">
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
                <CardTitle className="text-xl md:text-2xl">Chemical Composition by Food Category</CardTitle>
                <CardDescription>
                  Comparing harmful vs. safe ingredients across common Indian snacks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" fontSize={window.innerWidth < 768 ? 10 : 12} />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} stroke="#999" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555', fontSize: '14px' }}
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
          
          <TabsContent value="impact">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Chemical Impact & Prevalence</CardTitle>
                <CardDescription>
                  Analysis of chemical presence and potential health impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 10,
                        bottom: 20,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        type="number" 
                        dataKey="popularity" 
                        name="Prevalence" 
                        unit="%" 
                        stroke="#999"
                        fontSize={12}
                        label={{ value: 'Prevalence in Indian Products (%)', position: 'bottom' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="risk" 
                        name="Risk" 
                        unit="%" 
                        stroke="#999"
                        fontSize={12}
                        label={{ value: 'Potential Health Risk', angle: -90, position: 'left' }}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="value" 
                        range={[30, 200]} 
                        name="Quantity" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555', fontSize: '14px' }}
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

          <TabsContent value="details">
            <div className="grid gap-6">
              {chemicalData.map((chemical, index) => (
                <ChemicalDetails key={index} chemical={chemical} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ChemicalInfo;
