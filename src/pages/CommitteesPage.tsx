import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { Info,  CheckCircle2  } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const registryModules = [
  { title: "Institution Details", completed: true, link: "/institutional-registry/institution-details" },
  { title: "Contact Details", completed: false, link: "/institutional-registry/contact-details" },
  { title: "Parent Organization/Ownership", completed: false, link: "/institutional-registry/parent-org" },
  { title: "Affiliation/Approval", completed: false, link: "/institutional-registry/affiliation" },
  { title: "Committee(s)", completed: false, link: "/institutional-registry/committees" },
  { title: "Financial Details", completed: true, link: "/institutional-registry/financial" },
  { title: "Centres / Campuses", completed: false, link: "/institutional-registry/centres" },
  { title: "Student Support & Institutional Activities", completed: false, link: "/institutional-registry/student-support" },
  { title: "Regulatory Information", completed: false, link: "/institutional-registry/regulatory" },
];

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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 mb-1">
        <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger tabIndex={-1} type="button" className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground/60 hover:text-accent transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">Please provide accurate details for {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20"
          )}
        />
        {filled && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 mb-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger tabIndex={-1} type="button" className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground/60 hover:text-accent transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">Please provide accurate details for {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="radio"
              name={id}
              value={opt}
              checked={fieldVal === opt}
              onChange={(e) => setValue(id, e.target.value)}
              className="accent-accent"
            />
            {opt}
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
      <div className="p-4 lg:p-6">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Committee(s)</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 px-5 pb-5 pt-5">
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-general" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">General Committees</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "icc-exists", "Internal Complaints Committee (ICC) Exists")}
                  {renderRadioGroup(fields, updateField, "equal-opportunity", "Equal Opportunity Cell Exists")}
                  {renderRadioGroup(fields, updateField, "vigilance-cell", "Vigilance Cell Exists")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-ombudsman" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Ombudsman / Grievance Redressal Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "grievance-exists", "Grievance Committee Exists")}
                  {renderRadioGroup(fields, updateField, "ombudsman-appointed", "Ombudsman Appointed")}
                  {renderInputField(fields, updateField, "ombudsman-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "ombudsman-name", "Ombudsman Name")}
                  {renderInputField(fields, updateField, "ombudsman-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "ombudsman-email", "Email Address", undefined, "email")}
                  {renderRadioGroup(fields, updateField, "online-grievance", "Online Grievance Redressal Mechanism")}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-semibold text-foreground">Committee Members</span>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors">View</button>
                    <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-950 transition-colors">Manage Members</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-ragging" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Anti-Ragging Cell / Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "anti-ragging-exists", "Anti-Ragging Committee Exists")}
                  {renderInputField(fields, updateField, "anti-ragging-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "anti-ragging-type", "Type of Committee")}
                  {renderRadioGroup(fields, updateField, "ragging-squad", "Anti-Ragging Squad Exists")}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-semibold text-foreground">Committee Members</span>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors">View</button>
                    <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-950 transition-colors">Manage Members</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
              <section id="section-ic" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Internal Committee (IC)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "ic-exists", "Committee Exists")}
                  {renderInputField(fields, updateField, "ic-type", "Type of Committee")}
                  {renderInputField(fields, updateField, "ic-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-semibold text-foreground">Committee Members</span>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors">View</button>
                    <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-950 transition-colors">Manage Members</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
              <section id="section-scst" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">SC / ST Committee</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "scst-exists", "Committee Exists")}
                  {renderInputField(fields, updateField, "scst-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">Committee Members</span>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                    <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Members</button>
                  </div>
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
              <section id="section-counselor" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Student Counselor</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "student-counselor", "Student Counselor Appointed")}
                  {renderInputField(fields, updateField, "counselor-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "counselor-name", "Counselor Name")}
                  {renderInputField(fields, updateField, "counselor-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "counselor-email", "Email Address", undefined, "email")}
                </div>
              </section>
              )}

              {activeSubStep === 6 && (
              <section id="section-iqac" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Internal Quality Assurance Cell (IQAC / IQAS / CIQA)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : currentSection.completionPercentage > 0
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    if (activeSubStep > 0) {
                      setActiveSubStep((prev) => Math.max(prev - 1, 0));
                    } else {
                      navigate(-1);
                    }
                  }}
                >
                  ← Back
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-sm shadow-accent/40"
                  onClick={() => {
                    if (!isLastStep) {
                      setActiveSubStep((s) => Math.min(SECTION_ORDER.length - 1, s + 1));
                    } else {
                      navigate("/institutional-registry");
                    }
                  }}
                >
                  {isLastStep ? "Save" : "Save & Continue"}
                </button>
              </div>
            </div>

            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={registryModules.map(m => ({
                  name: m.title,
                  totalFields: 1,
                  filledFields: m.completed ? 1 : 0,
                  completionPercentage: m.completed ? 100 : 0
                }))}
                sectionOrder={registryModules.map(m => m.title)}
                activeSection="Committee(s)"
                onSectionClick={(name) => {
                  const target = registryModules.find(m => m.title === name);
                  if (target?.link) navigate(target.link);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <PendingFieldsPanel
        pendingFields={pendingFields}
        onFieldClick={scrollToField}
      />
    </TopLayout>
  );
}
