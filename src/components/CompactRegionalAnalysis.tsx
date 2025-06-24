
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, 
  PieChart, Pie, Cell, Tooltip, Legend
} from "recharts";
import { MapPin, TrendingUp, AlertTriangle } from "lucide-react";

const regionalData = [
  { region: "North", chemical: 65, organic: 35, risk: "High" },
  { region: "South", chemical: 48, organic: 52, risk: "Medium" },
  { region: "West", chemical: 55, organic: 45, risk: "Medium" },
  { region: "East", chemical: 70, organic: 30, risk: "High" },
];

const riskData = [
  { name: "High Risk", value: 35, color: "#EF4444" },
  { name: "Medium Risk", value: 45, color: "#FBBF24" },
  { name: "Low Risk", value: 20, color: "#2DD4BF" }
];

const CompactRegionalAnalysis = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
            Regional Food Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chemical exposure patterns across Indian regions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Regional Overview */}
          <Card className="neo-card card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Regional Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="region" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Bar dataKey="chemical" name="Chemical %" fill="#EF4444" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="organic" name="Organic %" fill="#2DD4BF" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="neo-card card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-caution" />
                Risk Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={70}
                      dataKey="value"
                      stroke="none"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {riskData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="neo-card card-hover lg:col-span-1 md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-danger mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">East India</p>
                    <p className="text-xs text-muted-foreground">Highest chemical exposure at 70%</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-safe mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">South India</p>
                    <p className="text-xs text-muted-foreground">Leading organic adoption at 52%</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-caution mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Urban vs Rural</p>
                    <p className="text-xs text-muted-foreground">25% more chemicals in urban areas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Trend</p>
                    <p className="text-xs text-muted-foreground">Gradual decrease in chemical use since 2018</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Avg Chemical Exposure", value: "59.5%", trend: "↓ 8%" },
            { label: "Organic Growth", value: "12%", trend: "↑ YoY" },
            { label: "High Risk Products", value: "35%", trend: "↓ 5%" },
            { label: "States Analyzed", value: "28", trend: "Complete" }
          ].map((stat, index) => (
            <Card key={index} className="glass-card card-hover text-center p-4">
              <div className="text-lg font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-safe font-medium">{stat.trend}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompactRegionalAnalysis;
