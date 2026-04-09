import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, GraduationCap, Search, Download, CheckCircle2 } from "lucide-react";

const SUMMARY_FIELDS: FieldState[] = [
  { id: "courses-22-23", name: "Courses 2022-23", section: "Programme Summary", value: "0" },
  { id: "skill-22-23", name: "Skill-Based 2022-23", section: "Programme Summary", value: "8" },
  { id: "edp-22-23", name: "EDP 2022-23", section: "Programme Summary", value: "" },
  { id: "courses-23-24", name: "Courses 2023-24", section: "Programme Summary", value: "" },
  { id: "skill-23-24", name: "Skill-Based 2023-24", section: "Programme Summary", value: "" },
  { id: "edp-23-24", name: "EDP 2023-24", section: "Programme Summary", value: "" },
  { id: "courses-24-25", name: "Courses 2024-25", section: "Programme Summary", value: "" },
  { id: "skill-24-25", name: "Skill-Based 2024-25", section: "Programme Summary", value: "" },
  { id: "edp-24-25", name: "EDP 2024-25", section: "Programme Summary", value: "" },
];

const SECTION_ORDER = ["Programme Summary"];
const academicYears = ["2022-2023", "2023-2024", "2024-2025"];

export default function ProgrammeSummaryPage() {
  const navigate = useNavigate();
  const { fields, updateField, sections, overallPercentage } = useFormProgress(SUMMARY_FIELDS);
  const [activeSubStep, setActiveSubStep] = useState(0);

  const stepInfos = useMemo(
    () => SECTION_ORDER.map((name) => {
      const sec = sections.find((s) => s.name === name);
      return { name, completionPercentage: sec?.completionPercentage ?? 0 };
    }),
    [sections]
  );

  const currentSectionName = SECTION_ORDER[activeSubStep];
  const getFieldValue = (id: string) => fields.find(f => f.id === id)?.value || "";

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details">
        <FormStepper
          steps={stepInfos}
          currentStep={activeSubStep}
          onStepClick={(idx) => setActiveSubStep(idx)}
          overallPercentage={overallPercentage}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>
      <div className="p-2 lg:p-3 pb-20">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border border-l-4 border-l-primary bg-muted/5 relative">
            <h2 className="text-sm font-bold text-foreground">Programme Summary</h2>
            <button 
              onClick={() => navigate("/programme-course")} 
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full p-3 lg:p-4">
              <div className="space-y-3">
              <section className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Last 3 Academic Years</h3>
                  <span className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                    overallPercentage >= 100 ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                  )}>
                    {overallPercentage}% Complete
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-muted text-foreground border-b border-border">
                        <th className="px-3 py-2 text-left font-bold uppercase tracking-tight border-r border-border">Academic Year</th>
                        <th className="px-3 py-2 text-left font-bold uppercase tracking-tight border-r border-border">Number Of Courses Offered</th>
                        <th className="px-3 py-2 text-left font-bold uppercase tracking-tight border-r border-border">Skill-Based / Field-Work</th>
                        <th className="px-3 py-2 text-left font-bold uppercase tracking-tight">EDP / MDP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicYears.map((year) => {
                        const suffix = year === "2022-2023" ? "22-23" : year === "2023-2024" ? "23-24" : "24-25";
                        return (
                          <tr key={year} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-3 py-2 font-bold bg-muted/10 border-r border-border">{year}</td>
                            <td className="px-2 py-1 border-r border-border">
                              <input 
                                value={getFieldValue(`courses-${suffix}`)}
                                onChange={(e) => updateField(`courses-${suffix}`, e.target.value)}
                                className="w-full bg-white border border-border rounded h-6 px-2 text-[12px] focus:ring-1 focus:ring-accent outline-none" 
                                placeholder="0"
                              />
                            </td>
                            <td className="px-2 py-1 border-r border-border">
                              <input 
                                value={getFieldValue(`skill-${suffix}`)}
                                onChange={(e) => updateField(`skill-${suffix}`, e.target.value)}
                                className="w-full bg-white border border-border rounded h-6 px-2 text-[12px] focus:ring-1 focus:ring-accent outline-none" 
                                placeholder="0"
                              />
                            </td>
                            <td className="px-2 py-1">
                              <input 
                                value={getFieldValue(`edp-${suffix}`)}
                                onChange={(e) => updateField(`edp-${suffix}`, e.target.value)}
                                className="w-full bg-white border border-border rounded h-6 px-2 text-[12px] focus:ring-1 focus:ring-accent outline-none" 
                                placeholder="0"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 right-0 left-0 bg-white/80 backdrop-blur-md border-t border-border p-2 z-40 transition-all duration-300"
           style={{ left: "var(--sidebar-width, 256px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <button
            onClick={() => navigate("/programme-course")}
            className="flex items-center gap-2 px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground hover:bg-muted/80 shadow-sm transition-all duration-200"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/programme-course")}
            className="flex items-center gap-2 px-8 py-2 bg-accent text-accent-foreground rounded text-[11px] font-black uppercase tracking-widest hover:bg-accent/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Save & Complete
          </button>
        </div>
      </div>

        {/* Footer */}
        <div className="mx-auto max-w-4xl w-full flex items-center justify-between mt-12 text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <span>Copyright © 2026 One Nation One Data</span>
        </div>
      </div>
    </TopLayout>
  );
}
