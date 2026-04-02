import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import {
  Building2, Phone, Users, FileCheck, UsersRound,
  IndianRupee, MapPin, HeartHandshake, ShieldCheck,
} from "lucide-react";

const sections = [
  { title: "Institution Details", icon: Building2, completed: true, lastUpdated: "04 Feb 2026", link: "/institutional-registry/institution-details" },
  { title: "Contact Details", icon: Phone, completed: false, lastUpdated: "02 Feb 2026" },
  { title: "Parent Organization/Ownership", icon: Users, completed: false, lastUpdated: "03 Feb 2026" },
  { title: "Affiliation/Approval", icon: FileCheck, completed: false, lastUpdated: "04 Feb 2026" },
  { title: "Committees", icon: UsersRound, completed: false, lastUpdated: "04 Feb 2026" },
  { title: "Financial Details", icon: IndianRupee, completed: true, lastUpdated: "04 Feb 2026" },
  { title: "Centres / Campuses", icon: MapPin, completed: false, lastUpdated: "06 Feb 2026" },
  { title: "Student Support & Institutional Activities", icon: HeartHandshake, completed: false, lastUpdated: "06 Feb 2026" },
];

export default function InstitutionalRegistryPage() {
  return (
    <TopLayout>
      <ModuleBanner title="Institutional Registry and Recognition Module" />
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((section) => (
            <StatusCard key={section.title} {...section} />
          ))}
        </div>
      </div>
    </TopLayout>
  );
}
