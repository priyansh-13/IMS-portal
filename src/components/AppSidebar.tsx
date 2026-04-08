import { useEffect, useMemo } from "react";
import {
  Home,
  Building2,
  BookOpen,
  Users,
  UserCog,
  Landmark,
  Award,
  CreditCard,
  Lightbulb,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Phone,
  FileCheck,
  UsersRound,
  IndianRupee,
  MapPin,
  HeartHandshake,
  FileText,
  GraduationCap,
  LucideIcon,
  Menu,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface SubMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  progress?: number;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  {
    title: "Institutional Registry And Recognition",
    url: "/institutional-registry",
    icon: Building2,
    subItems: [
      { title: "Institution Details", url: "/institutional-registry/institution-details", icon: Building2 },
      { title: "Contact Details", url: "/institutional-registry/contact-details", icon: Phone },
      { title: "Parent Organization/Ownership", url: "/institutional-registry/parent-org", icon: Users },
      { title: "Affiliation/Approval", url: "/institutional-registry/affiliation", icon: FileCheck },
      { title: "Committee(s)", url: "/institutional-registry/committees", icon: UsersRound },
      { title: "Financial Details", url: "/institutional-registry/financial", icon: IndianRupee },
      { title: "Centres / Campuses", url: "/institutional-registry/centres", icon: MapPin },
      { title: "Student Support & Institutional Activities", url: "/institutional-registry/student-support", icon: HeartHandshake },
    ],
  },
  {
    title: "Programme And Course Details",
    url: "/programme-course",
    icon: BookOpen,
    progress: 50,
    subItems: [
      { title: "Programme-Course Details", url: "/programme-course/details", icon: BookOpen },
      { title: "Programme Summary", url: "/programme-course/summary", icon: FileText },
      { title: "Course Curriculum", url: "/programme-course/curriculum", icon: GraduationCap },
    ],
  },
  {
    title: "Student Information And Mobility System",
    url: "/student-info",
    icon: Users,
    progress: 75,
    subItems: [
      { title: "Student Enrolment", url: "/student-info/enrolment", icon: Users },
      { title: "Foreign Student Enrolment", url: "/student-info/foreign-enrolment", icon: MapPin },
      { title: "Examination Result", url: "/student-info/examination", icon: FileText },
      { title: "Academic Performance & Research", url: "/student-info/performance", icon: GraduationCap },
      { title: "Extended Curricular Engagements", url: "/student-info/curricular", icon: Award },
      { title: "Student And Employee Welfare", url: "/student-info/welfare", icon: HeartHandshake },
      { title: "Internship-Placement", url: "/student-info/internship", icon: Building2 },
    ],
  },
  {
    title: "Faculty And Human Resources Registry",
    url: "/faculty-hr",
    icon: UserCog,
    progress: 75,
    subItems: [
      { title: "Faculty Registry", url: "/faculty-hr/registry", icon: UserCog },
      { title: "Service Records", url: "/faculty-hr/records", icon: FileCheck },
    ],
  },
  {
    title: "Infrastructure And Resources",
    url: "/infrastructure",
    icon: Landmark,
    progress: 100,
    subItems: [
      { title: "Building Info", url: "/infrastructure/buildings", icon: Landmark },
      { title: "Lab Details", icon: FlaskConical, url: "/infrastructure/labs" },
    ],
  },
  {
    title: "Quality Assurance And Accreditation Hub",
    url: "/quality-assurance",
    icon: Award,
    progress: 100,
    subItems: [
      { title: "Accreditation Hub", url: "/quality-assurance/accreditation", icon: Award },
    ],
  },
  {
    title: "Academic Bank of Credits (ABC) and NCrF Integration",
    url: "/abc-ncrf",
    icon: CreditCard,
    progress: 30,
    subItems: [
      { title: "Credit Registry", url: "/abc-ncrf/credits", icon: CreditCard },
    ],
  },
  {
    title: "Innovation,Industry & Projects",
    url: "/innovation",
    icon: Lightbulb,
    progress: 75,
    subItems: [
      { title: "Project Hub", url: "/innovation/projects", icon: Lightbulb },
    ],
  },
  {
    title: "Research And Outcome",
    url: "/research",
    icon: FlaskConical,
    progress: 50,
    subItems: [
      { title: "Research Registry", url: "/research/registry", icon: FlaskConical },
    ],
  },
];

export function AppSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: { collapsed?: boolean; onToggle?: () => void; mobileOpen?: boolean; onMobileClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: MenuItem) =>
    location.pathname === item.url ||
    (item.url !== "/dashboard" && location.pathname.startsWith(item.url));

  // Determine which items to show
  const activeModule = menuItems.find(item => item.url !== "/dashboard" && location.pathname.startsWith(item.url));

  const itemsToShow = useMemo(() => {
    // If we're on dashboard, show everything
    if (location.pathname === "/dashboard" || !activeModule) {
      return menuItems;
    }
    // If we're in a module, only show Dashboard and the active module
    return menuItems.filter(item => item.url === "/dashboard" || item.url === activeModule.url);
  }, [activeModule?.url]); // Only re-calculate if the active module itself changes

  useEffect(() => {
    onMobileClose?.();
  }, [location.pathname]);

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col shrink-0 transition-[width] duration-200 z-50",
        "lg:sticky lg:top-0 lg:translate-x-0",
        collapsed ? "lg:w-14" : "lg:w-64",
        "fixed inset-y-0 left-0 w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Top Section / Toggle Button */}
      <div className={cn(
        "p-4 border-b border-border flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2 overflow-hidden">
              <img src="/images/ONOD-logo.png" alt="ONOD" className="h-8 w-auto object-contain shrink-0" />
              <span className="text-xl font-bold text-primary tracking-tight">ONOD</span>
            </div>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <button
            onClick={onToggle}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
            aria-label="Expand sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Menu Area */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        {itemsToShow.map((item) => {
          const active = isActive(item);

          return (
            <div key={item.url} className="px-2 mb-1">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200 group relative",
                        active
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", active ? "text-primary-foreground" : "text-muted-foreground")} />
                      {!collapsed && (
                        <span className="min-w-0 flex-1 text-left text-sm font-medium leading-snug whitespace-normal break-words">
                          {item.title}
                        </span>
                      )}
                    </button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent
                      side="right"
                      className="bg-primary text-primary-foreground border-primary font-medium shadow-xl px-3 py-1.5 text-xs z-[60]"
                      sideOffset={12}
                    >
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              {/* Sub Items - Show when expanded and active */}
              {!collapsed && active && item.subItems && (
                <div className="mt-1 ml-6 pl-2 space-y-1 border-l border-primary/20">
                  {item.subItems.map((subItem) => {
                    const subActive = location.pathname === subItem.url;
                    return (
                      <button
                        key={subItem.url}
                        onClick={() => navigate(subItem.url)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors",
                          subActive
                            ? "bg-primary/10 text-primary font-bold shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <subItem.icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 text-left leading-snug whitespace-normal break-words">
                          {subItem.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer for Expanded State */}
      {!collapsed && (
        <div className="p-4 border-t border-border space-y-4">
          <div className="grid grid-cols-5 gap-2 px-1">
            <img src="/images/UGC_India_Logo.png" alt="UGC" className="h-6 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            <img src="/images/AICTE.png" alt="AICTE" className="h-6 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            <img src="/images/NCTE.png" alt="NCTE" className="h-6 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            <img src="/images/NAAC.png" alt="NAAC" className="h-6 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            <img src="/images/NIRF.png" alt="NIRF" className="h-6 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
          </div>
          <p className="text-[10px] text-muted-foreground text-center font-medium">© 2026 ONOD Platform</p>
        </div>
      )}
    </aside>
  );
}
