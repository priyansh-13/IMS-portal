import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionProgress } from "@/hooks/useFormProgress";
import { cn } from "@/lib/utils";

type SectionStatus = "completed" | "pending" | "not-started";

const STATUS_META: Record<SectionStatus, { label: string; helper: string; badgeClass: string; Icon: LucideIcon }> = {
  completed: {
    label: "Completed",
    helper: "All fields filled",
    badgeClass: "border border-success/30 bg-success/10 text-success",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    helper: "Fields still pending",
    badgeClass: "border border-accent/30 bg-accent/10 text-accent",
    Icon: Clock,
  },
  "not-started": {
    label: "Not started",
    helper: "No information entered",
    badgeClass: "border border-muted/40 bg-muted/10 text-muted-foreground",
    Icon: Circle,
  },
};

interface SectionStatusSidebarProps {
  sections: SectionProgress[];
  sectionOrder?: string[];
  activeSection?: string;
  onSectionClick?: (sectionName: string) => void;
}

export function SectionStatusSidebar({ sections, sectionOrder = [], activeSection, onSectionClick }: SectionStatusSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const orderedSections = useMemo(() => {
    if (!sectionOrder.length) return sections;
    const lookup = sections.reduce<Record<string, SectionProgress>>((acc, section) => {
      acc[section.name] = section;
      return acc;
    }, {} as Record<string, SectionProgress>);
    return sectionOrder
      .map((name) => lookup[name])
      .filter((section): section is SectionProgress => Boolean(section));
  }, [sections, sectionOrder]);

  if (!sections.length) return null;

  const getStatus = (section: SectionProgress): SectionStatus => {
    if (section.filledFields === 0) {
      return "not-started";
    }
    if (section.filledFields >= section.totalFields) {
      return "completed";
    }
    return "pending";
  };

  const widthClass = isCollapsed ? "lg:w-14" : "lg:w-[280px]";

  // Collapsed view
  if (isCollapsed) {
    return (
      <aside
        className={cn(
          "flex-none w-full lg:w-14 flex flex-col items-center justify-start border border-border rounded-xl bg-card shadow-sm transition-all duration-300 lg:sticky lg:top-20 py-2 gap-3"
        )}
        aria-label="Section completion status"
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Expand section overview"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <div className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground">
          <Circle className="h-3.5 w-3.5" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "flex-none w-full flex flex-col border border-border rounded-xl bg-card shadow-sm transition-all duration-300 lg:sticky lg:top-20",
        widthClass
      )}
      aria-label="Section completion status"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="space-y-0.5">
          <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Sections</p>
          <p className="text-xs font-semibold text-foreground">Completion status</p>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Collapse section overview"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <ul className="flex flex-col gap-2 px-2 py-3 max-h-[420px] overflow-y-auto">
        {orderedSections.map((section) => {
          const status = getStatus(section);
          const meta = STATUS_META[status];
          const isActive = activeSection === section.name;

          return (
            <li key={section.name}>
              <button
                type="button"
                onClick={() => onSectionClick?.(section.name)}
                className={cn(
                  "w-full flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 transition-all duration-200 text-left group/item",
                  isActive
                    ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
                    : "border-border bg-muted/50 hover:border-accent/40 hover:bg-accent/5 hover:shadow-sm"
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    "text-xs font-semibold truncate transition-colors",
                    isActive ? "text-accent" : "text-foreground group-hover/item:text-accent"
                  )}>
                    {section.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{meta.helper}</p>
                </div>
                <span className={cn(
                  "flex-none flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm",
                  meta.badgeClass
                )}>
                  <meta.Icon className="h-2.5 w-2.5" />
                  {meta.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
