import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { name: "English", code: "en", native: "English" },
  { name: "Hindi", code: "hi", native: "हिन्दी" },
];

export function LanguageSelector() {
  const [selected, setSelected] = useState("en");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border group"
          aria-label="Select Language"
        >
          <div className="flex items-center justify-center px-1.5 h-7 rounded-sm bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <span className="text-sm font-bold leading-none">अ</span>
            <span className="text-[10px] font-bold leading-none mt-1 ml-0.5">A</span>
          </div>
          <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 shadow-2xl border-border bg-white" align="end">
        <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-border">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Select Language</span>
          <Globe className="h-3.5 w-3.5 text-primary/40" />
        </div>
        <div className="grid grid-cols-1 gap-1 pr-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang.code);
                setOpen(false);
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group text-left",
                selected === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{lang.name}</span>
                <span className={cn("text-[10px]", selected === lang.code ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {lang.native}
                </span>
              </div>
              {selected === lang.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
