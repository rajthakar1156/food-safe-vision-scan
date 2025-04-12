
import React from "react";

interface ChemicalCircleProps {
  cx: number;
  cy: number;
  name: string;
  size: number;
  risk: number;
}

export const ChemicalCircle = ({ cx, cy, name, size, risk }: ChemicalCircleProps) => {
  // Determine color based on risk level
  const getColor = (risk: number) => {
    if (risk >= 75) return "#EF4444"; // High risk - red
    if (risk >= 60) return "#FBBF24"; // Medium risk - yellow
    return "#2DD4BF"; // Low risk - teal
  };

  const radius = Math.min(Math.max(size / 3, 15), 40);
  const color = getColor(risk);
  
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={color}
        fillOpacity={0.6}
        stroke={color}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={radius < 20 ? "8px" : "10px"}
        fontWeight="bold"
      >
        {name}
      </text>
    </g>
  );
};

interface ChemicalSliderProps {
  label: string;
  value: number;
  color: string;
  total: number;
}

export const ChemicalSlider = ({ label, value, color, total }: ChemicalSliderProps) => {
  const percentage = (value / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{value}/{total}</span>
      </div>
      <div className="h-3 w-full rounded-full overflow-hidden bg-secondary">
        <div 
          className="h-full transition-all duration-500 ease-in-out"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
};
