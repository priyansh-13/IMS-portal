import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export interface StepInfo {
  name: string;
  completionPercentage: number;
}

interface FormStepperProps {
  steps: StepInfo[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function FormStepper({ steps, currentStep, onStepClick }: FormStepperProps) {
  return (
    <div className="w-full py-4 px-6">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-success to-accent transition-all duration-700"
          style={{ width: `${(currentStep / Math.max(steps.length - 1, 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isComplete = step.completionPercentage >= 100;
          const isCurrent = index === currentStep;
          const isInProgress = step.completionPercentage > 0 && !isComplete;
          const isPast = index < currentStep;

          return (
            <button
              key={step.name}
              onClick={() => onStepClick(index)}
              className="relative z-10 flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isComplete
                    ? "bg-success border-success text-success-foreground"
                    : isCurrent
                    ? "bg-accent border-accent text-accent-foreground scale-110 shadow-lg shadow-accent/30"
                    : isPast
                    ? "bg-accent/20 border-accent text-accent"
                    : "bg-card border-border text-muted-foreground group-hover:border-accent/50"
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isInProgress ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div className="text-center max-w-[100px]">
                <p
                  className={cn(
                    "text-[11px] font-medium leading-tight transition-colors",
                    isCurrent ? "text-accent" : isComplete ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
                <p className={cn(
                  "text-[10px] mt-0.5",
                  isComplete ? "text-success" : isInProgress ? "text-accent" : "text-muted-foreground"
                )}>
                  {step.completionPercentage}%
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
