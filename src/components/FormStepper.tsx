import { Fragment } from "react";
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

const STEP_STYLES: Record<StepStatus, { circle: string; text: string; connector: string }> = {
  completed: {
    circle: "border-success bg-success text-success-foreground",
    text: "text-success",
    connector: "bg-success",
  },
  pending: {
    circle: "border-accent bg-accent text-accent-foreground",
    text: "text-accent",
    connector: "bg-accent/80",
  },
  "not-started": {
    circle: "border-border bg-card text-muted-foreground",
    text: "text-muted-foreground",
    connector: "bg-border",
  },
};

const getStepStatus = (step: StepInfo): StepStatus => {
  if (step.completionPercentage >= 100) return "completed";
  if (step.completionPercentage > 0) return "pending";
  return "not-started";
};

export function FormStepper({ steps, currentStep, onStepClick, overallPercentage }: FormStepperProps) {
  const normalizedProgress = Math.min(Math.max(overallPercentage, 0), 100);

  return (
    <div className="px-6 py-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between text-[13px] font-semibold text-foreground mb-3">
          <span>Overall Progress</span>
          <span className="text-accent">{normalizedProgress}%</span>
        </div>

        <div className="h-2 rounded-full bg-muted/40">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>

        <div className="mt-6 flex items-center">
          {steps.map((step, index) => {
            const rawStatus = getStepStatus(step);
            const isCurrent = index === currentStep;
            const status: StepStatus = rawStatus === "not-started" && isCurrent ? "pending" : rawStatus;
            const style = STEP_STYLES[status];

            return (
              <Fragment key={step.name}>
                <button
                  onClick={() => onStepClick(index)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                    style.circle,
                    isCurrent ? "scale-105 shadow-lg shadow-accent/20" : ""
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {index + 1}
                </button>

                {index < steps.length - 1 && (
                  <div className={cn("h-px flex-1 rounded-full mx-2", STEP_STYLES[status].connector)} />
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {steps.map((step) => (
            <span key={`${step.name}-label`} className="flex-1 text-center">
              {step.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
