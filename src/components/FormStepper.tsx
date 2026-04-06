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
  const isSmall = size === "sm";

  const textColor = (status: StepStatus, isCurrent: boolean) => {
    if (status === "completed") return isTransparent ? "text-success font-semibold" : "text-success font-semibold";
    if (status === "pending" || isCurrent) return isTransparent ? "text-accent-foreground font-bold" : "text-accent-foreground font-bold";
    return isTransparent ? "text-white/80" : "text-muted-foreground";
  };

  return (
    <div className={cn(
      "w-full transition-all duration-300",
      isTransparent ? "bg-transparent p-0" : "bg-transparent px-6 pt-2 pb-4"
    )}>
      <div className={cn(
        "transition-all",
        isTransparent ? "p-0" : "p-6"
      )}>
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between text-sm font-semibold mb-2">
          <span className={isTransparent ? "text-white/90" : "text-foreground"}>Overall Progress</span>
          <span className="text-accent-foreground">{normalizedProgress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className={cn(
          "h-2 rounded-full overflow-hidden transition-all",
          isTransparent ? "bg-white/10" : "bg-muted"
        )}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-700 shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>

        {/* Stepper Steps */}
        <div className={cn(
          "overflow-x-auto pb-4 -mx-1 px-1 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible custom-scrollbar",
          isSmall ? "mt-4" : "mt-7"
        )}>
          <div className="flex items-start min-w-[600px] sm:min-w-0">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex-1 flex flex-col items-center min-w-0">
                <div className="relative w-full flex items-center justify-center">
                  {/* Left Connector */}
                  {index !== 0 && (
                    <div className={cn(
                      "absolute left-0 right-1/2 rounded-full transition-all",
                      isSmall ? "h-[2px]" : "h-[3px]",
                      status === "completed" || status === "pending" || isCurrent 
                        ? "bg-accent shadow-[0_0_4px_rgba(var(--accent-rgb),0.2)]" 
                        : (isTransparent ? "bg-white/20" : "bg-muted")
                    )} />
                  )}

                  {/* Circle Indicator */}
                  <button
                    onClick={() => onStepClick(index)}
                    className={cn(
                      "relative z-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      isSmall ? "h-8 w-8 text-xs" : "h-11 w-11 text-sm font-bold",
                      status === "completed" 
                        ? "bg-success text-success-foreground border-success shadow-[0_0_10px_rgba(var(--success-rgb),0.2)]" 
                        : status === "pending" 
                        ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/25" 
                        : (isTransparent ? "bg-white text-[#1e3a8a] border-white/40" : "bg-white text-[#1e3a8a] border-slate-200")
                    )}
                  >
                    {status === "completed" ? "✓" : index + 1}
                  </button>

                  {/* Right Connector */}
                  {index !== steps.length - 1 && (
                    <div className={cn(
                      "absolute left-1/2 right-0 rounded-full transition-all",
                      isSmall ? "h-[2px]" : "h-[3px]",
                      status === "completed" 
                        ? "bg-accent shadow-[0_0_4px_rgba(var(--accent-rgb),0.2)]" 
                        : (isTransparent ? "bg-white/20" : "bg-muted")
                    )} />
                  )}
                </div>

                {/* Label */}
                <p
                  onClick={() => onStepClick(index)}
                  className={cn(
                    "mt-3 text-center leading-tight line-clamp-2 h-[32px] cursor-pointer hover:text-accent transition-colors",
                    isSmall ? "text-[10px]" : "text-[11px]",
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
