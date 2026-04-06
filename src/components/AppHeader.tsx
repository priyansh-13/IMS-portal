import { useState } from "react";
import { User, Menu, CalendarDays, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [year, setYear] = useState("2025-2026");
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  return (
    <header className="h-12 bg-card/90 backdrop-blur-md border-b border-border/60 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-50 gap-4 shadow-sm">
      <div className="flex items-center gap-3 shrink-0 sm:flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Header Box */}
        <div className="hidden sm:flex relative w-full max-w-[260px] lg:max-w-xs transition-all group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search modules..." 
            className="pl-9 h-8 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 rounded-full shadow-sm transition-all text-xs"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 lg:gap-4 min-w-0">
        {/* Select Year Filter */}
        <div className="w-[100px] sm:w-32 transition-all">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 bg-primary/5 hover:bg-primary/10 border-border/50 text-xs px-2.5 rounded-full transition-colors focus:ring-1 focus:ring-primary/20 shadow-sm">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary/70" />
                <SelectValue placeholder="Year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {years.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* HEI ID Premium Badge */}
        <div className="hidden md:flex px-2.5 py-1 bg-gradient-to-r from-accent/10 to-primary/5 rounded-full border border-accent/20 items-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_2px_15px_rgba(0,0,0,0.05)] cursor-pointer group whitespace-nowrap">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
          </div>
          <p className="text-[11px] font-semibold tracking-tight flex items-center gap-1">
            <span className="text-muted-foreground/80 font-medium">HEI ID:</span>
            <span className="text-primary font-bold group-hover:text-accent transition-colors">HEI-U-0123</span>
          </p>
        </div>

        <div className="w-[1px] h-5 bg-border/60 hidden sm:block shrink-0 mx-1" />

        {/* Right side Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-md flex items-center justify-center shrink-0 border border-primary/20">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <div className="text-right hidden xl:block">
            <p className="text-xs font-bold text-foreground leading-none mb-0.5">ONOD User</p>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground leading-none">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
