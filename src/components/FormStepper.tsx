import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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

  return (
    <div className={cn(
      "w-full transition-all duration-500 select-none",
      isTransparent ? "bg-transparent p-0" : "bg-card/50 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50 shadow-sm"
    )}>
      <div className="flex flex-col gap-1.5">
        {/* Numbered Steps Row */}
        <div className="flex items-start justify-between relative px-2">
          {/* Connector Line Backdrop */}
          <div className="absolute top-3 left-8 right-8 h-[1px] bg-white/10 -z-0" />
          
          {steps.map((step, idx) => {
            const isCompleted = step.completionPercentage >= 100;
            const isCurrent = currentStep === idx;
            const isPast = idx < currentStep;

            return (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-1 relative z-10 group cursor-pointer"
                style={{ width: `${100 / steps.length}%` }}
                onClick={() => onStepClick(idx)}
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-black transition-all duration-300 border relative",
                    isCurrent 
                      ? "bg-white text-primary border-white shadow-[0_0_8px_rgba(255,255,255,0.3)] z-20" 
                      : isCompleted || isPast
                      ? "bg-emerald-500 border-emerald-400 text-white"
                      : "bg-white/5 border-white/10 text-white/30 hover:border-white/30 hover:bg-white/10 hover:text-white/60"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 stroke-[4] animate-in zoom-in duration-300" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                
                <div className="flex flex-col items-center gap-0">
                  <span className={cn(
                    "text-[7px] font-black text-center uppercase tracking-normal max-w-[60px] leading-[1.1] transition-all duration-300",
                    isCurrent ? "text-white opacity-100" : "text-white/40 group-hover:text-white/60"
                  )}>
                    {step.name}
                  </span>
                </div>
                
                {/* Connector Line Fill */}
                {idx < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-3 left-[calc(50%+14px)] w-[calc(100%-28px)] h-[1px] transition-all duration-700 ease-in-out origin-left",
                    isPast ? "bg-emerald-400 scale-x-100" : "bg-transparent scale-x-0"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar */}
        <div className="flex items-center gap-3 px-4">
          <span className="text-[7px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">Progress</span>
          <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden flex-1">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-1000 ease-out relative"
              style={{ width: `${normalizedProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
            </div>
          </div>
          <span className="text-[8px] font-black text-white/80 tabular-nums">{normalizedProgress}%</span>
        </div>
      </div>
    </div>
  );
}
