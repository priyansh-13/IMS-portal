import { useState, useRef, useEffect } from "react";
import {
  Menu,
  CalendarDays,
  Search,
  X,
  ZoomIn,
  ZoomOut,
  Contrast,
  RotateCcw,
  ChevronDown,
  User,
  Globe,
  Accessibility,
  LogOut,
  Bell,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

function useAccessibility() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    const next = Math.min(fontSize + 10, 130);
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };
  const decreaseFontSize = () => {
    const next = Math.max(fontSize - 10, 80);
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };
  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
  };
  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast", !highContrast);
  };

  return { fontSize, highContrast, increaseFontSize, decreaseFontSize, resetFontSize, toggleContrast };
}

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [year, setYear] = useState("2025-2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [accessOpen, setAccessOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const accessRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, resetFontSize, toggleContrast } = useAccessibility();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (accessRef.current && !accessRef.current.contains(e.target as Node)) setAccessOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) setDownloadOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-3 lg:px-4 shrink-0 sticky top-0 z-50 gap-2">
      {/* Left: Hamburger + Year + Search */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-md hover:bg-muted text-muted-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Year Selector */}
        

        {/* Search Bar */}
        <div className={cn(
          "hidden sm:flex items-center gap-2 h-8 rounded-lg border px-3 transition-all duration-200 flex-1 max-w-xs",
          searchFocused
            ? "border-primary/40 bg-primary/3 shadow-sm shadow-primary/10"
            : "border-border bg-muted/40 hover:border-border/80"
        )}>
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search modules, fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="w-36 shrink-0">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 bg-background border-border text-xs px-2">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3 text-muted-foreground shrink-0" />
                <SelectValue placeholder="Year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {years.map((option) => (
                <SelectItem key={option} value={option} className="text-xs">{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Center: HEI identifier */}
      <div className="hidden lg:flex items-center justify-center px-2 shrink-0">
        <div className="flex items-center gap-2 px-2.5 py-0.5 bg-primary/5 rounded-full border border-primary/10">
          <div className="flex items-center gap-2 text-[11px]">
            {/* <span className="text-muted-foreground font-medium">HEI Code:</span>
            <span className="text-primary font-bold tracking-wide">HEI-U-0123</span> */}
            {/* <span className="w-px h-3 bg-border" /> */}
            {/* <span className="text-muted-foreground font-medium">University:</span> */}
            <span className="text-foreground font-semibold">National University of India</span>
          </div>
        </div>
      </div>

      {/* Right: Lang + Accessibility + User */}
      <div className="flex items-center gap-1.5 shrink-0">
        
        {/* Download */}
        <div ref={downloadRef} className="relative">
          <button
            onClick={() => { setDownloadOpen(!downloadOpen); setNotifOpen(false); setLangOpen(false); setAccessOpen(false); setUserOpen(false); }}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-lg border transition-all",
              downloadOpen
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:bg-muted"
            )}
            title="Downloads"
          >
            <Download className="h-4 w-4" />
          </button>
          {downloadOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-card rounded-xl border border-border shadow-lg z-50 overflow-hidden animate-scale-in">
              <div className="p-2">
                <div className="px-2 py-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  Available Downloads
                </div>
                <div className="space-y-1">
                  {[
                    { title: "Institutional Summary", type: "PDF", size: "1.2 MB", icon: FileText, color: "text-red-500" },
                    { title: "Financial Report Q1", type: "Excel", size: "850 KB", icon: FileSpreadsheet, color: "text-emerald-500" },
                    { title: "Student Data Export", type: "JSON", size: "4.5 MB", icon: FileJson, color: "text-amber-500" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                    >
                      <div className={cn("p-1.5 rounded-md bg-muted group-hover:bg-background transition-colors", item.color)}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{item.type} • {item.size}</p>
                      </div>
                      <Download className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <button className="w-full text-center py-1.5 text-[11px] text-primary font-bold hover:underline">
                    View Download History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setDownloadOpen(false); setLangOpen(false); setAccessOpen(false); setUserOpen(false); }}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-lg border transition-all relative",
              notifOpen
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:bg-muted"
            )}
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive border border-card" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-80 bg-card rounded-xl border border-border shadow-lg z-50 overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/30">
                <span className="text-xs font-bold text-foreground">Notifications</span>
                <button className="text-[10px] text-primary font-bold hover:underline">Mark all as read</button>
              </div>
              <div className="max-h-72 overflow-y-auto custom-scrollbar">
                {[
                  { title: "New Policy Uploaded", desc: "Institutional Registry policy v2.4 is now live.", time: "2 mins ago", type: "info", icon: Clock },
                  { title: "Validation Complete", desc: "Data validation for Student Info finished successfully.", time: "1 hour ago", type: "success", icon: CheckCircle2 },
                  { title: "Action Required", desc: "Please update the financial details for 2024-25.", time: "3 hours ago", type: "error", icon: AlertCircle },
                  { title: "System Update", desc: "Platform will undergo maintenance at 12:00 AM.", time: "5 hours ago", type: "info", icon: Clock },
                  { title: "New Message", desc: "You have a new message from the accreditation board.", time: "1 day ago", type: "info", icon: Clock },
                  { title: "Report Ready", desc: "The Q3 financial report is ready for download.", time: "2 days ago", type: "success", icon: CheckCircle2 },
                ].map((notif, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-start gap-3 px-3 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className={cn(
                      "mt-0.5 p-1.5 rounded-full shrink-0",
                      notif.type === "info" && "bg-blue-100 text-blue-600",
                      notif.type === "success" && "bg-emerald-100 text-emerald-600",
                      notif.type === "error" && "bg-red-100 text-red-600"
                    )}>
                      <notif.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground">{notif.title}</p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{notif.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-2 bg-muted/30 text-center border-t border-border">
                <button className="text-[11px] text-primary font-bold hover:underline">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Language Toggle */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => { setLangOpen(!langOpen); setAccessOpen(false); setUserOpen(false); }}
            className={cn(
              "flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-xs font-medium transition-all",
              langOpen
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:bg-muted hover:border-border/80"
            )}
            title="Select Language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{lang === "en" ? "EN" : "हि"}</span>
            <ChevronDown className={cn("h-3 w-3 transition-transform hidden sm:block", langOpen && "rotate-180")} />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50 animate-scale-in">
              <div className="p-1.5">
                <div className="px-2.5 py-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  Language / भाषा
                </div>
                {[
                  { code: "en", label: "English", sublabel: "अंग्रेज़ी" },
                  { code: "hi", label: "हिंदी", sublabel: "Hindi" },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code as "en" | "hi"); setLangOpen(false); }}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors",
                      lang === l.code
                        ? "bg-primary/8 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-muted-foreground">{l.sublabel}</span>
                    {lang === l.code && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accessibility */}
        <div ref={accessRef} className="relative">
          <button
            onClick={() => { setAccessOpen(!accessOpen); setLangOpen(false); setUserOpen(false); }}
            className={cn(
              "flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-xs font-medium transition-all",
              accessOpen
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:bg-muted hover:border-border/80"
            )}
            title="Accessibility Options"
          >
            <Accessibility className="h-3.5 w-3.5" />
            <span className="hidden md:inline">A+</span>
          </button>
          {accessOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-card rounded-xl border border-border shadow-lg z-50 overflow-hidden animate-scale-in">
              <div className="p-2.5">
                <div className="px-1 py-1 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
                  Accessibility Options
                </div>
                {/* Font size controls */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">Text Size</span>
                  <span className="text-[11px] text-primary font-bold">{fontSize}%</span>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    className="flex-1 flex items-center justify-center gap-1 h-8 rounded-lg border border-border text-xs hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <ZoomOut className="h-3.5 w-3.5" /> A-
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="flex-1 flex items-center justify-center gap-1 h-8 rounded-lg border border-border text-xs hover:bg-muted transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize >= 130}
                    className="flex-1 flex items-center justify-center gap-1 h-8 rounded-lg border border-border text-xs hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <ZoomIn className="h-3.5 w-3.5" /> A+
                  </button>
                </div>
                {/* High contrast */}
                <button
                  onClick={toggleContrast}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all",
                    highContrast
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:bg-muted"
                  )}
                >
                  <Contrast className="h-3.5 w-3.5" />
                  <span>High Contrast</span>
                  <span className={cn(
                    "ml-auto text-[9px] px-1.5 py-0.5 rounded font-bold",
                    highContrast ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {highContrast ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* User */}
        <div ref={userRef} className="relative z-50">
          <button
            onClick={() => { setUserOpen(!userOpen); setLangOpen(false); setAccessOpen(false); }}
            className="flex items-center gap-2 hover:bg-muted/80 p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-border"
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="text-right hidden lg:block">
              <p className="text-xs font-bold text-foreground leading-tight">HEI-U-0123</p>
              <p className="text-[10px] text-muted-foreground font-medium">Administrator</p>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground hidden lg:block" />
          </button>
          
          {userOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50 animate-scale-in">
              <div className="p-1 border-b border-border">
                <div className="px-3 py-2.5">
                  <p className="text-xs font-semibold text-foreground">National University of India</p>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">HEI-U-0123</p>
                </div>
              </div>
              <div className="p-1.5 space-y-0.5">
                <button
                  className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <LogOut className="h-3.5 w-3.5" />
                  Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
