import { TopLayout } from "@/components/TopLayout";
import { ModuleBanner } from "@/components/ModuleBanner";
import { StatusCard } from "@/components/StatusCard";
import {
  Building2, Phone, Users, FileCheck, UsersRound,
  IndianRupee, MapPin, HeartHandshake, ShieldCheck,
} from "lucide-react";

const sections = [
  { title: "Institution Details", icon: Building2, completed: true, lastUpdated: "11:30 AM, 04 Feb 2026", link: "/institutional-registry/institution-details" },
  { title: "Contact Details", icon: Phone, completed: false, lastUpdated: "09:12 AM, 02 Feb 2026", link: "/institutional-registry/contact-details" },
  { title: "Parent Organization/Ownership", icon: Users, completed: false, lastUpdated: "04:20 PM, 03 Feb 2026", link: "/institutional-registry/parent-org" },
  { title: "Affiliation/Approval", icon: FileCheck, completed: false, lastUpdated: "10:05 AM, 04 Feb 2026", link: "/institutional-registry/affiliation" },
  { title: "Committees", icon: UsersRound, completed: false, lastUpdated: "02:45 PM, 04 Feb 2026", link: "/institutional-registry/committees" },
  { title: "Financial Details", icon: IndianRupee, completed: true, lastUpdated: "01:15 PM, 04 Feb 2026", link: "/institutional-registry/financial" },
  { title: "Centres / Campuses", icon: MapPin, completed: false, lastUpdated: "12:40 PM, 06 Feb 2026", link: "/institutional-registry/centres" },
  { title: "Student Support & Institutional Activities", icon: HeartHandshake, completed: false, lastUpdated: "03:50 PM, 06 Feb 2026", link: "/institutional-registry/student-support" },
  { title: "Regulatory Information", icon: ShieldCheck, completed: false, lastUpdated: "11:30 AM, 04 Feb 2026", link: "/institutional-registry/regulatory" },
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
