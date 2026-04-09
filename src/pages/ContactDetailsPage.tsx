import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const REGISTRAR_FIELDS: FieldState[] = [
  { id: "registrar-name", name: "Name", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-designation", name: "Designation", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-address", name: "Address", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-landline", name: "Landline Number", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-mobile", name: "Mobile Number", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-email", name: "Email Address", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-alt-mobile", name: "Alternate Mobile Number", section: "Registrar / Contact Person", value: "" },
  { id: "registrar-alt-email", name: "Alternate Email Address", section: "Registrar / Contact Person", value: "" },
];

const REPRESENTATIVE_FIELDS: FieldState[] = [
  { id: "rep-application-number", name: "Current Application Number", section: "SC / EVC / SAC / SHC Representative", value: "" },
  { id: "rep-active-person", name: "Active Representative", section: "SC / EVC / SAC / SHC Representative", value: "" },
  { id: "rep-name", name: "Name", section: "SC / EVC / SAC / SHC Representative", value: "" },
  { id: "rep-designation", name: "Designation", section: "SC / EVC / SAC / SHC Representative", value: "" },
  { id: "rep-mobile", name: "Mobile Number", section: "SC / EVC / SAC / SHC Representative", value: "" },
  { id: "rep-email", name: "Email Address", section: "SC / EVC / SAC / SHC Representative", value: "" },
];

const SECTION_ORDER = [
  "Registrar / Contact Person",
  "Additional Contact / Nodal Officer",
  "SC / EVC / SAC / SHC Representative",
];

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "email" | "tel" = "text"
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
          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success pointer-events-none" />
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
  options: string[]
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

export default function ContactDetailsPage() {
  const navigate = useNavigate();
  const [officerCount, setOfficerCount] = useState(1);
  
  const initialFields: FieldState[] = [
    ...REGISTRAR_FIELDS,
    ...Array.from({ length: 1 }).flatMap((_, i) => [
      { id: `additional-name-${i}`, name: `Officer ${i + 1} Name`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-designation-${i}`, name: `Officer ${i + 1} Designation`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-mobile-${i}`, name: `Officer ${i + 1} Mobile Number`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-email-${i}`, name: `Officer ${i + 1} Email Address`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-landline-${i}`, name: `Officer ${i + 1} Landline Number`, section: "Additional Contact / Nodal Officer", value: "" },
    ]),
    ...REPRESENTATIVE_FIELDS,
  ];

  const { fields, updateField, addFields, removeFields, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [activeSubStep, setActiveSubStep] = useState(0);

  const addOfficer = () => {
    const i = officerCount;
    setOfficerCount((prev) => prev + 1);
    addFields([
      { id: `additional-name-${i}`, name: `Officer ${i + 1} Name`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-designation-${i}`, name: `Officer ${i + 1} Designation`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-mobile-${i}`, name: `Officer ${i + 1} Mobile Number`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-email-${i}`, name: `Officer ${i + 1} Email Address`, section: "Additional Contact / Nodal Officer", value: "" },
      { id: `additional-landline-${i}`, name: `Officer ${i + 1} Landline Number`, section: "Additional Contact / Nodal Officer", value: "" },
    ]);
  };

  const removeOfficer = (indexToRemove: number) => {
    if (officerCount <= 1) return;
    setOfficerCount((prev) => prev - 1);
    const fieldIdsToRemove = [
      `additional-name-${officerCount - 1}`,
      `additional-designation-${officerCount - 1}`,
      `additional-mobile-${officerCount - 1}`,
      `additional-email-${officerCount - 1}`,
      `additional-landline-${officerCount - 1}`,
    ];
    removeFields(fieldIdsToRemove);
  };

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
            <h2 className="text-sm font-bold text-foreground">Contact Details</h2>
            <button
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-4 lg:p-5 space-y-4">
               {activeSubStep === 0 && (
                <section id="section-registrar" className="space-y-3 rounded border border-border/60 bg-white p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border/30">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Registrar / Contact Person</h3>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-4">
                    {renderInputField(fields, updateField, "registrar-name", "Name")}
                    {renderInputField(fields, updateField, "registrar-designation", "Designation")}
                    {renderInputField(fields, updateField, "registrar-address", "Address")}
                    {renderInputField(fields, updateField, "registrar-landline", "Landline Number", undefined, "tel")}
                    {renderInputField(fields, updateField, "registrar-mobile", "Mobile Number", undefined, "tel")}
                    {renderInputField(fields, updateField, "registrar-email", "Email Address", undefined, "email")}
                    {renderInputField(fields, updateField, "registrar-alt-mobile", "Alternate Mobile Number", undefined, "tel")}
                    {renderInputField(fields, updateField, "registrar-alt-email", "Alternate Email Address", undefined, "email")}
                  </div>
                </section>
              )}

               {activeSubStep === 1 && (
                <section id="section-additional" className="space-y-3 rounded border border-border/60 bg-white p-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border/30">
                    <div>
                      <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Additional Contact / Nodal Officers</h3>
                    </div>
                    <div className="flex items-center gap-3">
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
                      <button
                        className="flex items-center justify-center w-7 h-7 rounded bg-accent text-white font-black hover:bg-accent/90 transition-all text-sm"
                        onClick={addOfficer}
                        title="Add another officer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                   <div className="space-y-3 mt-2">
                    {Array.from({ length: officerCount }).map((_, i) => (
                      <div key={i} className="relative bg-muted/20 p-3 rounded border border-border/50">
                        <div className="flex justify-between items-center mb-3 border-b border-muted pb-2">
                          <h4 className="text-[11px] font-black text-primary uppercase tracking-widest">Officer {i + 1}</h4>
                          {officerCount > 1 && (
                            <button
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                              onClick={() => removeOfficer(i)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-4">
                          {renderInputField(fields, updateField, `additional-name-${i}`, "Name")}
                          {renderInputField(fields, updateField, `additional-designation-${i}`, "Designation")}
                          {renderInputField(fields, updateField, `additional-mobile-${i}`, "Mobile Number", undefined, "tel")}
                          {renderInputField(fields, updateField, `additional-email-${i}`, "Email Address", undefined, "email")}
                          {renderInputField(fields, updateField, `additional-landline-${i}`, "Landline Number", undefined, "tel")}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

               {activeSubStep === 2 && (
                <section id="section-representative" className="space-y-3 rounded border border-border/60 bg-white p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border/30">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Representative Details</h3>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-4">
                    {renderInputField(fields, updateField, "rep-application-number", "Current Application Number")}
                    {renderInputField(fields, updateField, "rep-active-person", "Active Representative")}
                    {renderInputField(fields, updateField, "rep-name", "Name")}
                    {renderInputField(fields, updateField, "rep-designation", "Designation")}
                    {renderInputField(fields, updateField, "rep-mobile", "Mobile Number", undefined, "tel")}
                    {renderInputField(fields, updateField, "rep-email", "Email Address", undefined, "email")}
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
