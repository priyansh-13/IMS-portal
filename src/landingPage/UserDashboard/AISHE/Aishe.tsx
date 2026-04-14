import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Building2, Phone, Users, FileText, BarChart3, DollarSign, Globe, Mail, KeyRound, LogOut, Menu,
} from "lucide-react";
import emblem from "@/assets/emblem.png";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Institution Details", icon: Building2, active: true },
  { label: "Contact Details of the Institution", icon: Phone },
  { label: "User Management", icon: Users },
  { label: "Web DCF", icon: FileText },
  { label: "Institution Management", icon: Building2 },
  { label: "Web DCF Progress", icon: BarChart3 },
  { label: "Remuneration Management", icon: DollarSign },
  { label: "Foreign Institution Management", icon: Globe },
  { label: "Email Management", icon: Mail },
  { label: "Change Password", icon: KeyRound },
  { label: "Logout", icon: LogOut, href: "/" },
];

const Aishe = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top govt bar */}
      <div className="bg-navy-dark text-primary-foreground text-xs py-1.5 px-4">
        <div className="container mx-auto flex justify-between">
          <span>भारत सरकार | शिक्षा मंत्रालय | GOVERNMENT OF INDIA | MINISTRY OF EDUCATION</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-card py-3 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={emblem} alt="Emblem" width={48} height={48} className="w-12 h-12" />
            <div>
              <p className="text-sm text-muted-foreground">उच्चतर शिक्षा विभाग</p>
              <p className="text-lg font-semibold text-foreground">Department of Higher Education</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary tracking-wide">AISHE</p>
            <p className="text-xs text-muted-foreground">All India Survey on Higher Education</p>
          </div>
        </div>
      </header>

      {/* Info bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-xs">
        <div className="container mx-auto flex gap-6 flex-wrap">
          <span>Last DCF Submitted Survey Year: 2024-25</span>
          <span>User Role: University Nodal Officer</span>
          <span>U-0167</span>
          <span>Maharshi Dayanand University, Rohtak</span>
          <span>State: Haryana</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-primary text-primary-foreground w-64 shrink-0 ${sidebarOpen ? "" : "hidden"} md:block`}>
          <nav className="py-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href || "#"}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  item.active ? "bg-sidebar-accent font-semibold" : "hover:bg-navy-light"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mb-4 text-foreground"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Institution Details</h2>
            <span className="text-sm text-accent cursor-pointer hover:underline">
              Please click here the edit icon to update details ✎
            </span>
          </div>

          {/* Form */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="AISHE Code" value="U-0167" />
              <Field label="Institute Name" value="Maharshi Dayanand University, Rohtak" />
              <Field label="Institute Type" value="State Public University" />
            </div>
            <div>
              <Field label="Ownership Status of Institution" value="State Government" select />
            </div>

            {/* Address section */}
            <div className="bg-destructive/10 text-destructive font-semibold text-sm px-4 py-2 rounded">
              Address:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Location of the Institution:</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-sm text-foreground">
                    <input type="radio" name="location" className="accent-accent" /> Rural
                  </label>
                  <label className="flex items-center gap-1.5 text-sm text-foreground">
                    <input type="radio" name="location" defaultChecked className="accent-accent" /> Urban
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Address Line 1" value="Maharshi Dayanand University, Rohtak" />
              <Field label="Address Line 2" value="Delhi Road, Rohtak" />
              <Field label="Locality/City/Town/Village" value="Rohtak" />
              <Field label="Country" value="INDIA" select />
              <Field label="State" value="Haryana" />
              <Field label="District" value="Rohtak" />
              <Field label="Subdistrict" value="Rohtak" select />
              <Field label="Urban Local Body" value="Rohtak" select />
              <Field label="Pincode" value="124001" />
              <Field label="Website" value="www.mdurohtak.ac.in" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Total Area (In acre)" value="624" highlight />
              <Field label="Total Constructed Area (Ground level only) (In sq m)" value="500000" highlight />
              <Field label="Latitude (Range: 6.00000 - 38.00000 in degree)" value="28.23562" highlight />
              <Field label="Longitude (Range: 68.00000 - 98.00000 in degree)" value="76.25364" highlight />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-4 text-center text-xs text-muted-foreground">
        This site is designed, developed and hosted by <span className="text-accent cursor-pointer">National Informatics Centre (NIC)</span>,
        content provided by Statistics Division, D/o Higher Education, Ministry of Education,{" "}
        <span className="text-accent cursor-pointer">Government of India</span>
      </footer>
    </div>
  );
};

function Field({ label, value, select, highlight }: { label: string; value: string; select?: boolean; highlight?: boolean }) {
  return (
    <div>
      <label className={`text-sm font-medium mb-1 block ${highlight ? "text-destructive" : "text-muted-foreground"}`}>
        {label}:
      </label>
      {select ? (
        <select
          defaultValue={value}
          className="w-full px-3 py-2.5 border-b border-border bg-card text-sm text-foreground focus:outline-none focus:border-accent"
        >
          <option>{value}</option>
        </select>
      ) : (
        <input
          type="text"
          defaultValue={value}
          className="w-full px-3 py-2.5 border-b border-border bg-card text-sm text-foreground focus:outline-none focus:border-accent"
        />
      )}
    </div>
  );
}

export default Aishe;
