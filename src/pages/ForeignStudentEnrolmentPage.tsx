import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";

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

function RadioGroupField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-accent block">{label}</label>
      <div className="flex items-center gap-4">
        {options.map((opt, i) => (
          <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer font-medium">
            <input type="radio" name={label} defaultChecked={i === 0} className="accent-accent" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ForeignStudentEnrolmentPage() {
  const navigate = useNavigate();
  const subModules = [
    { title: "Student Enrolment", completed: false, link: "/student-info/enrolment" },
    { title: "Foreign Student Enrolment", completed: false, link: "/student-info/foreign-enrolment" },
    { title: "Examination Result", completed: false, link: "/student-info/examination" },
    { title: "Academic Performance & Research", completed: false, link: "/student-info/performance" },
    { title: "Extended Curricular Engagements", completed: false, link: "/student-info/curricular" },
    { title: "Student And Employee Welfare", completed: false, link: "/student-info/welfare" },
    { title: "Internship-Placement", completed: true, link: "/student-info/internship" },
  ];
  const sidebarSections = subModules.map((s) => ({
    name: s.title,
    totalFields: 1,
    filledFields: s.completed ? 1 : 0,
    completionPercentage: s.completed ? 100 : 0,
  }));

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
              <h2 className="text-lg font-semibold text-foreground">Foreign Student Enrolment Details</h2>
              <button 
                onClick={() => navigate("/student-info")} 
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Back
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <RadioGroupField 
                  label="Whether Foreign Students are enrolled in the Institution:" 
                  options={["Yes", "No"]} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SelectField label="Academic Year" options={["Select Academic Year"]} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SelectField label="Faculty/School" options={["Select"]} />
                <SelectField label="Department" options={["Select"]} />
                <SelectField label="Discipline" options={["Select"]} />
                <SelectField label="Course / Programme Enrolled" options={["Select Programme"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="Method of Admission :" placeholder="Direct,Study in India,Exchange Program,Others" />
                <TextField label="No. of Students Enrolled (Total)" placeholder="Total" />
              </div>

              <div className="space-y-4 pt-2">
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-[#002B5B] text-white text-center">
                      <tr>
                        <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" rowSpan={2}>Sr.No</th>
                        <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" rowSpan={2}>Country</th>
                        <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" colSpan={3}>NRI Students</th>
                        <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" colSpan={3}>PIO Students</th>
                        <th className="px-2 py-2 border-r border-white/20 border-b border-white/20 font-medium" colSpan={3}>Other Foreign National Students</th>
                        <th className="px-2 py-2 border-b border-white/20 font-medium" colSpan={3}>Total</th>
                      </tr>
                      <tr>
                        {Array.from({ length: 4 }).flatMap((_, i) => [
                          <th key={`m-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">Male</th>,
                          <th key={`f-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">Female</th>,
                          <th key={`t-${i}`} className="px-2 py-1.5 font-medium border-r border-white/20 border-b border-white/20">Total</th>
                        ])}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((row) => (
                        <tr key={row} className="border-b border-border">
                          <td className="px-2 py-2 text-center text-sm font-medium border-r border-border">{row}</td>
                          <td className="p-1.5 border-r border-border min-w-[120px]">
                            <Input className="h-8 text-sm focus-visible:ring-1 bg-transparent border-border/80" />
                          </td>
                          {Array.from({ length: 12 }).map((_, i) => (
                            <td key={i} className="p-1.5 border-r border-border min-w-[60px]">
                              <Input className="h-8 text-sm text-center focus-visible:ring-1 bg-transparent border-border/80" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-8 pb-4">
                <Button className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">Save</Button>
                <Button className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">Reset</Button>
              </div>
            </div>
          </div>
          <div className="flex-none w-full lg:w-72">
            <SectionStatusSidebar
              sections={sidebarSections}
              sectionOrder={sidebarSections.map((s) => s.name)}
              activeSection="Foreign Student Enrolment"
              onSectionClick={(name) => {
                const target = subModules.find((s) => s.title === name);
                if (target?.link) navigate(target.link);
              }}
            />
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
