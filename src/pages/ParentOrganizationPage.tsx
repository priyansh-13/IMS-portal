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
  type: "text" | "date" | "email" | "tel" = "text"
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
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

const renderSelectField = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
    <select
      id={id}
      value={values[id] || ""}
      onChange={(e) => setValue(id, e.target.value)}
      className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/30"
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
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

const memberRows = [
  { name: "Prakash Jha", designation: "Officer", trusteeSince: "12-01-24", trusteeTill: "20-10-26", age: "42" },
];

const instituteRows = [
  { name: "IIT Bombay", state: "Mumbai", district: "Powai", category: "Category", students: "Raj Prakash" },
];

export default function ParentOrganizationPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "Trust / Society / Company Details",
      fields: [
        "trust-name",
        "trust-type",
        "registered-with",
        "registration-date",
        "registration-number",
        "trust-address",
        "land-std",
        "land-number",
        "pan",
        "mobile",
        "email",
        "website",
      ],
      targetId: "section-trust-details",
    },
    {
      name: "Trust / Society / Company Member Details",
      fields: [
        "member-name",
        "member-designation",
        "member-trustee-since",
        "member-trustee-till",
        "member-mobile",
        "member-email",
        "member-age",
      ],
      targetId: "section-member-details",
    },
    {
      name: "Add Institute (Under same Trust)",
      fields: [
        "new-institute-name",
        "new-institute-state",
        "new-institute-district",
        "new-institute-address",
        "new-institute-date",
        "new-institute-email",
        "new-institute-mobile",
        "new-institute-category",
        "new-institute-students",
      ],
      targetId: "section-add-institute",
    },
  ];

  const [activeSubStep, setActiveSubStep] = useState(0);
  const setValue = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Parent Organization / Ownership</h2>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
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
              <section id="section-trust-details" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <h3 className="text-base font-semibold text-foreground">Trust / Society / Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderInputField(values, setValue, "trust-name", "Name of the Trust / Society / Company")}
                  {renderSelectField(values, setValue, "trust-type", "Type of the Trust / Society / Company", [
                    "Trust", "Society", "Company",
                  ])}
                  {renderInputField(values, setValue, "registered-with", "Registered With")}
                  {renderInputField(values, setValue, "registration-date", "Registration Date", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "registration-number", "Registration Number")}
                  {renderInputField(values, setValue, "trust-address", "Trust / Society / Company Address")}
                  {renderInputField(values, setValue, "land-std", "Land Phone STD Code")}
                  {renderInputField(values, setValue, "land-number", "Land Phone Number", undefined, "tel")}
                  {renderInputField(values, setValue, "pan", "PAN")}
                  {renderInputField(values, setValue, "mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(values, setValue, "email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "website", "Trust / Society / Company Website")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-member-details" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <h3 className="text-base font-semibold text-foreground">Trust / Society / Company Member Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderInputField(values, setValue, "member-name", "Name")}
                  {renderInputField(values, setValue, "member-designation", "Designation")}
                  {renderInputField(values, setValue, "member-trustee-since", "Trustee Since", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "member-trustee-till", "Trustee Till", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "member-mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(values, setValue, "member-email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "member-age", "Age")}
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
                          <td className="px-4 py-2 text-accent font-semibold cursor-pointer">Remove</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-add-institute" className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                <h3 className="text-base font-semibold text-foreground">Add Institute (Under same Trust, but not Approved by AICTE)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderInputField(values, setValue, "new-institute-name", "Institution Name")}
                  {renderInputField(values, setValue, "new-institute-state", "Institute State")}
                  {renderInputField(values, setValue, "new-institute-district", "Institute District")}
                  {renderInputField(values, setValue, "new-institute-address", "Institute Address")}
                  {renderInputField(values, setValue, "new-institute-date", "Establishment Date", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "new-institute-email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "new-institute-mobile", "Mobile Number", undefined, "tel")}
                  {renderInputField(values, setValue, "new-institute-category", "Category")}
                  {renderInputField(values, setValue, "new-institute-students", "Total Admitted Students")}
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
                          <td className="px-4 py-2 flex gap-2">
                            <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-[10px]">Edit</span>
                            <span className="px-2 py-1 rounded-full bg-red-500 text-white text-[10px]">Delete</span>
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
