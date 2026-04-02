import { useState, useMemo } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { FormProgressBar } from "@/components/FormProgressBar";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, ArrowRight, Save } from "lucide-react";

const initialFields: FieldState[] = [
  { id: "aishe-code", name: "AISHE Code", section: "General Information", value: "U-123", required: true },
  { id: "institute-name", name: "Institute Name", section: "General Information", value: "Test Institute", required: true },
  { id: "country", name: "Country", section: "General Information", value: "India", required: true },
  { id: "state", name: "State", section: "General Information", value: "Gujarat", required: true },
  { id: "district", name: "District", section: "General Information", value: "Ahmedabad", required: true },
  { id: "sub-district", name: "Sub-District", section: "General Information", value: "" },
  { id: "street", name: "Street", section: "General Information", value: "" },
  { id: "city", name: "City", section: "General Information", value: "" },
  { id: "pin-code", name: "Pin Code", section: "General Information", value: "" },
  { id: "year-establishment", name: "Year of Establishment", section: "General Information", value: "1999", required: true },
  { id: "location", name: "Location of University", section: "General Information", value: "" },
  { id: "address-1", name: "Address Line 1", section: "General Information", value: "" },
  { id: "address-2", name: "Address Line 2", section: "General Information", value: "" },
  { id: "urban-local-body", name: "Urban Local Body", section: "Location & Area", value: "" },
  { id: "longitude", name: "Longitude", section: "Location & Area", value: "" },
  { id: "latitude", name: "Latitude", section: "Location & Area", value: "" },
  { id: "total-area", name: "Total Area (in acre)", section: "Location & Area", value: "" },
  { id: "constructed-area", name: "Total Constructed Area", section: "Location & Area", value: "" },
  { id: "website", name: "Website", section: "Location & Area", value: "" },
  { id: "status-prior", name: "Status Prior to Establishment", section: "Status & Classification", value: "" },
  { id: "year-declared", name: "Year Declared University/INI", section: "Status & Classification", value: "" },
  { id: "type-institution", name: "Type of Institution", section: "Status & Classification", value: "" },
  { id: "tier-institute", name: "Tier of Institute", section: "Status & Classification", value: "" },
  { id: "category", name: "Category (Men/Women/Coed)", section: "Status & Classification", value: "" },
  { id: "institution-specifically", name: "Institution Specifically for", section: "Status & Classification", value: "" },
  { id: "affiliating-university", name: "Is Affiliating University?", section: "Affiliation & Recognition", value: "" },
  { id: "affiliating-type", name: "Affiliating Univ. Type", section: "Affiliation & Recognition", value: "" },
  { id: "statutory-body", name: "Statutory Body Recognition Name", section: "Affiliation & Recognition", value: "" },
  { id: "ownership-type", name: "Ownership Type & Management", section: "Affiliation & Recognition", value: "" },
  { id: "year-aicte", name: "Year of 1st AICTE Approval", section: "Affiliation & Recognition", value: "" },
  { id: "graded-autonomy", name: "Whether Graded Autonomy", section: "Affiliation & Recognition", value: "" },
  { id: "deemed-status", name: "Deemed / Autonomous Status", section: "Affiliation & Recognition", value: "" },
  { id: "institute-eminence", name: "Institute of Eminence", section: "Affiliation & Recognition", value: "" },
];

const SECTION_ORDER = ["General Information", "Location & Area", "Status & Classification", "Affiliation & Recognition"];

export default function InstitutionDetailsPage() {
  const navigate = useNavigate();
  const { fields, updateField, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [currentStep, setCurrentStep] = useState(0);

  const currentSectionName = SECTION_ORDER[currentStep];
  const currentSectionFields = useMemo(
    () => fields.filter((f) => f.section === currentSectionName),
    [fields, currentSectionName]
  );

  const stepInfos = useMemo(
    () => SECTION_ORDER.map((name) => {
      const sec = sections.find((s) => s.name === name);
      return { name, completionPercentage: sec?.completionPercentage ?? 0 };
    }),
    [sections]
  );

  const isLastStep = currentStep === SECTION_ORDER.length - 1;
  const isFirstStep = currentStep === 0;

  const getFieldValue = (id: string) => fields.find((f) => f.id === id)?.value || "";
  const isFieldFilled = (id: string) => getFieldValue(id).trim() !== "";

  const renderField = (
    id: string,
    label: string,
    options?: { type?: "text" | "select" | "radio"; readOnly?: boolean; placeholder?: string; selectOptions?: string[]; radioOptions?: string[] }
  ) => {
    const { type = "text", readOnly, placeholder, selectOptions, radioOptions } = options || {};
    const filled = isFieldFilled(id);
    const value = getFieldValue(id);

    if (type === "radio") {
      return (
        <div id={id} className="animate-fade-in">
          <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
          <div className="flex items-center gap-4">
            {(radioOptions || ["Yes", "No"]).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name={id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => updateField(id, e.target.value)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground group-hover:text-accent transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
        <div className="relative">
          {type === "select" ? (
            <select
              id={id}
              value={value}
              onChange={(e) => updateField(id, e.target.value)}
              className={cn(
                "w-full h-11 px-3 rounded-xl border text-sm appearance-none cursor-pointer transition-all duration-200",
                "focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none",
                filled
                  ? "border-success/50 bg-success/5"
                  : "border-border bg-muted/50"
              )}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {(selectOptions || [value].filter(Boolean)).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={id}
              type="text"
              value={value}
              onChange={(e) => updateField(id, e.target.value)}
              readOnly={readOnly}
              placeholder={placeholder || `Enter ${label}`}
              className={cn(
                "w-full h-11 px-4 rounded-xl border text-sm transition-all duration-200 outline-none",
                "focus:ring-2 focus:ring-accent/30 focus:border-accent",
                readOnly && "cursor-default bg-muted/70",
                filled && !readOnly
                  ? "border-success/50 bg-success/5"
                  : "border-border bg-muted/50"
              )}
            />
          )}
          {filled && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success pointer-events-none" />
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentSectionName) {
      case "General Information":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {renderField("aishe-code", "AISHE Code", { readOnly: true })}
            {renderField("institute-name", "Institute Name", { readOnly: true })}
            {renderField("country", "Country", { type: "select", selectOptions: ["India"] })}
            {renderField("state", "State", { type: "select", selectOptions: ["Gujarat", "Maharashtra", "Rajasthan"] })}
            {renderField("district", "District", { type: "select", selectOptions: ["Ahmedabad", "Surat", "Vadodara"] })}
            {renderField("sub-district", "Sub-District", { type: "select" })}
            {renderField("street", "Street")}
            {renderField("city", "City")}
            {renderField("pin-code", "Pin Code")}
            {renderField("year-establishment", "Year of Establishment", { readOnly: true })}
            <div className="lg:col-span-2">
              {renderField("location", "Location of University", { type: "select" })}
            </div>
            {renderField("address-1", "Address Line 1")}
            {renderField("address-2", "Address Line 2")}
          </div>
        );
      case "Location & Area":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {renderField("urban-local-body", "Urban Local Body", { placeholder: "Municipality / Corporation" })}
            {renderField("longitude", "Longitude (in degree)", { placeholder: "e.g. 72.5714" })}
            {renderField("latitude", "Latitude (in degree)", { placeholder: "e.g. 23.0225" })}
            {renderField("total-area", "Total Area (in acre)", { placeholder: "Enter Total Area" })}
            {renderField("constructed-area", "Total Constructed Area (sq. m)", { placeholder: "Enter Constructed Area" })}
            {renderField("website", "Website", { placeholder: "https://example.com" })}
          </div>
        );
      case "Status & Classification":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {renderField("status-prior", "Status Prior to Establishment", { type: "select", selectOptions: ["Autonomous College", "Affiliated College", "Constituent College"] })}
            {renderField("year-declared", "Year Declared University/INI")}
            {renderField("type-institution", "Type of Institution", { type: "select", selectOptions: ["State Open University", "Central University", "Private University"] })}
            {renderField("tier-institute", "Tier of Institute", { type: "select" })}
            {renderField("category", "Category (Men/Women/Coed)", { type: "select", selectOptions: ["Coed", "Men", "Women"] })}
            {renderField("institution-specifically", "Institution Specifically for", { type: "select", selectOptions: ["General", "Minority", "Women", "PwD"] })}
          </div>
        );
      case "Affiliation & Recognition":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {renderField("affiliating-university", "Is Affiliating University?", { type: "select", selectOptions: ["Yes", "No"] })}
            {renderField("affiliating-type", "Affiliating Univ. Type")}
            {renderField("statutory-body", "Statutory Body Recognition Name")}
            {renderField("ownership-type", "Ownership Type & Management", { type: "select" })}
            {renderField("year-aicte", "Year of 1st AICTE Approval")}
            {renderField("graded-autonomy", "Whether Graded Autonomy", { type: "radio" })}
            {renderField("deemed-status", "Deemed / Autonomous Status", { type: "select" })}
            {renderField("institute-eminence", "Institute of Eminence", { type: "radio" })}
          </div>
        );
      default:
        return null;
    }
  };

  const currentSection = sections.find((s) => s.name === currentSectionName);

  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Institute Details</h2>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          {/* Overall progress */}
          <FormProgressBar
            sections={sections}
            overallPercentage={overallPercentage}
            activeSection={currentSectionName}
          />

          {/* Stepper */}
          <div className="border-b border-border bg-muted/30">
            <FormStepper
              steps={stepInfos}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Step content */}
          <div className="p-6 lg:p-8">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Step {currentStep + 1} of {SECTION_ORDER.length}</p>
                <h3 className="text-base font-semibold text-foreground">{currentSectionName}</h3>
              </div>
              {currentSection && (
                <span
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-full",
                    currentSection.completionPercentage >= 100
                      ? "bg-success/10 text-success"
                      : currentSection.completionPercentage > 0
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentSection.completionPercentage}% Complete
                </span>
              )}
            </div>

            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={isFirstStep}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isFirstStep
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-sm"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                onClick={() => {
                  if (isLastStep) {
                    // Submit
                  } else {
                    setCurrentStep((s) => Math.min(SECTION_ORDER.length - 1, s + 1));
                  }
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-md"
              >
                {isLastStep ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save & Submit
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
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
