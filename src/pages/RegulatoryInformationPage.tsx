import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
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
  label: string,
  required: boolean = true
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </p>
      <div className="flex gap-4 py-0.5">
        {["Yes", "No"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-[12px] text-foreground cursor-pointer">
            <input
              type="radio"
              name={id}
              value={opt}
              checked={fieldVal === opt}
              onChange={(e) => setValue(id, e.target.value)}
              className="w-4 h-4 accent-accent"
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
  options: string[],
  required: boolean = true
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full rounded border bg-white px-2.5 py-1 h-9 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50" : "border-border"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  required: boolean = true
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;
  
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full rounded border bg-white px-2.5 py-1 h-9 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            filled ? "border-success/50" : "border-border"
          )}
        />
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
      <div className="p-3 lg:p-4 pb-24">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border border-l-4 border-l-primary bg-muted/5">
            <h2 className="text-sm font-bold text-foreground">Regulatory Information</h2>
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
              <section id="section-regulatory" className="bg-white border border-border/60 p-4 space-y-3 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Regulatory Information</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
                  {renderRadioGroup(fields, updateField, "nba-accreditation", "NBA Accreditation Valid")}
                  {renderRadioGroup(fields, updateField, "nacc-accreditation", "NACC Accreditation Valid")}
                  {renderRadioGroup(fields, updateField, "ariya-ranking", "ARIYA Ranking")}
                  {renderRadioGroup(fields, updateField, "nrf-ranking", "NRF Ranking")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-quality" className="bg-white border border-border/60 p-4 space-y-3 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Quality Certification</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
                  {renderRadioGroup(fields, updateField, "iso-9001", "ISO 9001 Valid")}
                  {renderRadioGroup(fields, updateField, "iso-14001", "ISO 14001 Valid")}
                  {renderRadioGroup(fields, updateField, "global-ranking", "Global Ranking")}
                  {renderRadioGroup(fields, updateField, "dpir-registered", "Registered in DPIR")}
                  {renderRadioGroup(fields, updateField, "swayam-registered", "SWAYAM Registered")}
                  {renderRadioGroup(fields, updateField, "digilocker-registered", "NAD (DigiLocker)")}
                  {renderRadioGroup(fields, updateField, "ndli-club", "NDLI Club")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-additional" className="bg-white border border-border/60 p-4 space-y-3 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Additional Details</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
                  {renderRadioGroup(fields, updateField, "nits-established", "NITS Policy")}
                  {renderRadioGroup(fields, updateField, "nits-app", "NITS Guidelines")}
                  {renderRadioGroup(fields, updateField, "moe-innovation", "MoE Innovation")}
                  {renderRadioGroup(fields, updateField, "smart-india-hackathon", "SIH Participation")}
                  {renderRadioGroup(fields, updateField, "unnat-bharat", "UBA Participation")}
                </div>
              </section>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 right-0 left-0 bg-white/95 backdrop-blur-sm border-t border-border/40 py-3 z-40"
           style={{ left: "var(--sidebar-width, 256px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-3 px-6">
          <button
            onClick={() => {
              if (activeSubStep > 0) setActiveSubStep((p) => p - 1);
              else navigate(-1);
            }}
            className="px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground hover:bg-muted/80 transition-all"
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (isLastStep) navigate(-1);
              else setActiveSubStep((p) => p + 1);
            }}
            className="min-w-[160px] px-8 py-2 bg-accent text-white rounded text-[11px] font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
          >
            {isLastStep ? "Finalize & Submit" : "Next Section →"}
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
