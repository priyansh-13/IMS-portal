import { useState } from "react";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, GraduationCap, Search, Download } from "lucide-react";

const subSections = [
  { title: "Programme-Course Details", icon: BookOpen, completed: true, lastUpdated: "10:15 AM, 04 Feb 2026" },
  { title: "Programme Summary", icon: FileText, completed: false, lastUpdated: "09:45 AM, 02 Feb 2026" },
  { title: "Course Curriculum", icon: GraduationCap, completed: false, lastUpdated: "03:20 PM, 02 Feb 2026" },
];

const tabs = ["List of Program", "Programme Identification", "Programme Type & Mode", "Intake & Admission"];

const programs = [
  { id: 1, name: "B.Tech", course: "Computer Science & Engineering", level: "UG", dept: "CSE", year: 2010, status: "Active" as const },
  { id: 2, name: "M.Tech", course: "Data Science", level: "PG", dept: "CSE", year: 2018, status: "Inactive" as const },
];

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-accent mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function RadioField({ label, value, onChange }: { label: string; value: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-accent mb-2 block">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input type="radio" name={label} checked={value === "Yes"} onChange={() => onChange?.("Yes")} className="accent-accent" />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input type="radio" name={label} checked={value === "No"} onChange={() => onChange?.("No")} className="accent-accent" />
          No
        </label>
      </div>
    </div>
  );
}

function TextField({ label, value, placeholder, onChange, type = "text" }: { label: string; value: string; placeholder?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-accent mb-1 block">{label}</label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-background"
      />
    </div>
  );
}

/* ───── Tab: Programme Identification ───── */
function ProgrammeIdentificationTab() {
  const [form, setForm] = useState({
    faculty: "Faculty of Computer Science",
    department: "Department of Computer Science",
    broadCategory: "IT & Computer",
    broadGroupName: "Computer Science & Engineering",
    discipline: "Computer Science",
    level: "Select Level",
    programmeName: "Select Programme",
    yearStarting: "",
    duration: "",
    newExisting: "Select",
    currentStatus: "Select Status",
    closure: "No",
    changeName: "No",
    skillBased: "No",
    edpMdp: "No",
    nbaAccredited: "Yes",
    validFrom: "",
    validTill: "",
  });
  const u = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Programme / Course Identification</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Faculty / School" value={form.faculty} options={["Faculty of Computer Science", "Faculty of Engineering", "Faculty of Arts"]} onChange={(v) => u("faculty", v)} />
        <SelectField label="Department / Centre" value={form.department} options={["Department of Computer Science", "Department of Electronics", "Department of Mathematics"]} onChange={(v) => u("department", v)} />
        <SelectField label="Broad Discipline Group Category" value={form.broadCategory} options={["IT & Computer", "Engineering", "Science"]} onChange={(v) => u("broadCategory", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Broad Discipline Group Name" value={form.broadGroupName} options={["Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering"]} onChange={(v) => u("broadGroupName", v)} />
        <SelectField label="Discipline" value={form.discipline} options={["Computer Science", "Information Technology", "Data Science"]} onChange={(v) => u("discipline", v)} />
        <SelectField label="Level" value={form.level} options={["Select Level", "UG", "PG", "Diploma", "PhD"]} onChange={(v) => u("level", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Name of the Programme" value={form.programmeName} options={["Select Programme", "B.Tech", "M.Tech", "BCA", "MCA"]} onChange={(v) => u("programmeName", v)} />
        <TextField label="Year of Starting / Approval" value={form.yearStarting} placeholder="YYYY" onChange={(v) => u("yearStarting", v)} />
        <TextField label="Programme / Course Duration (Years)" value={form.duration} placeholder="" onChange={(v) => u("duration", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="New / Existing Programme" value={form.newExisting} options={["Select", "New", "Existing"]} onChange={(v) => u("newExisting", v)} />
        <SelectField label="Current Status of Programme" value={form.currentStatus} options={["Select Status", "Active", "Inactive", "Phased Out"]} onChange={(v) => u("currentStatus", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Programme Closure / Withdrawal" value={form.closure} onChange={(v) => u("closure", v)} />
        <RadioField label="Change in Programme Name" value={form.changeName} onChange={(v) => u("changeName", v)} />
        <RadioField label="Skill-based / Field-work Oriented Course" value={form.skillBased} onChange={(v) => u("skillBased", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="EDP / MDP Conducted" value={form.edpMdp} onChange={(v) => u("edpMdp", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <RadioField label="NBA Accredited?" value={form.nbaAccredited} onChange={(v) => u("nbaAccredited", v)} />
        <TextField label="Valid From" value={form.validFrom} type="date" onChange={(v) => u("validFrom", v)} />
        <TextField label="Valid Till" value={form.validTill} type="date" onChange={(v) => u("validTill", v)} />
      </div>
    </div>
  );
}

/* ───── Tab: Programme Type & Mode ───── */
function ProgrammeTypeModeTab() {
  const [form, setForm] = useState({
    programmeType: "Select",
    courseType: "Select",
    medium: "Select",
    vocational: "Yes",
    integrated: "Yes",
    teachingIndian: "Yes",
    multidisciplinary: "No",
    affiliationBoard: "",
    foreignBody: "",
    twinning: "Yes",
    twinningApproved: "No",
    nriForeign: "Yes",
  });
  const u = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Programme Type & Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Programme Type" value={form.programmeType} options={["Select", "General", "Professional", "Technical"]} onChange={(v) => u("programmeType", v)} />
        <SelectField label="Course Type" value={form.courseType} options={["Select", "Full Time", "Part Time", "Distance"]} onChange={(v) => u("courseType", v)} />
        <SelectField label="Medium of Instruction" value={form.medium} options={["Select", "English", "Hindi", "Regional"]} onChange={(v) => u("medium", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Vocational Course" value={form.vocational} onChange={(v) => u("vocational", v)} />
        <RadioField label="Integrated Programme" value={form.integrated} onChange={(v) => u("integrated", v)} />
        <RadioField label="Teaching in Indian Languages" value={form.teachingIndian} onChange={(v) => u("teachingIndian", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Multidisciplinary Programme" value={form.multidisciplinary} onChange={(v) => u("multidisciplinary", v)} />
      </div>

      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2 pt-4">Affiliation & Collaboration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Affiliation / Approval by University / Board" value={form.affiliationBoard} placeholder="University / Board name" onChange={(v) => u("affiliationBoard", v)} />
        <TextField label="Affiliating Foreign Body (if any)" value={form.foreignBody} placeholder="Foreign University / Institution" onChange={(v) => u("foreignBody", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Twinning / Collaboration Programme" value={form.twinning} onChange={(v) => u("twinning", v)} />
        <RadioField label="Twinning Approved by Competent Authority" value={form.twinningApproved} onChange={(v) => u("twinningApproved", v)} />
        <RadioField label="NRI / OCI / Foreign Student Quota" value={form.nriForeign} onChange={(v) => u("nriForeign", v)} />
      </div>
    </div>
  );
}

/* ───── Tab: Intake & Admission ───── */
function IntakeAdmissionTab() {
  const [form, setForm] = useState({
    academicYear: "Select Academic Year",
    admissionYear: "",
    sanctionedIntake: "",
    actualStudents: "",
    changeInIntake: "Select",
    reasonForChange: "",
    modeOfAdmission: "Select",
    entranceExam: "",
    admissionAuthority: "Select",
    examPattern: "Select",
    centralizedExam: "Yes",
  });
  const u = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const intakeData = [
    { year: "2022-2023", programme: "B.Tech (CSE)", intake: "60", admitted: "55", seats: "Auto" },
    { year: "2023-2024", programme: "B.Tech (CSE)", intake: "60", admitted: "55", seats: "Auto" },
    { year: "2024-2025", programme: "B.Tech (CSE)", intake: "60", admitted: "55", seats: "Auto" },
  ];

  const seatCategories = ["General", "OBC", "Scheduled Caste", "ST", "Total Excluding EWS", "EWS", "Supernumerary Seats"];

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Intake & Admission Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Academic Year *" value={form.academicYear} options={["Select Academic Year", "2024-2025", "2023-2024", "2022-2023"]} onChange={(v) => u("academicYear", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground">Programme Intake Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-accent mb-1 block">Programme</label>
          <div className="h-10 px-3 rounded-lg bg-primary text-primary-foreground flex items-center text-sm font-medium">B.Tech (CSE)</div>
        </div>
        <TextField label="Admission Year / Batch" value={form.admissionYear} placeholder="YYYY" onChange={(v) => u("admissionYear", v)} />
        <TextField label="Sanctioned Intake" value={form.sanctionedIntake} onChange={(v) => u("sanctionedIntake", v)} />
        <TextField label="Actual Students Enrolled" value={form.actualStudents} onChange={(v) => u("actualStudents", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Change in Intake" value={form.changeInIntake} options={["Select", "Yes", "No"]} onChange={(v) => u("changeInIntake", v)} />
        <TextField label="Reason for Change (if any)" value={form.reasonForChange} onChange={(v) => u("reasonForChange", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2 pt-2">Admission Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Mode of Admission" value={form.modeOfAdmission} options={["Select", "Entrance Based", "Merit Based", "Management Quota"]} onChange={(v) => u("modeOfAdmission", v)} />
        <TextField label="Entrance Exam Name" value={form.entranceExam} placeholder="e.g., JEE / CET / University Test" onChange={(v) => u("entranceExam", v)} />
        <SelectField label="Admission Authority" value={form.admissionAuthority} options={["Select", "University", "State Govt", "Institute"]} onChange={(v) => u("admissionAuthority", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2 pt-2">Examination System</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Examination Pattern" value={form.examPattern} options={["Select", "Semester", "Annual", "Trimester"]} onChange={(v) => u("examPattern", v)} />
        <RadioField label="Centralized Examination" value={form.centralizedExam} onChange={(v) => u("centralizedExam", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground pt-4">
        Percentage of students admitted in the first year of programmes against the sanctioned seats, during the last three years
      </h4>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-4 py-3 text-left font-medium">Academic Year</th>
              <th className="px-4 py-3 text-left font-medium">Programme</th>
              <th className="px-4 py-3 text-left font-medium">Sanctioned Intake</th>
              <th className="px-4 py-3 text-left font-medium">Students Admitted</th>
              <th className="px-4 py-3 text-left font-medium">% Seats Filled</th>
            </tr>
          </thead>
          <tbody>
            {intakeData.map((row) => (
              <tr key={row.year} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">{row.year}</td>
                <td className="px-4 py-3">{row.programme}</td>
                <td className="px-4 py-3">{row.intake}</td>
                <td className="px-4 py-3">{row.admitted}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="text-sm font-semibold text-foreground pt-4">Seat Allocation (Category-wise)</h4>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-3 py-3 text-center font-medium" colSpan={7}>Seat Allocation (Category-Wise)</th>
            </tr>
            <tr className="bg-primary text-primary-foreground">
              {seatCategories.map((cat) => (
                <th key={cat} className="px-3 py-2 text-center text-xs font-medium">{cat}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              {seatCategories.map((cat) => (
                <td key={cat} className="px-2 py-2">
                  <Input className="bg-background text-center h-8 text-sm" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProgrammeCoursePage() {
  const [view, setView] = useState<"cards" | "details">("cards");
  const [activeTab, setActiveTab] = useState(0);

  if (view === "cards") {
    return (
      <TopLayout>
        <ModuleBanner title="Programme and Course Details" />
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subSections.map((section) => (
              <div key={section.title} onClick={() => section.title === "Programme-Course Details" && setView("details")}>
                <StatusCard {...section} />
              </div>
            ))}
          </div>
        </div>
      </TopLayout>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 1: return <ProgrammeIdentificationTab />;
      case 2: return <ProgrammeTypeModeTab />;
      case 3: return <IntakeAdmissionTab />;
      default: return <ListOfProgramTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Programme Course Details</h2>
            <button onClick={() => setView("cards")} className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
              Back
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === i ? "bg-accent text-accent-foreground" : "text-accent hover:bg-muted"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {renderTabContent()}

            {/* Navigation buttons for form tabs */}
            {activeTab > 0 && (
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                <button
                  onClick={() => setActiveTab((p) => Math.max(0, p - 1))}
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveTab((p) => Math.min(tabs.length - 1, p + 1))}
                  className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  {activeTab === tabs.length - 1 ? "Save & Submit" : "Save & Continue →"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="text-accent hover:underline cursor-pointer">Privacy Policy</span>
            <span className="text-accent hover:underline cursor-pointer">Terms of Use</span>
          </div>
          <span>Copyright © 2026 One Nation One Data</span>
        </div>
      </div>

      {/* Download FAB */}
      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center hover:bg-secondary/90 transition-colors z-50">
        <Download className="h-5 w-5" />
      </button>
    </TopLayout>
  );
}

/* ───── Tab: List of Program ───── */
function ListOfProgramTab({ onNavigate }: { onNavigate: (tab: number) => void }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-4">List of Program</h3>

      <button className="mb-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors">
        + Add Programme
      </button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Search</label>
          <Input placeholder="Search by Programme / Course Name" className="bg-background" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Level</label>
          <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
            <option>All Levels</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Department</label>
          <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
            <option>All Departments</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-2 border border-accent text-accent rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Programme Name</th>
              <th className="px-4 py-3 text-left font-medium">Course Name</th>
              <th className="px-4 py-3 text-left font-medium">Level</th>
              <th className="px-4 py-3 text-left font-medium">Department</th>
              <th className="px-4 py-3 text-left font-medium">Year Of Start</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((prog) => (
              <tr key={prog.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">{prog.id}</td>
                <td className="px-4 py-3">{prog.name}</td>
                <td className="px-4 py-3">{prog.course}</td>
                <td className="px-4 py-3">{prog.level}</td>
                <td className="px-4 py-3">{prog.dept}</td>
                <td className="px-4 py-3">{prog.year}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    prog.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {prog.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-[10px] bg-accent/10 text-accent hover:bg-accent/20 font-bold px-2 py-1 rounded transition-colors uppercase">
                      Edit
                    </button>
                    <button className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2 py-1 rounded transition-colors uppercase">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
