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
        "bg-card rounded-xl shadow-sm border border-border px-3 lg:px-4 py-2.5 lg:py-3 cursor-pointer flex items-center gap-3",
        "hover:bg-muted/30 hover:border-primary/20 hover:shadow-md hover:translate-x-1 transition-all duration-300 group overflow-hidden",
        completed ? "border-l-4 border-l-success" : "border-l-4 border-l-warning"
      )}
    >
      <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0 hidden sm:block">
        <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xs lg:text-sm font-semibold text-foreground truncate">{title}</h3>
      </div>

      {lastUpdated && (
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 pr-3 border-r border-border/60">
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Sync:</span>
          <span className="text-[9px] text-accent font-bold bg-accent/5 px-1.5 py-0.5 rounded border border-accent/10 whitespace-nowrap">
            {lastUpdated}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 shrink-0 pl-1 lg:pl-3">
        {completed ? (
          <div className="flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span className="text-[9px] font-bold text-success uppercase tracking-wider hidden sm:block">Completed</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-warning/10 px-2 py-0.5 rounded-full border border-warning/20">
            <Circle className="h-3.5 w-3.5 text-warning" />
            <span className="text-[9px] font-bold text-warning uppercase tracking-wider hidden sm:block">Pending</span>
          </div>
        )}
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors hidden sm:block" />
      </div>
    </div>
  );
}
