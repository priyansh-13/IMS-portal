import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";

export default function ProgrammeSummaryPage() {
  const navigate = useNavigate();

  const academicYears = ["2022-2023", "2023-2024", "2024-2025"];

  return (
    <TopLayout>
      <ModuleBanner title="Programme and Course Details" />
      <div className="p-6 lg:p-8">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Programme Summary</h2>
            <button 
              onClick={() => navigate("/programme-course")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Programme Summary (Last 3 Academic Years)</h3>
            
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground border-b border-border/20">
                    <th className="px-4 py-4 text-left font-semibold border-r border-border/20">Academic Year</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-border/20">
                      Number Of Courses Offered
                      <span className="block text-[10px] font-normal opacity-70">(Excluding Repeats)</span>
                    </th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-border/20">Skill-Based / Field-Work Oriented Courses</th>
                    <th className="px-4 py-4 text-left font-semibold">EDP / MDP Conducted</th>
                  </tr>
                </thead>
                <tbody>
                  {academicYears.map((year) => (
                    <tr key={year} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium border-r border-border">{year}</td>
                      <td className="px-2 py-2 border-r border-border">
                        <Input 
                          defaultValue={year === "2022-2023" ? "0" : ""} 
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 shadow-none text-sm" 
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-border">
                        <Input 
                          defaultValue={year === "2022-2023" ? "8" : ""} 
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 shadow-none text-sm" 
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Input 
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-accent h-9 shadow-none text-sm" 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold shadow-sm hover:bg-accent/90 transition-all active:scale-[0.98]">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-12 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <span>Copyright © 2026 One Nation One Data</span>
        </div>
      </div>
    </TopLayout>
  );
}
