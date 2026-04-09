import { Languages, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", native: "अंग्रेज़ी", side: "English" },
  { code: "hi", label: "हिंदी", native: "Hindi", side: "Hindi" },
];

export function LanguageSelector() {
  const [selected, setSelected] = useState("en");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-all border border-border/40 hover:border-primary/30 group">
          <Languages className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm font-bold uppercase tracking-tight text-foreground/80">
            {selected === "en" ? "EN" : "HI"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 shadow-xl border-primary/10" align="end">
        <div className="px-2 py-2 mb-1 border-b border-border/40">
          <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">Language / भाषा</p>
        </div>
        <div className="grid gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                selected === lang.code 
                  ? "bg-primary text-primary-foreground font-bold shadow-md ring-1 ring-primary/20" 
                  : "hover:bg-muted text-foreground font-medium"
              )}
            >
              <div className="flex flex-col">
                <span className="leading-tight">{lang.label}</span>
                <span className={cn("text-[10px] font-semibold mt-0.5", selected === lang.code ? "text-primary-foreground/80" : "text-muted-foreground/70")}>{lang.native}</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className={cn("text-[10px] font-black uppercase tracking-tighter opacity-40", selected === lang.code ? "text-primary-foreground" : "")}>{lang.side}</span>
                 {selected === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />}
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
