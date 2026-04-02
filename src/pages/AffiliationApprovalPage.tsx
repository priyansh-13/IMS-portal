import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";

type FieldValueMap = Record<string, string>;

const renderInputField = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "date" | "email" = "text"
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
    <input
      id={id}
      type={type}
      value={values[id] || ""}
      onChange={(e) => setValue(id, e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border px-3 py-2 text-sm transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/30"
    />
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
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const renderRadioGroup = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm font-medium text-foreground">{label}</p>
    <div className="flex gap-4">
      {options.map((opt) => (
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

export default function AffiliationApprovalPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "Affiliation / Approval Details",
      fields: [
        "affiliation-university",
        "change-affiliating",
        "previous-university",
        "effective-year",
        "odl-affiliation",
        "offcampus-affiliation",
        "integrated-affiliation",
        "research-affiliation",
        "statutory-body",
        "nri-approval",
        "state-govt",
        "university-rec",
        "additional-comments",
      ],
      targetId: "section-affiliation",
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Affiliation / Approval</h2>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
              Back
            </button>
          </div>

          <FormStepper
            steps={sectionsWithProgress.map(({ name, completionPercentage }) => ({ name, completionPercentage }))}
            currentStep={activeSubStep}
            onStepClick={(idx) => setActiveSubStep(idx)}
            overallPercentage={overallPercentage}
          />

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-affiliation" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <h3 className="text-base font-semibold text-foreground">Affiliation / Approval Details</h3>
                <div className="flex items-center justify-between gap-4">
                  {renderInputField(values, setValue, "affiliation-university", "Name of Affiliating University / Board")}
                  <div className="flex gap-2">
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                    <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Programmes</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "change-affiliating", "Change in Affiliating University / Board", ["Yes", "No"])}
                  {renderInputField(values, setValue, "previous-university", "Previous University / Board")}
                  {renderInputField(values, setValue, "effective-year", "Effective From Year", "dd-mm-yyyy", "date")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "odl-affiliation", "Affiliation for ODL / Online / Distance Mode", ["Yes", "No"])}
                  {renderRadioGroup(values, setValue, "offcampus-affiliation", "Affiliation for Off-Campus / Constituent College", ["Yes", "No"])}
                  {renderRadioGroup(values, setValue, "integrated-affiliation", "Affiliation for Integrated / Twinning / Collaborative Programme", ["Yes", "No"])}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "research-affiliation", "Affiliation for Research / PhD Programme", ["Yes", "No"])}
                  {renderSelectField(values, setValue, "statutory-body", "Recognition by Statutory Body", ["UGC", "AICTE", "NAAC"])}
                  {renderRadioGroup(values, setValue, "nri-approval", "Approval for NRI / OCI / Foreign Student Quota", ["Yes", "No"])}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "state-govt", "State Government Recommendation / NOC", ["Yes", "No"])}
                  {renderRadioGroup(values, setValue, "university-rec", "University / Board Recommendation", ["Yes", "No"])}
                  {renderInputField(values, setValue, "additional-comments", "Additional Comments")}
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

            <div className="flex-none px-2 pb-6 lg:pb-0">
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
