import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { Info,  CheckCircle2  } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 mb-1">
        <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger tabIndex={-1} type="button" className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground/60 hover:text-accent transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">Please provide accurate details for {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success pointer-events-none" />
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 mb-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger tabIndex={-1} type="button" className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground/60 hover:text-accent transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">Please provide accurate details for {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
                <section id="section-registrar" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                    <h3 className="text-base font-semibold text-foreground">Details Of Registrar/contact Person</h3>
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
                <section id="section-additional" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <div className="flex justify-between items-center border-b border-border/50 pb-3 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Details Of Additional Contact Person / Institution Nodal Officer</h3>
                    </div>
                    <div className="flex items-center gap-3">
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
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold hover:shadow-md hover:bg-accent/90 transition-all text-xl"
                        onClick={addOfficer}
                        title="Add another officer"
                      >
                        +
                      </button>
                    </div>
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
                <section id="section-representative" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                    <h3 className="text-base font-semibold text-foreground">Representative Details For SC/EVC/SAC/SHC</h3>
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
                    {renderInputField(fields, updateField, "rep-application-number", "Current Application Number")}
                    {renderInputField(fields, updateField, "rep-active-person", "Active Representative")}
                    {renderInputField(fields, updateField, "rep-name", "Name")}
                    {renderInputField(fields, updateField, "rep-designation", "Designation")}
                    {renderInputField(fields, updateField, "rep-mobile", "Mobile Number", undefined, "tel")}
                    {renderInputField(fields, updateField, "rep-email", "Email Address", undefined, "email")}
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
