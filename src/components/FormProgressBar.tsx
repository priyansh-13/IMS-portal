import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface SectionProgress {
  name: string;
  totalFields: number;
  filledFields: number;
  completionPercentage: number;
}

interface FormProgressBarProps {
  sections: SectionProgress[];
  overallPercentage: number;
  activeSection?: string;
}

export function FormProgressBar({ sections, overallPercentage, activeSection }: FormProgressBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">
          Form Progress
        </span>
        <span className="text-sm font-bold text-accent">{overallPercentage}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-700 ease-out"
          style={{ width: `${Math.max(overallPercentage, 2)}%` }}
        />
      </div>
      {/* Section markers */}
      <div className="flex gap-3 mt-3 flex-wrap">
        {sections.map((section) => {
          const isComplete = section.completionPercentage >= 100;
          const isInProgress = section.completionPercentage > 0 && !isComplete;
          const isActive = activeSection === section.name;
          return (
            <div
              key={section.name}
              className={cn(
                "flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors",
                isActive && "ring-2 ring-accent/30",
                isComplete
                  ? "border-success/30 bg-success/5 text-success"
                  : isInProgress
                  ? "border-accent/30 bg-accent/5 text-accent"
                  : "border-border bg-muted/50 text-muted-foreground"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : isInProgress ? (
                <Clock className="h-3 w-3" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              <span className="font-medium">{section.name}</span>
              <span className="text-[10px] opacity-70">{section.completionPercentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
