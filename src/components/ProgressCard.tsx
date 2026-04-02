import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  lastUpdated?: string;
  link?: string;
}

function getStatusLabel(progress: number) {
  if (progress >= 100) return { text: "Completed", className: "bg-success/10 text-success border-success/20" };
  if (progress > 0) return { text: "In Progress", className: "bg-accent/10 text-accent border-accent/20" };
  return { text: "Not Started", className: "bg-muted text-muted-foreground border-border" };
}

function getBorderColor(progress: number) {
  if (progress >= 100) return "border-t-success";
  if (progress >= 50) return "border-t-accent";
  return "border-t-warning";
}

function getBarGradient(progress: number) {
  if (progress >= 100) return "from-success to-success/80";
  if (progress >= 50) return "from-accent to-accent/80";
  return "from-warning to-warning/80";
}

export function ProgressCard({ title, icon: Icon, progress, lastUpdated, link }: ProgressCardProps) {
  const navigate = useNavigate();
  const status = getStatusLabel(progress);

  return (
    <div
      onClick={() => link && navigate(link)}
      className={cn(
        "bg-card rounded-xl border border-border border-t-4 p-6 cursor-pointer relative group",
        "hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col",
        getBorderColor(progress)
      )}
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", status.className)}>
          {status.text}
        </span>
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-5">
        <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200 shrink-0">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground leading-snug pr-16 mt-1">{title}</h3>
      </div>

      {/* Progress bar */}
      <div className="space-y-4 mt-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Progress</span>
            <span className="text-sm font-bold text-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out shadow-sm",
                getBarGradient(progress)
              )}
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>
        </div>

        {lastUpdated && (
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Last Sync</span>
            <span className="text-[10px] text-accent font-bold bg-accent/5 px-2 py-0.5 rounded shadow-sm border border-accent/10">
              {lastUpdated}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
