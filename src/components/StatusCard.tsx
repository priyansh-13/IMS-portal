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
        "group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden cursor-pointer flex flex-col p-5 min-h-[140px]",
        "shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300"
      )}
    >
      {/* Decorative top right corner blur glow */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3 transition-opacity duration-300",
        status.glow,
        "group-hover:opacity-20"
      )} />

      {/* Top Section */}
      <div className="relative flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-[12px] border transition-colors duration-300 shadow-sm",
          status.iconBg
        )}>
          <Icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", status.iconColor)} />
        </div>
        <span className={cn(
          "flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors",
          status.pill
        )}>
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
          {status.text}
        </span>
      </div>

      {/* Middle Content */}
      <div className="flex-1 pb-4">
        <h3 className="relative text-[14px] font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2 pr-2">
          {title}
        </h3>
      </div>

      {/* Footer */}
      <div className="relative mt-auto flex items-end justify-between border-t border-slate-100 pt-3">
        <div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Last Updated</p>
          <p className="text-xs text-slate-600 font-semibold">{lastUpdated || "Pending"}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 group-hover:text-primary transition-colors">
          OPEN <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
