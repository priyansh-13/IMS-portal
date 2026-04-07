import { useNavigate } from "react-router-dom";
import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ActivityRow({ title, subtitle, label = "No. of Activities Conducted" }: { title: string; subtitle: string; label?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-primary">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="w-full md:w-64 space-y-1.5 shrink-0">
        <label className="text-xs font-semibold text-accent block">{label}</label>
        <Input className="w-full h-10 bg-background" />
      </div>
    </div>
  );
}

function CheckboxItem({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/30 p-1 rounded-md transition-colors w-max">
      <input 
        type="checkbox" 
        defaultChecked={defaultChecked} 
        className="w-4 h-4 rounded border-border text-accent accent-accent flex-none" 
      />
      <span className="text-foreground leading-none">{label}</span>
    </label>
  );
}

export default function ExtendedCurricularPage() {
  const navigate = useNavigate();

  return (
    <TopLayout>
      <ModuleBanner title="Student Information and Mobility System" />
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold text-foreground">Extended Curricular Engagements</h2>
            <button 
              onClick={() => navigate("/student-info")} 
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-12">
            
            {/* Activity Categories */}
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground mb-4">Activity Categories (Last 3 Academic Years)</h3>
              <div className="divide-y divide-border border-y border-border">
                <ActivityRow title="Domain-related Clubs & Activities" subtitle="(Coding Club, Research Forum, Subject Societies)" />
                <ActivityRow title="Cultural Clubs, Activities & Festivals" subtitle="(Cultural Fest, Music, Dance, Drama)" />
                <ActivityRow title="Mental Well-being Clubs & Activities" subtitle="(Yoga, Counselling, Stress Management)" />
                <ActivityRow title="Values, Ethics & Moral Development Activities" subtitle="(Ethics workshops, Constitution Day)" />
              </div>
            </section>

            {/* Sports & Participation */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Sports & Participation</h3>
              <div className="flex flex-col md:flex-row gap-12 justify-between items-start pt-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary">Student Participation in Inter-Collegiate Sports</h4>
                  <div className="space-y-2.5 flex flex-col">
                    <CheckboxItem label="University" defaultChecked />
                    <CheckboxItem label="District" defaultChecked />
                    <CheckboxItem label="State" />
                    <CheckboxItem label="Regional" />
                    <CheckboxItem label="National" />
                  </div>
                </div>
                <div className="w-full md:w-64 space-y-1.5 pt-1 md:pt-0">
                  <label className="text-xs font-semibold text-accent block">Percentage of Students (%)</label>
                  <Input className="w-full h-10 bg-background" />
                </div>
              </div>
            </section>

            {/* Community Engagement */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Community Engagement</h3>
              <div className="divide-y divide-border border-y border-border">
                <ActivityRow title="Community-focused Social Awareness Activities" subtitle="(Voters Awareness, Clean India, Literacy Drives)" />
                <ActivityRow title="Community-focused Health & Hygiene Activities" subtitle="(Blood Donation, Health Camps)" />
              </div>
              
              <div className="pt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-primary">Adoption of Villages (UBA / Similar Initiatives)</h4>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                      <input type="radio" name="uba" defaultChecked className="accent-accent" /> Yes
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-foreground">
                      <input type="radio" name="uba" className="accent-accent" /> No
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-accent block">Number of Villages Adopted</label>
                    <Input className="bg-background h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-accent block">Name of Scheme</label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-colors">
                      <option>UBA</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards & Recognitions */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Awards & Recognitions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-2">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-primary">External Academic Awards & Recognitions (Students)</h4>
                  <p className="text-xs text-muted-foreground pb-2">(Last 3 Years)</p>
                  <Input className="bg-background h-10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-primary">External Awards / Medals in Sports & Extended Activities</h4>
                  <p className="text-xs text-muted-foreground pb-2">(Inter-University / State / National)</p>
                  <Input className="bg-background h-10" />
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-8">
              <Button className="bg-accent hover:bg-accent/90 text-white min-w-[120px]">Save</Button>
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
