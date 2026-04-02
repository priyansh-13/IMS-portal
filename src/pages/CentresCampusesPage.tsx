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
  type: "text" | "number" | "email" | "tel" = "text"
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
  label: string
) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm font-medium text-foreground">{label}</p>
    <div className="flex gap-4">
      {["Yes", "No"].map((opt) => (
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

export default function CentresCampusesPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "Off-Shore Centres",
      fields: [
        "offshore-exists",
        "offshore-count",
        "natureOfOffshore",
        "offshore-name",
        "offshore-country",
        "offshore-mode",
        "offshore-students",
        "offshore-girls",
        "offshore-saved",
      ],
      targetId: "section-offshore",
    },
    {
      name: "Off-Campus Centre",
      fields: [
        "offcampus-exists",
        "offcampus-name",
        "offcampus-address",
        "offcampus-lat",
        "offcampus-long",
        "offcampus-email",
        "offcampus-mobile",
      ],
      targetId: "section-offcampus",
    },
    {
      name: "Regional Centre",
      fields: [
        "regional-exists",
        "regional-name",
        "regional-address",
        "regional-count",
      ],
      targetId: "section-regional",
    },
    {
      name: "ODL Centres",
      fields: [
        "odl-exists",
        "odl-name",
        "odl-address",
        "odl-email",
        "odl-mobile",
      ],
      targetId: "section-odl",
    },
    {
      name: "Online Centres",
      fields: [
        "online-exists",
        "online-name",
        "online-address",
        "online-email",
        "online-mobile",
      ],
      targetId: "section-online",
    },
    {
      name: "Institute Sharing The Land",
      fields: [
        "land-shared",
        "shared-institute",
        "shared-programme",
        "shared-level",
        "shared-id",
        "shared-survey",
        "shared-area",
      ],
      targetId: "section-shared-land",
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

  const offShoreRows = [
    { name: "Test", country: "India", mode: "Regular", students: "1,200", girls: "540" },
  ];
    const natureOfOffshore = ["Offshore(Other than India)", "Off campus-Only in India",];

  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Centres / Campuses</h2>
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
            <div className="flex-1 min-w-0 space-y-6">
              {activeSubStep === 0 && (
              <section id="section-offshore" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Off-Shore Centres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderRadioGroup(values, setValue, "offshore-exists", "Off-Shore Centre Exists")}
                  {renderInputField(values, setValue, "offshore-count", "Number of Off-Shore Centre", undefined, "number")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                     {renderSelectField(values, setValue, "natureOfOffshore", "Nature of Off-Shore Centre", natureOfOffshore)}
                  {renderInputField(values, setValue, "offshore-name", "Name of Off-Shore")}
                  {renderInputField(values, setValue, "offshore-country", "Country")}
                  {renderInputField(values, setValue, "offshore-mode", "Study Mode")}
                  {renderInputField(values, setValue, "offshore-students", "Total Enrolled Students", undefined, "number")}
                  {renderInputField(values, setValue, "offshore-girls", "Total Enrolled Girls Students", undefined, "number")}
                  {renderInputField(values, setValue, "offshore-saved", "Additional Info")}
                </div>
                <div className="overflow-x-auto border border-border/70 rounded-2xl bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Name Of Centre</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Study Mode</th>
                        <th className="px-4 py-2 text-left">Total Enrolled Students</th>
                        <th className="px-4 py-2 text-left">Total Enrolled Girls Students</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offShoreRows.map((row) => (
                        <tr key={row.name} className="even:bg-muted/50">
                          <td className="px-4 py-2">{row.name}</td>
                          <td className="px-4 py-2">{row.country}</td>
                          <td className="px-4 py-2">{row.mode}</td>
                          <td className="px-4 py-2">{row.students}</td>
                          <td className="px-4 py-2 text-red-500">{row.girls}</td>
                          <td className="px-4 py-2 text-center">
                            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[10px]">Delete</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-offcampus" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Off-Campus Centre</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                  {renderRadioGroup(values, setValue, "offcampus-exists", "Off-Campus Centre Exists")}
                  {renderInputField(values, setValue, "offcampus-name", "Name of Off-Campus Centre")}
                  {renderInputField(values, setValue, "offcampus-address", "Address")}
                  {renderInputField(values, setValue, "offcampus-lat", "Latitude")}
                  {renderInputField(values, setValue, "offcampus-long", "Longitude")}
                  {renderInputField(values, setValue, "offcampus-email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "offcampus-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-regional" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Regional Centre</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                  {renderRadioGroup(values, setValue, "regional-exists", "Regional Centre Exists")}
                  {renderInputField(values, setValue, "regional-name", "Name of Regional Centre")}
                  {renderInputField(values, setValue, "regional-address", "Address")}
                  {renderInputField(values, setValue, "regional-count", "Number of Study Centres")}
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
              <section id="section-odl" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">ODL Centres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                  {renderRadioGroup(values, setValue, "odl-exists", "ODL Centres Exists")}
                  {renderInputField(values, setValue, "odl-name", "Institution Name")}
                  {renderInputField(values, setValue, "odl-address", "Address")}
                  {renderInputField(values, setValue, "odl-email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "odl-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
              <section id="section-online" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Online Centres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                  {renderRadioGroup(values, setValue, "online-exists", "Online Centres Exists")}
                  {renderInputField(values, setValue, "online-name", "Institution Name")}
                  {renderInputField(values, setValue, "online-address", "Address")}
                  {renderInputField(values, setValue, "online-email", "Email Address", undefined, "email")}
                  {renderInputField(values, setValue, "online-mobile", "Mobile Number", undefined, "tel")}
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
              <section id="section-shared-land" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Institute Sharing The Land</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-2xl">
                  {renderRadioGroup(values, setValue, "land-shared", "Land Shared with Another Institute")}
                  {renderInputField(values, setValue, "shared-institute", "Institution Name")}
                  {renderInputField(values, setValue, "shared-programme", "Programme")}
                  {renderInputField(values, setValue, "shared-level", "Level of Course")}
                  {renderInputField(values, setValue, "shared-id", "Permanent ID")}
                  {renderInputField(values, setValue, "shared-survey", "Survey Number")}
                  {renderInputField(values, setValue, "shared-area", "Area (Acres)")}
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

            <div className="flex-none px-2 pb-6 lg:pb-0">
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
