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
    if (status === "pending" || isCurrent) return isTransparent ? "text-white font-bold drop-shadow-md" : "text-primary font-bold";
    return isTransparent ? "text-white/60" : "text-muted-foreground";
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
          <span className="text-white">{normalizedProgress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className={cn(
          "h-2 rounded-full overflow-hidden transition-all",
          isTransparent ? "bg-white/10" : "bg-muted"
        )}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>


      </div>
    </div>
  );
}
