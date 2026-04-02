import { useState, useCallback, useMemo } from "react";

export interface FieldState {
  id: string;
  name: string;
  section: string;
  value: string;
  required?: boolean;
}

export interface SectionProgress {
  name: string;
  totalFields: number;
  filledFields: number;
  completionPercentage: number;
}

export function useFormProgress(initialFields: FieldState[]) {
  const [fields, setFields] = useState<FieldState[]>(initialFields);

  const updateField = useCallback((id: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  }, []);

  const sections = useMemo((): SectionProgress[] => {
    const sectionMap: Record<string, FieldState[]> = {};
    fields.forEach((f) => {
      if (!sectionMap[f.section]) sectionMap[f.section] = [];
      sectionMap[f.section].push(f);
    });

    return Object.entries(sectionMap).map(([name, sectionFields]) => {
      const filled = sectionFields.filter((f) => f.value.trim() !== "").length;
      return {
        name,
        totalFields: sectionFields.length,
        filledFields: filled,
        completionPercentage: Math.round((filled / sectionFields.length) * 100),
      };
    });
  }, [fields]);

  const overallPercentage = useMemo(() => {
    const total = fields.length;
    const filled = fields.filter((f) => f.value.trim() !== "").length;
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }, [fields]);

  const pendingFields = useMemo(
    () => fields.filter((f) => f.value.trim() === "").map((f) => ({
      section: f.section,
      fieldName: f.name,
      fieldId: f.id,
    })),
    [fields]
  );

  const scrollToField = useCallback((fieldId: string) => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
      el.classList.add("ring-2", "ring-warning", "ring-offset-2");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-warning", "ring-offset-2");
      }, 2000);
    }
  }, []);

  return {
    fields,
    updateField,
    sections,
    overallPercentage,
    pendingFields,
    scrollToField,
  };
}
