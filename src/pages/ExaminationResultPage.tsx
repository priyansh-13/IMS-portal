import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SelectField({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div className="space-y-1.5">
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
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <Input placeholder={placeholder || ""} className="bg-background h-10" />
    </div>
  );
}

export default function ExaminationResultPage() {
  const navigate = useNavigate();

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Examination Result</h2>
            <button 
              onClick={() => navigate("/student-info")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SelectField label="Faculty/School" options={["Select"]} />
              <SelectField label="Department" options={["Select"]} />
              <SelectField label="Discipline" options={["Select"]} />
              <SelectField label="Academic Year" options={["Select Academic Year"]} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SelectField label="Examination Result Type" options={["Select Examination Result Type"]} required />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-foreground">Category-wise Pass-out in final year</h3>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-[#002B5B] text-white text-center">
                    <tr>
                      <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium w-48" rowSpan={2}>Category</th>
                      <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" colSpan={3}>Students Admitted</th>
                      <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" colSpan={3}>Students Appeared</th>
                      <th className="px-2 py-2 border-b border-white/20 font-medium" colSpan={3}>Total Pass-Out</th>
                    </tr>
                    <tr>
                      {Array.from({ length: 3 }).flatMap((_, i) => [
                        <th key={`m-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">M</th>,
                        <th key={`f-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">F</th>,
                        <th key={`tg-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">TG</th>
                      ])}
                    </tr>
                  </thead>
                  <tbody>
                    {["General", "SC", "ST", "OBC"].map((cat) => (
                      <tr key={cat} className="border-b border-border">
                        <td className="px-4 py-3 text-sm font-medium border-r border-border text-center text-muted-foreground">{cat}</td>
                        {Array.from({ length: 9 }).map((_, i) => (
                          <td key={i} className="p-2 border-r border-border">
                            <Input className="h-9 text-sm text-center focus-visible:ring-1 bg-transparent border-border/80 rounded-md" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Passout Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField label="Total Passout Students" />
                <TextField label="Total Passed(including backlog students)" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-8 pb-4">
              <Button className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">Save</Button>
              <Button className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">Reset</Button>
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
