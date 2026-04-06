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

function getStatusInfo(progress: number) {
  if (progress >= 100) return { text: "Completed", className: "bg-success/10 text-success border-success/20", ring: "text-success", isPulse: false };
  if (progress > 0) return { text: "In Progress", className: "bg-accent/10 text-accent border-accent/20", ring: progress >= 50 ? "text-warning" : "text-accent", isPulse: true };
  return { text: "Not Started", className: "bg-muted text-muted-foreground border-border", ring: "text-muted", isPulse: false };
}

export function ProgressCard({ title, icon: Icon, progress, lastUpdated, link }: ProgressCardProps) {
  const navigate = useNavigate();
  const status = getStatusInfo(progress);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      onClick={() => link && navigate(link)}
      className={cn(
        "bg-card rounded-2xl border border-border p-6 cursor-pointer relative group overflow-hidden",
        "flex flex-col min-h-[180px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300",
        "hover:bg-[radial-gradient(circle_at_top_right,hsla(214,80%,21%,0.03),transparent)]"
      )}
    >
      {/* Ghost percentage watermark */}
      <div className="text-8xl font-black opacity-[0.04] absolute bottom-2 right-3 select-none pointer-events-none z-0">
        {progress}
      </div>

      <div className="flex items-start justify-between mb-4 z-10 relative">
        <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 64 64">
            <circle
              className="text-muted/30"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
            <circle
              className={cn("transition-all duration-1000 ease-out", status.ring)}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
          </svg>
          <div className="text-foreground z-10 rounded-full bg-background/50 p-2 border border-border/50 backdrop-blur-sm">
            <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300 text-primary" />
          </div>
        </div>

        <div className={cn("flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border", status.className)}>
          {status.isPulse && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
            </span>
          )}
          {status.text}
        </div>
      </div>

      <div className="flex-1 z-10 relative mb-4">
        <h3 className="text-sm font-semibold text-foreground leading-snug pr-4">
          {title}
        </h3>
      </div>

      <div className="z-10 relative mt-auto border-t border-border pt-4">
        {lastUpdated ? (
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-1">Last Sync</span>
            <span className="text-xs font-semibold text-foreground">{lastUpdated}</span>
          </div>
        ) : (
          <div className="h-8" />
        )}
      </div>

      {/* Slide-up active button overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out border-t border-border flex items-center justify-between z-20">
         <span className="text-sm font-semibold text-foreground">Open Module</span>
         <span className="text-lg leading-none font-bold text-foreground">→</span>
      </div>
    </div>
  );
}
