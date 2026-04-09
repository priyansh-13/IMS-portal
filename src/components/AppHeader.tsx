import { useState, useRef } from "react";
import { User, Menu, CalendarDays, Search, Bell, Download, LogOut, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { AccessibilityTools } from "./AccessibilityTools";

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025-2026");
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  return (
    <header className="h-14 bg-card/95 backdrop-blur-md border-b border-border/50 flex items-center px-4 lg:px-6 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Header Box - Flexible on the left */}
        <div className="hidden sm:flex relative w-full max-w-xl transition-all group ml-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search modules, registry data or documents..." 
            className="pl-9 h-9 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 rounded-full shadow-sm transition-all text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto shrink-0">
        {/* Language and Accessibility Tools */}
        <div className="flex items-center gap-1">
          <AccessibilityTools />
          <LanguageSelector />
        </div>


        {/* Select Year Filter */}
        <div className="w-[105px] sm:w-36 transition-all">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 bg-muted/50 hover:bg-muted border-border/40 text-[11px] sm:text-xs px-2.5 rounded-lg transition-all focus:ring-1 focus:ring-primary/20 shadow-none border-dashed hover:border-solid">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary/70" />
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


        {/* Notifications and Downloads */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications Popover */}
          <NotificationPopover />

          {/* Downloads Popover */}
          <DownloadPopover />
        </div>
        {/* Right side Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer group hover:opacity-90 transition-opacity ml-1">
              <div className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-gradient-to-br from-primary via-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0 border-2 border-background ring-1 ring-primary/20 transition-transform group-hover:scale-105">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-foreground leading-none mb-1 tracking-tight">HEI-U-0123</p>
                <div className="flex items-center justify-end gap-1">
                  <p className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/60 leading-none">Admin</p>
                  <ChevronDown className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-2 p-2">
            <DropdownMenuLabel className="p-3 pt-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold leading-none">National University of India</p>
                <p className="text-xs text-muted-foreground font-medium">HEI-U-0123</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="p-2.5 cursor-pointer rounded-md focus:bg-primary/5">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="p-2.5 cursor-pointer rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive group"
              onClick={() => navigate("/login")}
            >
              <LogOut className="mr-3 h-4 w-4 text-destructive/70 group-hover:text-destructive" />
              <span className="text-sm font-bold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-all relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Bell className="h-4.5 w-4.5 group-hover:text-primary transition-colors" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent border-2 border-card"></span>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 overflow-hidden" 
        align="end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Notifications</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">New</span>
        </div>
        <ul className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
          {[
            { color: "bg-primary", title: "Registration Update", text: "Institutional registry data has been updated.", time: "2m ago" },
            { color: "bg-accent", title: "New Message", text: "You have a new message from the regional office.", time: "1h ago" },
            { color: "bg-warning", title: "Pending Approval", text: "Faculty registry requires your immediate attention.", time: "3h ago" },
            { color: "bg-success", title: "Submission Success", text: "Financial details have been verified successfully.", time: "5h ago" },
            { color: "bg-primary", title: "System Update", text: "New features have been added to the portal.", time: "1d ago" },
          ].map((notif, idx) => (
            <li key={idx} className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/40 last:border-0">
              <div className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notif.color}`}></span>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-xs text-foreground">{notif.title}</p>
                    <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notif.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-3 border-t border-border bg-muted/10 text-center">
          <button className="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">View All Notifications</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DownloadPopover() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-all group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Download className="h-4.5 w-4.5 group-hover:text-primary transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-0 overflow-hidden" 
        align="end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-semibold text-sm">Downloads</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
              Access important documents and resources directly from here.
            </p>
          </div>
          <div className="space-y-2">
            <Button size="sm" className="w-full justify-start gap-2 h-9 text-xs" variant="outline">
              <Download className="h-3.5 w-3.5" />
              User Manual (PDF)
            </Button>
            <Button size="sm" className="w-full justify-start gap-2 h-9 text-xs" variant="outline">
              <Download className="h-3.5 w-3.5" />
              Registry Guidelines
            </Button>
          </div>
        </div>
        <div className="p-3 border-t border-border bg-muted/10 text-center">
          <button className="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">View Download Center</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
