
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, ShieldAlert, Sparkles, AlertCircle, Info } from "lucide-react";
import type { ChemicalData, ChemicalSeverity, RiskEffect } from "@/types/chemical";
import { Progress } from "@/components/ui/progress";

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

const RiskLevel = ({ level }: { level: number }) => {
  const getColor = (level: number) => {
    if (level >= 8) return "bg-danger";
    if (level >= 6) return "bg-caution";
    if (level >= 4) return "bg-warning";
    return "bg-safe";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Risk Level</span>
        <span className="text-sm text-muted-foreground">{level}/10</span>
      </div>
      <Progress value={level * 10} className={getColor(level)} />
    </div>
  );
};

const RiskEffect = ({ effect }: { effect: RiskEffect }) => (
  <div className="flex items-start gap-2 py-2">
    {effect.longTerm ? (
      <Clock className="h-4 w-4 mt-1 text-caution" />
    ) : (
      <AlertCircle className="h-4 w-4 mt-1 text-warning" />
    )}
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="text-sm">{effect.description}</span>
        <Badge variant="outline" className={
          effect.level >= 8 
            ? "text-danger" 
            : effect.level >= 6 
              ? "text-caution" 
              : "text-warning"
        }>
          Level {effect.level}/10
        </Badge>
      </div>
    </div>
  </div>
);

const ChemicalDetails = ({ chemical }: { chemical: ChemicalData }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">{chemical.name}</CardTitle>
            <Badge variant="outline">{chemical.category}</Badge>
          </div>
          <RiskLevel level={chemical.riskLevel} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Description
          </h3>
          <p className="text-muted-foreground">{chemical.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Analysis
          </h3>
          <div className="space-y-4">
            {chemical.risks.map((risk, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{risk.name}</span>
                  <Badge variant="outline" className={
                    risk.level >= 8 
                      ? "text-danger" 
                      : risk.level >= 6 
                        ? "text-caution" 
                        : "text-warning"
                  }>
                    Risk Level {risk.level}/10
                  </Badge>
                </div>
                <div className="space-y-1">
                  {risk.effects.map((effect, idx) => (
                    <RiskEffect key={idx} effect={effect} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Health Impacts
          </h3>
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
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Safety Guidelines
          </h3>
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
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Healthier Alternatives
          </h3>
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
