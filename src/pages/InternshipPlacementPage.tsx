import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SelectField({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div className="space-y-1.5 w-full">
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

function TextField({ label, placeholder, className = "" }: { label: string; placeholder?: string; className?: string }) {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <Input placeholder={placeholder || ""} className="bg-background h-10" />
    </div>
  );
}

function RadioYesNo({ label, name, defaultYes = true }: { label: string; name: string; defaultYes?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-primary">{label}</h4>
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

export default function InternshipPlacementPage() {
  const navigate = useNavigate();

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Internship-Placement</h2>
            <button 
              onClick={() => navigate("/student-info")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            
            {/* Placement Cell & Policy */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Placement Cell & Policy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RadioYesNo label="1. Placement Cell Exists" name="pc_exists" />
                <RadioYesNo label="2. Internship Policy Implemented" name="ip_implemented" />
              </div>
            </section>

            {/* Placement Statistics */}
            <section className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Placement Statistics (Academic Year)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SelectField label="Academic Year" options={["Select Academic Year"]} />
                <TextField label="Companies Visiting" />
                <TextField label="No. Of Students Placed (Male)" />
                <TextField label="No. Of Students Placed (Female)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <TextField label="Total Number Of Students Placed" />
                <TextField label="Placement %" />
                <TextField label="Placement Index" />
                <TextField label="Average Salary (INR)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <TextField label="Students Opted for Higher Studies" />
                <TextField label="No. of students Graduated in Minimum Stipulated Time" />
              </div>
            </section>

            {/* Internship Cell & Industry Collaboration */}
            <section className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Internship Cell & Industry Collaboration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RadioYesNo label="3. Internship Cell Exists" name="ic_exists" />
                <RadioYesNo label="4. Industry-ready Skill Courses (Industry Collaboration)" name="industry_courses" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <TextField label="Number of Students Undertaking Internship in collaboration with industry" />
              </div>
            </section>

            {/* Apprenticeship */}
            <section className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Apprenticeship</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RadioYesNo label="5. Apprenticeship Cell Exists" name="ac_exists" />
                <TextField label="No. of Students Placed After Apprenticeship" />
              </div>
            </section>

            {/* Vocational & Entrepreneurship Outcomes */}
            <section className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Vocational & Entrepreneurship Outcomes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TextField label="No. of Vocational Students Placed" />
                <TextField label="No. of Vocational Students Opted for Entrepreneurship" />
              </div>
            </section>

            <div className="flex justify-end pt-8 pb-2">
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
