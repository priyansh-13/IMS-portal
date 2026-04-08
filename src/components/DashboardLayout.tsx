import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Breadcrumbs } from "./Breadcrumbs";

interface DashboardLayoutProps {
  children: ReactNode;
}

const MAIN_PATHS = ["/dashboard", "/institutional-registry", "/programme-course", "/student-info"];

const shouldCollapseForPath = (pathname: string) => MAIN_PATHS.includes(pathname);

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => shouldCollapseForPath(location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);

    // Automatically collapse sidebar for specific main paths, expand for others.
    // Use a guarded update to avoid redundant state writes on route transitions.
    const shouldCollapse = shouldCollapseForPath(location.pathname);
    setSidebarCollapsed((prev) => (prev === shouldCollapse ? prev : shouldCollapse));
  }, [location.pathname]);

  return (
    <div className="h-screen flex w-full overflow-hidden bg-background relative">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <div className="flex-none z-30">
          <AppHeader onMenuClick={() => setMobileMenuOpen(true)} />
          <Breadcrumbs />
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
