import { LucideIcon, CheckCircle2, Circle } from "lucide-react";
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
        "bg-card rounded-xl shadow-sm border border-border border-t-4 p-5 cursor-pointer relative",
        "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group",
        completed ? "border-t-success" : "border-t-secondary"
      )}
    >
      <div className="absolute top-3 right-3">
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-success" />
        ) : (
          <Circle className="h-5 w-5 text-destructive/60" />
        )}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground pr-6 leading-tight">{title}</h3>
      </div>
      {lastUpdated && (
        <p className="text-xs text-muted-foreground">
          Last Updated: <span className="text-accent font-medium">{lastUpdated}</span>
        </p>
      )}
    </div>
  );
}
