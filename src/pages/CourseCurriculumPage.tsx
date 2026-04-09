import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Save, CheckCircle2 } from "lucide-react";
import { FormStepper } from "@/components/FormStepper";

export default function CourseCurriculumPage() {
  const navigate = useNavigate();
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
    <div className="flex items-center gap-1 min-w-[50px] cursor-pointer group" onClick={() => onChange(label)}>
      <div className={`h-3.5 w-3.5 rounded-full border border-accent flex items-center justify-center transition-all ${value === label ? "bg-accent shadow-sm" : "bg-white"}`}>
        {value === label && <div className="h-1.5 w-1.5 rounded-full bg-accent-foreground" />}
      </div>
      <span className="text-[12px] font-semibold group-hover:text-accent transition-colors">{label}</span>
    </div>
  );

  const CheckboxField = ({ label, checked, onChange }: any) => (
    <div className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg border border-border hover:bg-accent/5 transition-all" onClick={() => onChange(!checked)}>
      <div className={`h-3.5 w-3.5 rounded border border-accent flex items-center justify-center transition-all ${checked ? "bg-accent shadow-sm" : "bg-white"}`}>
        {checked && <div className="h-2 w-2 bg-accent-foreground rounded-[1px]" />}
      </div>
      <span className="text-[12px] font-semibold group-hover:text-accent transition-colors">{label}</span>
    </div>
  );

  const isLastStep = activeStep === localSteps.length - 1;

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details">
        <FormStepper
          steps={localSteps}
          currentStep={activeStep}
          onStepClick={(idx) => setActiveStep(idx)}
          overallPercentage={Math.round((localSteps.reduce((acc, curr) => acc + curr.completionPercentage, 0) / (localSteps.length * 100)) * 100)}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>
      <div className="p-2 lg:p-3 pb-20">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border border-l-4 border-l-primary bg-muted/5 relative">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-tight">{localSteps[activeStep].name}</h2>
            <button 
              onClick={() => navigate("/programme-course")} 
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-3 lg:p-4 min-h-[300px]">
            <div className="flex flex-col h-full">
              <div className="flex-1">
            {activeStep === 0 && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="max-w-md">
                  <label className="text-[12px] font-bold text-foreground mb-1 block uppercase tracking-wider">Select Course <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full h-8 px-2 rounded-lg border border-border bg-white text-[12px] focus:ring-2 focus:ring-accent/30 outline-none transition-colors appearance-none"
                    value={values.course}
                    onChange={(e) => setValue("course", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                  </select>
                </div>

                <section className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                    <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Outcome-Based Curriculum</h3>
                  </div>
                  <div className="space-y-2 pt-1">
                    <p className="text-[12px] font-semibold text-foreground">Is the Curriculum framework aligned with Outcome Based Education (OBE)? <span className="text-red-500">*</span></p>
                    <p className="text-[10px] text-muted-foreground font-medium italic">(POs, COs, PEOs / PSOs)</p>
                    <div className="flex gap-6 pt-1">
                      <RadioField label="Yes" value={values.outcomeBased} onChange={(v: string) => setValue("outcomeBased", v)} />
                      <RadioField label="No" value={values.outcomeBased} onChange={(v: string) => setValue("outcomeBased", v)} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeStep === 1 && (
              <section className="space-y-3 animate-in slide-in-from-right-4 duration-500 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Stakeholder Participation</h3>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-[12px] font-semibold text-foreground">Select all that apply <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {["Students", "Teachers", "Employers", "Industry", "Alumni", "Affiliated Colleges"].map((item) => (
                      <CheckboxField
                        key={item}
                        label={item}
                        checked={values.stakeholders.includes(item)}
                        onChange={() => toggleStakeholder(item)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeStep === 2 && (
              <section className="space-y-4 animate-in slide-in-from-right-4 duration-500 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Curriculum Flexibility</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">CBCS</p>
                    <div className="flex gap-4">
                      <RadioField label="Yes" value={values.cbcs} onChange={(v: string) => setValue("cbcs", v)} />
                      <RadioField label="No" value={values.cbcs} onChange={(v: string) => setValue("cbcs", v)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">Major / Minor</p>
                    <div className="flex gap-4">
                      <RadioField label="Yes" value={values.majorMinor} onChange={(v: string) => setValue("majorMinor", v)} />
                      <RadioField label="No" value={values.majorMinor} onChange={(v: string) => setValue("majorMinor", v)} />
                    </div>
                  </div>
                  <div className="space-y-2 lg:col-span-1">
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">Bharatiya Bhashas</p>
                    <div className="flex gap-4">
                      <RadioField label="Yes" value={values.bharatiyaBhashas} onChange={(v: string) => setValue("bharatiyaBhashas", v)} />
                      <RadioField label="No" value={values.bharatiyaBhashas} onChange={(v: string) => setValue("bharatiyaBhashas", v)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">Open Electives</p>
                    <div className="flex gap-4">
                      <RadioField label="Yes" value={values.openElectives} onChange={(v: string) => setValue("openElectives", v)} />
                      <RadioField label="No" value={values.openElectives} onChange={(v: string) => setValue("openElectives", v)} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Non-Credit Courses <span className="text-red-500">*</span></label>
                    <p className="text-[9px] text-muted-foreground font-medium">(Offered in Last 3 Years)</p>
                    <Input 
                      value={values.nonCredit} 
                      onChange={(e) => setValue("nonCredit", e.target.value)}
                      className="h-8 text-[12px] bg-white border border-border focus:ring-2 focus:ring-accent/30"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Revised Courses <span className="text-red-500">*</span></label>
                    <p className="text-[9px] text-muted-foreground font-medium">(Across All Programmes in Last 3 Years)</p>
                    <Input 
                      value={values.introducedRevised} 
                      onChange={(e) => setValue("introducedRevised", e.target.value)}
                      className="h-8 text-[12px] bg-white border border-border focus:ring-2 focus:ring-accent/30"
                      placeholder="0"
                    />
                  </div>
                </div>
              </section>
            )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 right-0 left-0 bg-white/80 backdrop-blur-md border-t border-border p-2 z-40 transition-all duration-300"
           style={{ left: "var(--sidebar-width, 256px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <button
            onClick={() => {
              if (activeStep > 0) setActiveStep(activeStep - 1);
              else navigate("/programme-course");
            }}
            className="flex items-center gap-2 px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground hover:bg-muted/80 shadow-sm transition-all duration-200"
          >
            ← {activeStep === 0 ? "Back to Dashboard" : "Previous Section"}
          </button>

          <button
            onClick={() => {
              if (activeStep < localSteps.length - 1) setActiveStep(activeStep + 1);
              else navigate("/programme-course");
            }}
            className="flex items-center gap-2 px-8 py-2 bg-accent text-accent-foreground rounded text-[11px] font-black uppercase tracking-widest hover:bg-accent/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {isLastStep ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Finish & Save
              </>
            ) : (
              <>
                Save & Continue
                <span className="ml-1">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-12 text-xs text-muted-foreground px-4">
        <div className="flex gap-4">
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
        </div>
        <span>Copyright © 2026 One Nation One Data</span>
      </div>
    </TopLayout>
  );
}
