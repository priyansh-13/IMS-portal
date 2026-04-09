import { useState } from "react";
import { User, Menu, CalendarDays, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";
import { DownloadDropdown } from "./DownloadDropdown";
import { LanguageSelector } from "./LanguageSelector";
import { AccessibilityTools } from "./AccessibilityTools";
import { LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025-2026");
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  const handleLogout = () => {
    // Clear any auth tokens if they exist
    // localStorage.removeItem("token");
    navigate("/login");
  };

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

        {/* University Badge (shows university name) */}
        <div className="hidden md:flex px-3 py-1 bg-gradient-to-r from-primary/10 via-primary/5 to-success/5 rounded-full border border-primary/20 items-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_2px_15px_rgba(0,0,0,0.05)] cursor-pointer group whitespace-nowrap">
          <div className="h-6 w-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-[10px] font-bold text-primary">
            U
          </div>
          <div className="text-[11px] font-semibold tracking-tight flex flex-col leading-tight">
            <span className="text-muted-foreground/80 font-medium">University</span>
            <span className="text-primary font-bold group-hover:text-success transition-colors">Example University</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <DownloadDropdown />
          <NotificationDropdown />
        </div>

        <div className="flex items-center gap-0.5 ml-1 border-l pl-2 border-border/60">
          <LanguageSelector />
          <AccessibilityTools />
        </div>

        <div className="w-[1px] h-5 bg-border/60 hidden sm:block shrink-0 mx-1" />

        {/* Right side Profile shows HEI ID now */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 shrink-0 cursor-pointer group hover:bg-muted/50 p-1.5 -m-1.5 rounded-lg transition-colors">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#002B5B] shadow-sm flex items-center justify-center shrink-0">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-xs font-bold text-foreground leading-none mb-0.5">HEI-U-0123</p>
                <p className="text-[9px] font-semibold text-muted-foreground leading-none">Administrator</p>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px] p-2 rounded-xl mt-1 shadow-lg border-border/40">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-[13px] font-bold text-[#1e293b] leading-tight">National University of India</p>
                <p className="text-[11px] text-muted-foreground font-medium">HEI-U-0123</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer rounded-lg transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-[13px] font-semibold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
