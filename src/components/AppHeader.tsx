import { useState } from "react";
import { User, Menu, CalendarDays } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [year, setYear] = useState("2025-2026");
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-50 gap-2">
      <div className="flex items-center gap-1 lg:gap-4 shrink-0 sm:flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Select Year */}
        <div className="w-[105px] sm:w-[240px] lg:w-48 transition-all">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 lg:h-10 bg-background border-border text-[10px] sm:text-sm px-1.5 sm:px-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
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
      </div>

      {/* HEI ID & Year Badge */}
      <div className="flex flex-1 items-center justify-center px-1 min-w-0">
        <div className="px-2 py-0.5 lg:py-1 bg-muted/60 lg:bg-muted/40 rounded-full border border-border flex items-center gap-1 lg:gap-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] transition-all hover:bg-muted/80 cursor-pointer group whitespace-nowrap">
          <div className="relative shrink-0">
            <div className="w-1.5 lg:w-2 lg:h-2 rounded-full bg-accent animate-pulse" />
          </div>
          <p className="text-[10px] lg:text-sm font-semibold text-foreground tracking-tight flex items-center gap-1 lg:gap-2">
            <span className="text-muted-foreground font-medium uppercase tracking-wider hidden lg:inline">HEI ID:</span>
            <span className="text-[#1e3a8a] group-hover:text-accent transition-colors font-bold">HEI-U-0123</span>
          </p>
          <div className="w-[1px] h-3 bg-border shrink-0" />
          <p className="text-[10px] lg:text-sm font-bold text-success/80 uppercase tracking-widest shrink-0">
            {year.split("-")[0]}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">ONOD User</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
