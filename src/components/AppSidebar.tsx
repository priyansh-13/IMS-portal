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
    title: "Institutional Registry",
    url: "/institutional-registry",
    icon: Building2,
    progress: 25,
    subItems: [
      { title: "Institution Details", url: "/institutional-registry/institution-details", icon: Building2 },
      { title: "Contact Details", url: "/institutional-registry/contact-details", icon: Phone },
      { title: "Parent Organization", url: "/institutional-registry/parent-org", icon: Users },
      { title: "Affiliation/Approval", url: "/institutional-registry/affiliation", icon: FileCheck },
      { title: "Committees", url: "/institutional-registry/committees", icon: UsersRound },
      { title: "Financial Details", url: "/institutional-registry/financial", icon: IndianRupee },
      { title: "Centres / Campuses", url: "/institutional-registry/centres", icon: MapPin },
      { title: "Student Support", url: "/institutional-registry/student-support", icon: HeartHandshake },
      { title: "Regulatory Info", url: "/institutional-registry/regulatory", icon: ShieldCheck },
    ],
  },
  {
    title: "Programme & Course",
    url: "/programme-course",
    icon: BookOpen,
    progress: 50,
    subItems: [
      { title: "Programme-Course Details", url: "/programme-course", icon: BookOpen },
      { title: "Programme Summary", url: "/programme-course/summary", icon: FileText },
      { title: "Course Curriculum", url: "/programme-course/curriculum", icon: GraduationCap },
    ],
  },
  { title: "Student Information", url: "/student-info", icon: Users, progress: 75 },
  { title: "Faculty & HR Registry", url: "/faculty-hr", icon: UserCog, progress: 75 },
  { title: "Infrastructure", url: "/infrastructure", icon: Landmark, progress: 100 },
  { title: "Quality Assurance", url: "/quality-assurance", icon: Award, progress: 100 },
  { title: "ABC & NCrF", url: "/abc-ncrf", icon: CreditCard, progress: 30 },
  { title: "Innovation & Projects", url: "/innovation", icon: Lightbulb, progress: 75 },
  { title: "Research & Outcome", url: "/research", icon: FlaskConical, progress: 50 },
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

export function AppSidebar({ collapsed, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (url: string) => {
    setExpandedMenus((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const isActive = (item: MenuItem) =>
    location.pathname === item.url ||
    (item.url !== "/dashboard" && location.pathname.startsWith(item.url));

  const isExpanded = (url: string) =>
    expandedMenus.includes(url) || location.pathname.startsWith(url);

  return (
    <aside
      className={cn(
        "min-h-screen bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <Landmark className="h-8 w-8 text-primary shrink-0" />
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-primary tracking-tight">ONOD</h1>
              <p className="text-[10px] leading-tight">
                <span className="text-accent font-semibold">One </span>
                <span className="text-success font-semibold">Nation </span>
                <span className="text-accent font-semibold">One </span>
                <span className="text-success font-semibold">Data</span>
              </p>
            </div>
          )}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
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
              <button
                onClick={() => {
                  if (hasSubItems && !collapsed) {
                    toggleMenu(item.url);
                  } else {
                    navigate(item.url);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted"
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="leading-tight flex-1 text-left truncate">{item.title}</span>
                    <div className="flex items-center gap-1.5">
                      <ProgressDot progress={item.progress} />
                      {hasSubItems && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            expanded && "rotate-180"
                          )}
                        />
                      )}
                    </div>
                  </>
                )}
              </button>

              {/* Submenu accordion */}
              {hasSubItems && expanded && !collapsed && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-border space-y-0.5 animate-accordion-down overflow-hidden">
                  {item.subItems!.map((sub) => {
                    const subActive = location.pathname === sub.url;
                    return (
                      <NavLink
                        key={sub.url}
                        to={sub.url}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-all duration-200",
                          subActive
                            ? "bg-accent/10 text-accent font-medium border-l-2 border-accent -ml-[2px] pl-[14px]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                        activeClassName=""
                      >
                        <sub.icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{sub.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">© 2026 ONOD Platform</p>
        </div>
      )}
    </aside>
  );
}
