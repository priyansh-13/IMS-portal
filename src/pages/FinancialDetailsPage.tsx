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

export default function FinancialDetailsPage() {
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const pageSteps = [
    {
      name: "Bank Account Details",
      fields: [
        "account-holder",
        "bank-name",
        "branch-name",
        "branch-code",
        "ifsc",
        "micr",
        "bank-address",
        "account-number",
        "account-type",
        "beneficiary",
        "account-operational",
        "nofrill",
        "joint-account",
        "second-holder",
        "mode-operation",
      ],
      targetId: "section-bank-account",
    },
    {
      name: "Income Statement (Annual)",
      fields: [
        "income-year",
        "income-central",
        "income-state",
        "income-student",
        "income-donations",
        "income-ugc",
        "income-dec",
        "income-ugc-commission",
        "income-university",
        "income-local",
        "interest-income",
        "sale-forms",
        "other-income",
        "total-income",
      ],
      targetId: "section-income-statement",
    },
    {
      name: "Expenditure Statement",
      fields: [
        "exp-year",
        "exp-salaries",
        "exp-infra",
        "exp-conferences",
        "exp-building",
        "exp-equipment",
        "exp-library",
        "exp-books",
        "exp-library-facilities",
        "exp-engg",
        "exp-scholarship",
        "exp-research",
        "exp-grant-colleges",
        "exp-other",
        "exp-capital",
        "exp-total",
        "exp-tuition",
        "exp-indian-regular",
        "exp-foreign-regular",
        "exp-indian-distance",
        "exp-foreign-distance",
        "exp-hostel",
        "exp-other-fees",
        "exp-lodging-indian",
        "exp-lodging-foreign",
        "exp-faculty-abroad",
      ],
      targetId: "section-expenditure",
    },
    {
      name: "Insurance Coverage",
      fields: [
        "insurance-general",
        "insurance-asset",
        "insurance-student",
        "insurance-employee",
        "digital-payment",
      ],
      targetId: "section-insurance",
    },
    {
      name: "Corpus Fund & FDR",
      fields: [
        "fdr-guidelines",
        "fdr-details",
      ],
      targetId: "section-fdr",
    },
    {
      name: "Financial Summary",
      fields: [
        "summary-year",
        "summary-income",
        "summary-expenditure",
        "summary-revenue-salary",
        "summary-exigencies",
        "internal-audit",
        "external-audit",
      ],
      targetId: "section-summary",
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

  const financialYears = ["2023-24", "2022-23", "2021-22"];
  const accountTypes = ["Savings", "Current", "Fixed Deposit"];

  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Financial Details</h2>
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
              <section id="section-bank-account" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Bank Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderInputField(values, setValue, "account-holder", "Account Holder Name")}
                  {renderInputField(values, setValue, "bank-name", "Bank Name")}
                  {renderInputField(values, setValue, "branch-name", "Branch Name")}
                  {renderInputField(values, setValue, "branch-code", "Branch Code")}
                  {renderInputField(values, setValue, "ifsc", "IFSC Code")}
                  {renderInputField(values, setValue, "micr", "MICR Code")}
                  {renderInputField(values, setValue, "bank-address", "Bank Address")}
                  {renderInputField(values, setValue, "account-number", "Bank Account Number")}
                  {renderSelectField(values, setValue, "account-type", "Bank Account Type", accountTypes)}
                  {renderRadioGroup(values, setValue, "beneficiary", "Account in the Name of Beneficiary Institute")}
                  {renderRadioGroup(values, setValue, "account-operational", "Account Operational")}
                  {renderRadioGroup(values, setValue, "nofrill", "No-Frill Account")}
                  {renderRadioGroup(values, setValue, "joint-account", "Joint Account")}
                  {renderInputField(values, setValue, "second-holder", "Second Account Holder Name")}
                  {renderSelectField(values, setValue, "mode-operation", "Mode of Operation", ["Single", "Joint"])}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
              <section id="section-income-statement" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Income Statement (Annual) (INR in Lakhs)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderSelectField(values, setValue, "income-year", "Financial Year", financialYears)}
                  {renderInputField(values, setValue, "income-central", "Grants from Central Government")}
                  {renderInputField(values, setValue, "income-state", "Grants from State Government")}
                  {renderInputField(values, setValue, "income-student", "Grants from Student Fees")}
                  {renderInputField(values, setValue, "income-donations", "Income from Donations")}
                  {renderInputField(values, setValue, "income-ugc", "Grants from UGC / Grants from UGC")}
                  {renderInputField(values, setValue, "income-dec", "Grants from Distance Education Council")}
                  {renderInputField(values, setValue, "income-ugc-commission", "University Grant Commission")}
                  {renderInputField(values, setValue, "income-university", "Grants received from University")}
                  {renderInputField(values, setValue, "income-local", "Grants received from Local Bodies")}
                  {renderInputField(values, setValue, "interest-income", "Interest income")}
                  {renderInputField(values, setValue, "sale-forms", "Sale of Application Forms")}
                  {renderInputField(values, setValue, "other-income", "Income from Other Bodies / Sources")}
                  {renderInputField(values, setValue, "total-income", "Total Income (Auto Calculated)")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
              <section id="section-expenditure" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Expenditure Statement (Operating / Capital) (INR in Lakhs)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderSelectField(values, setValue, "exp-year", "Financial Year", financialYears)}
                  {renderInputField(values, setValue, "exp-salaries", "Expenditure on Salaries")}
                  {renderInputField(values, setValue, "exp-infra", "Academic Infrastructure / Consumables / Running Expenditure")}
                  {renderInputField(values, setValue, "exp-conferences", "Seminars / Conferences / Workshops")}
                  {renderInputField(values, setValue, "exp-building", "Expenditure on Infrastructure / Building")}
                  {renderInputField(values, setValue, "exp-equipment", "Expenditure on Equipment / Laboratory")}
                  {renderInputField(values, setValue, "exp-library", "Expenditure on Library")}
                  {renderInputField(values, setValue, "exp-books", "Purchase / Subscription of Books, e-books & Digital Resources")}
                  {renderInputField(values, setValue, "exp-library-facilities", "Budget for Library / Lab / Facilities")}
                  {renderInputField(values, setValue, "exp-engg", "Expenditure for Engineering Workshops")}
                  {renderInputField(values, setValue, "exp-scholarship", "Expenditure on Scholarship")}
                  {renderInputField(values, setValue, "exp-research", "Expenditure on Research / Projects")}
                  {renderInputField(values, setValue, "exp-grant-colleges", "Grant to Colleges")}
                  {renderInputField(values, setValue, "exp-other", "Other Expenditure")}
                  {renderInputField(values, setValue, "exp-capital", "Other Capital Expenditure (Creation of Capital Assets)")}
                  {renderInputField(values, setValue, "exp-total", "Total Expenditure (Auto Calculated) Fee Structure")}
                  {renderInputField(values, setValue, "exp-tuition", "Tuition Fees")}
                  {renderInputField(values, setValue, "exp-indian-regular", "Indian students in regular education mode")}
                  {renderInputField(values, setValue, "exp-foreign-regular", "Foreign students in regular education mode")}
                  {renderInputField(values, setValue, "exp-indian-distance", "Indian students in distance education mode")}
                  {renderInputField(values, setValue, "exp-foreign-distance", "Foreign students in distance education mode")}
                  {renderInputField(values, setValue, "exp-hostel", "Hostel Fees")}
                  {renderInputField(values, setValue, "exp-other-fees", "Other Fees")}
                  {renderInputField(values, setValue, "exp-lodging-indian", "Payment on lodging and boarding from Indian Students")}
                  {renderInputField(values, setValue, "exp-lodging-foreign", "Payment on lodging and boarding from foreign Students")}
                  {renderInputField(values, setValue, "exp-faculty-abroad", "Income for faculties visiting abroad")}
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
              <section id="section-insurance" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Insurance Coverage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderRadioGroup(values, setValue, "insurance-general", "General Insurance")}
                  {renderRadioGroup(values, setValue, "insurance-asset", "Asset Insurance")}
                  {renderRadioGroup(values, setValue, "insurance-student", "Student Insurance")}
                  {renderRadioGroup(values, setValue, "insurance-employee", "Employee Insurance")}
                  {renderRadioGroup(values, setValue, "digital-payment", "Digital Payment Compliance")}
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
              <section id="section-fdr" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Corpus Fund & FDR</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderRadioGroup(values, setValue, "fdr-guidelines", "FDR of Corpus Fund created as per UGC Regulations")}
                  {renderInputField(values, setValue, "fdr-details", "Bank / FDR Reference Details")}
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
              <section id="section-summary" className="rounded-2xl border border-border/70 bg-muted/40 p-5 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Financial Summary (INR in Lakhs)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderSelectField(values, setValue, "summary-year", "Financial Year", financialYears)}
                  {renderInputField(values, setValue, "summary-income", "Total Income (Revenue & Capital)")}
                  {renderInputField(values, setValue, "summary-expenditure", "Total Expenditure (Revenue & Capital)")}
                  {renderInputField(values, setValue, "summary-revenue-salary", "Total Revenue Expenditure excluding Salary")}
                  {renderInputField(values, setValue, "summary-exigencies", "Funds kept for Exigencies")}
                  {renderRadioGroup(values, setValue, "internal-audit", "Internal Audit Conducted")}
                  {renderRadioGroup(values, setValue, "external-audit", "External Audit Conducted")}
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
