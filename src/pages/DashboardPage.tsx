import { useEffect, useState } from "react";
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
  Building2,
  BookOpen,
  Users,
  UserCog,
  Landmark,
  Award,
  CreditCard,
  Lightbulb,
  FlaskConical,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);

  const completedModules = modules.filter((m) => m.progress >= 100);
  const inProgressModules = modules.filter((m) => m.progress > 0 && m.progress < 100);
  const notStartedModules = modules.filter((m) => m.progress <= 0);

  useEffect(() => {
    const handler = () => setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <TopLayout>
      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-8 py-6 shadow-md border-b-4 border-accent">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-12 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 left-24 w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Welcome HEI-U-0123!</h1>
            <p className="text-sm opacity-80 mt-1 max-w-lg">
              Centralised data exchange for Higher Educational Institutions (HEIs)
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Overall Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-12 h-12 rounded-full border-[3px] border-primary-foreground/30 flex items-center justify-center bg-primary-foreground/10 backdrop-blur-sm cursor-default shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                    <span className="text-sm font-bold">
                      {completedModules.length}/{modules.length}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs space-y-2 text-xs">
                  <div className="font-semibold text-foreground">Module status</div>
                  <div>
                    <span className="font-semibold text-success">Completed:</span>{" "}
                    {completedModules.length > 0 ? completedModules.map((m) => m.title).join(", ") : "None"}
                  </div>
                  <div>
                    <span className="font-semibold text-accent">In Progress:</span>{" "}
                    {inProgressModules.length > 0 ? inProgressModules.map((m) => m.title).join(", ") : "None"}
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Not Started:</span>{" "}
                    {notStartedModules.length > 0 ? notStartedModules.map((m) => m.title).join(", ") : "None"}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="mt-3 w-full bg-primary-foreground/15 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-success transition-all duration-1000 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="p-4 lg:p-6 relative">

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: modules, take maximum space */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground mb-4">All Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {modules.map((mod) => (
                <ProgressCard key={mod.title} {...mod} />
              ))}
            </div>
          </div>

          {/* Right: notifications + downloads - Sticky on desktop */}
          {/* Right sidebar removed as it moved to header */}
        </div>
      </div>
    </TopLayout>
  );
}
