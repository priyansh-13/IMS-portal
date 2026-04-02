import { SectionProgress } from "@/hooks/useFormProgress";

export interface RegistryStep {
  name: string;
  path: string;
}

export const REGISTRY_STEPS: RegistryStep[] = [
  { name: "Institution Details", path: "/institutional-registry/institution-details" },
  { name: "Contact Details", path: "/institutional-registry/contact-details" },
  { name: "Parent Organization", path: "/institutional-registry/parent-org" },
  { name: "Affiliation/Approval", path: "/institutional-registry/affiliation" },
  { name: "Committees", path: "/institutional-registry/committees" },
  { name: "Financial Details", path: "/institutional-registry/financial" },
  { name: "Centres / Campuses", path: "/institutional-registry/centres" },
  { name: "Student Support", path: "/institutional-registry/student-support" },
  { name: "Regulatory Info", path: "/institutional-registry/regulatory" },
];

export const registryStepInfos = REGISTRY_STEPS.map(({ name }) => ({
  name,
  completionPercentage: 0,
}));

export const registrySectionProgress: SectionProgress[] = REGISTRY_STEPS.map(({ name }) => ({
  name,
  totalFields: 1,
  filledFields: 0,
  completionPercentage: 0,
}));

export const registrySectionOrder = REGISTRY_STEPS.map((s) => s.name);

export const getRegistryStepIndex = (name: string) =>
  REGISTRY_STEPS.findIndex((s) => s.name === name);
