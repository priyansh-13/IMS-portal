import { cn } from "@/lib/utils";

export interface StepInfo {
  name: string;
  completionPercentage: number;
}

interface FormStepperProps {
  steps: StepInfo[];
  currentStep: number;
  onStepClick: (index: number) => void;
  overallPercentage: number;
  variant?: "default" | "transparent";
  size?: "default" | "sm";
}

type StepStatus = "completed" | "pending" | "not-started";

const getStepStatus = (step: StepInfo): StepStatus => {
  if (step.completionPercentage >= 100) return "completed";
  if (step.completionPercentage > 0) return "pending";
  return "not-started";
};

export function FormStepper({ 
  steps, 
  currentStep, 
  onStepClick, 
  overallPercentage,
  variant = "default",
  size = "default" 
}: FormStepperProps) {
  const normalizedProgress = Math.min(Math.max(overallPercentage, 0), 100);
  const isTransparent = variant === "transparent";

  const textColor = (status: StepStatus, isCurrent: boolean) => {
    if (status === "completed") return "text-success font-semibold";
    if (status === "pending" || isCurrent) return "text-accent-foreground font-bold";
    return isTransparent ? "text-white/80" : "text-muted-foreground";
  };

  return (
    <div className="w-full transition-all duration-300 bg-transparent p-0">
      <div className="transition-all p-0">
        {/* Compact Progress Bar */}
        <div className="flex items-center gap-3 text-xs font-semibold mb-1">
          <span className={isTransparent ? "text-white/90" : "text-foreground"}>Overall Progress</span>
          <div className={cn(
            "flex-1 h-1.5 rounded-full overflow-hidden",
            isTransparent ? "bg-white/10" : "bg-muted"
          )}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-700 shadow-[0_0_6px_rgba(var(--accent-rgb),0.2)]"
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>
          <span className="text-accent-foreground tabular-nums">{normalizedProgress}%</span>
        </div>

        {/* Compact Stepper Steps */}
        <div className="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible mt-2">
          <div className="flex items-start min-w-[500px] sm:min-w-0">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex-1 flex flex-col items-center min-w-0">
                <div className="relative w-full flex items-center justify-center">
                  {/* Left Connector */}
                  {index !== 0 && (
                    <div className={cn(
                      "absolute left-0 right-1/2 rounded-full transition-all h-[2px]",
                      status === "completed" || status === "pending" || isCurrent 
                        ? "bg-accent shadow-[0_0_4px_rgba(var(--accent-rgb),0.2)]" 
                        : (isTransparent ? "bg-white/20" : "bg-muted")
                    )} />
                  )}

                  {/* Circle Indicator - compact */}
                  <button
                    onClick={() => onStepClick(index)}
                    className={cn(
                      "relative z-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      "h-6 w-6 text-[10px] font-bold",
                      status === "completed" 
                        ? "bg-success text-success-foreground border-success shadow-[0_0_6px_rgba(var(--success-rgb),0.2)]" 
                        : status === "pending" 
                        ? "bg-accent text-accent-foreground border-accent shadow-md shadow-accent/25" 
                        : (isTransparent ? "bg-white text-[#1e3a8a] border-white/40" : "bg-white text-[#1e3a8a] border-slate-200")
                    )}
                  >
                    {status === "completed" ? "✓" : index + 1}
                  </button>

                  {/* Right Connector */}
                  {index !== steps.length - 1 && (
                    <div className={cn(
                      "absolute left-1/2 right-0 rounded-full transition-all h-[2px]",
                      status === "completed" 
                        ? "bg-accent shadow-[0_0_4px_rgba(var(--accent-rgb),0.2)]" 
                        : (isTransparent ? "bg-white/20" : "bg-muted")
                    )} />
                  )}
                </div>

                {/* Label - compact */}
                <p
                  onClick={() => onStepClick(index)}
                  className={cn(
                    "mt-1 text-center leading-tight line-clamp-2 h-[24px] cursor-pointer hover:text-accent transition-colors",
                    "text-[9px]",
                    textColor(status, isCurrent)
                  )}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
