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

export default function ExaminationResultPage() {
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
              <h2 className="text-lg font-semibold text-foreground">Examination Result</h2>
              <button
                onClick={() => navigate("/student-info")}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Back
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField label="Academic Year" options={["Select Academic Year"]} required />
                <SelectField label="Programme" options={["Select Programme"]} required />
                <SelectField label="Course" options={["Select Course"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField label="Student Type" options={["Regular", "Distance", "Online"]} />
                <SelectField label="Exam Type" options={["Mid Term", "End Term", "Revaluation"]} />
                <SelectField label="Result Status" options={["Published", "Pending"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField label="Total Students Appeared" placeholder="0" />
                <TextField label="Total Students Passed" placeholder="0" />
                <TextField label="Pass Percentage" placeholder="0%" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="Topper Name" placeholder="Enter name" />
                <TextField label="Topper CGPA/Percentage" placeholder="0" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField label="Students with Backlogs" placeholder="0" />
                <TextField label="Students Absent" placeholder="0" />
                <TextField label="Students Withheld" placeholder="0" />
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">Result Upload</h3>
                <div className="rounded-lg border border-dashed border-border p-4 bg-muted/40">
                  <p className="text-sm text-muted-foreground">
                    Drag & drop PDF/CSV or <span className="text-accent font-semibold cursor-pointer">browse</span> to upload result file.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button className="bg-accent hover:bg-accent/90 text-white min-w-[120px]">Save</Button>
                <Button className="bg-accent hover:bg-accent/90 text-white min-w-[120px]">Reset</Button>
              </div>
            </div>
          </div>

          <div className="flex-none w-full lg:w-72">
            <SectionStatusSidebar
              sections={sidebarSections}
              sectionOrder={sidebarSections.map((s) => s.name)}
              activeSection="Examination Result"
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
