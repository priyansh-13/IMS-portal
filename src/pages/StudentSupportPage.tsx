import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border px-3 py-2 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {filled && (
          <CheckCircle2 className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
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
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary relative">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-foreground">Student Support & Institutional Activities</h2>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground hover:bg-muted transition-all"
                >
                  <Filter className="h-3.5 w-3.5 text-accent" />
                  <span>Sections Filter</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isFilterOpen && "rotate-180")} />
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
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <FormStepper
            steps={stepInfos}
            currentStep={activeSubStep}
            onStepClick={(idx) => setActiveSubStep(idx)}
            overallPercentage={overallPercentage}
          />

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
            <div className="flex-1 min-w-0 space-y-6">
              {currentSectionName === "National Cadet Corps (NCC)" && (
              <section id="section-ncc" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">National Cadet Corps (NCC)</h3>
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
              <section id="section-nss" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">National Service Scheme (NSS)</h3>
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
                  {renderSelectField(fields, updateField, "nss-available", "NSS Available?", ["Yes", "No"])}
                  {renderSelectField(fields, updateField, "nss-year", "Academic Year", ["2023-24", "2022-23"])}
                  {renderInputField(fields, updateField, "nss-male", "Students Enrolled (Male)", undefined, "number")}
                  {renderInputField(fields, updateField, "nss-female", "Students Enrolled (Female)", undefined, "number")}
                </div>
              </section>
              )}

              {currentSectionName === "Computer Based Test (CBT) Facilities" && (
              <section id="section-cbt" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Computer Based Test (CBT) Facilities</h3>
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
                  {renderSelectField(fields, updateField, "cbt-conducted", "Has the institution conducted any Computer Based Test (CBT)", ["Yes", "No"])}
                  {renderInputField(fields, updateField, "cbt-capacity", "Student Capacity per CBT Session", undefined, "number")}
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
                      setActiveSubStep((s) => Math.min(activeSections.length - 1, s + 1));
                    }
                  }}
                >
                  {isLastStep ? "Save" : "Save & Continue"}
                </button>
              </div>
            </div>

            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sections}
                sectionOrder={activeSections}
                activeSection={currentSectionName}
                onSectionClick={(name) => {
                  const targetIndex = activeSections.indexOf(name);
                  if (targetIndex >= 0) {
                    setActiveSubStep(targetIndex);
                  }
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
