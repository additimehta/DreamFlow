
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  caption?: string;
  className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  value, 
  maxValue, 
  size = 80, 
  strokeWidth = 6, 
  color = "#8B5CF6", 
  label,
  caption,
  className
}) => {
  const radius = size / 2 - strokeWidth;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference - progress * circumference;
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="flex flex-col items-center mt-2">
        <span className="text-xl font-bold">{value}</span>
        {label && <span className="text-xs text-muted-foreground mt-0.5">{label}</span>}
        {caption && <span className="text-xs text-muted-foreground/70 mt-0.5">{caption}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
