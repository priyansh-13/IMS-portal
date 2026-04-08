import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";

export default function CourseCurriculumPage() {
  const navigate = useNavigate();

  const subSections = [
    { title: "Programme-Course Details", completed: true, link: "/programme-course/details" },
    { title: "Programme Summary", completed: false, link: "/programme-course/summary" },
    { title: "Course Curriculum", completed: false, link: "/programme-course/curriculum" },
  ];

  const [values, setValues] = useState<Record<string, any>>({
    course: "",
    outcomeBased: "Yes",
    stakeholders: ["Students", "Teachers", "Alumni", "Feedback from affiliated colleges"],
    cbcs: "Yes",
    majorMinor: "Yes",
    bharatiyaBhashas: "Yes",
    openElectives: "Yes",
    nonCredit: "",
    introducedRevised: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const localSteps = [
    { name: "Outcome-Based Curriculum", completionPercentage: values.course ? 100 : 0 },
    { name: "Stakeholder Participation", completionPercentage: values.stakeholders.length > 0 ? 100 : 0 },
    { name: "Curriculum Flexibility", completionPercentage: (values.nonCredit || values.introducedRevised) ? 100 : 0 },
  ];

  const setValue = (key: string, val: any) => setValues((p) => ({ ...p, [key]: val }));

  const toggleStakeholder = (item: string) => {
    const next = values.stakeholders.includes(item)
      ? values.stakeholders.filter((s: string) => s !== item)
      : [...values.stakeholders, item];
    setValue("stakeholders", next);
  };

  const RadioField = ({ label, value, name, onChange }: any) => (
    <div className="flex items-center gap-1.5 min-w-[60px] cursor-pointer" onClick={() => onChange(label)}>
      <div className={`h-4 w-4 rounded-full border border-accent flex items-center justify-center ${value === label ? "bg-accent" : "bg-card"}`}>
        {value === label && <div className="h-1.5 w-1.5 rounded-full bg-accent-foreground" />}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  const CheckboxField = ({ label, checked, onChange }: any) => (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChange(!checked)}>
      <div className={`h-4 w-4 rounded border border-accent flex items-center justify-center transition-colors ${checked ? "bg-accent" : "bg-card"}`}>
        {checked && <Save className="h-3 w-3 text-accent-foreground" />}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  const sidebarSections = subSections.map((s) => ({
    name: s.title,
    totalFields: 1,
    filledFields: s.completed ? 1 : 0,
    completionPercentage: s.completed ? 100 : 0,
  }));

  const overall = Math.round((localSteps.reduce((acc, curr) => acc + curr.completionPercentage, 0) / (localSteps.length * 100)) * 100);
  const isLastStep = activeStep === localSteps.length - 1;

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details">
        <FormStepper
          steps={localSteps}
          currentStep={activeStep}
          onStepClick={(idx) => setActiveStep(idx)}
          overallPercentage={overall}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary bg-card">
              <h2 className="text-lg font-semibold text-foreground">{localSteps[activeStep].name}</h2>
              <button 
                onClick={() => navigate("/programme-course")} 
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Back
              </button>
            </div>

            <div className="p-6 space-y-8 pt-6 min-h-[400px]">
              {activeStep === 0 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="max-w-md">
                    <label className="text-xs font-semibold text-accent mb-1.5 block">Select Course *</label>
                    <select 
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-ring transition-colors"
                      value={values.course}
                      onChange={(e) => setValue("course", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                    </select>
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Outcome-Based Curriculum</h3>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Is the Curriculum framework aligned with Outcome Based Education (OBE)?</p>
                      <p className="text-[10px] text-muted-foreground opacity-70">(Defining POs, COs, and PEOs / PSOs)</p>
                      <div className="flex gap-4 pt-1">
                        <RadioField label="Yes" value={values.outcomeBased} onChange={(v: string) => setValue("outcomeBased", v)} />
                        <RadioField label="No" value={values.outcomeBased} onChange={(v: string) => setValue("outcomeBased", v)} />
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeStep === 1 && (
                <section className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Stakeholder Participation for Curriculum</h3>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Select all that apply</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Students", "Teachers", "Employers", "Industry", "Alumni", "Feedback from affiliated colleges"].map((item) => (
                        <div key={item} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-accent/5 transition-colors" onClick={() => toggleStakeholder(item)}>
                          <div className={`h-4 w-4 rounded border border-accent flex items-center justify-center transition-colors ${values.stakeholders.includes(item) ? "bg-accent" : "border-accent/40"}`}>
                            {values.stakeholders.includes(item) && <div className="h-2 w-2 bg-accent-foreground rounded-[1px]" />}
                          </div>
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeStep === 2 && (
                <section className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Curriculum Flexibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CheckboxField label="CBCS Implemented" checked={values.cbcs === "Yes"} onChange={(checked: boolean) => setValue("cbcs", checked ? "Yes" : "No")} />
                    <CheckboxField label="Major-Minor Pathways" checked={values.majorMinor === "Yes"} onChange={(checked: boolean) => setValue("majorMinor", checked ? "Yes" : "No")} />
                    <CheckboxField label="Bharatiya Bhashas Offered" checked={values.bharatiyaBhashas === "Yes"} onChange={(checked: boolean) => setValue("bharatiyaBhashas", checked ? "Yes" : "No")} />
                    <CheckboxField label="Open Electives Available" checked={values.openElectives === "Yes"} onChange={(checked: boolean) => setValue("openElectives", checked ? "Yes" : "No")} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-accent mb-1 block">Non-Credit Courses</label>
                      <Input value={values.nonCredit} onChange={(e) => setValue("nonCredit", e.target.value)} placeholder="List non-credit courses" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-accent mb-1 block">Introduced / Revised (Year)</label>
                      <Input value={values.introducedRevised} onChange={(e) => setValue("introducedRevised", e.target.value)} placeholder="YYYY" className="bg-background" />
                    </div>
                  </div>
                </section>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Save
                </button>
                <button className="px-6 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted transition-colors" onClick={() => navigate("/programme-course")}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="flex-none w-full lg:w-72">
            <SectionStatusSidebar
              sections={sidebarSections}
              sectionOrder={sidebarSections.map((s) => s.name)}
              activeSection="Course Curriculum"
              onSectionClick={(name) => {
                const target = subSections.find((s) => s.title === name);
                if (target?.link) navigate(target.link);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="text-accent hover:underline cursor-pointer">Privacy Policy</span>
            <span className="text-accent hover:underline cursor-pointer">Terms of Use</span>
          </div>
          <span>Copyright © 2026 One Nation One Data</span>
        </div>
      </div>
    </TopLayout>
  );
}
