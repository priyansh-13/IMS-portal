import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
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
          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success" />
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
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="text-red-500 ml-0.5">*</span>
      </p>
      <div className="flex gap-4 py-0.5">
        {["Yes", "No"].map((opt) => (
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
      <div className="p-3 lg:p-4 pb-24">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border border-l-4 border-l-primary bg-muted/5 relative">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-foreground">Centres / Campuses</h2>
              
              {/* Filter Dropdown */}
              <div className="relative">
                   <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-[11px] font-bold text-foreground hover:bg-muted transition-all uppercase tracking-tight"
                >
                  <Filter className="h-3 w-3 text-accent" />
                  <span>Filters</span>
                  <ChevronDown className={cn("h-2.5 w-2.5 transition-transform", isFilterOpen && "rotate-180")} />
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
              className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors"
            >
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-4 lg:p-5 space-y-4">
              {currentSectionName === "Offshore" && (
               <section id="section-offshore" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30 text-nowrap">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Offshore Centres</h3>
                  </div>
                  <div className="flex gap-2 items-center"> 
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
                      className="flex items-center justify-center w-6 h-6 rounded bg-accent text-white font-black hover:shadow-md hover:bg-accent/90 transition-all text-sm"
                      onClick={addOffshore}
                      title="Add another Offshore Centre"
                    >
                      +
                    </button>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4">
                  {renderRadioGroup(fields, updateField, "offshore-exists", "Offshore Exist")}
                  {renderInputField(fields, updateField, "offshore-count", "Count", undefined, "number")}
                </div>

                 <div className="space-y-3 pt-1">
                  {Array.from({ length: offshoreCount }).map((_, i) => (
                    <div key={i} className="relative bg-muted/20 p-3 rounded border border-border/50 group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-primary px-1.5 py-0.5 bg-primary/10 rounded uppercase tracking-wider">Centre {i + 1}</span>
                        {offshoreCount > 1 && (
                          <button
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                            onClick={() => removeOffshore(i)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                        {renderInputField(fields, updateField, `offshore-name-${i}`, "Name")}
                        {renderInputField(fields, updateField, `offshore-country-${i}`, "Country")}
                        {renderInputField(fields, updateField, `offshore-mode-${i}`, "Mode")}
                        {renderInputField(fields, updateField, `offshore-students-${i}`, "Enrolled", undefined, "number")}
                        {renderInputField(fields, updateField, `offshore-girls-${i}`, "Girls", undefined, "number")}
                        {renderInputField(fields, updateField, `offshore-saved-${i}`, "Addl Info")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {currentSectionName === "Off Campus" && (
               <section id="section-offcampus" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Off Campus Centre</h3>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderRadioGroup(fields, updateField, "offcampus-exists", "Exists")}
                  {renderInputField(fields, updateField, "offcampus-name", "Name")}
                  {renderInputField(fields, updateField, "offcampus-address", "Address")}
                  {renderInputField(fields, updateField, "offcampus-lat", "Lat")}
                  {renderInputField(fields, updateField, "offcampus-long", "Long")}
                  {renderInputField(fields, updateField, "offcampus-email", "Email", undefined, "email")}
                  {renderInputField(fields, updateField, "offcampus-mobile", "Mobile", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Regional Centre" && (
               <section id="section-regional" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Regional Centre</h3>
                    <button
                      className="flex items-center justify-center w-7 h-7 rounded bg-accent text-white font-black hover:shadow-md hover:bg-accent/90 transition-all text-sm"
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
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                  {renderRadioGroup(fields, updateField, "regional-exists", "Exist")}
                </div>
 
                <div className="space-y-3 pt-1">
                  {Array.from({ length: regionalCount }).map((_, i) => (
                    <div key={i} className="relative bg-muted/20 p-3 rounded border border-border/50 group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-primary px-1.5 py-0.5 bg-primary/10 rounded uppercase tracking-wider">Regional Centre {i + 1}</span>
                          {regionalCount > 1 && (
                            <button
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                        {renderInputField(fields, updateField, `regional-name-${i}`, "Name")}
                        {renderInputField(fields, updateField, `regional-address-${i}`, "Address")}
                        {renderInputField(fields, updateField, `regional-count-${i}`, "Study Centres")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {currentSectionName === "ODL" && (
               <section id="section-odl" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">ODL Centres</h3>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderRadioGroup(fields, updateField, "odl-exists", "Exist")}
                  {renderInputField(fields, updateField, "odl-name", "Name")}
                  {renderInputField(fields, updateField, "odl-address", "Address")}
                  {renderInputField(fields, updateField, "odl-email", "Email", undefined, "email")}
                  {renderInputField(fields, updateField, "odl-mobile", "Mobile", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Online" && (
               <section id="section-online" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Online Centres</h3>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderRadioGroup(fields, updateField, "online-exists", "Exist")}
                  {renderInputField(fields, updateField, "online-name", "Name")}
                  {renderInputField(fields, updateField, "online-address", "Address")}
                  {renderInputField(fields, updateField, "online-email", "Email", undefined, "email")}
                  {renderInputField(fields, updateField, "online-mobile", "Mobile", undefined, "tel")}
                </div>
              </section>
              )}

              {currentSectionName === "Institute Sharing The Land" && (
               <section id="section-shared-land" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Institute Sharing The Land</h3>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderRadioGroup(fields, updateField, "land-shared", "Shared Land?")}
                  {renderInputField(fields, updateField, "shared-institute", "Name")}
                  {renderInputField(fields, updateField, "shared-programme", "Prog")}
                  {renderInputField(fields, updateField, "shared-level", "Level")}
                  {renderInputField(fields, updateField, "shared-id", "ID")}
                  {renderInputField(fields, updateField, "shared-survey", "Survey #")}
                  {renderInputField(fields, updateField, "shared-area", "Area")}
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
                setActiveSubStep((s) => Math.min(activeSections.length - 1, s + 1));
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
