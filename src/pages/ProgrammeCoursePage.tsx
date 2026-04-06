import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, GraduationCap, Search, Download } from "lucide-react";

import { FormStepper } from "@/components/FormStepper";
import { SectionStatusSidebar } from "@/components/SectionStatusSidebar";

const subSections = [
  { title: "Programme-Course Details", icon: BookOpen, completed: true, lastUpdated: "10:15 AM, 04 Feb 2026", link: "/programme-course/details" },
  { title: "Programme Summary", icon: FileText, completed: false, lastUpdated: "09:45 AM, 02 Feb 2026", link: "/programme-course/summary" },
  { title: "Course Curriculum", icon: GraduationCap, completed: false, lastUpdated: "03:20 PM, 02 Feb 2026", link: "/programme-course/curriculum" },
];

type FieldValueMap = Record<string, string>;

const tabs = ["List of Program", "Programme Identification", "Programme Type & Mode", "Intake & Admission"];

const pageSteps = [
  {
    name: "List of Program",
    fields: [],
    targetId: "list-of-program",
  },
  {
    name: "Programme Identification",
    fields: [
      "faculty", "department", "broadCategory", "broadGroupName", "discipline", "level",
      "programmeName", "yearStarting", "duration", "newExisting", "currentStatus",
      "closure", "changeName", "skillBased", "edpMdp", "nbaAccredited", "validFrom", "validTill"
    ],
    targetId: "programme-identification",
  },
  {
    name: "Programme Type & Mode",
    fields: [
      "programmeType", "courseType", "medium", "vocational", "integrated",
      "teachingIndian", "multidisciplinary", "affiliationBoard", "foreignBody",
      "twinning", "twinningApproved", "nriForeign"
    ],
    targetId: "programme-type-mode",
  },
  {
    name: "Intake & Admission",
    fields: [
      "academicYear", "admissionYear", "sanctionedIntake", "actualStudents",
      "changeInIntake", "reasonForChange", "modeOfAdmission", "entranceExam",
      "admissionAuthority", "examPattern", "centralizedExam"
    ],
    targetId: "intake-admission",
  }
];

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

/* ───── Tab Components (Stateless) ───── */
function ProgrammeIdentificationTab({ values, setValue }: { values: FieldValueMap; setValue: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Programme / Course Identification</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Faculty / School" value={values.faculty} options={["Faculty of Computer Science", "Faculty of Engineering", "Faculty of Arts"]} onChange={(v) => setValue("faculty", v)} />
        <SelectField label="Department / Centre" value={values.department} options={["Department of Computer Science", "Department of Electronics", "Department of Mathematics"]} onChange={(v) => setValue("department", v)} />
        <SelectField label="Broad Discipline Group Category" value={values.broadCategory} options={["IT & Computer", "Engineering", "Science"]} onChange={(v) => setValue("broadCategory", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Broad Discipline Group Name" value={values.broadGroupName} options={["Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering"]} onChange={(v) => setValue("broadGroupName", v)} />
        <SelectField label="Discipline" value={values.discipline} options={["Computer Science", "Information Technology", "Data Science"]} onChange={(v) => setValue("discipline", v)} />
        <SelectField label="Level" value={values.level} options={["Select Level", "UG", "PG", "Diploma", "PhD"]} onChange={(v) => setValue("level", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Name of the Programme" value={values.programmeName} options={["Select Programme", "B.Tech", "M.Tech", "BCA", "MCA"]} onChange={(v) => setValue("programmeName", v)} />
        <TextField label="Year of Starting / Approval" value={values.yearStarting} placeholder="YYYY" onChange={(v) => setValue("yearStarting", v)} />
        <TextField label="Programme / Course Duration (Years)" value={values.duration} placeholder="" onChange={(v) => setValue("duration", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="New / Existing Programme" value={values.newExisting} options={["Select", "New", "Existing"]} onChange={(v) => setValue("newExisting", v)} />
        <SelectField label="Current Status of Programme" value={values.currentStatus} options={["Select Status", "Active", "Inactive", "Phased Out"]} onChange={(v) => setValue("currentStatus", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Programme Closure / Withdrawal" value={values.closure} onChange={(v) => setValue("closure", v)} />
        <RadioField label="Change in Programme Name" value={values.changeName} onChange={(v) => setValue("changeName", v)} />
        <RadioField label="Skill-based / Field-work Oriented Course" value={values.skillBased} onChange={(v) => setValue("skillBased", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="EDP / MDP Conducted" value={values.edpMdp} onChange={(v) => setValue("edpMdp", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <RadioField label="NBA Accredited?" value={values.nbaAccredited} onChange={(v) => setValue("nbaAccredited", v)} />
        <TextField label="Valid From" value={values.validFrom} type="date" onChange={(v) => setValue("validFrom", v)} />
        <TextField label="Valid Till" value={values.validTill} type="date" onChange={(v) => setValue("validTill", v)} />
      </div>
    </div>
  );
}

function ProgrammeTypeModeTab({ values, setValue }: { values: FieldValueMap; setValue: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">Programme Type & Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Programme Type" value={values.programmeType} options={["Select", "General", "Professional", "Technical"]} onChange={(v) => setValue("programmeType", v)} />
        <SelectField label="Course Type" value={values.courseType} options={["Select", "Full Time", "Part Time", "Distance"]} onChange={(v) => setValue("courseType", v)} />
        <SelectField label="Medium of Instruction" value={values.medium} options={["Select", "English", "Hindi", "Regional"]} onChange={(v) => setValue("medium", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Vocational Course" value={values.vocational} onChange={(v) => setValue("vocational", v)} />
        <RadioField label="Integrated Programme" value={values.integrated} onChange={(v) => setValue("integrated", v)} />
        <RadioField label="Teaching in Indian Languages" value={values.teachingIndian} onChange={(v) => setValue("teachingIndian", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Multidisciplinary Programme" value={values.multidisciplinary} onChange={(v) => setValue("multidisciplinary", v)} />
      </div>

      <h3 className="text-base font-semibold text-foreground border-b border-border pb-2 pt-4">Affiliation & Collaboration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Affiliation / Approval by University / Board" value={values.affiliationBoard} placeholder="University / Board name" onChange={(v) => setValue("affiliationBoard", v)} />
        <TextField label="Affiliating Foreign Body (if any)" value={values.foreignBody} placeholder="Foreign University / Institution" onChange={(v) => setValue("foreignBody", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioField label="Twinning / Collaboration Programme" value={values.twinning} onChange={(v) => setValue("twinning", v)} />
        <RadioField label="Twinning Approved by Competent Authority" value={values.twinningApproved} onChange={(v) => setValue("twinningApproved", v)} />
        <RadioField label="NRI / OCI / Foreign Student Quota" value={values.nriForeign} onChange={(v) => setValue("nriForeign", v)} />
      </div>
    </div>
  );
}

function IntakeAdmissionTab({ values, setValue }: { values: FieldValueMap; setValue: (k: string, v: string) => void }) {
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
        <SelectField label="Academic Year *" value={values.academicYear} options={["Select Academic Year", "2024-2025", "2023-2024", "2022-2023"]} onChange={(v) => setValue("academicYear", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground">Programme Intake Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-accent mb-1 block">Programme</label>
          <div className="h-10 px-3 rounded-lg bg-primary text-primary-foreground flex items-center text-sm font-medium">B.Tech (CSE)</div>
        </div>
        <TextField label="Admission Year / Batch" value={values.admissionYear} placeholder="YYYY" onChange={(v) => setValue("admissionYear", v)} />
        <TextField label="Sanctioned Intake" value={values.sanctionedIntake} onChange={(v) => setValue("sanctionedIntake", v)} />
        <TextField label="Actual Students Enrolled" value={values.actualStudents} onChange={(v) => setValue("actualStudents", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Change in Intake" value={values.changeInIntake} options={["Select", "Yes", "No"]} onChange={(v) => setValue("changeInIntake", v)} />
        <TextField label="Reason for Change (if any)" value={values.reasonForChange} onChange={(v) => setValue("reasonForChange", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2 pt-2">Admission Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Mode of Admission" value={values.modeOfAdmission} options={["Select", "Entrance Based", "Merit Based", "Management Quota"]} onChange={(v) => setValue("modeOfAdmission", v)} />
        <TextField label="Entrance Exam Name" value={values.entranceExam} placeholder="e.g., JEE / CET / University Test" onChange={(v) => setValue("entranceExam", v)} />
        <SelectField label="Admission Authority" value={values.admissionAuthority} options={["Select", "University", "State Govt", "Institute"]} onChange={(v) => setValue("admissionAuthority", v)} />
      </div>

      <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2 pt-2">Examination System</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Examination Pattern" value={values.examPattern} options={["Select", "Semester", "Annual", "Trimester"]} onChange={(v) => setValue("examPattern", v)} />
        <RadioField label="Centralized Examination" value={values.centralizedExam} onChange={(v) => setValue("centralizedExam", v)} />
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

export default function ProgrammeCoursePage({ defaultView = "cards" }: { defaultView?: "cards" | "details" }) {
  const [view, setView] = useState<"cards" | "details">(defaultView);
  const [activeTab, setActiveTab] = useState(0);
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  const sectionProgress = subSections.map((section) => ({
    name: section.title,
    totalFields: 1,
    filledFields: section.completed ? 1 : 0,
    completionPercentage: section.completed ? 100 : 0,
  }));

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  const setValue = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const sectionsWithProgress = pageSteps.map((step) => {
    const filled = step.fields.filter((field) => (values[field] || "").trim().length > 0).length;
    return {
      name: step.name,
      totalFields: step.fields.length || 1, // Avoid 0
      filledFields: filled,
      completionPercentage: step.fields.length ? Math.round((filled / step.fields.length) * 100) : 100,
      targetId: step.targetId,
    };
  });

  const totalFields = sectionsWithProgress.reduce((sum, s) => sum + s.totalFields, 0);
  const totalFilled = sectionsWithProgress.reduce((sum, s) => sum + s.filledFields, 0);
  const overallPercentage = totalFields ? Math.round((totalFilled / totalFields) * 100) : 0;
  const isLastStep = activeTab === pageSteps.length - 1;

  if (view === "cards") {
    return (
      <TopLayout>
        <ModuleBanner title="Programme and Course Details" />
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-3">
                {subSections.map((section) => (
                  <div
                    key={section.title}
                    className="cursor-pointer"
                    onClick={() => {
                      if (section.title === "Programme-Course Details") navigate("/programme-course/details");
                      if (section.title === "Programme Summary") navigate("/programme-course/summary");
                      if (section.title === "Course Curriculum") navigate("/programme-course/curriculum");
                    }}
                  >
                    <StatusCard {...section} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sectionProgress}
                sectionOrder={sectionProgress.map((s) => s.name)}
                onSectionClick={(name) => {
                  const target = subSections.find((s) => s.title === name);
                  if (target?.link) navigate(target.link);
                }}
              />
            </div>
          </div>
        </div>
      </TopLayout>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 1: return <ProgrammeIdentificationTab values={values} setValue={setValue} />;
      case 2: return <ProgrammeTypeModeTab values={values} setValue={setValue} />;
      case 3: return <IntakeAdmissionTab values={values} setValue={setValue} />;
      default: return <ListOfProgramTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details">
        <FormStepper
          steps={sectionsWithProgress.map(({ name, completionPercentage }) => ({ name, completionPercentage }))}
          currentStep={activeTab}
          onStepClick={(idx) => setActiveTab(idx)}
          overallPercentage={overallPercentage}
          variant="transparent"
          size="sm"
        />
      </ModuleBanner>
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Programme Course Details</h2>
            <button onClick={() => setView("cards")} className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-6">
            <div className="flex-1 min-w-0 space-y-6">
              {renderTabContent()}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-border mt-8">
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    if (activeTab > 0) {
                      setActiveTab((p) => Math.max(0, p - 1));
                    } else {
                      setView("cards");
                    }
                  }}
                >
                  ← Previous
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-sm shadow-accent/40"
                  onClick={() => {
                    if (isLastStep) {
                      navigate("/institutional-registry");
                    } else {
                      setActiveTab((p) => Math.min(pageSteps.length - 1, p + 1));
                    }
                  }}
                >
                  {isLastStep ? "Save & Submit" : "Save & Continue →"}
                </button>
              </div>
            </div>

            <div className="flex-none px-2 pb-6 lg:pb-0">
              <SectionStatusSidebar
                sections={sectionsWithProgress}
                sectionOrder={sectionsWithProgress.map((s) => s.name)}
                activeSection={sectionsWithProgress[activeTab].name}
                onSectionClick={(name) => {
                  const targetIndex = sectionsWithProgress.findIndex((s) => s.name === name);
                  if (targetIndex >= 0) {
                    setActiveTab(targetIndex);
                  }
                }}
              />
            </div>
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
      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-50">
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

      <button className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
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
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${prog.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
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
