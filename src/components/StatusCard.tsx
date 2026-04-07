import { LucideIcon, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  icon: LucideIcon;
  completed: boolean;
  lastUpdated?: string;
  link?: string;
}

export function StatusCard({ title, icon: Icon, completed, lastUpdated, link }: StatusCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => link && navigate(link)}
      className={cn(
        "bg-card rounded-xl shadow-sm border border-border/80 px-3 lg:px-4 py-2.5 lg:py-3 cursor-pointer flex items-center gap-3",
        "hover:bg-primary/5 hover:border-primary/25 hover:shadow-sm transition-all duration-200 group overflow-hidden",
        "border-l-4 border-l-primary/70"
      )}
    >
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors shrink-0 hidden sm:block">
        <Icon className="h-4 w-4 text-primary/90 group-hover:scale-105 transition-transform" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xs lg:text-sm font-semibold text-foreground truncate">{title}</h3>
      </div>

      {lastUpdated && (
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 pr-3 border-r border-border/60">
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Last Updated</span>
          <span className="text-[9px] text-primary/90 font-semibold bg-primary/8 px-1.5 py-0.5 rounded border border-primary/15 whitespace-nowrap">
            {lastUpdated}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 shrink-0 pl-1 lg:pl-3">
        {completed ? (
          <div className="flex items-center gap-1 bg-success/12 px-2 py-0.5 rounded-full border border-success/25">
            <CheckCircle2 className="h-3.5 w-3.5 text-success/90" />
            <span className="text-[9px] font-semibold text-success/90 uppercase tracking-wider hidden sm:block">Done</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-warning/10 px-2 py-0.5 rounded-full border border-warning/25">
            <Circle className="h-3.5 w-3.5 text-warning/80" />
            <span className="text-[9px] font-semibold text-warning/90 uppercase tracking-wider hidden sm:block">Pending</span>
          </div>
        )}
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary/80 transition-colors hidden sm:block" />
      </div>
    </div>
  );
}
