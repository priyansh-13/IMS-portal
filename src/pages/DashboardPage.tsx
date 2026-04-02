import { TopLayout } from "@/components/TopLayout";
import { ProgressCard } from "@/components/ProgressCard";
import {
  Building2, BookOpen, Users, UserCog, Landmark,
  Award, CreditCard, Lightbulb, FlaskConical,
} from "lucide-react";

const modules = [
  { title: "Institutional Registry and Recognition", icon: Building2, progress: 25, link: "/institutional-registry" },
  { title: "Programme and Course Details", icon: BookOpen, progress: 50, link: "/programme-course" },
  { title: "Student Information and Mobility", icon: Users, progress: 75, link: "/student-info" },
  { title: "Faculty and Human Resources Registry", icon: UserCog, progress: 75, link: "/faculty-hr" },
  { title: "Infrastructure and Resources", icon: Landmark, progress: 100, link: "/infrastructure" },
  { title: "Quality Assurance and Accreditation Hub", icon: Award, progress: 100, link: "/quality-assurance" },
  { title: "Academic Bank of Credits (ABC) and NCrF Integration", icon: CreditCard, progress: 30, link: "/abc-ncrf" },
  { title: "Innovation, Industry & Projects", icon: Lightbulb, progress: 75, link: "/innovation" },
  { title: "Research & Outcome", icon: FlaskConical, progress: 50, link: "/research" },
];

const overallProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

export default function DashboardPage() {
  return (
    <TopLayout>
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/85 text-primary-foreground px-8 py-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome ONOD User!</h1>
            <p className="text-sm opacity-80 mt-1.5 max-w-lg">
              Centralised data exchange for Higher Educational Institutions (HEIs)
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-xs opacity-70">Overall Progress</p>
              <p className="text-3xl font-bold">{overallProgress}%</p>
            </div>
            <div className="w-16 h-16 rounded-full border-[3px] border-primary-foreground/30 flex items-center justify-center bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-sm font-bold">{modules.filter(m => m.progress >= 100).length}/{modules.length}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full bg-primary-foreground/15 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-success transition-all duration-1000 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-foreground mb-5">All Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <ProgressCard key={mod.title} {...mod} />
          ))}
        </div>
      </div>
    </TopLayout>
  );
}
