
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, ShieldAlert, Sparkles } from "lucide-react";
import { ChemicalData, ChemicalSeverity } from "@/types/chemical";

const getSeverityColor = (severity: ChemicalSeverity) => {
  switch (severity) {
    case "high":
      return "text-danger bg-danger/10";
    case "medium":
      return "text-caution bg-caution/10";
    case "low":
      return "text-safe bg-safe/10";
  }
};

const getTimeframeIcon = (timeframe: string) => {
  switch (timeframe) {
    case "immediate":
      return <AlertTriangle className="h-4 w-4" />;
    case "short-term":
      return <Clock className="h-4 w-4" />;
    case "long-term":
      return <ShieldAlert className="h-4 w-4" />;
    default:
      return null;
  }
};

const ChemicalDetails = ({ chemical }: { chemical: ChemicalData }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{chemical.name}</CardTitle>
          <Badge variant="outline">{chemical.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{chemical.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Health Impacts</h3>
          <div className="space-y-4">
            {chemical.healthImpacts.map((impact, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  {getTimeframeIcon(impact.timeframe)}
                  <span className="font-medium">{impact.description}</span>
                  <Badge className={getSeverityColor(impact.severity)}>
                    {impact.severity} risk
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {impact.symptoms.map((symptom, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Safety Guidelines</h3>
          <ul className="space-y-2">
            {chemical.safetyGuidelines.map((guideline, index) => (
              <li key={index} className="flex items-start gap-2">
                <ShieldAlert className="h-5 w-5 mt-0.5 text-primary" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Healthier Alternatives</h3>
          <div className="flex flex-wrap gap-2">
            {chemical.alternatives.map((alternative, index) => (
              <Badge key={index} className="bg-safe/10 text-safe">
                <Sparkles className="h-3 w-3 mr-1" />
                {alternative}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChemicalDetails;
