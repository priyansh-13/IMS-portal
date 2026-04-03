import { useState } from "react";
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  FileCheck,
  UsersRound,
  IndianRupee,
  MapPin,
  HeartHandshake,
  ShieldCheck,
  FileText,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
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
    progress: 25,
    subItems: [
      { title: "Institution Details", url: "/institutional-registry/institution-details", icon: Building2 },
      { title: "Contact Details", url: "/institutional-registry/contact-details", icon: Phone },
      { title: "Parent Organization/Ownership", url: "/institutional-registry/parent-org", icon: Users },
      { title: "Affiliation/Approval", url: "/institutional-registry/affiliation", icon: FileCheck },
      { title: "Committees", url: "/institutional-registry/committees", icon: UsersRound },
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
      { title: "Programme-Course Details", url: "/programme-course", icon: BookOpen },
      { title: "Programme Summary", url: "/programme-course/summary", icon: FileText },
      { title: "Course Curriculum", url: "/programme-course/curriculum", icon: GraduationCap },
    ],
  },
  {
    title: "Student Information And Mobility",
    url: "/student-info",
    icon: Users,
    progress: 75,
    subItems: [
      { title: "Student Details", url: "/student-info/details", icon: Users },
      { title: "Enrollment Info", url: "/student-info/enrollment", icon: FileText },
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

function ProgressDot({ progress }: { progress?: number }) {
  if (progress === undefined) return null;
  const color = progress >= 100
    ? "bg-success"
    : progress >= 50
    ? "bg-accent"
    : "bg-warning";
  return (
    <span className={cn("h-2 w-2 rounded-full shrink-0", color)} />
  );
}

export function AppSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: { collapsed?: boolean; onToggle?: () => void; mobileOpen?: boolean; onMobileClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});

  const isExpanded = (url: string) => {
    if (expandedStates[url] !== undefined) {
      return expandedStates[url];
    }
    // Auto-expand if active route matches
    return location.pathname.startsWith(url) && url !== "/dashboard";
  };

  const toggleMenu = (url: string) => {
    setExpandedStates((prev) => ({
      ...prev,
      [url]: !isExpanded(url),
    }));
  };

  const isActive = (item: MenuItem) =>
    location.pathname === item.url ||
    (item.url !== "/dashboard" && location.pathname.startsWith(item.url));

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col shrink-0 transition-transform duration-300 z-50",
        // Desktop
        "lg:sticky lg:top-0 lg:translate-x-0",
        collapsed ? "lg:w-16" : "lg:w-72",
        // Mobile
        "fixed inset-y-0 left-0 w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src="/images/ONOD-logo.png" alt="ONOD" className={cn("h-8 w-auto object-contain shrink-0", collapsed && "h-6")} />
          {!collapsed && (
            <div className="animate-fade-in sr-only">
              <h1 className="text-xl font-bold text-primary tracking-tight">ONOD</h1>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {onToggle && (
            <button
              onClick={onToggle}
              className="hidden lg:block p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
      </div>

      {/* Menu */}
      <nav className="flex-1 py-2 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const active = isActive(item);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const expanded = hasSubItems && isExpanded(item.url);

          return (
            <div key={item.url} className="mx-2 my-0.5">
              {/* Main menu item */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      navigate(item.url);
                      if (hasSubItems && !collapsed) {
                        toggleMenu(item.url);
                      }
                    }}
                    className={cn(
                      "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0 mt-0.5" />
                    {!collapsed && (
                      <>
                        <span className="leading-snug flex-1 text-left whitespace-normal break-words">{item.title}</span>
                        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                          <ProgressDot progress={item.progress} />
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-300",
                              expanded && "rotate-180"
                            )}
                          />
                        </div>
                      </>
                    )}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent 
                    side="right" 
                    className="bg-primary text-primary-foreground border-primary font-medium shadow-lg px-4 py-2"
                    sideOffset={10}
                  >
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>


              {/* Submenu accordion */}
              {hasSubItems && expanded && !collapsed && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-border space-y-0.5 animate-accordion-down overflow-hidden">
                   {item.subItems!.map((sub) => (
                      <NavLink
                        key={sub.url}
                        to={sub.url}
                        className={({ isActive: subActive }) =>
                          cn(
                            "group flex items-start gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200",
                            subActive
                              ? "bg-accent/10 text-accent font-semibold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )
                        }
                      >
                        <sub.icon className="h-3.5 w-3.5 shrink-0 opacity-70 mt-0.5" />
                        <span className="whitespace-normal leading-normal">{sub.title}</span>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Government Bodies Logos */}
      {!collapsed && (
        <div className="bodiesico-sidebar">
          <img src="/images/UGC_India_Logo.png" alt="UGC" className="dbmenu-icon" />
          <img src="/images/AICTE.png" alt="AICTE" className="dbmenu-icon" />
          <img src="/images/NCTE.png" alt="NCTE" className="dbmenu-icon" />
          <img src="/images/NAAC.png" alt="NAAC" className="dbmenu-icon" />
          <img src="/images/NIRF.png" alt="NIRF" className="dbmenu-icon" />
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">© 2026 ONOD Platform</p>
        </div>
      )}
    </aside>
  );
}
