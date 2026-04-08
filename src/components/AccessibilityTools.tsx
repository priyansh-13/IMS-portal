import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Contrast, 
  Link, 
  RefreshCcw, 
  CircleOff, 
  MousePointer2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AccessibilityTools() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1); 
  const [highContrast, setHighContrast] = useState(false);
  const [invert, setInvert] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize * 100}%`;
    
    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');

    if (invert) root.classList.add('invert-colors');
    else root.classList.remove('invert-colors');

    if (highlightLinks) root.classList.add('highlight-links');
    else root.classList.remove('highlight-links');
  }, [fontSize, highContrast, invert, highlightLinks]);

  const resetAll = () => {
    setFontSize(1);
    setHighContrast(false);
    setInvert(false);
    setHighlightLinks(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="flex items-center justify-center p-1.5 rounded-lg hover:bg-muted transition-all group"
          aria-label="Accessibility Tools"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#112d4e] text-white shadow-sm group-hover:bg-[#1a4b8a] transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M9 10h6" />
              <path d="M10 16l2-2 2 2" />
            </svg>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-5 shadow-2xl border-border bg-white" align="end">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Accessibility Tools</h3>
          <button onClick={resetAll} className="px-3 py-1.5 text-[10px] font-bold bg-muted hover:bg-muted/80 rounded-md transition-colors text-muted-foreground uppercase flex items-center gap-1.5">
            <RefreshCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Color Contrast */}
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">Color Contrast</span>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-semibold transition-all gap-2",
                  highContrast ? "bg-[#112d4e] text-white border-[#112d4e]" : "bg-white hover:bg-muted border-border shadow-sm"
                )}
              >
                <Contrast className="h-5 w-5" />
                <span>High Contrast</span>
              </button>
              <button 
                onClick={() => setInvert(!invert)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-semibold transition-all gap-2",
                  invert ? "bg-[#112d4e] text-white border-[#112d4e]" : "bg-white hover:bg-muted border-border shadow-sm"
                )}
              >
                <RefreshCcw className="h-5 w-5" />
                <span>Invert</span>
              </button>
              <button 
                onClick={() => setHighlightLinks(!highlightLinks)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-semibold transition-all gap-2",
                  highlightLinks ? "bg-[#112d4e] text-white border-[#112d4e]" : "bg-white hover:bg-muted border-border shadow-sm"
                )}
              >
                <Link className="h-5 w-5" />
                <span>Highlight Links</span>
              </button>
            </div>
          </div>

          {/* Text Size */}
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">Text Size</span>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setFontSize(fontSize + 0.1)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border bg-white hover:bg-muted border-border shadow-sm text-[11px] font-semibold transition-all gap-2"
              >
                <div className="flex items-center font-bold text-lg">A<span className="text-xs ml-0.5">+</span></div>
                <span>Increase Size</span>
              </button>
              <button 
                onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
                className="flex flex-col items-center justify-center p-3 rounded-xl border bg-white hover:bg-muted border-border shadow-sm text-[11px] font-semibold transition-all gap-2"
              >
                <div className="flex items-center font-bold text-lg">A<span className="text-xs ml-0.5">-</span></div>
                <span>Decrease Size</span>
              </button>
              <button 
                onClick={() => setFontSize(1)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-semibold transition-all gap-2",
                  fontSize === 1 ? "bg-[#112d4e] text-white border-[#112d4e]" : "bg-white hover:bg-muted border-border shadow-sm"
                )}
              >
                <span className="font-bold text-xl uppercase">A</span>
                <span>Normal Font</span>
              </button>
            </div>
          </div>

          {/* Others */}
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">Others</span>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-3 p-3 rounded-xl border bg-white hover:bg-muted border-border shadow-sm text-[11px] font-semibold transition-all">
                <CircleOff className="h-5 w-5 text-muted-foreground/60" />
                <span>Hide Images</span>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-xl border bg-white hover:bg-muted border-border shadow-sm text-[11px] font-semibold transition-all">
                <MousePointer2 className="h-5 w-5 text-muted-foreground/60" />
                <span>Big Cursor</span>
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
