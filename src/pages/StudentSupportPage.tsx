import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2, Filter, ChevronDown, Check } from "lucide-react";

const STUDENT_SUPPORT_FIELDS: FieldState[] = [
  // NCC
  { id: "ncc-available", name: "NCC Unit Available?", section: "National Cadet Corps (NCC)", value: "" },
  { id: "ncc-year", name: "Academic Year", section: "National Cadet Corps (NCC)", value: "" },
  { id: "ncc-male", name: "Institution Students (Male)", section: "National Cadet Corps (NCC)", value: "" },
  { id: "ncc-female", name: "Institution Students (Female)", section: "National Cadet Corps (NCC)", value: "" },
  { id: "ncc-other-male", name: "Other Institution Students (Male)", section: "National Cadet Corps (NCC)", value: "" },
  { id: "ncc-other-female", name: "Other Institution Students (Female)", section: "National Cadet Corps (NCC)", value: "" },

  // NSS
  { id: "nss-available", name: "NSS Available?", section: "National Service Scheme (NSS)", value: "" },
  { id: "nss-year", name: "Academic Year", section: "National Service Scheme (NSS)", value: "" },
  { id: "nss-male", name: "Students Enrolled (Male)", section: "National Service Scheme (NSS)", value: "" },
  { id: "nss-female", name: "Students Enrolled (Female)", section: "National Service Scheme (NSS)", value: "" },

  // CBT
  { id: "cbt-conducted", name: "CBT Conducted?", section: "Computer Based Test (CBT) Facilities", value: "" },
  { id: "cbt-capacity", name: "Student Capacity per Session", section: "Computer Based Test (CBT) Facilities", value: "" },
];

const SECTION_ORDER = [
  "National Cadet Corps (NCC)",
  "National Service Scheme (NSS)",
  "Computer Based Test (CBT) Facilities",
];

const FILTER_OPTIONS = [
  "National Cadet Corps (NCC)",
  "National Service Scheme (NSS)",
];

const COMMON_SECTIONS = [
  "Computer Based Test (CBT) Facilities",
];

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "number" = "text"
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

const renderSelectField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
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
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full h-8 rounded-lg border bg-white px-2 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {filled && (
          <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
    </div>
  );
};

export default function StudentSupportPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [...STUDENT_SUPPORT_FIELDS];

  const { fields, updateField, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [activeSubStep, setActiveSubStep] = useState(0);

  // Filtering State
  const [selectedFilters, setSelectedFilters] = useState<string[]>(FILTER_OPTIONS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derived filtered sections
  const activeSections = useMemo(
    () => SECTION_ORDER.filter(s => COMMON_SECTIONS.includes(s) || selectedFilters.includes(s)),
    [selectedFilters]
  );

  const stepInfos = useMemo(
    () => activeSections.map((name) => {
      const sec = sections.find((s) => s.name === name);
      return { name, completionPercentage: sec?.completionPercentage ?? 0 };
    }),
    [sections, activeSections]
  );

  const currentSectionName = activeSections[activeSubStep] || activeSections[0];
  const currentSection = sections.find((s) => s.name === currentSectionName);
  const isLastStep = activeSubStep === activeSections.length - 1;

  const toggleFilter = (option: string) => {
    setSelectedFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
    setActiveSubStep(0);
  };

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
          <div className="flex items-center justify-between px-4 py-2 border-b border-border border-l-4 border-l-primary bg-muted/5 relative">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-foreground">Student Support</h2>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent hover:bg-accent/20 transition-all uppercase tracking-wider"
                >
                  <Filter className="h-3 w-3" />
                  <span>Filters</span>
                  <ChevronDown className={cn("h-2.5 w-2.5 transition-transform", isFilterOpen && "rotate-180")} />
                </button>
                
                {isFilterOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in text-nowrap">
                      <div className="p-2 border-b border-border bg-muted/20">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2">Select Activities to Fill</p>
                      </div>
                      <div className="p-1">
                        {FILTER_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => toggleFilter(opt)}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium hover:bg-muted transition-colors text-left"
                          >
                            <span className={cn(selectedFilters.includes(opt) ? "text-foreground" : "text-muted-foreground")}>
                                {opt}
                            </span>
                            {selectedFilters.includes(opt) && (
                              <Check className="h-3.5 w-3.5 text-success" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
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
               {currentSectionName === "National Cadet Corps (NCC)" && (
              <section id="section-ncc" className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">National Cadet Corps (NCC)</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
                  {renderSelectField(fields, updateField, "ncc-available", "NCC Unit Available?", ["Yes", "No"])}
                  {renderSelectField(fields, updateField, "ncc-year", "Academic Year", ["2023-24", "2022-23"])}
                  {renderInputField(fields, updateField, "ncc-male", "Institution Students (Male)", undefined, "number")}
                  {renderInputField(fields, updateField, "ncc-female", "Institution Students (Female)", undefined, "number")}
                  {renderInputField(fields, updateField, "ncc-other-male", "Other Institution Students (Male)", undefined, "number")}
                  {renderInputField(fields, updateField, "ncc-other-female", "Other Institution Students (Female)", undefined, "number")}
                </div>
              </section>
              )}

               {currentSectionName === "National Service Scheme (NSS)" && (
              <section id="section-nss" className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">National Service Scheme (NSS)</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {renderSelectField(fields, updateField, "nss-available", "NSS Available?", ["Yes", "No"])}
                  {renderSelectField(fields, updateField, "nss-year", "Academic Year", ["2023-24", "2022-23"])}
                  {renderInputField(fields, updateField, "nss-male", "Students Enrolled (Male)", undefined, "number")}
                  {renderInputField(fields, updateField, "nss-female", "Students Enrolled (Female)", undefined, "number")}
                </div>
              </section>
              )}

               {currentSectionName === "Computer Based Test (CBT) Facilities" && (
              <section id="section-cbt" className="space-y-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">CBT Facilities</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {renderSelectField(fields, updateField, "cbt-conducted", "Has the institution conducted any Computer Based Test (CBT)", ["Yes", "No"])}
                  {renderInputField(fields, updateField, "cbt-capacity", "Student Capacity per CBT Session", undefined, "number")}
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
                setActiveSubStep((s) => Math.min(activeSections.length - 1, s + 1));
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
