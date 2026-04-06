import { Link, useLocation } from "react-router-dom";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  login: "Sign In",
  "institutional-registry": "Institutional Registry And Recognition",
  "institution-details": "Institution Details",
  "programme-course": "Programme And Course Details",
  "student-info": "Student Information And Mobility",
  "faculty-hr": "Faculty And Human Resources Registry",
  infrastructure: "Infrastructure",
  "quality-assurance": "Quality Assurance And Accreditation Hub",
  "abc-ncrf": "Academic Bank Of Credits (ABC) And NCrF Integration",
  innovation: "Innovation, Industry & Projects",
  research: "Research & Outcome",
};

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const normalizedSegments = segments[0] === "dashboard" ? segments.slice(1) : segments;

  const crumbs = normalizedSegments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const label = breadcrumbLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (chr) => chr.toUpperCase());
    return { label, path };
  });

  if (!normalizedSegments.length) {
    return (
      <nav className="bg-card border-b border-border px-6 py-1 text-sm text-muted-foreground">
        <ol className="flex gap-2">
          <li>
            <span className="text-foreground font-semibold text-xs">Dashboard</span>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav className="bg-card border-b border-border px-6 py-1 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-wide">
        <li>
          <Link className="text-foreground font-medium" to="/dashboard">
            Dashboard
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            <span className="text-muted-foreground/80">/</span>
            {index === crumbs.length - 1 ? (
              <span className="text-foreground font-semibold">{crumb.label}</span>
            ) : (
              <Link className="hover:underline" to={crumb.path}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
