import { AlertTriangle, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PendingField {
  section: string;
  fieldName: string;
  fieldId: string;
}

interface PendingFieldsPanelProps {
  pendingFields: PendingField[];
  onFieldClick: (fieldId: string) => void;
}

export function PendingFieldsPanel({ pendingFields, onFieldClick }: PendingFieldsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (pendingFields.length === 0) return null;

  const grouped = pendingFields.reduce<Record<string, PendingField[]>>((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {});

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-4 bottom-4 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300",
          "bg-warning text-warning-foreground hover:shadow-xl hover:scale-105"
        )}
      >
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-semibold">{pendingFields.length} Pending</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed right-4 bottom-16 z-30 w-80 bg-card rounded-xl shadow-2xl border border-border overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between px-4 py-3 bg-warning/10 border-b border-border">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-semibold text-foreground">Pending Fields</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {Object.entries(grouped).map(([section, fields]) => (
              <div key={section} className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">{section}</p>
                {fields.map((field) => (
                  <button
                    key={field.fieldId}
                    onClick={() => {
                      onFieldClick(field.fieldId);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-foreground hover:bg-accent/5 transition-colors group"
                  >
                    <span>{field.fieldName}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
