import { LucideIcon, ArrowUpRight } from "lucide-react";
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
        "group relative bg-card rounded-2xl border border-border/50 border-t-[5px] p-6 flex flex-col gap-6 cursor-pointer overflow-hidden",
        "transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20",
        completed ? "border-t-success" : "border-t-accent"
      )}
    >
      {/* Background Accent Gradient */}
      <div className={cn(
        "absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-5 transition-opacity group-hover:opacity-10",
        completed ? "bg-success" : "bg-accent"
      )} />

      {/* Top Header: Icon & Status */}
      <div className="flex items-start justify-between relative z-10">
        <div className={cn(
          "p-3 rounded-xl transition-all shadow-sm",
          completed ? "bg-success/5 text-success border border-success/10" : "bg-muted/50 text-foreground/70"
        )}>
          <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </div>

        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-tight uppercase transition-colors",
          completed 
            ? "bg-success/10 border-success/20 text-success" 
            : "bg-accent/10 border-accent/20 text-accent"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", completed ? "bg-success" : "bg-accent animate-pulse")} />
          {completed ? "Completed" : "In Progress"}
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 min-h-[3rem] flex items-center">
        <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>

      {/* Footer: Last Updated & Open Link */}
      <div className="mt-auto flex items-end justify-between relative z-10 border-t border-border/50 pt-4">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Last Updated</p>
          <div className={cn(
            "px-2.5 py-1 rounded text-[10px] font-bold tracking-tight border",
            completed ? "bg-success/5 border-success/10 text-success" : "bg-accent/5 border-accent/10 text-accent"
          )}>
            {lastUpdated || "Not available"}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/40 group-hover:text-primary transition-all uppercase tracking-widest bg-muted/30 px-3 py-1.5 rounded-full">
          <span>Open</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
