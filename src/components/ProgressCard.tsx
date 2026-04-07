import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProgressCardProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  lastUpdated?: string;
  link?: string;
}

function getStatus(progress: number) {
  if (progress >= 100)
    return {
      text: "Complete",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      bar: "from-emerald-500 to-emerald-400",
      top: "border-t-emerald-500",
    };
  if (progress > 0)
    return {
      text: "In Progress",
      pill: "bg-blue-50 text-blue-700 border-blue-200",
      dot: "bg-blue-500",
      bar: "from-[hsl(214,85%,30%)] to-[hsl(210,80%,52%)]",
      top: "border-t-[hsl(214,85%,30%)]",
    };
  return {
    text: "Not Started",
    pill: "bg-slate-50 text-slate-500 border-slate-200",
    dot: "bg-slate-300",
    bar: "from-slate-300 to-slate-200",
    top: "border-t-slate-300",
  };
}

export function ProgressCard({ title, icon: Icon, progress, lastUpdated, link }: ProgressCardProps) {
  const navigate = useNavigate();
  const status = getStatus(progress);

  return (
    <div
      onClick={() => link && navigate(link)}
      className={cn(
        "group relative bg-white rounded-2xl border border-slate-200/80 border-t-[3px] overflow-hidden cursor-pointer flex flex-col",
        "shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        status.top
      )}
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative p-5 flex flex-col flex-1">
        {/* Top: Icon + Status badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-primary/6 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-200 shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className={cn(
            "flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border",
            status.pill
          )}>
            <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
            {status.text}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-[13px] font-semibold text-slate-800 leading-snug line-clamp-2 h-[38px] mb-5">{title}</h3>
        </div>

        {/* Progress section */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Completion</span>
            <span className={cn(
              "text-xs font-bold tabular-nums",
              progress >= 100 ? "text-emerald-600" : progress > 0 ? "text-primary" : "text-slate-400"
            )}>{progress}%</span>
          </div>
          {/* Track */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out", status.bar)}
              style={{ width: `${Math.max(progress, 2)}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          {lastUpdated ? (
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">Last Updated</p>
              <p className="text-[10px] text-slate-600 font-medium mt-0.5">{lastUpdated}</p>
            </div>
          ) : <div />}
          <div className="flex items-center gap-1 text-[10px] font-semibold text-primary/60 group-hover:text-primary transition-colors">
            Open <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
