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
    <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2.5 shadow-sm">
      {/* Compact top row: label + bar + percentage */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
          Overall Progress
        </span>
        <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]"
            style={{ width: `${Math.max(overallPercentage, 1)}%` }}
          />
        </div>
        <span className="text-[11px] font-bold text-white shrink-0">{overallPercentage}%</span>
      </div>

      {/* Section pills — smaller and more compact */}
      <div className="flex gap-1.5 flex-wrap">
        {sections.map((section) => {
          const isComplete = section.completionPercentage >= 100;
          const isInProgress = section.completionPercentage > 0 && !isComplete;
          const isActive = activeSection === section.name;
          return (
            <div
              key={section.name}
              className={cn(
                "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                isActive && "ring-1 ring-primary/30 ring-offset-1",
                isComplete
                  ? "border-[hsl(142,35%,48%)]/25 bg-[hsl(142,35%,48%)]/6 text-[hsl(142,35%,36%)]"
                  : isInProgress
                  ? "border-primary/20 bg-primary/5 text-primary"
                  : "border-border bg-muted/60 text-muted-foreground"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-2.5 w-2.5" />
              ) : isInProgress ? (
                <Clock className="h-2.5 w-2.5" />
              ) : (
                <Circle className="h-2.5 w-2.5" />
              )}
              <span className="font-medium">{section.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
