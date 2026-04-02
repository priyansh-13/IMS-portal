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

const renderRadioGroup = (
  values: FieldValueMap,
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[] = ["Yes", "No"]
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

export default function CommitteesPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "General Committees",
      fields: [
        "icc-exists",
        "equal-opportunity",
        "vigilance-cell",
      ],
      targetId: "section-general",
    },
    {
      name: "Ombudsman / Grievance Redressal Committee",
      fields: [
        "grievance-exists",
        "ombudsman-appointed",
        "ombudsman-date",
        "ombudsman-name",
        "ombudsman-contact",
        "ombudsman-email",
        "online-grievance",
      ],
      targetId: "section-ombudsman",
    },
    {
      name: "Anti-Ragging Cell / Committee",
      fields: [
        "anti-ragging-exists",
        "anti-ragging-date",
        "anti-ragging-type",
        "ragging-squad",
      ],
      targetId: "section-ragging",
    },
    {
      name: "Internal Committee (IC)",
      fields: [
        "ic-exists",
        "ic-type",
        "ic-date",
      ],
      targetId: "section-ic",
    },
    {
      name: "SC / ST Committee",
      fields: [
        "scst-exists",
        "scst-date",
      ],
      targetId: "section-scst",
    },
    {
      name: "Student Counselor",
      fields: [
        "student-counselor",
        "counselor-date",
        "counselor-name",
        "counselor-contact",
        "counselor-email",
      ],
      targetId: "section-counselor",
    },
    {
      name: "Internal Quality Assurance Cell (IQAC)",
      fields: [
        "iqac-established",
        "iqac-date",
        "iqac-contact",
        "iqac-number",
        "stakeholders-involved",
        "intertwines-committees",
        "promotes-quality",
        "audits-external",
        "quality-circles",
      ],
      targetId: "section-iqac",
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
            <h2 className="text-lg font-semibold text-foreground">Committees</h2>
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
              <section id="section-general" className="rounded-2xl border border-border/70 bg-muted/40 p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "icc-exists", "Internal Complaints Committee (ICC) Exists")}
                  {renderRadioGroup(values, setValue, "equal-opportunity", "Equal Opportunity Cell Exists")}
                  {renderRadioGroup(values, setValue, "vigilance-cell", "Vigilance Cell Exists")}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-ombudsman" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Ombudsman / Grievance Redressal Committee</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "grievance-exists", "Grievance Committee Exists")}
                  {renderRadioGroup(values, setValue, "ombudsman-appointed", "Ombudsman Appointed")}
                  {renderInputField(values, setValue, "ombudsman-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "ombudsman-name", "Ombudsman Name")}
                  {renderInputField(values, setValue, "ombudsman-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(values, setValue, "ombudsman-email", "Email Address", undefined, "email")}
                  {renderRadioGroup(values, setValue, "online-grievance", "Online Grievance Redressal Mechanism")}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                  <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Members</button>
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-ragging" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Anti-Ragging Cell / Committee</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "anti-ragging-exists", "Anti-Ragging Committee Exists")}
                  {renderInputField(values, setValue, "anti-ragging-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "anti-ragging-type", "Type of Committee")}
                  {renderRadioGroup(values, setValue, "ragging-squad", "Anti-Ragging Squad Exists")}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                  <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Members</button>
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
              <section id="section-ic" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Internal Committee (IC)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "ic-exists", "Committee Exists")}
                  {renderInputField(values, setValue, "ic-type", "Type of Committee")}
                  {renderInputField(values, setValue, "ic-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                  <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Members</button>
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
              <section id="section-scst" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">SC / ST Committee</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "scst-exists", "Committee Exists")}
                  {renderInputField(values, setValue, "scst-date", "Date of Constitution", "dd-mm-yyyy", "date")}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">View</button>
                  <button className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white">Manage Members</button>
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
              <section id="section-counselor" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Student Counselor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "student-counselor", "Student Counselor Appointed")}
                  {renderInputField(values, setValue, "counselor-date", "Date of Appointment", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "counselor-name", "Counselor Name")}
                  {renderInputField(values, setValue, "counselor-contact", "Contact Number", undefined, "tel")}
                  {renderInputField(values, setValue, "counselor-email", "Email Address", undefined, "email")}
                </div>
              </section>
              )}

              {activeSubStep === 6 && (
              <section id="section-iqac" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Internal Quality Assurance Cell (IQAC / IQAS / CIQA)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "iqac-established", "IQAC Established")}
                  {renderInputField(values, setValue, "iqac-date", "Date of Establishment", "dd-mm-yyyy", "date")}
                  {renderInputField(values, setValue, "iqac-contact", "Contact Email", undefined, "email")}
                  {renderInputField(values, setValue, "iqac-number", "Contact Number", undefined, "tel")}
                  {renderRadioGroup(values, setValue, "stakeholders-involved", "Involves all relevant stakeholders")}
                  {renderRadioGroup(values, setValue, "intertwines-committees", "Intertwines activities with institutional committees")}
                  {renderRadioGroup(values, setValue, "promotes-quality", "Promotes quality through orientation / seminars / workshops")}
                  {renderRadioGroup(values, setValue, "audits-external", "Conducts Academic & Administrative Audit by external experts")}
                  {renderRadioGroup(values, setValue, "quality-circles", "Practice of Quality Circles")}
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
