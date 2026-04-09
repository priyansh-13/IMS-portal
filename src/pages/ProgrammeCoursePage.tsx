import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, GraduationCap, Search, Download, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormStepper } from "@/components/FormStepper";

const subSections = [
  { title: "Programme-Course Details", icon: BookOpen, completed: true, lastUpdated: "10:15 AM, 04 Feb 2026", link: "/programme-course/details" },
  { title: "Programme Summary", icon: FileText, completed: false, lastUpdated: "09:45 AM, 02 Feb 2026", link: "/programme-course/summary" },
  { title: "Course Curriculum", icon: GraduationCap, completed: false, lastUpdated: "03:20 PM, 02 Feb 2026", link: "/programme-course/curriculum" },
];

type FieldValueMap = Record<string, string>;

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

/* ───── Helper Components ───── */

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-semibold text-foreground">
        {label}
        <span className="text-red-500 ml-1 font-bold">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-8 px-2 rounded-lg border border-border bg-white text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none"
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
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-semibold text-foreground">
        {label}
        <span className="text-red-500 ml-1 font-bold">*</span>
      </label>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 text-[12px] cursor-pointer group">
          <input type="radio" name={label} checked={value === "Yes"} onChange={() => onChange?.("Yes")} className="w-3.5 h-3.5 accent-accent" />
          <span className="group-hover:text-accent transition-colors">Yes</span>
        </label>
        <label className="flex items-center gap-1.5 text-[12px] cursor-pointer group">
          <input type="radio" name={label} checked={value === "No"} onChange={() => onChange?.("No")} className="w-3.5 h-3.5 accent-accent" />
          <span className="group-hover:text-accent transition-colors">No</span>
        </label>
      </div>
    </div>
  );
}

function TextField({ label, value, placeholder, onChange, type = "text" }: { label: string; value: string; placeholder?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-semibold text-foreground">
        {label}
        <span className="text-red-500 ml-1 font-bold">*</span>
      </label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-8 text-[12px] bg-white border border-border focus:ring-2 focus:ring-accent/30 focus:border-accent"
      />
    </div>
  );
}

/* ───── Tab Components ───── */

function ProgrammeIdentificationTab({ values, setValue }: { values: FieldValueMap; setValue: (k: string, v: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
        <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Programme / Course Identification</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <SelectField label="Faculty / School" value={values.faculty} options={["Faculty of Computer Science", "Faculty of Engineering", "Faculty of Arts"]} onChange={(v) => setValue("faculty", v)} />
        <SelectField label="Department / Centre" value={values.department} options={["Department of Computer Science", "Department of Electronics", "Department of Mathematics"]} onChange={(v) => setValue("department", v)} />
        <SelectField label="Broad Discipline Group Category" value={values.broadCategory} options={["IT & Computer", "Engineering", "Science"]} onChange={(v) => setValue("broadCategory", v)} />
        <SelectField label="Broad Discipline Group Name" value={values.broadGroupName} options={["Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering"]} onChange={(v) => setValue("broadGroupName", v)} />
        <SelectField label="Discipline" value={values.discipline} options={["Computer Science", "Information Technology", "Data Science"]} onChange={(v) => setValue("discipline", v)} />
        <SelectField label="Level" value={values.level} options={["Select Level", "UG", "PG", "Diploma", "PhD"]} onChange={(v) => setValue("level", v)} />
        <SelectField label="Name of the Programme" value={values.programmeName} options={["Select Programme", "B.Tech", "M.Tech", "BCA", "MCA"]} onChange={(v) => setValue("programmeName", v)} />
        <TextField label="Year of Starting / Approval" value={values.yearStarting} placeholder="YYYY" onChange={(v) => setValue("yearStarting", v)} />
        <TextField label="Duration (Years)" value={values.duration} placeholder="" onChange={(v) => setValue("duration", v)} />
        <SelectField label="New / Existing" value={values.newExisting} options={["Select", "New", "Existing"]} onChange={(v) => setValue("newExisting", v)} />
        <SelectField label="Current Status" value={values.currentStatus} options={["Select Status", "Active", "Inactive", "Phased Out"]} onChange={(v) => setValue("currentStatus", v)} />
        <RadioField label="Programme Closure" value={values.closure} onChange={(v) => setValue("closure", v)} />
        <RadioField label="Change in Name" value={values.changeName} onChange={(v) => setValue("changeName", v)} />
        <RadioField label="Skill-based Course" value={values.skillBased} onChange={(v) => setValue("skillBased", v)} />
        <RadioField label="EDP / MDP" value={values.edpMdp} onChange={(v) => setValue("edpMdp", v)} />
        <RadioField label="NBA Accredited?" value={values.nbaAccredited} onChange={(v) => setValue("nbaAccredited", v)} />
        <TextField label="Valid From" value={values.validFrom} type="date" onChange={(v) => setValue("validFrom", v)} />
        <TextField label="Valid Till" value={values.validTill} type="date" onChange={(v) => setValue("validTill", v)} />
      </div>
    </div>
  );
}

function ProgrammeTypeModeTab({ values, setValue }: { values: FieldValueMap; setValue: (k: string, v: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
        <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Programme Type & Mode</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <SelectField label="Programme Type" value={values.programmeType} options={["Select", "General", "Professional", "Technical"]} onChange={(v) => setValue("programmeType", v)} />
        <SelectField label="Course Type" value={values.courseType} options={["Select", "Full Time", "Part Time", "Distance"]} onChange={(v) => setValue("courseType", v)} />
        <SelectField label="Medium" value={values.medium} options={["Select", "English", "Hindi", "Regional"]} onChange={(v) => setValue("medium", v)} />
        <RadioField label="Vocational" value={values.vocational} onChange={(v) => setValue("vocational", v)} />
        <RadioField label="Integrated" value={values.integrated} onChange={(v) => setValue("integrated", v)} />
        <RadioField label="Indian Languages" value={values.teachingIndian} onChange={(v) => setValue("teachingIndian", v)} />
        <RadioField label="Multidisciplinary" value={values.multidisciplinary} onChange={(v) => setValue("multidisciplinary", v)} />
      </div>

      <div className="flex items-center justify-between pb-1.5 border-b border-border/30 pt-2">
        <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Affiliation & Collaboration</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <TextField label="Affiliation Univ / Board" value={values.affiliationBoard} placeholder="University / Board name" onChange={(v) => setValue("affiliationBoard", v)} />
        <TextField label="Foreign Body" value={values.foreignBody} placeholder="Foreign University" onChange={(v) => setValue("foreignBody", v)} />
        <RadioField label="Twinning" value={values.twinning} onChange={(v) => setValue("twinning", v)} />
        <RadioField label="Twinning Approved" value={values.twinningApproved} onChange={(v) => setValue("twinningApproved", v)} />
        <RadioField label="NRI / Foreign Quota" value={values.nriForeign} onChange={(v) => setValue("nriForeign", v)} />
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
  const seatCategories = ["General", "OBC", "SC", "ST", "Excl EWS", "EWS", "Supernum"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1.5 border-b border-border/30">
        <h3 className="text-[12px] font-bold text-foreground uppercase tracking-tight">Intake & Admission Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-1">
        <SelectField label="Academic Year" value={values.academicYear} options={["Select Academic Year", "2024-2025", "2023-2024", "2022-2023"]} onChange={(v) => setValue("academicYear", v)} />
        <div>
          <label className="text-[12px] font-semibold text-foreground mb-1 block">Programme</label>
          <div className="h-8 px-2 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center text-[11px] font-bold">B.Tech (CSE)</div>
        </div>
        <TextField label="Admission Year" value={values.admissionYear} placeholder="YYYY" onChange={(v) => setValue("admissionYear", v)} />
        <TextField label="Sanct. Intake" value={values.sanctionedIntake} onChange={(v) => setValue("sanctionedIntake", v)} />
        <TextField label="Actual Enrolled" value={values.actualStudents} onChange={(v) => setValue("actualStudents", v)} />
        <SelectField label="Change in Intake" value={values.changeInIntake} options={["Select", "Yes", "No"]} onChange={(v) => setValue("changeInIntake", v)} />
        <TextField label="Reason for Change" value={values.reasonForChange} onChange={(v) => setValue("reasonForChange", v)} />
        <SelectField label="Mode" value={values.modeOfAdmission} options={["Select", "Entrance", "Merit", "Mgmt"]} onChange={(v) => setValue("modeOfAdmission", v)} />
        <TextField label="Exam Name" value={values.entranceExam} placeholder="JEE / CET" onChange={(v) => setValue("entranceExam", v)} />
        <SelectField label="Authority" value={values.admissionAuthority} options={["Select", "University", "State", "Institute"]} onChange={(v) => setValue("admissionAuthority", v)} />
        <SelectField label="Pattern" value={values.examPattern} options={["Select", "Semester", "Annual", "Tri"]} onChange={(v) => setValue("examPattern", v)} />
        <RadioField label="Centralized" value={values.centralizedExam} onChange={(v) => setValue("centralizedExam", v)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-foreground uppercase tracking-tight">% Admission (Last 3 Years)</h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th className="px-3 py-1.5 text-left font-bold border-b border-border">Year</th>
                  <th className="px-3 py-1.5 text-left font-bold border-b border-border">Programme</th>
                  <th className="px-3 py-1.5 text-left font-bold border-b border-border text-center">Intake</th>
                  <th className="px-3 py-1.5 text-left font-bold border-b border-border text-center">Adm.</th>
                  <th className="px-3 py-1.5 text-left font-bold border-b border-border text-center">%Filled</th>
                </tr>
              </thead>
              <tbody>
                {intakeData.map((row) => (
                  <tr key={row.year} className="border-t border-border hover:bg-muted/30">
                    <td className="px-3 py-1.5">{row.year}</td>
                    <td className="px-3 py-1.5 font-medium">{row.programme}</td>
                    <td className="px-3 py-1.5 text-center">{row.intake}</td>
                    <td className="px-3 py-1.5 text-center">{row.admitted}</td>
                    <td className="px-3 py-1.5 text-center text-muted-foreground">{row.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-foreground uppercase tracking-tight">Seat Allocation (Category-wise)</h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-muted text-foreground">
                  {seatCategories.map((cat) => (
                    <th key={cat} className="px-2 py-1.5 text-center font-bold border-b border-border">{cat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  {seatCategories.map((cat) => (
                    <td key={cat} className="px-1 py-1">
                      <Input className="bg-white text-center h-7 text-[11px] px-1 border-none focus-visible:ring-1 focus-visible:ring-accent" defaultValue="0" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Tab: List of Program ───── */

function ListOfProgramTab({ onNavigate }: { onNavigate: (tab: number) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-foreground">List of Programs</h3>
        <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm">
          + Add Programme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <div className="md:col-span-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Search Programme</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Enter programme / course name..." className="h-8 pl-8 text-[12px] bg-white" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Level</label>
          <select className="w-full h-8 px-2 rounded-lg border border-border bg-white text-[12px] outline-none focus:ring-1 focus:ring-accent">
            <option>All Levels</option>
            <option>UG</option>
            <option>PG</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full h-8 bg-accent text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
            Filter Results
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-muted text-foreground border-b border-border">
              <th className="px-3 py-2 text-left font-bold uppercase tracking-tight">#</th>
              <th className="px-3 py-2 text-left font-bold uppercase tracking-tight">Programme</th>
              <th className="px-3 py-2 text-left font-bold uppercase tracking-tight">Course</th>
              <th className="px-3 py-2 text-center font-bold uppercase tracking-tight">Level</th>
              <th className="px-3 py-2 text-center font-bold uppercase tracking-tight">Dept</th>
              <th className="px-3 py-2 text-center font-bold uppercase tracking-tight">Start</th>
              <th className="px-3 py-2 text-center font-bold uppercase tracking-tight">Status</th>
              <th className="px-3 py-2 text-right font-bold uppercase tracking-tight">Action</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((prog) => (
              <tr key={prog.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-3 py-2">{prog.id}</td>
                <td className="px-3 py-2 font-bold">{prog.name}</td>
                <td className="px-3 py-2">{prog.course}</td>
                <td className="px-3 py-2 text-center">{prog.level}</td>
                <td className="px-3 py-2 text-center text-primary font-medium">{prog.dept}</td>
                <td className="px-3 py-2 text-center">{prog.year}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${prog.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                    {prog.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button onClick={() => onNavigate(1)} className="text-[10px] bg-accent/10 text-accent hover:bg-accent/20 font-bold px-2 py-1 rounded transition-colors uppercase">
                      Edit
                    </button>
                    <button className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2 py-1 rounded transition-colors uppercase">
                      Del
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

/* ───── Main Page Component ───── */

export default function ProgrammeCoursePage({ defaultView = "cards" }: { defaultView?: "cards" | "details" }) {
  const [view, setView] = useState<"cards" | "details">(defaultView);
  const [activeTab, setActiveTab] = useState(0);
  const [values, setValues] = useState<FieldValueMap>({});
  const navigate = useNavigate();

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  const setValue = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const sectionsWithProgress = pageSteps.map((step) => {
    const filled = step.fields.filter((field) => (values[field] || "").trim().length > 0).length;
    return {
      name: step.name,
      totalFields: step.fields.length || 1,
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
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
      
      <div className="p-2 lg:p-3 pb-20">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border border-l-4 border-l-primary bg-muted/5 relative">
            <h2 className="text-sm font-bold text-foreground">Programme Course Details</h2>
            <button onClick={() => setView("cards")} className="px-3 py-1.5 bg-accent/10 text-accent font-bold hover:bg-accent/20 rounded text-[11px] uppercase tracking-wider transition-colors">
              Back
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 min-w-0 w-full">
              <div className="p-3 lg:p-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 right-0 left-0 bg-white/80 backdrop-blur-md border-t border-border p-2 z-40 transition-all duration-300"
           style={{ left: "var(--sidebar-width, 256px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <button
            onClick={() => {
              if (activeTab > 0) {
                setActiveTab((p) => Math.max(0, p - 1));
              } else {
                setView("cards");
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground hover:bg-muted/80 shadow-sm transition-all duration-200"
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (isLastStep) {
                navigate("/programme-course");
              } else {
                setActiveTab((p) => Math.min(pageSteps.length - 1, p + 1));
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

      {/* Download FAB */}
      <button className="fixed bottom-20 right-6 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50 hover:scale-110 active:scale-95">
        <Download className="h-4 w-4" />
      </button>
    </TopLayout>
  );
}
