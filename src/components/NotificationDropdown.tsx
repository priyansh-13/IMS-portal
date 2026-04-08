import { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  { icon: CheckCircle, iconColor: "text-success", bg: "bg-success/10", text: "New report generated for Student Mobility.", time: "2h ago" },
  { icon: AlertTriangle, iconColor: "text-warning", bg: "bg-warning/10", text: "Missing data in Infrastructure registry.", time: "5h ago" },
  { icon: Info, iconColor: "text-primary", bg: "bg-primary/10", text: "System maintenance scheduled for upcoming weekend.", time: "1d ago" },
  { icon: Bell, iconColor: "text-accent", bg: "bg-accent/10", text: "Module 'Research & Outcome' requires review.", time: "2d ago" },
  { icon: CheckCircle, iconColor: "text-success", bg: "bg-success/10", text: "Faculty HR data synchronization successful.", time: "3d ago" },
  { icon: Info, iconColor: "text-primary", bg: "bg-primary/10", text: "NAAC accreditation forms are now available.", time: "4d ago" },
];

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 rounded-full hover:bg-muted text-muted-foreground transition-all duration-200 group"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 shadow-xl border-border/50 bg-background/95 backdrop-blur-sm" 
        align="end"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
            {notifications.length} New
          </span>
        </div>
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
          <ul className="divide-y divide-border/40">
            {notifications.map((notif, idx) => {
              const NotifIcon = notif.icon;
              return (
                <li key={idx} className="p-3 hover:bg-muted/40 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-1.5 rounded-full shrink-0 group-hover:scale-110 transition-transform", notif.bg, notif.iconColor)}>
                      <NotifIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-foreground leading-snug">{notif.text}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-2 border-t border-border/50 bg-muted/20 text-center">
          <button className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
