import { useState, useMemo } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, ArrowRight, Save, UploadCloud, FileCheck, X } from "lucide-react";

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
  { id: "urban-local-body", name: "Urban Local Body", section: "General Information", value: "" },
  { id: "longitude", name: "Longitude (in degree)", section: "General Information", value: "" },
  { id: "latitude", name: "Latitude (in degree)", section: "General Information", value: "" },
  { id: "total-area", name: "Total Area (in acre)", section: "General Information", value: "" },
  { id: "constructed-area", name: "Total Constructed Area (sq. m)", section: "General Information", value: "" },
  { id: "website", name: "Website", section: "General Information", value: "" },

  { id: "status-prior", name: "Status Prior to Establishment", section: "Status & Classification", value: "Autonomous College" },
  { id: "year-declared", name: "Year Declared University/INI", section: "Status & Classification", value: "" },
  { id: "type-institution", name: "Type of Institution", section: "Status & Classification", value: "State Open University" },
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

  { id: "minority-institution", name: "Minority Institution", section: "Minority Details", value: "" },
  { id: "minority-type", name: "Minority Type", section: "Minority Details", value: "" },
  { id: "certificate-issued-date", name: "Certificate Issued Date", section: "Minority Details", value: "" },
  { id: "certificate-valid-till", name: "Certificate Valid Till", section: "Minority Details", value: "" },

  { id: "constituent-campus", name: "Constituent / Off-Campus", section: "Campus & Approval Details", value: "" },
  { id: "constituent-count", name: "Number of Constituent / Off-Campus", section: "Campus & Approval Details", value: "" },
  { id: "regional-centre-exists", name: "Regional Centre Exists", section: "Campus & Approval Details", value: "" },
  { id: "regional-centre-count", name: "Number of Regional Centre", section: "Campus & Approval Details", value: "" },
  { id: "odl-exists", name: "ODL Centres Exists", section: "Campus & Approval Details", value: "" },
  { id: "odl-count", name: "Number of ODL Centre", section: "Campus & Approval Details", value: "" },
  { id: "online-exists", name: "Online Centres Exists", section: "Campus & Approval Details", value: "" },
  { id: "online-count", name: "Number of Online Centre", section: "Campus & Approval Details", value: "" },
  { id: "new-approval-last-year", name: "New Approval Last Year", section: "Campus & Approval Details", value: "" },
  { id: "approval-letter", name: "Approval / Recognition Letters", section: "Campus & Approval Details", value: "" },

  { id: "disc-general", name: "General (Multi-Disciplinary)", section: "Academic Profile", value: "" },
  { id: "disc-engineering", name: "Engineering / Technology / Architecture / Design", section: "Academic Profile", value: "" },
  { id: "disc-arts", name: "Arts / Humanities / Social Sciences", section: "Academic Profile", value: "" },
  { id: "disc-languages", name: "Indian and Foreign Languages", section: "Academic Profile", value: "" },
  { id: "disc-it", name: "IT & Computer Application", section: "Academic Profile", value: "" },
  { id: "disc-sciences", name: "Sciences", section: "Academic Profile", value: "" },
  { id: "disc-vocational", name: "Vocational Education", section: "Academic Profile", value: "" },
  { id: "disc-nursing", name: "Nursing and Paramedical", section: "Academic Profile", value: "" },
  { id: "disc-others", name: "Others", section: "Academic Profile", value: "" },
];

const SECTION_ORDER = [
  "General Information",
  "Status & Classification",
  "Affiliation & Recognition",
  "Minority Details",
  "Campus & Approval Details",
  "Academic Profile",
];

export default function InstitutionDetailsPage() {
  const navigate = useNavigate();
  const { fields, updateField, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [currentStep, setCurrentStep] = useState(0);

  const currentSectionName = SECTION_ORDER[currentStep];
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
    options?: {
      type?: "text" | "select" | "radio" | "date" | "number" | "file";
      readOnly?: boolean;
      placeholder?: string;
      selectOptions?: string[];
      radioOptions?: string[];
      accept?: string;
    }
  ) => {
    const { type = "text", readOnly, placeholder, selectOptions, radioOptions, accept } = options || {};
    const filled = isFieldFilled(id);
    const value = getFieldValue(id);

    if (type === "radio") {
      const isRequired = initialFields.find(f => f.id === id)?.required;
      return (
        <div id={id} className="animate-fade-in flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {label}
            {isRequired && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <div className="flex items-center gap-4 py-0.5">
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
                <span className="text-[12px] text-foreground group-hover:text-accent transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (type === "file") {
      const isRequired = initialFields.find(f => f.id === id)?.required;
      return (
        <div className="animate-fade-in flex flex-col gap-1">
          <label className="text-[12px] font-semibold text-foreground">
            {label}
            {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
          </label>
          <div className={cn(
            "flex flex-col gap-2 p-2.5 rounded-lg border border-dashed transition-all duration-200",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/10 hover:bg-muted/50"
          )}>
            {value ? (
              <div className="flex items-center justify-between gap-2 text-[12px] text-foreground bg-background p-2 rounded-lg border border-border shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileCheck className="h-5 w-5 text-success shrink-0" />
                  <span className="truncate max-w-[200px] font-medium">{value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateField(id, "")}
                  className="p-1 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="flex items-center justify-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[12px] font-bold hover:bg-primary/90 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap">
                  <UploadCloud className="h-3.5 w-3.5" />
                  Upload
                  <input
                    id={id}
                    type="file"
                    accept={accept || ".pdf,.doc,.docx"}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateField(id, file.name);
                      }
                    }}
                    className="sr-only"
                  />
                </label>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground leading-tight italic">
                    Max size: 5MB | {accept ? accept.toUpperCase().replace(/\./g, '') : "PDF, DOC, DOCX"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    const isRequired = initialFields.find(f => f.id === id)?.required;
    return (
      <div className="animate-fade-in flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="relative">
          {type === "select" ? (
            <select
              id={id}
              value={value}
              onChange={(e) => updateField(id, e.target.value)}
              className={cn(
                "w-full h-9 px-2.5 rounded border text-[12px] appearance-none cursor-pointer transition-all duration-200",
                "focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none",
                filled
                  ? "border-success/50 bg-success/5"
                  : "border-border bg-white"
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
              type={type === "date" ? "date" : "text"}
              value={value}
              onChange={(e) => updateField(id, e.target.value)}
              readOnly={readOnly}
              placeholder={placeholder || `Enter ${label}`}
              className={cn(
                "w-full h-9 px-2.5 rounded border text-[12px] transition-all duration-200 outline-none",
                "focus:ring-2 focus:ring-accent/30 focus:border-accent",
                readOnly && "cursor-default bg-muted/60",
                filled && !readOnly
                  ? "border-success/50 bg-success/5"
                  : "border-border bg-white"
              )}
            />
          )}
          {filled && (
            <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success pointer-events-none" />
          )}
        </div>
      </div>
    );
  };

  const toggleCheckbox = (id: string) => {
    const filled = isFieldFilled(id);
    updateField(id, filled ? "" : "true");
  };

  const renderCheckboxOption = (id: string, label: string) => {
    const checked = isFieldFilled(id);
    return (
      <button
        type="button"
        key={id}
        onClick={() => toggleCheckbox(id)}
        className={cn(
          "flex items-center gap-2.5 rounded border px-3 py-2.5 text-[11px] font-medium text-foreground transition-all duration-200 text-left",
          checked ? "border-success/50 bg-success/5 shadow-sm" : "border-border bg-white hover:border-accent/40 hover:bg-muted/20"
        )}
      >
        <span
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] transition-colors duration-200",
            checked ? "border-success bg-success text-success-foreground" : "border-border bg-card text-muted-foreground"
          )}
        >
          {checked ? <CheckCircle2 className="h-2.5 w-2.5" /> : <span className="font-semibold">✓</span>}
        </span>
        <span className="text-[11px] text-foreground line-clamp-2 leading-tight">{label}</span>
      </button>
    );
  };

  const renderStepContent = () => {
    switch (currentSectionName) {
      case "General Information":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
            {renderField("aishe-code", "AISHE Code", { readOnly: true })}
            {renderField("institute-name", "Institute Name", { readOnly: true })}
            {renderField("country", "Country", { type: "select", selectOptions: ["India"] })}
            {renderField("state", "State", { type: "select", selectOptions: ["Gujarat", "Maharashtra", "Rajasthan"] })}
            {renderField("district", "District", { type: "select", selectOptions: ["Ahmedabad", "Surat", "Vadodara"] })}
            {renderField("sub-district", "Sub-District", { type: "select" })}
            {renderField("street", "Street")}
            {renderField("city", "City")}
            {renderField("pin-code", "Pin Code")}
            {renderField("year-establishment", "Establishment Year", { readOnly: true })}
            {renderField("location", "Location of University", { type: "select", selectOptions: ["Main Campus", "University Level Institution"] })}
            {renderField("address-1", "Address Line 1")}
            {renderField("address-2", "Address Line 2")}
            {renderField("urban-local-body", "Urban Local Body")}
            {renderField("longitude", "Longitude (deg)")}
            {renderField("latitude", "Latitude (deg)")}
            {renderField("website", "Website")}
            {renderField("total-area", "Total Area (acre)")}
            {renderField("constructed-area", "Constructed Area (sq. m)")}
          </div>
        );
      case "Status & Classification":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
            {renderField("status-prior", "Prior Status", { type: "select", selectOptions: ["Autonomous College", "Affiliated College", "Constituent College"] })}
            {renderField("year-declared", "Year Declared")}
            {renderField("type-institution", "Type", { type: "select", selectOptions: ["State Open University", "Central University", "Private University"] })}
            {renderField("tier-institute", "Tier", { type: "select" })}
            {renderField("category", "Category", { type: "select", selectOptions: ["Coed", "Men", "Women"] })}
            {renderField("institution-specifically", "Specifically for", { type: "select", selectOptions: ["General", "Minority", "Women", "PwD"] })}
          </div>
        );
      case "Affiliation & Recognition":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
            {renderField("affiliating-university", "Is Affiliating?", { type: "select", selectOptions: ["Yes", "No"] })}
            {renderField("affiliating-type", "Univ. Type")}
            {renderField("statutory-body", "Statutory Recognition")}
            {renderField("ownership-type", "Ownership", { type: "select" })}
            {renderField("year-aicte", "1st AICTE Year")}
            {renderField("graded-autonomy", "Graded Autonomy", { type: "radio" })}
            {renderField("deemed-status", "Deemed/Auto Status", { type: "select" })}
            {renderField("institute-eminence", "Eminence", { type: "radio" })}
          </div>
        );
      case "Minority Details":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
            {renderField("minority-institution", "Minority", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("minority-type", "Type", { type: "select", selectOptions: ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain", "Others"] })}
            {renderField("certificate-issued-date", "Issued Date", { type: "date" })}
            {renderField("certificate-valid-till", "Valid Till", { type: "date" })}
          </div>
        );
      case "Campus & Approval Details":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
            {renderField("constituent-campus", "Off-Campus", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("constituent-count", "Count")}
            {renderField("regional-centre-exists", "Regional Centre", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("regional-centre-count", "Count")}
            {renderField("odl-exists", "ODL Centre", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("odl-count", "Count")}
            {renderField("online-exists", "Online Centre", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("online-count", "Count")}
            {renderField("new-approval-last-year", "Newly Approved?", { type: "radio", radioOptions: ["Yes", "No"] })}
            {renderField("approval-letter", "Approval Letter", { type: "file" })}
          </div>
        );
      case "Academic Profile":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {renderCheckboxOption("disc-general", "General (Multi-Disciplinary)")}
            {renderCheckboxOption("disc-engineering", "Engineering / Technology / Architecture")}
            {renderCheckboxOption("disc-arts", "Arts / Humanities / Social Sciences")}
            {renderCheckboxOption("disc-languages", "Indian and Foreign Languages")}
            {renderCheckboxOption("disc-it", "IT & Computer Application")}
            {renderCheckboxOption("disc-sciences", "Sciences")}
            {renderCheckboxOption("disc-vocational", "Vocational Education")}
            {renderCheckboxOption("disc-nursing", "Nursing and Paramedical")}
            {renderCheckboxOption("disc-others", "Others")}
          </div>
        );
      default:
        return null;
    }
  };

  const currentSection = sections.find((s) => s.name === currentSectionName);

  return (
    <TopLayout>
      <ModuleBanner
        title="Institutional Registry and Recognition Module"
      >
        <FormStepper
          steps={stepInfos}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          overallPercentage={overallPercentage}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>

      <div className="p-3 lg:p-4 pb-24">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border border-l-4 border-l-primary bg-muted/5">
            <h2 className="text-sm font-bold text-foreground">Institute Details</h2>
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-4 lg:p-5">
                {/* Section header */}
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-border/40">
                  <div>
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">{currentSectionName}</h3>
                  </div>
                  {currentSection && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                        currentSection.completionPercentage >= 100
                          ? "bg-success/10 text-success"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  {renderStepContent()}
                </div>
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
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={isFirstStep}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
              isFirstStep
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-muted text-foreground hover:bg-muted/80 shadow-sm"
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isLastStep) {
                  navigate("/institutional-registry");
                } else {
                  setCurrentStep((s) => Math.min(SECTION_ORDER.length - 1, s + 1));
                }
              }}
              className="flex items-center gap-2 px-8 py-2 bg-accent text-accent-foreground rounded text-[11px] font-black uppercase tracking-widest hover:bg-accent/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {isLastStep ? (
                <>
                  <Save className="h-3.5 w-3.5" />
                  Save & Submit
                </>
              ) : (
                <>
                  Save & Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
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
