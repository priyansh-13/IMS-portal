import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
import { FormStepper } from "@/components/FormStepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  FileText,
  GraduationCap,
  Award,
  HeartHandshake,
  Briefcase,
  Download,
} from "lucide-react";

const subModules = [
  { title: "Student Enrolment", icon: Users, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/enrolment" },
  { title: "Foreign Student Enrolment", icon: Globe, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/foreign-enrolment" },
  { title: "Examination Result", icon: FileText, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/examination" },
  { title: "Academic Performance & Research", icon: GraduationCap, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/performance" },
  { title: "Extended Curricular Engagements", icon: Award, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/curricular" },
  { title: "Student And Employee Welfare", icon: HeartHandshake, completed: false, lastUpdated: "02 Feb 2026", link: "/student-info/welfare" },
  { title: "Internship-Placement", icon: Briefcase, completed: true, lastUpdated: "02 Feb 2026", link: "/student-info/internship" },
];

function SelectField({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-accent block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-colors">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <Input placeholder={placeholder || ""} className="bg-background h-10" />
    </div>
  );
}

function RadioField({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium">
          <input type="radio" name={label} defaultChecked className="accent-accent" />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium">
          <input type="radio" name={label} className="accent-accent" />
          No
        </label>
      </div>
    </div>
  );
}

export default function StudentInfoPage({ defaultView = "cards" }: { defaultView?: "cards" | "details" }) {
  const [view, setView] = useState<"cards" | "details">(defaultView);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  const sectionProgress = subModules.map((section) => ({
    name: section.title,
    totalFields: 1,
    filledFields: section.completed ? 1 : 0,
    completionPercentage: section.completed ? 100 : 0,
  }));

  const detailSteps = [
    { name: "Basic Information", totalFields: 6, filledFields: 0, completionPercentage: 0 },
    { name: "Category & Gender wise Count", totalFields: 1, filledFields: 0, completionPercentage: 0 },
    { name: "Foreign National & NRI", totalFields: 7, filledFields: 0, completionPercentage: 0 },
    { name: "Distribution & Scholarships", totalFields: 10, filledFields: 0, completionPercentage: 0 },
  ];
  
  const isLastStep = activeTab === detailSteps.length - 1;

  if (view === "cards") {
    return (
      <TopLayout>
        <ModuleBanner title="Student Information and Mobility System" />
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-3">
                {subModules.map((section) => (
                  <div key={section.title} className="cursor-pointer">
                    <StatusCard {...section} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sectionProgress}
                sectionOrder={sectionProgress.map((s) => s.name)}
                onSectionClick={(name) => {
                  const target = subModules.find((s) => s.title === name);
                  if (target?.link) navigate(target.link);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Floating Download Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button className="h-12 w-12 rounded-xl shadow-lg bg-success hover:bg-success/90 text-success-foreground p-0 transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
            <Download className="h-6 w-6" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 py-4 px-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex gap-4 font-medium">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <div className="font-medium flex items-center gap-2">
            Copyright © 2026 One Nation One Data
          </div>
        </div>
      </TopLayout>
    );
  }

  // Details View (Student Enrolment Details)
  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System">
        <FormStepper
          steps={detailSteps}
          currentStep={activeTab}
          onStepClick={(idx) => setActiveTab(idx)}
          overallPercentage={0}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Enrolment Details</h2>
            <button 
              onClick={() => {
                navigate("/student-info");
                setActiveTab(0);
              }} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              
              {activeTab === 0 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <SelectField label="Faculty/School" options={["Select"]} />
                    <SelectField label="Department" options={["Select"]} />
                    <SelectField label="Discipline" options={["Select"]} />
                    <SelectField label="Course / Programme Enrolled" options={["Select Programme"]} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField label="Academic Year" options={["Select Academic Year"]} required />
                    <TextField label="Total Admitted Students" />
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Category & Gender wise Student Count</h3>
                  <div>
                    <RadioField label="Other Minority Breakup available?" />
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm border-collapse">
                        <thead className="bg-[#002B5B] text-white">
                          <tr>
                            <th className="border-r border-white/20 border-b border-white/20 w-44" rowSpan={2}></th>
                            {["General", "SC", "ST", "OBC", "Total", "EWS"].map((cat) => (
                              <th key={cat} className="px-2 py-2 border-r border-white/20 border-b border-white/20 text-center font-medium text-xs tracking-wide" colSpan={3}>
                                {cat}
                              </th>
                            ))}
                          </tr>
                          <tr>
                            {Array.from({ length: 6 }).flatMap((_, i) => [
                              <th key={`${i}-m`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">M</th>,
                              <th key={`${i}-f`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">F</th>,
                              <th key={`${i}-tg`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">TG</th>
                            ])}
                          </tr>
                        </thead>
                        <tbody>
                          {["Total", "PwBD\n(Out of Total)", "Muslim Minority\n(Out of Total)", "Other Minority\n(Out of Total)"].map((rowName, idx) => (
                            <tr key={idx} className="border-b border-border">
                              <td className="px-3 py-3 text-xs font-medium whitespace-pre-wrap leading-snug text-foreground/80 border-r border-border">{rowName}</td>
                              {Array.from({ length: 18 }).map((_, i) => (
                                <td key={i} className="p-1.5 border-r border-border">
                                  <Input className="h-8 text-xs bg-transparent border-border/80 hover:border-border focus-visible:ring-1 focus-visible:ring-offset-0 px-1 text-center rounded-md" />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Foreign National & NRI Students</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TextField label="Lateral Entry Students" />
                    <TextField label="Working Professional Enrollment" />
                    <TextField label="TFW Students (Tuition Fee Waiver)" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-xs font-semibold text-accent mb-2 block">NRI / PIO</label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Male" className="bg-background h-10 w-full" />
                        <Input placeholder="Female" className="bg-background h-10 w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-accent mb-2 block">Foreign National</label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Male" className="bg-background h-10 w-full" />
                        <Input placeholder="Female" className="bg-background h-10 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Distribution & Scholarships</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-foreground">Geographic Distribution</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField label="Within State" />
                        <TextField label="Other States" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-foreground">Area-wise Distribution</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField label="Rural Areas" />
                        <TextField label="Urban Areas" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-semibold text-foreground">Scholarship Details of Student Enrollment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      {[
                        "Students with Scholarship", "Full Scholarship", "Partial Scholarship",
                        "Institute Scholarship", "Government Scholarship", "Other Scholarship"
                      ].map((schol) => (
                        <div key={schol}>
                          <label className="text-xs font-semibold text-accent mb-2 block">{schol}</label>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Male" className="bg-background h-10 w-full" />
                            <Input placeholder="Female" className="bg-background h-10 w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-border mt-8">
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    if (activeTab > 0) setActiveTab((p) => Math.max(0, p - 1));
                    else navigate("/student-info");
                  }}
                >
                  ← {activeTab === 0 ? "Back to Dashboard" : "Previous"}
                </button>
                <div className="flex gap-3">
                  {isLastStep && (
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-accent text-accent bg-background hover:bg-accent/5 text-sm font-semibold shadow-sm transition-colors">
                      Reset
                    </button>
                  )}
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-sm shadow-accent/40 hover:bg-accent/90 transition-colors"
                    onClick={() => {
                      if (!isLastStep) setActiveTab((p) => p + 1);
                      else navigate("/student-info");
                    }}
                  >
                    {isLastStep ? "Save Data ✓" : "Save & Continue →"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar Section */}
            <div className="flex-none px-2 pb-6 lg:pb-0 w-full lg:w-72">
              <SectionStatusSidebar
                sections={detailSteps}
                sectionOrder={detailSteps.map(s => s.name)}
                activeSection={detailSteps[activeTab].name}
                onSectionClick={(name) => {
                  const targetIndex = detailSteps.findIndex((s) => s.name === name);
                  if (targetIndex >= 0) setActiveTab(targetIndex);
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-muted-foreground flex justify-between">
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <div className="flex items-center gap-2">
            Copyright © 2026 One Nation One Data
          </div>
        </div>
      </div>
    </TopLayout>
  );
}
