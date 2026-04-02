import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";

type FieldValueMap = Record<string, string>;

const renderRadioGroup = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string
) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm font-medium text-foreground">{label}</p>
    <div className="flex gap-4">
      {["Yes", "No"].map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="radio"
            name={id}
            value={opt}
            checked={values[id] === opt}
            onChange={(e) => setValue(id, e.target.value)}
            className="accent-accent"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const renderSelectField = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
    <select
      id={id}
      value={values[id] || ""}
      onChange={(e) => setValue(id, e.target.value)}
      className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/30"
    >
      <option value="">--Please Select--</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const renderInputField = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
    <input
      id={id}
      type="text"
      value={values[id] || ""}
      onChange={(e) => setValue(id, e.target.value)}
      className="w-full rounded-xl border border-border px-3 py-2 text-sm transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/30"
    />
  </div>
);

export default function RegulatoryInformationPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "Regulatory Information",
      fields: [
        "nba-accreditation",
        "nacc-accreditation",
        "ariya-ranking",
        "nrf-ranking",
      ],
      targetId: "section-regulatory",
    },
    {
      name: "Quality Certification",
      fields: [
        "iso-9001",
        "iso-14001",
        "global-ranking",
        "dpir-registered",
        "swayam-registered",
        "digilocker-registered",
        "ndli-club",
      ],
      targetId: "section-quality",
    },
    {
      name: "Additional Details",
      fields: [
        "nits-established",
        "nits-app",
        "moe-innovation",
        "smart-india-hackathon",
        "unnat-bharat",
      ],
      targetId: "section-additional",
    },
  ];

  const [activeSubStep, setActiveSubStep] = useState(0);

  const setValue = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const sectionsWithProgress = pageSteps.map((step) => {
    const filled = step.fields.filter((field) => (values[field] || "").trim().length > 0).length;
    return {
      name: step.name,
      totalFields: step.fields.length,
      filledFields: filled,
      completionPercentage: Math.round((filled / step.fields.length) * 100) || 0,
      targetId: step.targetId,
    };
  });

  const totalFields = sectionsWithProgress.reduce((sum, s) => sum + s.totalFields, 0);
  const totalFilled = sectionsWithProgress.reduce((sum, s) => sum + s.filledFields, 0);
  const overallPercentage = totalFields ? Math.round((totalFilled / totalFields) * 100) : 0;
  const isLastStep = activeSubStep === pageSteps.length - 1;

  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <FormStepper
            steps={sectionsWithProgress.map(({ name, completionPercentage }) => ({ name, completionPercentage }))}
            currentStep={activeSubStep}
            onStepClick={(idx) => setActiveSubStep(idx)}
            overallPercentage={overallPercentage}
          />

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
            <div className="flex-1 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-regulatory" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Regulatory Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "nba-accreditation", "NBA Accreditation Valid")}
                  {renderRadioGroup(values, setValue, "nacc-accreditation", "NACC Accreditation Valid")}
                  {renderRadioGroup(values, setValue, "ariya-ranking", "ARIYA Ranking")}
                  {renderRadioGroup(values, setValue, "nrf-ranking", "NRF Ranking")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-quality" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Quality Certification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "iso-9001", "ISO 9001 Valid")}
                  {renderRadioGroup(values, setValue, "iso-14001", "ISO 14001 Valid")}
                  {renderRadioGroup(values, setValue, "global-ranking", "Part of Global Ranking")}
                  {renderRadioGroup(values, setValue, "dpir-registered", "Registered in DPIR")}
                  {renderRadioGroup(values, setValue, "swayam-registered", "Registered with SWAYAM")}
                  {renderRadioGroup(values, setValue, "digilocker-registered", "National Academic Depository (DigiLocker)")}
                  {renderRadioGroup(values, setValue, "ndli-club", "Registered in NDLI Club")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-additional" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "nits-established", "National Innovation and Startup Policy (NITS)")}
                  {renderRadioGroup(values, setValue, "nits-app", "Adoption of NITS Guidelines")}
                  {renderRadioGroup(values, setValue, "moe-innovation", "Institution's Innovation Council (MoE)")}
                  {renderRadioGroup(values, setValue, "smart-india-hackathon", "Participation in Smart India Hackathon")}
                  {renderRadioGroup(values, setValue, "unnat-bharat", "Participation in Unnat Bharat Abhiyan")}
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
                      const next = Math.min(activeSubStep + 1, pageSteps.length - 1);
                      setActiveSubStep(next);
                    }
                  }}
                >
                  {isLastStep ? "Save" : "Save & Continue"}
                </button>
              </div>
            </div>

            <div className="flex-none lg:w-80">
              <SectionStatusSidebar
                sections={sectionsWithProgress}
                sectionOrder={sectionsWithProgress.map((s) => s.name)}
                activeSection={sectionsWithProgress[activeSubStep].name}
                onSectionClick={(name) => {
                  const targetIndex = sectionsWithProgress.findIndex((s) => s.name === name);
                  if (targetIndex >= 0) {
                    setActiveSubStep(targetIndex);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </TopLayout>
  );
}
