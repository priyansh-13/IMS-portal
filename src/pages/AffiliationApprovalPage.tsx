import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const AFFILIATION_FIELDS: FieldState[] = [
  { id: "affiliation-university", name: "Name of Affiliating University / Board", section: "Affiliation / Approval Details", value: "" },
  { id: "change-affiliating", name: "Change in Affiliating University / Board", section: "Affiliation / Approval Details", value: "" },
  { id: "previous-university", name: "Previous University / Board", section: "Affiliation / Approval Details", value: "" },
  { id: "effective-year", name: "Effective From Year", section: "Affiliation / Approval Details", value: "" },
  { id: "odl-affiliation", name: "Affiliation for ODL / Online / Distance Mode", section: "Affiliation / Approval Details", value: "" },
  { id: "offcampus-affiliation", name: "Affiliation for Off-Campus / Constituent College", section: "Affiliation / Approval Details", value: "" },
  { id: "integrated-affiliation", name: "Affiliation for Integrated / Twinning / Collaborative Programme", section: "Affiliation / Approval Details", value: "" },
  { id: "research-affiliation", name: "Affiliation for Research / PhD Programme", section: "Affiliation / Approval Details", value: "" },
  { id: "statutory-body", name: "Recognition by Statutory Body", section: "Affiliation / Approval Details", value: "" },
  { id: "nri-approval", name: "Approval for NRI / OCI / Foreign Student Quota", section: "Affiliation / Approval Details", value: "" },
  { id: "state-govt", name: "State Government Recommendation / NOC", section: "Affiliation / Approval Details", value: "" },
  { id: "university-rec", name: "University / Board Recommendation", section: "Affiliation / Approval Details", value: "" },
];

const SECTION_ORDER = ["Affiliation / Approval Details"];

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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="text-red-500 ml-0.5">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-9 rounded border px-2.5 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            filled ? "border-success/50 bg-success/5" : "border-border bg-white"
          )}
        />
        {filled && (
          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="text-red-500 ml-0.5">*</span>
      </label>
      <div className="relative">
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full h-9 rounded border bg-white px-2.5 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-white"
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

const renderRadioGroup = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[] = ["Yes", "No"]
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="text-red-500 ml-0.5">*</span>
      </p>
      <div className="flex gap-4 py-0.5">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-[12px] text-foreground cursor-pointer group">
            <input
              type="radio"
              name={id}
              value={opt}
              checked={fieldVal === opt}
              onChange={(e) => setValue(id, e.target.value)}
              className="w-4 h-4 accent-accent"
            />
            <span className="group-hover:text-accent transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function AffiliationApprovalPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [...AFFILIATION_FIELDS];

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
      <div className="p-3 lg:p-4 pb-24">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border border-l-4 border-l-primary bg-muted/5">
            <h2 className="text-sm font-bold text-foreground">Affiliation / Approval</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-4 lg:p-5 space-y-4">
               {activeSubStep === 0 && (
                <section id="section-affiliation" className="space-y-3 rounded border border-border/60 bg-white p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border/30">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Affiliation / Approval Details</h3>
                    {currentSection && (
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                        currentSection.completionPercentage >= 100 
                          ? "bg-success/10 text-success" 
                          : "bg-accent/10 text-accent"
                      )}>
                        {currentSection.completionPercentage}% Complete
                      </span>
                    )}
                  </div>
                 <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-3 bg-white p-2 border border-border/60 rounded-lg shadow-sm">
                  <div className="w-full lg:w-1/2">
                    {renderInputField(fields, updateField, "affiliation-university", "Name of Affiliating University / Board")}
                  </div>
                  {/* <div className="flex items-center gap-2 pr-2">
                    <span className="text-[10px] font-bold text-foreground">STATUS:</span>
                    <div className="flex items-center gap-1">
                       <button className="rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-accent/20 text-accent hover:bg-accent/30 transition-colors">View</button>
                       <button className="rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Manage</button>
                    </div>
                  </div> */}
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4 pt-1">
                  {renderRadioGroup(fields, updateField, "change-affiliating", "Change in Affiliating Univ")}
                  {renderInputField(fields, updateField, "previous-university", "Previous Univ / Board")}
                  {renderInputField(fields, updateField, "effective-year", "Effective From", "dd-mm-yyyy", "date")}
                  {renderRadioGroup(fields, updateField, "odl-affiliation", "ODL Mode")}
                  {renderRadioGroup(fields, updateField, "offcampus-affiliation", "Off-Campus / Constituent")}
                  {renderRadioGroup(fields, updateField, "integrated-affiliation", "Integrated / Collaborative")}
                  {renderRadioGroup(fields, updateField, "research-affiliation", "Research / PhD")}
                  {renderSelectField(fields, updateField, "statutory-body", "Recognition Body", ["UGC", "AICTE", "NAAC"])}
                  {renderRadioGroup(fields, updateField, "nri-approval", "NRI / Foreign Quota")}
                  {renderRadioGroup(fields, updateField, "state-govt", "State Govt NOC")}
                  {renderRadioGroup(fields, updateField, "university-rec", "University Rec")}
                </div>
              </section>
              )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 right-0 left-0 bg-white/95 backdrop-blur-sm border-t border-border py-3 z-40 transition-all duration-300"
           style={{ left: "var(--sidebar-width, 256px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
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
