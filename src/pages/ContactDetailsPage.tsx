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
  type: "text" | "email" | "tel" = "text"
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">
      {label}
    </label>
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

export default function ContactDetailsPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const [officerCount, setOfficerCount] = useState(1);
  const navigate = useNavigate();
  const pageSteps = [
    {
      name: "Registrar / Contact Person",
      fields: [
        "registrar-name",
        "registrar-designation",
        "registrar-address",
        "registrar-landline",
        "registrar-mobile",
        "registrar-email",
        "registrar-alt-mobile",
        "registrar-alt-email",
      ],
      targetId: "section-registrar",
    },
    {
      name: "Additional Contact / Nodal Officer",
      fields: Array.from({ length: officerCount }).flatMap((_, i) => [
        `additional-name-${i}`,
        `additional-designation-${i}`,
        `additional-mobile-${i}`,
        `additional-email-${i}`,
        `additional-landline-${i}`,
        `additional-alt-mobile-${i}`,
      ]),
      targetId: "section-additional",
    },
    {
      name: "SC / EVC / SAC / SHC Representative",
      fields: [
        "rep-application-number",
        "rep-active-person",
        "rep-name",
        "rep-designation",
        "rep-mobile",
        "rep-email",
      ],
      targetId: "section-representative",
    },
  ];
  const [activeSubStep, setActiveSubStep] = useState(0);
  const setValue = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const removeOfficer = (indexToRemove: number) => {
    if (officerCount <= 1) return;
    setOfficerCount((prev) => prev - 1);
    setValues((prev) => {
      const next = { ...prev };
      const fields = ["name", "designation", "mobile", "email", "landline", "alt-mobile"];
      for (let i = indexToRemove; i < officerCount - 1; i++) {
        fields.forEach((f) => {
          next[`additional-${f}-${i}`] = next[`additional-${f}-${i + 1}`] || "";
        });
      }
      fields.forEach((f) => {
        delete next[`additional-${f}-${officerCount - 1}`];
      });
      return next;
    });
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary bg-card">
            <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
            <button
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              onClick={() => navigate(-1)}
            >
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
            <div className="flex-1 space-y-6">
              {activeSubStep === 0 && (
                <section id="section-registrar" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <h3 className="text-base font-semibold text-foreground">Details Of Registrar/contact Person</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInputField(values, setValue, "registrar-name", "Name")}
                    {renderInputField(values, setValue, "registrar-designation", "Designation")}
                    {renderInputField(values, setValue, "registrar-address", "Address")}
                    {renderInputField(values, setValue, "registrar-landline", "Landline Number", undefined, "tel")}
                    {renderInputField(values, setValue, "registrar-mobile", "Mobile Number", undefined, "tel")}
                    {renderInputField(values, setValue, "registrar-email", "Email Address", undefined, "email")}
                    {renderInputField(values, setValue, "registrar-alt-mobile", "Alternate Mobile Number", undefined, "tel")}
                    {renderInputField(values, setValue, "registrar-alt-email", "Alternate Email Address", undefined, "email")}
                  </div>
                </section>
              )}

              {activeSubStep === 1 && (
                <section id="section-additional" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <div className="flex justify-between items-center border-b border-border/50 pb-3 mb-4">
                    <h3 className="text-base font-semibold text-foreground">Details Of Additional Contact Person / Institution Nodal Officer</h3>
                    <button
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold hover:shadow-md hover:bg-accent/90 transition-all text-xl"
                      onClick={() => setOfficerCount((prev) => prev + 1)}
                      title="Add another officer"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {Array.from({ length: officerCount }).map((_, i) => (
                      <div key={i} className="relative bg-white p-5 rounded-xl border border-border shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-semibold text-primary">Officer {i + 1}</h4>
                          {officerCount > 1 && (
                            <button
                              className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              onClick={() => removeOfficer(i)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {renderInputField(values, setValue, `additional-name-${i}`, "Name")}
                          {renderInputField(values, setValue, `additional-designation-${i}`, "Designation")}
                          {renderInputField(values, setValue, `additional-mobile-${i}`, "Mobile Number", undefined, "tel")}
                          {renderInputField(values, setValue, `additional-email-${i}`, "Email Address", undefined, "email")}
                          {renderInputField(values, setValue, `additional-landline-${i}`, "Landline Number", undefined, "tel")}
                          {renderInputField(values, setValue, `additional-alt-mobile-${i}`, "Alternate Mobile Number", undefined, "tel")}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSubStep === 2 && (
                <section id="section-representative" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <h3 className="text-base font-semibold text-foreground">Representative Details For SC/EVC/SAC/SHC</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInputField(values, setValue, "rep-application-number", "Current Application Number")}
                    {renderInputField(values, setValue, "rep-active-person", "Active Representative")}
                    {renderInputField(values, setValue, "rep-name", "Name")}
                    {renderInputField(values, setValue, "rep-designation", "Designation")}
                    {renderInputField(values, setValue, "rep-mobile", "Mobile Number", undefined, "tel")}
                    {renderInputField(values, setValue, "rep-email", "Email Address", undefined, "email")}
                  </div>
                </section>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  onClick={() => navigate(-1)}
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
