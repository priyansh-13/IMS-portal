import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
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
      <p className="text-sm font-medium text-foreground">{label}</p>
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
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Affiliation / Approval</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-affiliation" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Affiliation / Approval Details</h3>
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
                <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-4 md:gap-6">
                  <div className="w-full xl:w-2/5">
                    {renderInputField(fields, updateField, "affiliation-university", "Name of Affiliating University / Board")}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">Programme-wise Affiliation / Approval Status</span>
                    <div className="flex items-center gap-2">
                       <button className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">View</button>
                       <button className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-950 transition-colors">Manage Programmes</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "change-affiliating", "Change in Affiliating University / Board")}
                  {renderInputField(fields, updateField, "previous-university", "Previous University / Board")}
                  {renderInputField(fields, updateField, "effective-year", "Effective From Year", "dd-mm-yyyy", "date")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "odl-affiliation", "Affiliation for ODL / Online / Distance Mode")}
                  {renderRadioGroup(fields, updateField, "offcampus-affiliation", "Affiliation for Off-Campus / Constituent College")}
                  {renderRadioGroup(fields, updateField, "integrated-affiliation", "Affiliation for Integrated / Twinning / Collaborative Programme")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "research-affiliation", "Affiliation for Research / PhD Programme")}
                  {renderSelectField(fields, updateField, "statutory-body", "Recognition by Statutory Body", ["UGC", "AICTE", "NAAC"])}
                  {renderRadioGroup(fields, updateField, "nri-approval", "Approval for NRI / OCI / Foreign Student Quota")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "state-govt", "State Government Recommendation / NOC")}
                  {renderRadioGroup(fields, updateField, "university-rec", "University / Board Recommendation")}
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
                sections={sections}
                sectionOrder={SECTION_ORDER}
                activeSection={currentSectionName}
                onSectionClick={(name) => {
                  const targetIndex = SECTION_ORDER.indexOf(name);
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
