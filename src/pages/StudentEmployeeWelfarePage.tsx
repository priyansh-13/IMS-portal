import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SelectField({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div className="space-y-1.5 w-full md:w-64">
      <label className="text-xs font-semibold text-accent block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-colors">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <Input placeholder={placeholder || ""} className="bg-background h-10" />
    </div>
  );
}

function RadioYesNo({ label, name, defaultYes = true }: { label: string; name: string; defaultYes?: boolean }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <h4 className="text-sm font-semibold text-primary min-w-[250px]">{label}</h4>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
          <input type="radio" name={name} defaultChecked={defaultYes} className="accent-accent" /> Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
          <input type="radio" name={name} defaultChecked={!defaultYes} className="accent-accent" /> No
        </label>
      </div>
    </div>
  );
}

function CheckboxItem({ label, defaultChecked = false, children }: { label: string; defaultChecked?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/30 p-1 rounded-md transition-colors w-max">
        <input 
          type="checkbox" 
          defaultChecked={defaultChecked} 
          className="w-4 h-4 rounded border-border text-accent accent-accent flex-none" 
        />
        <span className="text-foreground leading-none">{label}</span>
      </label>
      {children && <div className="pl-6">{children}</div>}
    </div>
  );
}

function CategoryGenderTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-[#002B5B] text-white">
          <tr>
            <th className="border-r border-white/20 border-b border-white/20 w-44" rowSpan={2}></th>
            {["General", "SC", "ST", "OBC", "EWS"].map((cat) => (
              <th key={cat} className="px-2 py-2 border-r border-white/20 border-b border-white/20 text-center font-medium text-xs tracking-wide" colSpan={3}>
                {cat}
              </th>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 5 }).flatMap((_, i) => [
              <th key={`${i}-m`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">M</th>,
              <th key={`${i}-f`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">F</th>,
              <th key={`${i}-tg`} className="px-1.5 py-1.5 font-medium border-r border-white/20 border-b border-white/20 text-center text-xs">TG</th>
            ])}
          </tr>
        </thead>
        <tbody>
          {["Total", "PwBD\n(Out of Total)", "Muslim Minority\n(Out of Total)", "Other Minority\n(Out of Total)"].map((rowName, idx) => (
            <tr key={idx} className="border-b border-border">
              <td className="px-3 py-3 text-xs font-medium whitespace-pre-wrap leading-snug text-foreground/80 border-r border-border">{rowName}</td>
              {Array.from({ length: 15 }).map((_, i) => (
                <td key={i} className="p-1.5 border-r border-border min-w-[50px]">
                  <Input className="h-8 text-xs bg-transparent border-border/80 hover:border-border focus-visible:ring-1 focus-visible:ring-offset-0 px-1 text-center rounded-md" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StudentEmployeeWelfarePage() {
  const navigate = useNavigate();

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Student and Employee Welfare</h2>
            <button 
              onClick={() => navigate("/student-info")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6 space-y-12">
            <div>
              <SelectField label="Academic Year" options={["Select Academic Year"]} required />
            </div>

            {/* Scholarship & Financial Support (Students) */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Scholarship & Financial Support (Students)</h3>
              <RadioYesNo label="Scholarship Data Maintained by Indicator" name="scholarship" />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary">If Yes - Government Scholarships (Category / Gender-wise)</h4>
                <CategoryGenderTable />
              </div>
            </section>

            {/* Fellowship Support */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Fellowship Support</h3>
              <RadioYesNo label="Fellowship Data Maintained" name="fellowship" />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary">If Yes - Government Fellowships (Category / Gender-wise)</h4>
                <CategoryGenderTable />
              </div>
            </section>

            {/* Educational Loans */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Educational Loans</h3>
              <RadioYesNo label="Educational Loan Data Maintained" name="eduloan" />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary">If Yes - Number of Students Receiving Educational Loans</h4>
                <CategoryGenderTable />
              </div>
            </section>

            {/* Fee Waiver / Freeship Support */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Fee Waiver / Freeship Support</h3>
              <RadioYesNo label="Freeships / Fee Waivers Offered" name="freeship" />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary">If Yes -</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <TextField label="Govt. Reimbursement" />
                  <TextField label="HEI Funds" />
                  <TextField label="Private Bodies" />
                  <TextField label="% Students Covered" />
                </div>
              </div>
            </section>

            {/* Insurance & Welfare Provisions */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Insurance & Welfare Provisions</h3>
              <div className="space-y-2">
                <CheckboxItem label="Students" defaultChecked />
                <CheckboxItem label="Employees" defaultChecked />
                <CheckboxItem label="Both" />
                <CheckboxItem label="Not Available" />
              </div>
            </section>

            {/* Employee Welfare Measures */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Employee Welfare Measures</h3>
              
              <RadioYesNo label="Dependent Reservation" name="dependent" />
              
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-semibold text-primary">In-campus Welfare Infrastructure</h4>
                <div className="space-y-2">
                  <CheckboxItem label="In-house Creche" defaultChecked />
                  <CheckboxItem label="School(s)" />
                  <CheckboxItem label="Staff Quarters" defaultChecked>
                    <CheckboxItem label="Hospital / Medical Facility" />
                  </CheckboxItem>
                </div>
                <div className="pt-2">
                  <Input placeholder="Other Facilities" className="w-full bg-background mt-2" />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-semibold text-primary">Policies & Career Advancement</h4>
                <div className="space-y-2">
                  <CheckboxItem label="Sabbatical Leave" defaultChecked />
                  <CheckboxItem label="Study Leave" />
                  <CheckboxItem label="Academic Concessions" />
                </div>
                <div className="pt-2">
                  <Input placeholder="Other Policy" className="w-full bg-background mt-2" />
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-center gap-6">
                <h4 className="text-sm font-semibold text-primary">Career Advancement Scheme (CAS)</h4>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                    <input type="radio" name="cas" defaultChecked className="accent-accent" /> Available
                  </label>
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                    <input type="radio" name="cas" className="accent-accent" /> Not Available
                  </label>
                </div>
              </div>
            </section>

            {/* Safety & Quality of Living */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Safety & Quality of Living</h3>
              
              <RadioYesNo label="Safety Audit Conducted" name="safety" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-accent block">Year of Last Audit</label>
                  <Input placeholder="YYYY" className="bg-background h-10" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-accent block mb-2">Maintenance Actions Taken</label>
                  <div className="flex items-center gap-4 h-10">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                      <input type="radio" name="maint" defaultChecked className="accent-accent" /> Yes
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                      <input type="radio" name="maint" className="accent-accent" /> No
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-8 pb-4">
              <Button className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">Save</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground flex justify-between">
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <div>Copyright © 2026 One Nation One Data</div>
        </div>
      </div>
    </TopLayout>
  );
}
