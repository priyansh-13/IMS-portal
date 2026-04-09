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

  const status = completed
    ? {
        text: "Complete",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        glow: "bg-emerald-400",
        iconBg: "bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100",
        iconColor: "text-emerald-600",
      }
    : {
        text: "To Do",
        pill: "bg-slate-50 text-slate-600 border-slate-200",
        dot: "bg-slate-400",
        glow: "bg-primary/40",
        iconBg: "bg-primary/5 border-primary/10 group-hover:bg-primary/10",
        iconColor: "text-primary",
      };

  return (
    <div
      onClick={() => link && navigate(link)}
      className={cn(
        "group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden cursor-pointer flex items-center p-3.5 sm:p-4 min-h-[84px] gap-4",
        "shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-300"
      )}
    >
      {/* Decorative top right corner blur glow */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3 transition-opacity duration-300",
        status.glow,
        "group-hover:opacity-20"
      )} />

      {/* Icon Section */}
      <div className={cn(
        "relative p-2.5 rounded-[12px] border transition-colors duration-300 shadow-sm shrink-0",
        status.iconBg
      )}>
        <Icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", status.iconColor)} />
      </div>

      {/* Content Section */}
      <div className="relative flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors truncate pr-2">
          {title}
        </h3>
        <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
          Last Updated: <span className="font-semibold text-slate-600">{lastUpdated || "Pending"}</span>
        </p>
      </div>

      {/* Action Section */}
      <div className="relative flex flex-col items-end justify-center shrink-0 gap-2 pl-3 border-l border-slate-100">
        <span className={cn(
          "flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors",
          status.pill
        )}>
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
          {status.text}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 group-hover:text-primary transition-colors mr-0.5">
          OPEN <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
