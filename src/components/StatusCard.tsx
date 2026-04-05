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
        "bg-card rounded-xl shadow-sm border border-border px-4 lg:px-5 py-3 lg:py-4 cursor-pointer flex items-center gap-3 lg:gap-4",
        "hover:bg-muted/30 hover:border-primary/20 hover:shadow-md hover:translate-x-1 transition-all duration-300 group",
        completed ? "border-l-[5px] lg:border-l-[6px] border-l-success" : "border-l-[5px] lg:border-l-[6px] border-l-warning"
      )}
    >
      <div className="p-2.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0 hidden sm:block">
        <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm lg:text-base font-semibold text-foreground truncate">{title}</h3>
      </div>

      {lastUpdated && (
        <div className="hidden md:flex items-center gap-2 shrink-0 pr-4 lg:pr-6 border-r border-border/60">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Sync:</span>
          <span className="text-[10px] text-accent font-bold bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
            {lastUpdated}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 shrink-0 pl-2 lg:pl-6">
        {completed ? (
          <div className="flex items-center gap-1.5 bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-[10px] font-bold text-success uppercase tracking-wider hidden sm:block">Completed</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-warning/10 px-2.5 py-1 rounded-full border border-warning/20">
            <Circle className="h-4 w-4 text-warning" />
            <span className="text-[10px] font-bold text-warning uppercase tracking-wider hidden sm:block">Pending</span>
          </div>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors hidden sm:block" />
      </div>
    </div>
  );
}
