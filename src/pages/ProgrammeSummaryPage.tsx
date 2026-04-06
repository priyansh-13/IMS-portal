import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { cn } from "@/lib/utils";

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
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary bg-card">
            <h2 className="text-lg font-semibold text-foreground">Programme Summary</h2>
            <button 
              onClick={() => navigate("/programme-course")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              <section className="space-y-6 rounded-2xl border border-border/70 bg-muted/40 p-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Last 3 Academic Years</h3>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                    overallPercentage >= 100 ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                  )}>
                    {overallPercentage}% Complete
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="px-4 py-3 text-left font-semibold border-r border-primary-foreground/10">Academic Year</th>
                        <th className="px-4 py-3 text-left font-semibold border-r border-primary-foreground/10">Number Of Courses Offered</th>
                        <th className="px-4 py-3 text-left font-semibold border-r border-primary-foreground/10">Skill-Based / Field-Work Oriented</th>
                        <th className="px-4 py-3 text-left font-semibold">EDP / MDP Conducted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicYears.map((year) => {
                        const suffix = year === "2022-2023" ? "22-23" : year === "2023-2024" ? "23-24" : "24-25";
                        return (
                          <tr key={year} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 font-medium bg-muted/20 border-r border-border">{year}</td>
                            <td className="px-2 py-2 border-r border-border">
                              <input 
                                value={getFieldValue(`courses-${suffix}`)}
                                onChange={(e) => updateField(`courses-${suffix}`, e.target.value)}
                                className="w-full bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 px-2 text-sm" 
                              />
                            </td>
                            <td className="px-2 py-2 border-r border-border">
                              <input 
                                value={getFieldValue(`skill-${suffix}`)}
                                onChange={(e) => updateField(`skill-${suffix}`, e.target.value)}
                                className="w-full bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 px-2 text-sm" 
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input 
                                value={getFieldValue(`edp-${suffix}`)}
                                onChange={(e) => updateField(`edp-${suffix}`, e.target.value)}
                                className="w-full bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 px-2 text-sm" 
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-border mt-8">
                <button 
                  onClick={() => navigate("/programme-course")}
                  className="px-6 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-all"
                >
                  ← Back to Dashboard
                </button>
                <button 
                  onClick={() => navigate("/programme-course")}
                  className="flex items-center gap-2 px-8 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold shadow-sm hover:bg-accent/90 transition-all active:scale-[0.98]"
                >
                  Complete & Save
                </button>
              </div>
            </div>

            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sections}
                sectionOrder={SECTION_ORDER}
                activeSection={currentSectionName}
                onSectionClick={(name) => {
                  const targetIndex = SECTION_ORDER.indexOf(name);
                  if (targetIndex >= 0) setActiveSubStep(targetIndex);
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-12 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <span>Copyright © 2026 One Nation One Data</span>
        </div>
      </div>
    </TopLayout>
  );
}
