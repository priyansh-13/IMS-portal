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
        "bg-card rounded-2xl border border-border border-t-[5px] p-6 cursor-pointer relative group overflow-hidden",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col",
        getBorderColor(progress)
      )}
    >
      {/* Status badge: in-flow; mobile stacked, desktop inline right-aligned */}
      <div className="flex justify-end mb-3 md:hidden">
        <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", status.className)}>
          {status.text}
        </span>
      </div>

      {/* Icon + Title + Badge (desktop) */}
      <div className="flex items-start gap-3 mb-5 flex-wrap">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-300 shrink-0">
          <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-[170px]">
          <h3 className="text-sm font-semibold text-foreground leading-snug mt-1 whitespace-normal pr-0 md:pr-6">
            {title}
          </h3>
        </div>
        <div className="hidden md:flex items-start justify-end shrink-0">
          <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", status.className)}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-4 mt-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Progress</span>
            <span className="text-sm font-bold text-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner">
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
          <div className="pt-3 border-t border-border flex items-center justify-between gap-2 flex-wrap">
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
