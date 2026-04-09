import { useEffect, useState, useMemo } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ProgressCard } from "@/components/ProgressCard";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2, BookOpen, Users, UserCog, Landmark,
  Award, CreditCard, Lightbulb, FlaskConical,
  Download, Bell, CheckCircle2, Clock, AlertCircle,
  TrendingUp, LayoutGrid, FileDown, ChevronRight,
  Layers, Activity,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  { title: "Institutional Registry and Recognition", icon: Building2, progress: 25, lastUpdated: "02:30 PM, 04 Feb 2026", link: "/institutional-registry" },
  { title: "Programme and Course Details", icon: BookOpen, progress: 50, lastUpdated: "01:15 PM, 04 Feb 2026", link: "/programme-course" },
  { title: "Student Information and Mobility", icon: Users, progress: 75, lastUpdated: "11:20 AM, 03 Feb 2026", link: "/student-info" },
  { title: "Faculty and Human Resources Registry", icon: UserCog, progress: 75, lastUpdated: "10:45 AM, 02 Feb 2026", link: "/faculty-hr" },
  { title: "Infrastructure and Resources", icon: Landmark, progress: 100, lastUpdated: "04:50 PM, 05 Feb 2026", link: "/infrastructure" },
  { title: "Quality Assurance and Accreditation Hub", icon: Award, progress: 100, lastUpdated: "09:15 AM, 04 Feb 2026", link: "/quality-assurance" },
  { title: "Academic Bank of Credits (ABC) and NCrF Integration", icon: CreditCard, progress: 30, lastUpdated: "03:20 PM, 01 Feb 2026", link: "/abc-ncrf" },
  { title: "Innovation, Industry & Projects", icon: Lightbulb, progress: 75, lastUpdated: "12:40 PM, 31 Jan 2026", link: "/innovation" },
  { title: "Research & Outcome", icon: FlaskConical, progress: 50, lastUpdated: "05:10 PM, 02 Feb 2026", link: "/research" },
];

const notifications = [
  { type: "info", text: "Institutional Registry form updated successfully.", time: "2m ago" },
  { type: "pending", text: "Financial Details section awaiting review.", time: "15m ago" },
  { type: "alert", text: "ABC & NCrF Integration is less than 50% complete.", time: "1h ago" },
  { type: "info", text: "Programme and Course Details synced with AICTE portal.", time: "2h ago" },
  { type: "pending", text: "Student Information data validation pending.", time: "3h ago" },
  { type: "info", text: "Infrastructure and Resources marked complete.", time: "5h ago" },
  { type: "alert", text: "Regulatory Information deadline approaching.", time: "1d ago" },
];

const overallProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

function CircularProgress({ value, size = 88 }: { value: number; size?: number }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className="-rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
      <circle cx="40" cy="40" r={r} fill="none"
        stroke="rgba(255,255,255,0.88)" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

type FilterType = "All" | "In Progress" | "Completed" | "Not Started";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const completedModules = useMemo(() => modules.filter((m) => m.progress >= 100), []);
  const inProgressModules = useMemo(() => modules.filter((m) => m.progress > 0 && m.progress < 100), []);
  const notStartedModules = useMemo(() => modules.filter((m) => m.progress <= 0), []);

  const filteredModules = useMemo(() => {
    switch (activeFilter) {
      case "Completed": return completedModules;
      case "In Progress": return inProgressModules;
      case "Not Started": return notStartedModules;
      default: return modules;
    }
  }, [activeFilter, completedModules, inProgressModules, notStartedModules]);

  const [showNotifications, setShowNotifications] = useState(true);
  const [showDownloads, setShowDownloads] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    {
      label: "Total Modules",
      value: modules.length,
      Icon: LayoutGrid,
      color: "text-primary",
      bg: "bg-primary/8",
      border: "border-primary/12",
      iconBg: "bg-primary/10",
    },
    {
      label: "Completed",
      value: completedModules.length,
      Icon: CheckCircle2,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200/60",
      iconBg: "bg-emerald-100",
    },
    {
      label: "In Progress",
      value: inProgressModules.length,
      Icon: Activity,
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200/60",
      iconBg: "bg-blue-100",
    },
    {
      label: "Not Started",
      value: notStartedModules.length,
      Icon: Layers,
      color: "text-slate-500",
      bg: "bg-slate-50",
      border: "border-slate-200/60",
      iconBg: "bg-slate-100",
    },
  ];

  return (
    <TopLayout>
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden select-none"
        style={{ background: "linear-gradient(135deg, hsl(214,85%,18%) 0%, hsl(218,78%,26%) 45%, hsl(222,65%,34%) 100%)" }}>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -40%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 50%)" }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-px opacity-[0.06]"
          style={{ background: "linear-gradient(90deg, transparent, white, transparent)" }} />

        <div className="relative px-7 lg:px-10 py-3  flex items-center justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-0">
            {/* Eyebrow chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/12 bg-white/8 text-white/65 text-[10px] uppercase tracking-[0.12em] font-semibold mb-3">
              <TrendingUp className="h-3 w-3" />
              ONOD Platform — Academic Year 2025–26
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
              Welcome, National University of India
            </h1>
            {/* <p className="text-white/55 text-sm mt-1.5 max-w-lg leading-relaxed">
              HEI Code: <span className="text-white/85 font-semibold">HEI-U-0123</span> &nbsp;·&nbsp;
              Centralised data exchange platform for Higher Educational Institutions
            </p> */}

            {/* Progress bar */}
            {/* <div className="mt-5 flex items-center gap-3 max-w-sm">
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: mounted ? `${overallProgress}%` : "0%",
                    background: "linear-gradient(90deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.90) 100%)",
                  }}
                />
              </div>
              <span className="text-white font-bold text-sm tabular-nums shrink-0">{overallProgress}%</span>
              <span className="text-white/45 text-[10px] uppercase tracking-wider shrink-0">Overall</span>
            </div> */}

            {/* Quick stat chips */}
            {/* <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: `${completedModules.length} Completed`, color: "bg-emerald-500/20 text-emerald-200 border-emerald-400/20" },
                { label: `${inProgressModules.length} In Progress`, color: "bg-white/10 text-white/75 border-white/15" },
                { label: `${notStartedModules.length} Not Started`, color: "bg-white/6 text-white/45 border-white/10" },
              ].map((c) => (
                <span key={c.label} className={`inline-flex text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${c.color}`}>
                  {c.label}
                </span>
              ))}
            </div> */}
          </div>

          {/* Circular progress ring */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative shrink-0 cursor-default group">
                  <CircularProgress value={mounted ? overallProgress : 0} size={96} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-extrabold text-xl leading-none">{overallProgress}%</span>
                    <span className="text-white/40 text-[9px] uppercase tracking-[0.12em] mt-0.5">Done</span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs space-y-1.5 text-xs p-3">
                <p className="font-semibold text-foreground mb-1">Module Status</p>
                <p><span className="font-semibold text-emerald-600">✓ Completed:</span> {completedModules.length > 0 ? completedModules.map(m => m.title).join(", ") : "None"}</p>
                <p><span className="font-semibold text-primary">◷ In Progress:</span> {inProgressModules.length > 0 ? inProgressModules.map(m => m.title).join(", ") : "None"}</p>
                <p><span className="font-semibold text-slate-400">○ Not Started:</span> {notStartedModules.length > 0 ? notStartedModules.map(m => m.title).join(", ") : "None"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* ── Stat Cards Row ── */}
      {/* <div className="px-6 lg:px-10 pt-4 pb-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, Icon, color, bg, border, iconBg }) => (
            <div key={label}
              className={`flex items-center gap-3 rounded-xl border ${border} ${bg} px-3 py-2.5 bg-white shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`${iconBg} p-2 rounded-lg shrink-0`}>
                <Icon className={`h-3.5 w-3.5 ${color}`} />
              </div>
              <div>
                <p className={`text-xl font-extrabold leading-none ${color}`}>{value}</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── Main Grid ── */}
      <div className="px-6 lg:px-10 py-6">
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Left: Module cards */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">All Modules</h2>
                <p className="text-xs text-slate-400 mt-0.5">Showing {filteredModules.length} of {modules.length} modules</p>
              </div>
              
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-full border border-slate-200 font-medium">
                {(["All", "In Progress", "Completed", "Not Started"] as FilterType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200",
                      activeFilter === tab
                        ? "bg-white text-primary font-bold shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-slate-200/50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-opacity duration-300">
              {filteredModules.map((mod) => (
                <div key={mod.title} className="animate-in fade-in duration-500 fill-mode-backwards h-full">
                  <ProgressCard {...mod} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TopLayout>
  );
}
