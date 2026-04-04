import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";
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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-muted/20"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {filled && (
          <CheckCircle2 className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
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
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Parent Organization / Ownership</h2>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>

          </div>

          <FormStepper
            steps={stepInfos}
            currentStep={activeSubStep}
            onStepClick={(idx) => setActiveSubStep(idx)}
            overallPercentage={overallPercentage}
          />

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-trust-details" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Trust / Society / Company Details</h3>
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
              <section id="section-member-details" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Trust / Society / Company Member Details</h3>
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
                  {renderInputField(fields, updateField, "member-name", "Name")}
                  {renderInputField(fields, updateField, "member-designation", "Designation")}
                  {renderInputField(fields, updateField, "member-trustee-since", "Trustee Since", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "member-trustee-till", "Trustee Till", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "member-mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "member-email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "member-age", "Age")}
                </div>
                <div className="overflow-x-auto border border-border/70 rounded-2xl bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Designation</th>
                        <th className="px-4 py-2 text-left">Trustee Since</th>
                        <th className="px-4 py-2 text-left">Trustee Till</th>
                        <th className="px-4 py-2 text-left">Age</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberRows.map((member) => (
                        <tr key={member.name} className="even:bg-muted/50">
                          <td className="px-4 py-2">{member.name}</td>
                          <td className="px-4 py-2">{member.designation}</td>
                          <td className="px-4 py-2">{member.trusteeSince}</td>
                          <td className="px-4 py-2">{member.trusteeTill}</td>
                          <td className="px-4 py-2">{member.age}</td>
                          <td className="px-4 py-2">
                            <button className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
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
              <section id="section-add-institute" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                  <h3 className="text-base font-semibold text-foreground">Add Institute (Under same Trust, but not Approved by AICTE)</h3>
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
                  {renderInputField(fields, updateField, "new-institute-name", "Institution Name")}
                  {renderInputField(fields, updateField, "new-institute-state", "Institute State")}
                  {renderInputField(fields, updateField, "new-institute-district", "Institute District")}
                  {renderInputField(fields, updateField, "new-institute-address", "Institute Address")}
                  {renderInputField(fields, updateField, "new-institute-date", "Establishment Date", "dd-mm-yyyy", "date")}
                  {renderInputField(fields, updateField, "new-institute-email", "Email Address", undefined, "email")}
                  {renderInputField(fields, updateField, "new-institute-mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(fields, updateField, "new-institute-category", "Category")}
                  {renderInputField(fields, updateField, "new-institute-students", "Total Admitted Students")}
                </div>
                <div className="overflow-x-auto border border-border/70 rounded-2xl bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Institution Name</th>
                        <th className="px-4 py-2 text-left">State</th>
                        <th className="px-4 py-2 text-left">District</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Students</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instituteRows.map((inst) => (
                        <tr key={inst.name} className="even:bg-muted/50">
                          <td className="px-4 py-2">{inst.name}</td>
                          <td className="px-4 py-2">{inst.state}</td>
                          <td className="px-4 py-2">{inst.district}</td>
                          <td className="px-4 py-2">{inst.category}</td>
                          <td className="px-4 py-2">{inst.students}</td>
                          <td className="px-4 py-2 flex items-center gap-2">
                            <button className="text-[10px] bg-accent/10 text-accent hover:bg-accent/20 font-bold px-2 py-1 rounded transition-colors uppercase">
                              Edit
                            </button>
                            <button className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2 py-1 rounded transition-colors uppercase">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
