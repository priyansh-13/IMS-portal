import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const TRUST_FIELDS: FieldState[] = [
  { id: "trust-name", name: "Name of the Trust / Society / Company", section: "Trust / Society / Company Details", value: "" },
  { id: "trust-type", name: "Type of the Trust / Society / Company", section: "Trust / Society / Company Details", value: "" },
  { id: "registered-with", name: "Registered With", section: "Trust / Society / Company Details", value: "" },
  { id: "registration-date", name: "Registration Date", section: "Trust / Society / Company Details", value: "" },
  { id: "registration-number", name: "Registration Number", section: "Trust / Society / Company Details", value: "" },
  { id: "trust-address", name: "Trust / Society / Company Address", section: "Trust / Society / Company Details", value: "" },
  { id: "aiseCode", name: "Aishe code", section: "Trust / Society / Company Details", value: "" },
  { id: "land-std", name: "Land Phone STD Code", section: "Trust / Society / Company Details", value: "" },
  { id: "land-number", name: "Land Phone Number", section: "Trust / Society / Company Details", value: "" },
  { id: "pan", name: "PAN", section: "Trust / Society / Company Details", value: "" },
  { id: "mobile", name: "Mobile Number", section: "Trust / Society / Company Details", value: "" },
  { id: "email", name: "Email Address", section: "Trust / Society / Company Details", value: "" },
  { id: "website", name: "Trust / Society / Company Website", section: "Trust / Society / Company Details", value: "" },
];

const MEMBER_FIELDS: FieldState[] = [
  { id: "member-name", name: "Member Name", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-designation", name: "Designation", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-trustee-since", name: "Trustee Since", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-trustee-till", name: "Trustee Till", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-mobile", name: "Mobile Number", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-email", name: "Email Address", section: "Trust / Society / Company Member Details", value: "" },
  { id: "member-age", name: "Age", section: "Trust / Society / Company Member Details", value: "" },
];

const INSTITUTE_FIELDS: FieldState[] = [
  { id: "new-institute-name", name: "Institution Name", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-state", name: "Institute State", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-district", name: "Institute District", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-address", name: "Institute Address", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-date", name: "Establishment Date", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-email", name: "Email Address", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-mobile", name: "Mobile Number", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-category", name: "Category", section: "Add Institute (Under same Trust)", value: "" },
  { id: "new-institute-students", name: "Total Admitted Students", section: "Add Institute (Under same Trust)", value: "" },
];

const SECTION_ORDER = [
  "Trust / Society / Company Details",
  "Trust / Society / Company Member Details",
  "Add Institute (Under same Trust)",
];

type FieldValueMap = Record<string, string>;

const renderInputField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  placeholder?: string,
  type: "text" | "date" | "email" | "tel" = "text"
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

const renderSelectField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
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
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full h-9 rounded border bg-white px-2.5 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-white"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {filled && (
          <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success" />
        )}
      </div>
    </div>
  );
};

const renderRadioGroup = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
) => (
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
            checked={values[id] === opt}
            onChange={(e) => setValue(id, e.target.value)}
            className="w-4 h-4 accent-accent"
          />
          <span className="group-hover:text-accent transition-colors">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const memberRows = [
  { name: "Prakash Jha", designation: "Officer", trusteeSince: "12-01-24", trusteeTill: "20-10-26", age: "42" },
];

const instituteRows = [
  { name: "IIT Bombay", state: "Mumbai", district: "Powai", category: "Category", students: "Raj Prakash" },
];

export default function ParentOrganizationPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [
    ...TRUST_FIELDS,
    ...MEMBER_FIELDS,
    ...INSTITUTE_FIELDS,
  ];

  const { fields, updateField, sections, overallPercentage, pendingFields, scrollToField } = useFormProgress(initialFields);
  const [activeSubStep, setActiveSubStep] = useState(0);

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
            <h2 className="text-sm font-bold text-foreground">Parent Organization / Ownership</h2>
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
              {activeSubStep === 0 && (
               <section id="section-trust-details" className="space-y-3 rounded border border-border/60 bg-white p-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Trust / Society / Company Details</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderInputField(fields, updateField, "trust-name", "Name of the Trust / Society / Company")}
                  {renderSelectField(fields, updateField, "trust-type", "Type of the Trust / Society / Company", [
                    "Trust", "Society", "Company",
                  ])}
                  {renderInputField(fields, updateField, "registered-with", "Registered With")}
                  {renderInputField(fields, updateField, "registration-date", "Registration Date", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "registration-number", "Registration Number")}
                  {renderInputField(fields, updateField, "trust-address", "Trust / Society / Company Address")}
                    {renderSelectField(fields, updateField, "aiseCode", "Aishe code", [
                    "U-67", "U-30", "U-19",
                  ])}
                  {renderInputField(fields, updateField, "land-std", "Land Phone STD Code")}
                  {renderInputField(fields, updateField, "land-number", "Land Phone Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "pan", "PAN")}
                  {renderInputField(fields, updateField, "mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "website", "Trust / Society / Company Website")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
               <section id="section-member-details" className="space-y-3 rounded border border-border/60 bg-white p-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Member Details</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderInputField(fields, updateField, "member-name", "Name")}
                  {renderInputField(fields, updateField, "member-designation", "Designation")}
                  {renderInputField(fields, updateField, "member-trustee-since", "Since", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "member-trustee-till", "Till", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "member-mobile", "Mobile", undefined, "tel")}
                  {renderInputField(fields, updateField, "member-email", "Email", undefined, "email")}
                  {renderInputField(fields, updateField, "member-age", "Age")}
                </div>
                <div className="overflow-x-auto border border-border/70 rounded-lg bg-white mt-2">
                  <table className="w-full text-[11px]">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Name</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Designation</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10 text-nowrap">Since / Till</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Age</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberRows.map((member) => (
                        <tr key={member.name} className="border-b border-border even:bg-muted/30">
                          <td className="px-3 py-1.5 font-medium">{member.name}</td>
                          <td className="px-3 py-1.5">{member.designation}</td>
                          <td className="px-3 py-1.5 text-nowrap">{member.trusteeSince} - {member.trusteeTill}</td>
                          <td className="px-3 py-1.5">{member.age}</td>
                          <td className="px-3 py-1.5">
                            <button className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
               <section id="section-add-institute" className="space-y-3 rounded border border-border/60 bg-white p-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Add Institute (Under same Trust)</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
                  {renderInputField(fields, updateField, "new-institute-name", "Name")}
                  {renderInputField(fields, updateField, "new-institute-state", "State")}
                  {renderInputField(fields, updateField, "new-institute-district", "District")}
                  {renderInputField(fields, updateField, "new-institute-address", "Address")}
                  {renderInputField(fields, updateField, "new-institute-date", "Est. Date", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "new-institute-email", "Email", undefined, "email")}
                  {renderInputField(fields, updateField, "new-institute-mobile", "Mobile", undefined, "tel")}
                  {renderInputField(fields, updateField, "new-institute-category", "Category")}
                  {renderInputField(fields, updateField, "new-institute-students", "Students")}
                </div>
                <div className="overflow-x-auto border border-border/70 rounded-lg bg-white mt-2">
                  <table className="w-full text-[11px]">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Institution Name</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">State / District</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Category</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider border-r border-white/10">Students</th>
                        <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instituteRows.map((inst) => (
                        <tr key={inst.name} className="border-b border-border even:bg-muted/30">
                          <td className="px-3 py-1.5 font-medium">{inst.name}</td>
                          <td className="px-3 py-1.5">{inst.state} / {inst.district}</td>
                          <td className="px-3 py-1.5">{inst.category}</td>
                          <td className="px-3 py-1.5">{inst.students}</td>
                          <td className="px-3 py-1.5 flex items-center gap-2">
                            <button className="text-[10px] bg-accent/10 text-accent hover:bg-accent/20 font-black px-1.5 py-0.5 rounded transition-colors uppercase">
                              Edit
                            </button>
                            <button className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-black px-1.5 py-0.5 rounded transition-colors uppercase">
                              Del
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
