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

const REGULATORY_FIELDS: FieldState[] = [
  // Regulatory Information
  { id: "nba-accreditation", name: "NBA Accreditation Valid", section: "Regulatory Information", value: "" },
  { id: "nacc-accreditation", name: "NACC Accreditation Valid", section: "Regulatory Information", value: "" },
  { id: "ariya-ranking", name: "ARIYA Ranking", section: "Regulatory Information", value: "" },
  { id: "nrf-ranking", name: "NRF Ranking", section: "Regulatory Information", value: "" },

  // Quality Certification
  { id: "iso-9001", name: "ISO 9001 Valid", section: "Quality Certification", value: "" },
  { id: "iso-14001", name: "ISO 14001 Valid", section: "Quality Certification", value: "" },
  { id: "global-ranking", name: "Part of Global Ranking", section: "Quality Certification", value: "" },
  { id: "dpir-registered", name: "Registered in DPIR", section: "Quality Certification", value: "" },
  { id: "swayam-registered", name: "Registered with SWAYAM", section: "Quality Certification", value: "" },
  { id: "digilocker-registered", name: "National Academic Depository (DigiLocker)", section: "Quality Certification", value: "" },
  { id: "ndli-club", name: "Registered in NDLI Club", section: "Quality Certification", value: "" },

  // Additional Details
  { id: "nits-established", name: "National Innovation and Startup Policy (NITS)", section: "Additional Details", value: "" },
  { id: "nits-app", name: "Adoption of NITS Guidelines", section: "Additional Details", value: "" },
  { id: "moe-innovation", name: "Institution's Innovation Council (MoE)", section: "Additional Details", value: "" },
  { id: "smart-india-hackathon", name: "Participation in Smart India Hackathon", section: "Additional Details", value: "" },
  { id: "unnat-bharat", name: "Participation in Unnat Bharat Abhiyan", section: "Additional Details", value: "" },
];

const SECTION_ORDER = [
  "Regulatory Information",
  "Quality Certification",
  "Additional Details",
];

const renderRadioGroup = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex gap-4">
        {["Yes", "No"].map((opt) => (
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
          <option value="">--Please Select--</option>
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

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;
  
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
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

export default function RegulatoryInformationPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [...REGULATORY_FIELDS];

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
            <h2 className="text-lg font-semibold text-foreground">Regulatory Information</h2>
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
              <section id="section-regulatory" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Regulatory Information</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(fields, updateField, "nba-accreditation", "NBA Accreditation Valid")}
                  {renderRadioGroup(fields, updateField, "nacc-accreditation", "NACC Accreditation Valid")}
                  {renderRadioGroup(fields, updateField, "ariya-ranking", "ARIYA Ranking")}
                  {renderRadioGroup(fields, updateField, "nrf-ranking", "NRF Ranking")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-quality" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Quality Certification</h3>
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
                  {renderRadioGroup(fields, updateField, "iso-9001", "ISO 9001 Valid")}
                  {renderRadioGroup(fields, updateField, "iso-14001", "ISO 14001 Valid")}
                  {renderRadioGroup(fields, updateField, "global-ranking", "Part of Global Ranking")}
                  {renderRadioGroup(fields, updateField, "dpir-registered", "Registered in DPIR")}
                  {renderRadioGroup(fields, updateField, "swayam-registered", "Registered with SWAYAM")}
                  {renderRadioGroup(fields, updateField, "digilocker-registered", "National Academic Depository (DigiLocker)")}
                  {renderRadioGroup(fields, updateField, "ndli-club", "Registered in NDLI Club")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-additional" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Additional Details</h3>
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
                  {renderRadioGroup(fields, updateField, "nits-established", "National Innovation and Startup Policy (NITS)")}
                  {renderRadioGroup(fields, updateField, "nits-app", "Adoption of NITS Guidelines")}
                  {renderRadioGroup(fields, updateField, "moe-innovation", "Institution's Innovation Council (MoE)")}
                  {renderRadioGroup(fields, updateField, "smart-india-hackathon", "Participation in Smart India Hackathon")}
                  {renderRadioGroup(fields, updateField, "unnat-bharat", "Participation in Unnat Bharat Abhiyan")}
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
