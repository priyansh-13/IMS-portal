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
}

type StepStatus = "completed" | "pending" | "not-started";

const getStepStatus = (step: StepInfo): StepStatus => {
  if (step.completionPercentage >= 100) return "completed";
  if (step.completionPercentage > 0) return "pending";
  return "not-started";
};

export function FormStepper({ steps, currentStep, onStepClick, overallPercentage }: FormStepperProps) {
  const normalizedProgress = Math.min(Math.max(overallPercentage, 0), 100);

  const connectorColor = (index: number) => {
    const leftStatus = getStepStatus(steps[index]);
    if (leftStatus === "completed") return "bg-accent";
    if (leftStatus === "pending") return "bg-accent/60";
    return "bg-border";
  };

  const circleStyles = (status: StepStatus, isCurrent: boolean) => {
    if (status === "completed") return "bg-success text-success-foreground border-success";
    if (status === "pending") return cn("bg-accent text-accent-foreground border-accent", isCurrent && "shadow-lg shadow-accent/25");
    return cn("bg-white text-muted-foreground border-border", isCurrent && "ring-2 ring-accent/40");
  };

  const textColor = (status: StepStatus, isCurrent: boolean) => {
    if (status === "completed") return "text-success";
    if (status === "pending" || isCurrent) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="px-6 pt-6 pb-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between text-sm font-semibold text-foreground mb-2">
          <span>Overall Progress</span>
          <span className="text-accent">{normalizedProgress}%</span>
        </div>

        <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-700"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>

        <div className="mt-7 overflow-x-auto pb-4 -mx-1 px-1 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible custom-scrollbar">
          <div className="flex items-start min-w-[600px] sm:min-w-0">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            const isCurrent = index === currentStep;

            return (
//               <div key={step.name} className="flex-1 flex flex-col items-center gap-3 min-w-0">

//                 <div className="flex items-center w-full gap-2">
//                   {index !== 0 && (
//                     <div className={cn("flex-1 h-[3px] rounded-full transition-colors duration-300", connectorColor(index - 1))} />
//                   )}
//                   <button
//                     onClick={() => onStepClick(index)}
//                     className={cn(
//                       "h-11 w-11 shrink-0 rounded-full border-2 text-sm font-semibold transition-all duration-200 flex items-center justify-center",
//                       circleStyles(status, isCurrent)
//                     )}
//                     aria-current={isCurrent ? "step" : undefined}
//                   >
//                     {index + 1}
//                   </button>
//                   {index !== steps.length - 1 && (
//                     <div className={cn("flex-1 h-[3px] rounded-full transition-colors duration-300", connectorColor(index))} />
//                   )}
//                 </div>
//                 {/* <p className={cn("text-[12px] font-semibold uppercase tracking-wide text-center truncate", textColor(status, isCurrent))}> */}
//                   <p
//   className={cn(
//     "text-[11px] font-semibold uppercase tracking-wide text-center break-words leading-tight max-w-[90px]",
//     textColor(status, isCurrent)
//   )}
// >
//                   {step.name}
//                 </p>
//               </div>
<div className="flex-1 flex flex-col items-center min-w-0">

  {/* Top row: connectors + circle */}
  <div className="relative w-full flex items-center justify-center">

    {index !== 0 && (
      <div className={cn(
        "absolute left-0 right-1/2 h-[3px] rounded-full",
        connectorColor(index - 1)
      )} />
    )}

    <button
      onClick={() => onStepClick(index)}
      className={cn(
        "relative z-10 h-11 w-11 rounded-full border-2 flex items-center justify-center",
        circleStyles(status, isCurrent)
      )}
    >
      {index + 1}
    </button>

    {index !== steps.length - 1 && (
      <div className={cn(
        "absolute left-1/2 right-0 h-[3px] rounded-full",
        connectorColor(index)
      )} />
    )}

  </div>

  {/* Label */}
  <p
    onClick={() => onStepClick(index)}
    className={cn(
      "mt-2 text-[11px] text-center leading-tight line-clamp-2 h-[32px] cursor-pointer hover:text-accent transition-colors",
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
