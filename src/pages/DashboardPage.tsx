import { useEffect, useState, useMemo } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ProgressCard } from "@/components/ProgressCard";
import {
  Building2,
  BookOpen,
  Users,
  UserCog,
  Landmark,
  Award,
  CreditCard,
  Lightbulb,
  FlaskConical,
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

const overallProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

type FilterType = "All" | "In Progress" | "Completed" | "Not Started";

export default function DashboardPage() {
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

  return (
    <TopLayout>
      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-8 py-6 shadow-md border-b-4 border-accent">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-12 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 left-24 w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Welcome, Example University!</h1>
            <p className="text-sm opacity-80 mt-1 max-w-lg">
              Centralised data exchange for Higher Educational Institutions (HEIs)
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Overall Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
            
            <div className="flex flex-wrap gap-2 text-primary-foreground mt-2 md:mt-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/20 border border-success/30 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm hover:bg-success/30 transition-colors">
                <span>✅</span>
                <span>{completedModules.length} Completed</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm hover:bg-accent/30 transition-colors">
                <span>🔄</span>
                <span>{inProgressModules.length} In Progress</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm hover:bg-white/20 transition-colors">
                <span>⏸</span>
                <span>{notStartedModules.length} Not Started</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full bg-primary-foreground/15 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-success transition-all duration-1000 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="p-4 lg:p-6 relative">
        <div className="flex flex-col gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">
              <h2 className="text-lg font-semibold text-foreground">Modules Overview</h2>
              
              <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-full border border-border">
                {(["All", "In Progress", "Completed", "Not Started"] as FilterType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                      activeFilter === tab
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mb-4">
              Showing {filteredModules.length} of {modules.length} modules
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity duration-300">
              {filteredModules.map((mod) => (
                <div key={mod.title} className="animate-in fade-in duration-500 fill-mode-backwards h-full">
                  <ProgressCard {...mod} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TopLayout>
  );
}
