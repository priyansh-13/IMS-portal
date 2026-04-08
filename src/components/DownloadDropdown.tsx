import { useState } from "react";
import { Download, FileText, DownloadCloud } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const downloads = [
  { name: "Annual Report 2024.pdf", size: "4.2 MB", date: "2 days ago" },
  { name: "Student Statistics.xlsx", size: "1.8 MB", date: "1 week ago" },
  { name: "Compliance Certificate.pdf", size: "0.5 MB", date: "3 weeks ago" },
];

export function DownloadDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 rounded-full hover:bg-muted text-muted-foreground transition-all duration-200 group"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Download className="h-5 w-5 group-hover:text-primary transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-0 shadow-xl border-border/50 bg-background/95 backdrop-blur-sm" 
        align="end"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground">Downloads</h3>
          <DownloadCloud className="h-4 w-4 text-primary/60" />
        </div>
        <div className="p-3">
          <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
            Quickly access and download your recent reports and documents.
          </p>
          <div className="space-y-2">
            {downloads.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group border border-transparent hover:border-border/50">
                <div className="p-1.5 rounded-md bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">{doc.size} • {doc.date}</p>
                </div>
                <Download className="h-3 w-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-2 border-t border-border/50 bg-muted/20">
          <Button variant="ghost" className="w-full text-[11px] h-8 font-semibold text-primary hover:text-primary/80 hover:bg-transparent">
            View all downloads
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
