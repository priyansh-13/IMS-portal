import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2, Plus, Trash2, Filter, ChevronDown, Check } from "lucide-react";

const INITIAL_STATIC_FIELDS: FieldState[] = [
  // Offshore (Non-dynamic part)
  { id: "offshore-exists", name: "Offshore Centre Exists", section: "Offshore", value: "" },
  { id: "offshore-count", name: "Number of Offshore Centres", section: "Offshore", value: "" },

  // Off Campus
  { id: "offcampus-exists", name: "Off Campus Centre Exists", section: "Off Campus", value: "" },
  { id: "offcampus-name", name: "Name of Off Campus Centre", section: "Off Campus", value: "" },
  { id: "offcampus-address", name: "Address", section: "Off Campus", value: "" },
  { id: "offcampus-lat", name: "Latitude", section: "Off Campus", value: "" },
  { id: "offcampus-long", name: "Longitude", section: "Off Campus", value: "" },
  { id: "offcampus-email", name: "Email Address", section: "Off Campus", value: "" },
  { id: "offcampus-mobile", name: "Mobile Number", section: "Off Campus", value: "" },

  // Regional Centre (Non-dynamic part)
  { id: "regional-exists", name: "Regional Centre Exists", section: "Regional Centre", value: "" },

  // ODL
  { id: "odl-exists", name: "ODL Centres Exists", section: "ODL", value: "" },
  { id: "odl-name", name: "Institution Name", section: "ODL", value: "" },
  { id: "odl-address", name: "Address", section: "ODL", value: "" },
  { id: "odl-email", name: "Email Address", section: "ODL", value: "" },
  { id: "odl-mobile", name: "Mobile Number", section: "ODL", value: "" },
  
  // Online
  { id: "online-exists", name: "Online Centres Exists", section: "Online", value: "" },
  { id: "online-name", name: "Institution Name", section: "Online", value: "" },
  { id: "online-address", name: "Address", section: "Online", value: "" },
  { id: "online-email", name: "Email Address", section: "Online", value: "" },
  { id: "online-mobile", name: "Mobile Number", section: "Online", value: "" },

  // Institute Sharing The Land
  { id: "land-shared", name: "Land Shared with Institute", section: "Institute Sharing The Land", value: "" },
  { id: "shared-institute", name: "Institution Name", section: "Institute Sharing The Land", value: "" },
  { id: "shared-programme", name: "Programme", section: "Institute Sharing The Land", value: "" },
  { id: "shared-level", name: "Level of Course", section: "Institute Sharing The Land", value: "" },
  { id: "shared-id", name: "Permanent ID", section: "Institute Sharing The Land", value: "" },
  { id: "shared-survey", name: "Survey Number", section: "Institute Sharing The Land", value: "" },
  { id: "shared-area", name: "Area (Acres)", section: "Institute Sharing The Land", value: "" },
];

const SECTION_ORDER = [
  "Offshore",
  "Off Campus",
  "ODL",
  "Online",
  "Regional Centre",
  "Institute Sharing The Land",
];

const FILTER_OPTIONS = [
  "Offshore",
  "Off Campus",
  "ODL",
  "Online",
];

const COMMON_SECTIONS = [
  "Regional Centre",
  "Institute Sharing The Land",
];

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "number" | "email" | "tel" = "text"
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;
  
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
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
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
    </div>
  );
};

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

export default function CentresCampusesPage() {
  const navigate = useNavigate();
  
  const [offshoreCount, setOffshoreCount] = useState(1);
  const [regionalCount, setRegionalCount] = useState(1);
  const [activeSubStep, setActiveSubStep] = useState(0);

  // Filtering State
  const [selectedFilters, setSelectedFilters] = useState<string[]>(FILTER_OPTIONS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initial dynamic fields
  const initialOffshoreFields: FieldState[] = [
    { id: "offshore-name-0", name: "Name of Offshore (Centre 1)", section: "Offshore", value: "" },
    { id: "offshore-country-0", name: "Country (Centre 1)", section: "Offshore", value: "" },
    { id: "offshore-mode-0", name: "Study Mode (Centre 1)", section: "Offshore", value: "" },
    { id: "offshore-students-0", name: "Total Enrolled Students (Centre 1)", section: "Offshore", value: "" },
    { id: "offshore-girls-0", name: "Total Enrolled Girls (Centre 1)", section: "Offshore", value: "" },
    { id: "offshore-saved-0", name: "Additional Info (Centre 1)", section: "Offshore", value: "" },
  ];

  const initialRegionalFields: FieldState[] = [
    { id: "regional-name-0", name: "Name of Regional (Centre 1)", section: "Regional Centre", value: "" },
    { id: "regional-address-0", name: "Address (Centre 1)", section: "Regional Centre", value: "" },
    { id: "regional-count-0", name: "Number of Study Centres (Centre 1)", section: "Regional Centre", value: "" },
  ];

  const initialFields = [...INITIAL_STATIC_FIELDS, ...initialOffshoreFields, ...initialRegionalFields];
  const { fields, updateField, addFields, removeFields, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);

  // Derived filtered sections
  const activeSections = useMemo(
    () => SECTION_ORDER.filter(s => COMMON_SECTIONS.includes(s) || selectedFilters.includes(s)),
    [selectedFilters]
  );

  const stepInfos = useMemo(
    () => activeSections.map((name) => {
      const sec = sections.find((s) => s.name === name);
      return { name, completionPercentage: sec?.completionPercentage ?? 0 };
    }),
    [sections, activeSections]
  );

  const currentSectionName = activeSections[activeSubStep] || activeSections[0];
  const currentSection = sections.find((s) => s.name === currentSectionName);
  const isLastStep = activeSubStep === activeSections.length - 1;

  const addOffshore = useCallback(() => {
    const lastIndex = offshoreCount - 1;
    const nextIndex = offshoreCount;
    const prevName = fields.find(f => f.id === `offshore-name-${lastIndex}`)?.value || "";
    const prevCountry = fields.find(f => f.id === `offshore-country-${lastIndex}`)?.value || "";
    const prevMode = fields.find(f => f.id === `offshore-mode-${lastIndex}`)?.value || "";
    const prevInfo = fields.find(f => f.id === `offshore-saved-${lastIndex}`)?.value || "";

    const newFields: FieldState[] = [
      { id: `offshore-name-${nextIndex}`, name: `Name of Offshore (Centre ${nextIndex + 1})`, section: "Offshore", value: prevName },
      { id: `offshore-country-${nextIndex}`, name: `Country (Centre ${nextIndex + 1})`, section: "Offshore", value: prevCountry },
      { id: `offshore-mode-${nextIndex}`, name: `Study Mode (Centre ${nextIndex + 1})`, section: "Offshore", value: prevMode },
      { id: `offshore-students-${nextIndex}`, name: `Total Enrolled Students (Centre ${nextIndex + 1})`, section: "Offshore", value: "" },
      { id: `offshore-girls-${nextIndex}`, name: `Total Enrolled Girls (Centre ${nextIndex + 1})`, section: "Offshore", value: "" },
      { id: `offshore-saved-${nextIndex}`, name: `Additional Info (Centre ${nextIndex + 1})`, section: "Offshore", value: prevInfo },
    ];
    addFields(newFields);
    setOffshoreCount(prev => prev + 1);
  }, [offshoreCount, fields, addFields]);

  const removeOffshore = (index: number) => {
    const fieldIds = [`offshore-name-${index}`, `offshore-country-${index}`, `offshore-mode-${index}`, `offshore-students-${index}`, `offshore-girls-${index}`, `offshore-saved-${index}`];
    removeFields(fieldIds);
    setOffshoreCount(prev => prev - 1);
  };

  const addRegional = useCallback(() => {
    const lastIndex = regionalCount - 1;
    const nextIndex = regionalCount;
    const prevName = fields.find(f => f.id === `regional-name-${lastIndex}`)?.value || "";
    const prevAddr = fields.find(f => f.id === `regional-address-${lastIndex}`)?.value || "";
    const prevCount = fields.find(f => f.id === `regional-count-${lastIndex}`)?.value || "";

    const newFields: FieldState[] = [
      { id: `regional-name-${nextIndex}`, name: `Name of Regional (Centre ${nextIndex + 1})`, section: "Regional Centre", value: prevName },
      { id: `regional-address-${nextIndex}`, name: `Address (Centre ${nextIndex + 1})`, section: "Regional Centre", value: prevAddr },
      { id: `regional-count-${nextIndex}`, name: `Number of Study Centres (Centre ${nextIndex + 1})`, section: "Regional Centre", value: prevCount },
    ];
    addFields(newFields);
    setRegionalCount(prev => prev + 1);
  }, [regionalCount, fields, addFields]);

  const toggleFilter = (option: string) => {
    setSelectedFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
    setActiveSubStep(0); // Reset to first step when filter changes to avoid index errors
  };

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
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary relative">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-foreground">Centres / Campuses</h2>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground hover:bg-muted transition-all"
                >
                  <Filter className="h-3.5 w-3.5 text-accent" />
                  <span>Sections Filter</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isFilterOpen && "rotate-180")} />
                </button>
                
                {isFilterOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in text-nowrap">
                      <div className="p-2 border-b border-border bg-muted/20">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2">Select Activities to Fill</p>
                      </div>
                      <div className="p-1">
                        {FILTER_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => toggleFilter(opt)}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium hover:bg-muted transition-colors text-left"
                          >
                            <span className={cn(selectedFilters.includes(opt) ? "text-foreground" : "text-muted-foreground")}>
                              {opt}
                            </span>
                            {selectedFilters.includes(opt) && (
                              <Check className="h-3.5 w-3.5 text-success" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              {currentSectionName === "Offshore" && (
              <section id="section-offshore" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-foreground">Offshore Centres</h3>
                    
                  </div>
                  <div className="flex gap-3 items-center"> 
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
                      onClick={addOffshore}
                      title="Add another Offshore Centre"
                    >
                      +
                    </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderRadioGroup(fields, updateField, "offshore-exists", "Offshore Centre Exists")}
                  {renderInputField(fields, updateField, "offshore-count", "Number of Offshore Centres", undefined, "number")}
                </div>

                <div className="space-y-6 pt-2">
                  {Array.from({ length: offshoreCount }).map((_, i) => (
                    <div key={i} className="relative bg-white p-5 rounded-xl border border-border shadow-sm group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">Centre {i + 1}</span>
                        {offshoreCount > 1 && (
                          <button
                            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            onClick={() => removeOffshore(i)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderInputField(fields, updateField, `offshore-name-${i}`, "Name of Offshore")}
                        {renderInputField(fields, updateField, `offshore-country-${i}`, "Country")}
                        {renderInputField(fields, updateField, `offshore-mode-${i}`, "Study Mode")}
                        {renderInputField(fields, updateField, `offshore-students-${i}`, "Total Enrolled Students", undefined, "number")}
                        {renderInputField(fields, updateField, `offshore-girls-${i}`, "Total Enrolled Girls Students", undefined, "number")}
                        {renderInputField(fields, updateField, `offshore-saved-${i}`, "Additional Info")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {currentSectionName === "Off Campus" && (
              <section id="section-offcampus" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Off Campus Centre</h3>
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
                  {renderRadioGroup(fields, updateField, "offcampus-exists", "Off Campus Centre Exists")}
                  {renderInputField(fields, updateField, "offcampus-name", "Name of Off Campus Centre")}
                  {renderInputField(fields, updateField, "offcampus-address", "Address")}
                  {renderInputField(fields, updateField, "offcampus-lat", "Latitude")}
                  {renderInputField(fields, updateField, "offcampus-long", "Longitude")}
                  {renderInputField(fields, updateField, "offcampus-email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "offcampus-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Regional Centre" && (
              <section id="section-regional" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-foreground">Regional Centre</h3>
                    <button
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold hover:shadow-md hover:bg-accent/90 transition-all text-xl"
                      onClick={addRegional}
                      title="Add another Regional Centre"
                    >
                      +
                    </button>
                  </div>
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
                  {renderRadioGroup(fields, updateField, "regional-exists", "Regional Centre Exists")}
                </div>

                <div className="space-y-6 pt-2">
                  {Array.from({ length: regionalCount }).map((_, i) => (
                    <div key={i} className="relative bg-white p-5 rounded-xl border border-border shadow-sm group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">Regional Centre {i + 1}</span>
                          {regionalCount > 1 && (
                            <button
                              className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              onClick={() => {
                                const fieldIds = [`regional-name-${i}`, `regional-address-${i}`, `regional-count-${i}`];
                                removeFields(fieldIds);
                                setRegionalCount(prev => prev - 1);
                              }}
                            >
                              Remove
                            </button>
                          )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderInputField(fields, updateField, `regional-name-${i}`, "Name of Regional Centre")}
                        {renderInputField(fields, updateField, `regional-address-${i}`, "Address")}
                        {renderInputField(fields, updateField, `regional-count-${i}`, "Number of Study Centres")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {currentSectionName === "ODL" && (
              <section id="section-odl" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">ODL Centres</h3>
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
                  {renderRadioGroup(fields, updateField, "odl-exists", "ODL Centres Exists")}
                  {renderInputField(fields, updateField, "odl-name", "Institution Name")}
                  {renderInputField(fields, updateField, "odl-address", "Address")}
                  {renderInputField(fields, updateField, "odl-email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "odl-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Online" && (
              <section id="section-online" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Online Centres</h3>
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
                  {renderRadioGroup(fields, updateField, "online-exists", "Online Centres Exists")}
                  {renderInputField(fields, updateField, "online-name", "Institution Name")}
                  {renderInputField(fields, updateField, "online-address", "Address")}
                  {renderInputField(fields, updateField, "online-email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "online-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Institute Sharing The Land" && (
              <section id="section-shared-land" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Institute Sharing The Land</h3>
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
                  {renderRadioGroup(fields, updateField, "land-shared", "Land Shared with Another Institute")}
                  {renderInputField(fields, updateField, "shared-institute", "Institution Name")}
                  {renderInputField(fields, updateField, "shared-programme", "Programme")}
                  {renderInputField(fields, updateField, "shared-level", "Level of Course")}
                  {renderInputField(fields, updateField, "shared-id", "Permanent ID")}
                  {renderInputField(fields, updateField, "shared-survey", "Survey Number")}
                  {renderInputField(fields, updateField, "shared-area", "Area (Acres)")}
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
                      setActiveSubStep((s) => Math.min(activeSections.length - 1, s + 1));
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
                sectionOrder={activeSections}
                activeSection={currentSectionName}
                onSectionClick={(name) => {
                  const targetIndex = activeSections.indexOf(name);
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
