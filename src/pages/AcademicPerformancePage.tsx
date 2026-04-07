import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AcademicPerformancePage() {
  const navigate = useNavigate();

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Academic Performance & Research</h2>
            <button 
              onClick={() => navigate("/student-info")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-b border-border pb-10">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary">Academic Performance Index (API)</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Program / Year-wise</p>
                </div>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 font-medium shrink-0">
                  View / Upload Report
                </Button>
              </div>

              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary">Success Rate (SR)</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Program / Level / Year-wise</p>
                </div>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 font-medium shrink-0">
                  View / Upload Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">Number of JRFs and SRFs among PhD Scholars</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">(Last 3 Years)</p>
                </div>
                <Input className="w-full bg-background border-border h-10" />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">PhDs Awarded per Recognized Guide</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">(Last 3 Years)</p>
                </div>
                <Input className="w-full bg-background border-border h-10" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-8">
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
