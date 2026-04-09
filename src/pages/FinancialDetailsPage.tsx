import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { FormStepper } from "@/components/FormStepper";
import { useFormProgress, FieldState } from "@/hooks/useFormProgress";
import { PendingFieldsPanel } from "@/components/PendingFieldsPanel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const FINANCIAL_FIELDS: FieldState[] = [
  // Bank Account Details
  { id: "account-holder", name: "Account Holder Name", section: "Bank Account Details", value: "" },
  { id: "bank-name", name: "Bank Name", section: "Bank Account Details", value: "" },
  { id: "branch-name", name: "Branch Name", section: "Bank Account Details", value: "" },
  { id: "branch-code", name: "Branch Code", section: "Bank Account Details", value: "" },
  { id: "ifsc", name: "IFSC Code", section: "Bank Account Details", value: "" },
  { id: "micr", name: "MICR Code", section: "Bank Account Details", value: "" },
  { id: "pfms", name: "PFMS ID", section: "Bank Account Details", value: "" },
  { id: "bank-address", name: "Bank Address", section: "Bank Account Details", value: "" },
  { id: "account-number", name: "Bank Account Number", section: "Bank Account Details", value: "" },
  { id: "account-type", name: "Bank Account Type", section: "Bank Account Details", value: "" },
  { id: "beneficiary", name: "Account in the Name of Beneficiary Institute", section: "Bank Account Details", value: "" },
  { id: "account-operational", name: "Account Operational", section: "Bank Account Details", value: "" },
  { id: "nofrill", name: "No-Frill Account", section: "Bank Account Details", value: "" },
  { id: "joint-account", name: "Joint Account", section: "Bank Account Details", value: "" },
  { id: "second-holder", name: "Second Account Holder Name", section: "Bank Account Details", value: "" },
  { id: "mode-operation", name: "Mode of Operation", section: "Bank Account Details", value: "" },

  // Income Statement
  { id: "income-year", name: "Financial Year", section: "Income Statement (Annual)", value: "" },
  { id: "income-central", name: "Grants from Central Government", section: "Income Statement (Annual)", value: "" },
  { id: "income-state", name: "Grants from State Government", section: "Income Statement (Annual)", value: "" },
  { id: "income-student", name: "Grants from Student Fees", section: "Income Statement (Annual)", value: "" },
  { id: "income-donations", name: "Income from Donations", section: "Income Statement (Annual)", value: "" },
  { id: "income-ugc", name: "Grants from UGC", section: "Income Statement (Annual)", value: "" },
  { id: "income-dec", name: "Grants from Distance Education Council", section: "Income Statement (Annual)", value: "" },
  { id: "income-ugc-commission", name: "University Grant Commission", section: "Income Statement (Annual)", value: "" },
  { id: "income-university", name: "Grants received from University", section: "Income Statement (Annual)", value: "" },
  { id: "income-local", name: "Grants received from Local Bodies", section: "Income Statement (Annual)", value: "" },
  { id: "interest-income", name: "Interest income", section: "Income Statement (Annual)", value: "" },
  { id: "sale-forms", name: "Sale of Application Forms", section: "Income Statement (Annual)", value: "" },
  { id: "other-income", name: "Income from Other Bodies / Sources", section: "Income Statement (Annual)", value: "" },
  { id: "total-income", name: "Total Income", section: "Income Statement (Annual)", value: "" },

  // Expenditure Statement
  { id: "exp-year", name: "Financial Year", section: "Expenditure Statement", value: "" },
  { id: "exp-salaries", name: "Expenditure on Salaries", section: "Expenditure Statement", value: "" },
  { id: "exp-infra", name: "Academic Infrastructure / Consumables", section: "Expenditure Statement", value: "" },
  { id: "exp-conferences", name: "Seminars / Conferences / Workshops", section: "Expenditure Statement", value: "" },
  { id: "exp-building", name: "Expenditure on Infrastructure / Building", section: "Expenditure Statement", value: "" },
  { id: "exp-equipment", name: "Expenditure on Equipment / Laboratory", section: "Expenditure Statement", value: "" },
  { id: "exp-library", name: "Expenditure on Library", section: "Expenditure Statement", value: "" },
  { id: "exp-books", name: "Purchase / Subscription of Books", section: "Expenditure Statement", value: "" },
  { id: "exp-library-facilities", name: "Budget for Library / Lab / Facilities", section: "Expenditure Statement", value: "" },
  { id: "exp-engg", name: "Expenditure for Engineering Workshops", section: "Expenditure Statement", value: "" },
  { id: "exp-scholarship", name: "Expenditure on Scholarship", section: "Expenditure Statement", value: "" },
  { id: "exp-research", name: "Expenditure on Research / Projects", section: "Expenditure Statement", value: "" },
  { id: "exp-grant-colleges", name: "Grant to Colleges", section: "Expenditure Statement", value: "" },
  { id: "exp-other", name: "Other Expenditure", section: "Expenditure Statement", value: "" },
  { id: "exp-capital", name: "Other Capital Expenditure", section: "Expenditure Statement", value: "" },
  { id: "exp-total", name: "Total Expenditure", section: "Expenditure Statement", value: "" },
  { id: "exp-tuition", name: "Tuition Fees", section: "Expenditure Statement", value: "" },
  { id: "exp-indian-regular", name: "Indian students in regular mode", section: "Expenditure Statement", value: "" },
  { id: "exp-foreign-regular", name: "Foreign students in regular mode", section: "Expenditure Statement", value: "" },
  { id: "exp-indian-distance", name: "Indian students in distance mode", section: "Expenditure Statement", value: "" },
  { id: "exp-foreign-distance", name: "Foreign students in distance mode", section: "Expenditure Statement", value: "" },
  { id: "exp-hostel", name: "Hostel Fees", section: "Expenditure Statement", value: "" },
  { id: "exp-other-fees", name: "Other Fees", section: "Expenditure Statement", value: "" },
  { id: "exp-lodging-indian", name: "Payment on lodging (Indian)", section: "Expenditure Statement", value: "" },
  { id: "exp-lodging-foreign", name: "Payment on lodging (Foreign)", section: "Expenditure Statement", value: "" },
  { id: "exp-faculty-abroad", name: "Income for faculties visiting abroad", section: "Expenditure Statement", value: "" },

  // Insurance
  { id: "insurance-general", name: "General Insurance", section: "Insurance Coverage", value: "" },
  { id: "insurance-asset", name: "Asset Insurance", section: "Insurance Coverage", value: "" },
  { id: "insurance-student", name: "Student Insurance", section: "Insurance Coverage", value: "" },
  { id: "insurance-employee", name: "Employee Insurance", section: "Insurance Coverage", value: "" },
  { id: "digital-payment", name: "Digital Payment Compliance", section: "Insurance Coverage", value: "" },

  // Corpus & FDR
  { id: "fdr-guidelines", name: "FDR of Corpus Fund", section: "Corpus Fund & FDR", value: "" },
  { id: "fdr-details", name: "Bank / FDR Reference Details", section: "Corpus Fund & FDR", value: "" },

  // Summary
  { id: "summary-year", name: "Financial Year", section: "Financial Summary", value: "" },
  { id: "summary-income", name: "Total Income", section: "Financial Summary", value: "" },
  { id: "summary-expenditure", name: "Total Expenditure", section: "Financial Summary", value: "" },
  { id: "summary-revenue-salary", name: "Revenue Expenditure excluding Salary", section: "Financial Summary", value: "" },
  { id: "summary-exigencies", name: "Funds kept for Exigencies", section: "Financial Summary", value: "" },
  { id: "internal-audit", name: "Internal Audit Conducted", section: "Financial Summary", value: "" },
  { id: "external-audit", name: "External Audit Conducted", section: "Financial Summary", value: "" },
];

const SECTION_ORDER = [
  "Bank Account Details",
  "Income Statement (Annual)",
  "Expenditure Statement",
  "Insurance Coverage",
  "Corpus Fund & FDR",
  "Financial Summary",
];

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
  
  const isRequired = FINANCIAL_FIELDS.find(f => f.id === id)?.required;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded border px-2.5 py-1 h-9 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
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
  label: string,
  options: string[] = ["Yes", "No"]
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";

  const isRequired = FINANCIAL_FIELDS.find(f => f.id === id)?.required;
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </p>
      <div className="flex gap-4 py-0.5">
        {options.map((opt) => (
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

const renderSelectField = (
  fields: FieldState[],
  setValue: (field: string, value: string) => void,
  id: string,
  label: string,
  options: string[]
) => {
  const fieldVal = fields.find((f) => f.id === id)?.value || "";
  const filled = fieldVal.trim().length > 0;

  const isRequired = FINANCIAL_FIELDS.find(f => f.id === id)?.required;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={fieldVal}
          onChange={(e) => setValue(id, e.target.value)}
          className={cn(
            "w-full rounded border bg-white px-2.5 py-1 h-9 text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none",
            filled ? "border-success/50 bg-success/5" : "border-border bg-white"
          )}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {filled && (
          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-success" />
        )}
      </div>
    </div>
  );
};

export default function FinancialDetailsPage() {
  const navigate = useNavigate();
  const initialFields: FieldState[] = [...FINANCIAL_FIELDS];

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

  const financialYears = ["2023-24", "2022-23", "2021-22"];
  const accountTypes = ["Savings", "Current", "Fixed Deposit"];

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
            <h2 className="text-sm font-bold text-foreground">Financial Details</h2>
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
               <section id="section-bank-account" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Bank Account Details</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderInputField(fields, updateField, "account-holder", "Account Holder Name")}
                  {renderInputField(fields, updateField, "bank-name", "Bank Name")}
                  {renderInputField(fields, updateField, "branch-name", "Branch Name")}
                  {renderInputField(fields, updateField, "branch-code", "Branch Code")}
                  {renderInputField(fields, updateField, "ifsc", "IFSC Code")}
                  {renderInputField(fields, updateField, "micr", "MICR Code")}
                  {renderInputField(fields, updateField, "pfms", "PFMS ID")}
                  {renderInputField(fields, updateField, "bank-address", "Bank Address")}
                  {renderInputField(fields, updateField, "account-number", "Bank Account Number")}
                  {renderSelectField(fields, updateField, "account-type", "Bank Account Type", accountTypes)}
                  {renderRadioGroup(fields, updateField, "beneficiary", "Account in the Name of Beneficiary Institute")}
                  {renderRadioGroup(fields, updateField, "account-operational", "Account Operational")}
                  {renderRadioGroup(fields, updateField, "nofrill", "No-Frill Account")}
                  {renderRadioGroup(fields, updateField, "joint-account", "Joint Account")}
                  {renderInputField(fields, updateField, "second-holder", "Second Account Holder Name")}
                  {renderSelectField(fields, updateField, "mode-operation", "Mode of Operation", ["Single", "Joint"])}
                </div>
              </section>
              )}

              {activeSubStep === 1 && (
               <section id="section-income-statement" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Income Statement (Annual) (INR in Lakhs)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderSelectField(fields, updateField, "income-year", "Financial Year", financialYears)}
                  {renderInputField(fields, updateField, "income-central", "Grants from Central Government")}
                  {renderInputField(fields, updateField, "income-state", "Grants from State Government")}
                  {renderInputField(fields, updateField, "income-student", "Grants from Student Fees")}
                  {renderInputField(fields, updateField, "income-donations", "Income from Donations")}
                  {renderInputField(fields, updateField, "income-ugc", "Grants from UGC")}
                  {renderInputField(fields, updateField, "income-dec", "Grants from Distance Education Council")}
                  {renderInputField(fields, updateField, "income-ugc-commission", "University Grant Commission")}
                  {renderInputField(fields, updateField, "income-university", "Grants received from University")}
                  {renderInputField(fields, updateField, "income-local", "Grants received from Local Bodies")}
                  {renderInputField(fields, updateField, "interest-income", "Interest income")}
                  {renderInputField(fields, updateField, "sale-forms", "Sale of Application Forms")}
                  {renderInputField(fields, updateField, "other-income", "Income from Other Bodies / Sources")}
                  {renderInputField(fields, updateField, "total-income", "Total Income (Auto Calculated)")}
                </div>
              </section>
              )}

              {activeSubStep === 2 && (
               <section id="section-expenditure" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Expenditure Statement (Operating / Capital) (INR in Lakhs)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderSelectField(fields, updateField, "exp-year", "Financial Year", financialYears)}
                  {renderInputField(fields, updateField, "exp-salaries", "Expenditure on Salaries")}
                  {renderInputField(fields, updateField, "exp-infra", "Academic Infrastructure / Consumables / Running Expenditure")}
                  {renderInputField(fields, updateField, "exp-conferences", "Seminars / Conferences / Workshops")}
                  {renderInputField(fields, updateField, "exp-building", "Expenditure on Infrastructure / Building")}
                  {renderInputField(fields, updateField, "exp-equipment", "Expenditure on Equipment / Laboratory")}
                  {renderInputField(fields, updateField, "exp-library", "Expenditure on Library")}
                  {renderInputField(fields, updateField, "exp-books", "Purchase / Subscription of Books, e-books & Digital Resources")}
                  {renderInputField(fields, updateField, "exp-library-facilities", "Budget for Library / Lab / Facilities")}
                  {renderInputField(fields, updateField, "exp-engg", "Expenditure for Engineering Workshops")}
                  {renderInputField(fields, updateField, "exp-scholarship", "Expenditure on Scholarship")}
                  {renderInputField(fields, updateField, "exp-research", "Expenditure on Research / Projects")}
                  {renderInputField(fields, updateField, "exp-grant-colleges", "Grant to Colleges")}
                  {renderInputField(fields, updateField, "exp-other", "Other Expenditure")}
                  {renderInputField(fields, updateField, "exp-capital", "Other Capital Expenditure (Creation of Capital Assets)")}
                  {renderInputField(fields, updateField, "exp-total", "Total Expenditure (Auto Calculated) Fee Structure")}
                  {renderInputField(fields, updateField, "exp-tuition", "Tuition Fees")}
                  {renderInputField(fields, updateField, "exp-indian-regular", "Indian students in regular education mode")}
                  {renderInputField(fields, updateField, "exp-foreign-regular", "Foreign students in regular education mode")}
                  {renderInputField(fields, updateField, "exp-indian-distance", "Indian students in distance education mode")}
                  {renderInputField(fields, updateField, "exp-foreign-distance", "Foreign students in distance education mode")}
                  {renderInputField(fields, updateField, "exp-hostel", "Hostel Fees")}
                  {renderInputField(fields, updateField, "exp-other-fees", "Other Fees")}
                  {renderInputField(fields, updateField, "exp-lodging-indian", "Payment on lodging and boarding from Indian Students")}
                  {renderInputField(fields, updateField, "exp-lodging-foreign", "Payment on lodging and boarding from foreign Students")}
                  {renderInputField(fields, updateField, "exp-faculty-abroad", "Income for faculties visiting abroad")}
                </div>
              </section>
              )}

              {activeSubStep === 3 && (
               <section id="section-insurance" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Insurance Coverage</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderRadioGroup(fields, updateField, "insurance-general", "General Insurance")}
                  {renderRadioGroup(fields, updateField, "insurance-asset", "Asset Insurance")}
                  {renderRadioGroup(fields, updateField, "insurance-student", "Student Insurance")}
                  {renderRadioGroup(fields, updateField, "insurance-employee", "Employee Insurance")}
                  {renderRadioGroup(fields, updateField, "digital-payment", "Digital Payment Compliance")}
                </div>
              </section>
              )}

              {activeSubStep === 4 && (
               <section id="section-fdr" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Corpus Fund & FDR</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {renderRadioGroup(fields, updateField, "fdr-guidelines", "FDR of Corpus Fund created as per UGC Regulations")}
                  {renderInputField(fields, updateField, "fdr-details", "Bank / FDR Reference Details")}
                </div>
              </section>
              )}

              {activeSubStep === 5 && (
               <section id="section-summary" className="rounded border border-border/60 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-widest">Financial Summary (INR in Lakhs)</h3>
                  {currentSection && (
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      currentSection.completionPercentage >= 100 
                        ? "bg-success/10 text-success" 
                        : "bg-accent/10 text-accent"
                    )}>
                      {currentSection.completionPercentage}% Complete
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {renderSelectField(fields, updateField, "summary-year", "Financial Year", financialYears)}
                  {renderInputField(fields, updateField, "summary-income", "Total Income (Revenue & Capital)")}
                  {renderInputField(fields, updateField, "summary-expenditure", "Total Expenditure (Revenue & Capital)")}
                  {renderInputField(fields, updateField, "summary-revenue-salary", "Total Revenue Expenditure excluding Salary")}
                  {renderInputField(fields, updateField, "summary-exigencies", "Funds kept for Exigencies")}
                  {renderRadioGroup(fields, updateField, "internal-audit", "Internal Audit Conducted")}
                  {renderRadioGroup(fields, updateField, "external-audit", "External Audit Conducted")}
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
