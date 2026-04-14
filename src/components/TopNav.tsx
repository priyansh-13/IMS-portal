import { useState, useRef, useEffect } from "react";
import {
  Home, Building2, BookOpen, Users, UserCog, Landmark,
  Award, CreditCard, Lightbulb, FlaskConical, ChevronDown,
  Phone, FileCheck, UsersRound, IndianRupee, MapPin,
  HeartHandshake, ShieldCheck, FileText, GraduationCap,
  LucideIcon, Menu, X,
} from "lucide-react";
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
      { title: "Committee(s)", url: "/institutional-registry/committees", icon: UsersRound },
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
  { title: "Student Info", url: "/student-info", icon: Users, progress: 75 },
  { title: "Faculty & HR", url: "/faculty-hr", icon: UserCog, progress: 75 },
  { title: "Infrastructure", url: "/infrastructure", icon: Landmark, progress: 100 },
  { title: "Quality Assurance", url: "/quality-assurance", icon: Award, progress: 100 },
  { title: "ABC & NCrF", url: "/abc-ncrf", icon: CreditCard, progress: 30 },
  { title: "Innovation", url: "/innovation", icon: Lightbulb, progress: 75 },
  { title: "Research", url: "/research", icon: FlaskConical, progress: 50 },
];

function ProgressDot({ progress }: { progress?: number }) {
  if (progress === undefined) return null;
  const color = progress >= 100 ? "bg-white/70" : progress >= 50 ? "bg-white/50" : "bg-white/30";
  return <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", color)} />;
}

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (item: MenuItem) =>
    location.pathname === item.url ||
    (item.url !== "/dashboard" && location.pathname.startsWith(item.url));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Find active parent for secondary nav
  const activeParent = menuItems.find(
    (item) => item.subItems && (location.pathname === item.url || location.pathname.startsWith(item.url))
  );

  return (
    <>
      {/* Primary Nav */}
      <nav className="sticky top-0 z-40 bg-primary shadow-md">
        <div className="flex items-center h-14 px-4">
          {/* Logo */}
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 mr-6 shrink-0 h-10">
            <img src="/images/ONOD-logo.png" alt="ONOD Logo" className="h-[28px] w-auto" />
          </button>

          {/* Desktop menu */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
            {menuItems.map((item) => {
              const active = isActive(item);
              const hasSubItems = !!item.subItems?.length;
              const isDropdownOpen = openDropdown === item.url;

              return (
                <div key={item.url} className="relative">
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        setOpenDropdown(isDropdownOpen ? null : item.url);
                      } else {
                        navigate(item.url);
                        setOpenDropdown(null);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span>{item.title}</span>
                    <ProgressDot progress={item.progress} />
                    {hasSubItems && (
                      <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                    )}
                  </button>

                  {/* Dropdown */}
                  {hasSubItems && isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden animate-scale-in z-50">
                      <div className="py-1">
                        {item.subItems!.map((sub) => {
                          const subActive = location.pathname === sub.url;
                          return (
                            <button
                              key={sub.url}
                              onClick={() => {
                                navigate(sub.url);
                                setOpenDropdown(null);
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                                subActive
                                  ? "bg-primary/8 text-primary font-medium"
                                  : "text-foreground hover:bg-muted"
                              )}
                            >
                              <sub.icon className="h-4 w-4 shrink-0" />
                              <span>{sub.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto p-2 text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-primary-foreground/10 max-h-[70vh] overflow-y-auto overflow-x-hidden animate-fade-in">
            {menuItems.map((item) => (
              <div key={item.url}>
                <button
                  onClick={() => {
                    if (item.subItems?.length) {
                      setOpenDropdown(openDropdown === item.url ? null : item.url);
                    } else {
                      navigate(item.url);
                      setMobileOpen(false);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                    isActive(item)
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.subItems?.length && (
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openDropdown === item.url && "rotate-180")} />
                  )}
                </button>
                {item.subItems && openDropdown === item.url && (
                  <div className="bg-primary-foreground/5">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.url}
                        onClick={() => { navigate(sub.url); setMobileOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-8 py-2.5 text-xs transition-colors",
                          location.pathname === sub.url
                            ? "text-accent font-medium"
                            : "text-primary-foreground/60 hover:text-primary-foreground"
                        )}
                      >
                        <sub.icon className="h-3.5 w-3.5" />
                        <span>{sub.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Secondary nav for active module with subitems */}
      {activeParent?.subItems && (
        <div className="sticky top-14 z-30 bg-card border-b border-border shadow-sm">
          <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
            {activeParent.subItems.map((sub) => {
              const subActive = location.pathname === sub.url;
              return (
                <button
                  key={sub.url}
                  onClick={() => navigate(sub.url)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
                    subActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <sub.icon className="h-3.5 w-3.5" />
                  <span>{sub.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
