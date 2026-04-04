import { useState, useMemo } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
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

    if (type === "file") {
      return (
        <div className="animate-fade-in">
          <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
          <div className={cn(
            "flex flex-col gap-3 p-4 rounded-xl border border-dashed transition-all duration-200",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20 hover:bg-muted/50"
          )}>
            {value ? (
              <div className="flex items-center justify-between gap-3 text-sm text-foreground bg-background p-3 rounded-lg border border-border shadow-sm">
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
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap">
                  <UploadCloud className="h-4 w-4" />
                  Choose File
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
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Max size: 5MB<br/>
                    Supported formats: {accept ? accept.toUpperCase().replace(/\./g, '') : "PDF, DOC, DOCX"}
                  </p>
                </div>
              </div>
            )}
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
              type={type === "date" ? "date" : "text"}
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
          "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium text-foreground transition-all duration-200",
          checked ? "border-success/40 bg-success/5 shadow-sm" : "border-border bg-white hover:border-accent/40 hover:bg-muted/50"
        )}
      >
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border text-xs transition-colors duration-200",
            checked ? "border-success bg-success text-success-foreground" : "border-border bg-card text-muted-foreground"
          )}
        >
          {checked ? <CheckCircle2 className="h-3 w-3" /> : <span className="text-xs font-semibold">✓</span>}
        </span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </button>
    );
  };

  const renderStepContent = () => {
    switch (currentSectionName) {
      case "General Information":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {renderField("aishe-code", "AISHE Code", { readOnly: true })}
              {renderField("institute-name", "Institute Name", { readOnly: true })}
              {renderField("country", "Country", { type: "select", selectOptions: ["India"] })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderField("state", "State", { type: "select", selectOptions: ["Gujarat", "Maharashtra", "Rajasthan"] })}
              {renderField("district", "District", { type: "select", selectOptions: ["Ahmedabad", "Surat", "Vadodara"] })}
              {renderField("sub-district", "Sub-District", { type: "select" })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderField("street", "Street")}
              {renderField("city", "City")}
              {renderField("pin-code", "Pin Code")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderField("year-establishment", "Year of Establishment", { readOnly: true })}
              {renderField("location", "Location of University / University Level Institution", { type: "select", selectOptions: ["Main Campus", "University Level Institution"] })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderField("address-1", "Address Line 1")}
              {renderField("address-2", "Address Line 2")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderField("urban-local-body", "Urban Local Body", { placeholder: "Municipality / Corporation" })}
              {renderField("longitude", "Longitude (in degree)", { placeholder: "e.g. 72.5714" })}
              {renderField("latitude", "Latitude (in degree)", { placeholder: "e.g. 23.0225" })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderField("total-area", "Total Area (in acre)", { placeholder: "Enter Total Area" })}
              {renderField("constructed-area", "Total Constructed Area (sq. m)", { placeholder: "Enter Constructed Area" })}
              {renderField("website", "Website", { placeholder: "https://example.com" })}
            </div>
          </div>
        );
      case "Status & Classification":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderField("status-prior", "Status Prior to Establishment", { type: "select", selectOptions: ["Autonomous College", "Affiliated College", "Constituent College"] })}
            {renderField("year-declared", "Year Declared University/INI (Institute of National Importance)")}
            {renderField("type-institution", "Type of Institution", { type: "select", selectOptions: ["State Open University", "Central University", "Private University"] })}
            {renderField("tier-institute", "Tier of Institute", { type: "select" })}
            {renderField("category", "Category (Men/Women/Coed)", { type: "select", selectOptions: ["Coed", "Men", "Women"] })}
            {renderField("institution-specifically", "Institution Specifically for (Minority / Women / PwD)", { type: "select", selectOptions: ["General", "Minority", "Women", "PwD"] })}
          </div>
        );
      case "Affiliation & Recognition":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      case "Minority Details":
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderField("minority-institution", "Minority Institution", { type: "radio", radioOptions: ["Yes", "No"] })}
              {renderField("minority-type", "Minority Type", { type: "select", selectOptions: ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain", "Others"] })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderField("certificate-issued-date", "Certificate Issued Date", { type: "date" })}
              {renderField("certificate-valid-till", "Certificate Valid Till", { type: "date" })}
            </div>
          </div>
        );
      case "Campus & Approval Details":
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderField("constituent-campus", "Constituent / Off-Campus", { type: "radio", radioOptions: ["Yes", "No"] })}
              {renderField("constituent-count", "Number of Constituent / Off-Campus")}
              {renderField("regional-centre-exists", "Regional Centre Exists", { type: "radio", radioOptions: ["Yes", "No"] })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderField("regional-centre-count", "Number of Regional Centre")}
              {renderField("odl-exists", "ODL Centres Exists", { type: "radio", radioOptions: ["Yes", "No"] })}
              {renderField("odl-count", "Number of ODL Centre")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderField("online-exists", "Online Centres Exists", { type: "radio", radioOptions: ["Yes", "No"] })}
              {renderField("online-count", "Number of Online Centre")}
              {renderField("new-approval-last-year", "Is your Institution newly Approved Last Year (LoA) & Failed to Admit Students?", { type: "radio", radioOptions: ["Yes", "No"] })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderField("approval-letter", "Approval / Recognition Letters", { type: "file" })}
            </div>
          </div>
        );
      case "Academic Profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderCheckboxOption("disc-general", "General (Multi-Disciplinary)")}
            {renderCheckboxOption("disc-engineering", "Engineering / Technology / Architecture / Design")}
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

          {/* Stepper */}
          <div>
            <FormStepper
              steps={stepInfos}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
              overallPercentage={overallPercentage}
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 min-w-0">
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
                        navigate("/institutional-registry");
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
                        Save & Continue
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sections}
                sectionOrder={SECTION_ORDER}
                activeSection={currentSectionName}
                onSectionClick={(sectionName) => {
                  const index = SECTION_ORDER.indexOf(sectionName);
                  if (index !== -1) setCurrentStep(index);
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
