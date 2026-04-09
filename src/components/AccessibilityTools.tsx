import { Accessibility, RotateCcw, SunMoon, Link, ImageOff, MousePointer2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccessibilityTools() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2.5 rounded-full hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all bg-primary/10 border border-primary/20 shadow-sm group">
          <Accessibility className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0 overflow-hidden shadow-2xl border-primary/20 rounded-2xl" align="end">
        <div className="p-5 border-b border-border/60 bg-gradient-to-br from-primary/5 to-background flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
              <Accessibility className="h-5 w-5" />
            </div>
            <h3 className="font-black text-lg tracking-tight text-foreground">Accessibility</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
        
        <div className="p-5 space-y-8 bg-background/50 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Color Contrast</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: SunMoon, label: "High Contrast" },
                { icon: RotateCcw, label: "Invert" },
                { icon: Link, label: "Highlight Links" },
              ].map((item, idx) => (
                <button key={idx} className="flex flex-col items-center justify-center gap-3 p-3.5 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden">
                  <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] leading-tight font-black text-center text-foreground/70 uppercase tracking-tighter">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Text Size</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "A+", sub: "Increase" },
                { label: "A-", sub: "Decrease" },
                { label: "A", sub: "Normal", active: true },
              ].map((item, idx) => (
                <button 
                  key={idx} 
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all relative overflow-hidden",
                    item.active 
                      ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20" 
                      : "border-border/60 hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  <span className={cn("text-xl font-black tracking-tighter", item.active ? "text-primary-foreground" : "text-foreground")}>{item.label}</span>
                  <span className={cn("text-[9px] leading-tight font-black uppercase tracking-widest", item.active ? "text-primary-foreground/80" : "text-muted-foreground/60")}>{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Others</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ImageOff, label: "Hide Images" },
                { icon: MousePointer2, label: "Big Cursor" },
              ].map((item, idx) => (
                <button key={idx} className="flex items-center gap-4 p-3.5 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors shrink-0">
                    <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-black text-foreground/70 uppercase tracking-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
