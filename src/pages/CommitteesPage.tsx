import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const COMMITTEE_FIELDS: FieldState[] = [
  // General Committees
  { id: "icc-exists", name: "Internal Complaints Committee (ICC) Exists", section: "General Committees", value: "" },
  { id: "equal-opportunity", name: "Equal Opportunity Cell Exists", section: "General Committees", value: "" },
  { id: "vigilance-cell", name: "Vigilance Cell Exists", section: "General Committees", value: "" },

  // Ombudsman
  { id: "grievance-exists", name: "Grievance Committee Exists", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "ombudsman-appointed", name: "Ombudsman Appointed", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "ombudsman-date", name: "Date of Appointment", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "ombudsman-name", name: "Ombudsman Name", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "ombudsman-contact", name: "Contact Number", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "ombudsman-email", name: "Email Address", section: "Ombudsman / Grievance Redressal Committee", value: "" },
  { id: "online-grievance", name: "Online Grievance Redressal Mechanism", section: "Ombudsman / Grievance Redressal Committee", value: "" },

  // Anti-Ragging
  { id: "anti-ragging-exists", name: "Anti-Ragging Committee Exists", section: "Anti-Ragging Cell / Committee", value: "" },
  { id: "anti-ragging-date", name: "Date of Constitution", section: "Anti-Ragging Cell / Committee", value: "" },
  { id: "anti-ragging-type", name: "Type of Committee", section: "Anti-Ragging Cell / Committee", value: "" },
  { id: "ragging-squad", name: "Anti-Ragging Squad Exists", section: "Anti-Ragging Cell / Committee", value: "" },

  // IC
  { id: "ic-exists", name: "Committee Exists", section: "Internal Committee (IC)", value: "" },
  { id: "ic-type", name: "Type of Committee", section: "Internal Committee (IC)", value: "" },
  { id: "ic-date", name: "Date of Appointment", section: "Internal Committee (IC)", value: "" },

  // SC/ST
  { id: "scst-exists", name: "Committee Exists", section: "SC / ST Committee", value: "" },
  { id: "scst-date", name: "Date of Constitution", section: "SC / ST Committee", value: "" },

  // Student Counselor
  { id: "student-counselor", name: "Student Counselor Appointed", section: "Student Counselor", value: "" },
  { id: "counselor-date", name: "Date of Appointment", section: "Student Counselor", value: "" },
  { id: "counselor-name", name: "Counselor Name", section: "Student Counselor", value: "" },
  { id: "counselor-contact", name: "Contact Number", section: "Student Counselor", value: "" },
  { id: "counselor-email", name: "Email Address", section: "Student Counselor", value: "" },

  // IQAC
  { id: "iqac-established", name: "IQAC Established", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "iqac-date", name: "Date of Establishment", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "iqac-contact", name: "Contact Email", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "iqac-number", name: "Contact Number", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "stakeholders-involved", name: "Involves all relevant stakeholders", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "intertwines-committees", name: "Intertwines activities with institutional committees", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "promotes-quality", name: "Promotes quality through orientation / seminars / workshops", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "audits-external", name: "Conducts Academic & Administrative Audit by external experts", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
  { id: "quality-circles", name: "Practice of Quality Circles", section: "Internal Quality Assurance Cell (IQAC)", value: "" },
];

const SECTION_ORDER = [
  "General Committees",
  "Ombudsman / Grievance Redressal Committee",
  "Anti-Ragging Cell / Committee",
  "Internal Committee (IC)",
  "SC / ST Committee",
  "Student Counselor",
  "Internal Quality Assurance Cell (IQAC)",
];

type FieldValueMap = Record<string, string>;

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "date" | "email" | "tel" = "text"
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;
  
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[12px] font-semibold text-foreground">
        {label}
        <span className="text-red-500 ml-1 font-bold">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-8 rounded-lg border px-2 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20"
          )}
        />
        {filled && (
          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success" />
        )}
      </div>
    </div>
  );
};

const renderRadioGroup = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[] = ["Yes", "No"]
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[12px] font-semibold text-foreground">
        {label}
        <span className="text-red-500 ml-1 font-bold">*</span>
      </p>
      <div className="flex gap-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-1.5 text-[12px] text-foreground cursor-pointer group">
            <input
              type="radio"
              name={id}
              value={opt}
              checked={fieldVal === opt}
              onChange={(e) => setValue(id, e.target.value)}
              className="w-3.5 h-3.5 accent-accent"
            />
            <span className="group-hover:text-accent transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function CommitteesPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [...COMMITTEE_FIELDS];

  const { fields, updateField, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [activeSubStep, setActiveSubStep] = useState(0);

  const stepInfos = useMemo(
    () => SECTION_ORDER.map((name) => {
      const sec = sections.find((s) => s.name === name);
      return { name, completionPercentage: sec?.completionPercentage ?? 0 };
    }),
    [sections]
  );

  const currentSectionName = SECTION_ORDER[activeSubStep];
  const currentSection = sections.find((s) => s.name === currentSectionName);
  const isLastStep = activeSubStep === SECTION_ORDER.length - 1;

  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module">
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
          <div className="flex items-center justify-between px-4 py-2 border-b border-border border-l-4 border-l-primary bg-muted/5">
            <h2 className="text-sm font-bold text-foreground">Committees</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-3 lg:p-4 space-y-3">
              {activeSubStep === 0 && (
               <section id="section-general" className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">General Committees</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {renderRadioGroup(fields, updateField, "icc-exists", "Internal Complaints Committee (ICC) Exists")}
                  {renderRadioGroup(fields, updateField, "equal-opportunity", "Equal Opportunity Cell Exists")}
                  {renderRadioGroup(fields, updateField, "vigilance-cell", "Vigilance Cell Exists")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
               <section id="section-ombudsman" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Ombudsman / Grievance Redressal Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {renderRadioGroup(fields, updateField, "grievance-exists", "Grievance Committee Exists")}
                  {renderRadioGroup(fields, updateField, "ombudsman-appointed", "Ombudsman Appointed")}
                  {renderInputField(fields, updateField, "ombudsman-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "ombudsman-name", "Ombudsman Name")}
                  {renderInputField(fields, updateField, "ombudsman-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "ombudsman-email", "Email Address", undefined, "email")}
                  {renderRadioGroup(fields, updateField, "online-grievance", "Online Grievance Redressal Mechanism")}
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">Members:</span>
                  <div className="flex gap-2">
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent hover:bg-accent/30 transition-colors">View</button>
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Manage</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
               <section id="section-ragging" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Anti-Ragging Cell / Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {renderRadioGroup(fields, updateField, "anti-ragging-exists", "Anti-Ragging Committee Exists")}
                  {renderInputField(fields, updateField, "anti-ragging-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "anti-ragging-type", "Type of Committee")}
                  {renderRadioGroup(fields, updateField, "ragging-squad", "Anti-Ragging Squad Exists")}
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">Members:</span>
                  <div className="flex gap-2">
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent hover:bg-accent/30 transition-colors">View</button>
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Manage</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
               <section id="section-ic" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Internal Committee (IC)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {renderRadioGroup(fields, updateField, "ic-exists", "Committee Exists")}
                  {renderInputField(fields, updateField, "ic-type", "Type of Committee")}
                  {renderInputField(fields, updateField, "ic-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">Members:</span>
                  <div className="flex gap-2">
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent hover:bg-accent/30 transition-colors">View</button>
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Manage</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
               <section id="section-scst" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">SC / ST Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {renderRadioGroup(fields, updateField, "scst-exists", "Committee Exists")}
                  {renderInputField(fields, updateField, "scst-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                </div>
                 <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">Members:</span>
                  <div className="flex gap-2">
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent hover:bg-accent/30 transition-colors">View</button>
                    <button className="rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Manage</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
               <section id="section-counselor" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Student Counselor</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderRadioGroup(fields, updateField, "student-counselor", "Student Counselor Appointed")}
                  {renderInputField(fields, updateField, "counselor-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "counselor-name", "Counselor Name")}
                  {renderInputField(fields, updateField, "counselor-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "counselor-email", "Email Address", undefined, "email")}
                </div>
              </section>
              )}

              {activeSubStep === 6 && (
               <section id="section-iqac" className="rounded-lg border border-border/70 bg-muted/40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Internal Quality Assurance Cell (IQAC / IQAS / CIQA)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderRadioGroup(fields, updateField, "iqac-established", "IQAC Established")}
                  {renderInputField(fields, updateField, "iqac-date", "Date of Establishment", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "iqac-contact", "Contact Email", undefined, "email")}
                  {renderInputField(fields, updateField, "iqac-number", "Contact Number", undefined, "tel")}
                  {renderRadioGroup(fields, updateField, "stakeholders-involved", "Involves all relevant stakeholders")}
                  {renderRadioGroup(fields, updateField, "intertwines-committees", "Intertwines activities with institutional committees")}
                  {renderRadioGroup(fields, updateField, "promotes-quality", "Promotes quality through orientation / seminars / workshops")}
                  {renderRadioGroup(fields, updateField, "audits-external", "Conducts Academic & Administrative Audit by external experts")}
                  {renderRadioGroup(fields, updateField, "quality-circles", "Practice of Quality Circles")}
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
              if (activeSubStep > 0) {
                setActiveSubStep((prev) => Math.max(prev - 1, 0));
              } else {
                navigate(-1);
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground hover:bg-muted/80 shadow-sm transition-all duration-200"
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (!isLastStep) {
                setActiveSubStep((s) => Math.min(SECTION_ORDER.length - 1, s + 1));
              } else {
                navigate("/institutional-registry");
              }
            }}
            className="flex items-center gap-2 px-8 py-2 bg-accent text-accent-foreground rounded text-[11px] font-black uppercase tracking-widest hover:bg-accent/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {isLastStep ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Save & Submit
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

      <PendingFieldsPanel
        pendingFields={pendingFields}
        onFieldClick={scrollToField}
      />
    </TopLayout>
  );
}
