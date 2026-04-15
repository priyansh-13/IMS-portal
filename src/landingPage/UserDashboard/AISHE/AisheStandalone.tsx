import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, Phone, Users, FileText, BarChart3,
  DollarSign, KeyRound, LogOut, Menu, ChevronRight, User, Mail, Smartphone,
} from "lucide-react";
import emblem from "../../../../public/images/sm.png";
import { useAuth } from "@/context/AuthContext";

const BRAND = "#00446d";

const sidebarItems = [
  { label: "Institution Details", icon: Building2 },
  { label: "Contact Details of the Institution", icon: Phone },
  { label: "User Management", icon: Users, hasChildren: true },
  { label: "Web DCF", icon: FileText, hasChildren: true },
  { label: "Remuneration Management", icon: DollarSign },
  { label: "Change Password", icon: KeyRound },
  { label: "Logout", icon: LogOut, href: "/" },
];

const AisheStandalone = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("institution");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" style={{ fontSize: "13px" }}>
      
      {/* Top govt bar */}
      <div className="bg-gray-100 border-b border-gray-300 py-1 px-6 ml-40">
        <div className="flex items-center">
          <div className="flex flex-col items-center px-4 border-r border-gray-300">
            <span className="text-[10px] font-medium text-gray-800 leading-tight">भारत सरकार</span>
            <span className="text-[12px] font-semibold text-black uppercase">Government of India</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] font-medium text leading-tight">शिक्षा मंत्रालय</span>
            <span className="text-[12px] font-semibold text-black uppercase">Ministry of Education</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={emblem} alt="National Emblem" className="h-[75px] w-auto" />
            <div className="pt-2">
              <p className="text-[22px] text-gray-800 font-medium leading-none mb-1">उच्चतर शिक्षा विभाग</p>
              <p className="text-[20px] font-normal text-black tracking-tight leading-none">Department of Higher Education</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[48px] font-bold tracking-tight leading-none border-w-4 border-b border-blue" style={{ color: BRAND }}>AISHE</p>
            <p className="text-[12px] text-gray-500 font-semibold mt-1">All India Survey on Higher Education</p>
          </div>
        </div>
      </header>

      {/* Info bar */}
      <div className="text-white text-[13px] py-0 px-0 flex items-stretch shadow-lg z-10 min-h-[36px]" style={{ backgroundColor: BRAND }}>
        <span className="px-4 py-2 border-r border-white/20 shrink-0 flex items-center">Last DCF Submitted
          <br />Survey Year : 2024-25</span>
        <span className="px-4 py-2 border-r border-white/20 shrink-0 flex items-center">User Role :
          <br />{user?.userRoleLabel || "Polytechnic"}</span>
        <span className="px-4 py-2 border-r border-white/20 shrink-0 flex items-center">{user?.aisheCode || "S-18256"}</span>
        <span className="px-4 py-2 border-r border-white/20 flex items-center font-medium tracking-wide flex-1 min-w-0 leading-tight">{user?.instituteName || "Prabhu Kailash Polytechnic college"}</span>
        <span className="px-4 py-2 border-r border-white/20 shrink-0 flex items-center">State :
          <br />{user?.state || "Bihar"}</span>
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 px-5 py-2 h-full hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="font-semibold tracking-wide text-[12px]">{user?.username || "PKP92"}</span>
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-0 w-72 rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50" style={{ backgroundColor: BRAND }}>
              <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
                <User size={16} className="text-white shrink-0" />
                <span className="text-[13px] text-white">Santoshkumar Bahubali Nandagavi</span>
              </div>
              <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
                <Mail size={16} className="text-white shrink-0" />
                <span className="text-[13px] text-white">nabc@gmail.com</span>
              </div>
              <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
                <Smartphone size={16} className="text-white shrink-0" />
                <span className="text-[13px] text-white">0123456789</span>
              </div>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left"
              >
                <LogOut size={16} className="text-white shrink-0" />
                <span className="text-[13px] text-white font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 mt-2 min-h-0">
        {/* Sidebar */}
        <aside
          className={`text-white shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-72" : "w-0 overflow-hidden"}`}
          style={{ backgroundColor: BRAND }}
        >
          <nav className="flex-1 overflow-y-auto py-1">
            {sidebarItems.map((item) => {
              const isActive =
                (item.label === "Institution Details" && currentView === "institution");

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.href) {
                      logout();
                      window.location.href = item.href;
                      return;
                    }
                    const viewMap: { [key: string]: string } = {
                      "Institution Details": "institution",
                      "Contact Details of the Institution": "contact",
                      "Remuneration Management": "remuneration",
                    };
                    if (viewMap[item.label]) setCurrentView(viewMap[item.label]);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-[12.5px] transition-colors border-b border-white/5 ${
                    isActive
                      ? "bg-white/15 text-white font-semibold"
                      : "hover:bg-white/10 text-white/85"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={14} className="shrink-0" />
                    {item.label}
                  </span>
                  {item.hasChildren && <ChevronRight size={12} className="opacity-60" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-0">
          <div className="p-5">
            {/* Page title bar with toggle icon */}
            <div className="bg-white border border-gray-200 rounded shadow-sm mb-4 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 hover:text-gray-800 transition-colors p-1"
                  >
                    <Menu size={18} />
                  </button>
                  <h2 className="text-[14px] font-bold text-gray-600 tracking-wide">Institution Details</h2>
                </div>
                <span className="text-[12px] font-semibold cursor-pointer hover:underline text-blue-800">
                  Please click here the edit icon to update details ✎
                </span>
              </div>

              {/* Form content */}
              <div className="p-5 space-y-5">
                {/* Basic Info */}
                <div className="grid grid-cols-3 gap-6">
                  <Field label="AISHE Code" value="S-18256" />
                  <Field label="Institute Name" value="Prabhu Kailash Polytechnic college" />
                  <Field label="Institute Type" value="Technical/Polytechnic" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Management Type" value="Private Un-Aided" select />
                  <Field label="Ownership Status of Institution" value="Trust" select />
                </div>

                {/* Affiliation question */}
                <div>
                  <p className="text-[12px] text-gray-600 mb-1.5">
                    Is the institution affiliated with any other University/Statutory body?*
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-1.5 text-[12px] text-gray-700 cursor-pointer">
                      <input type="radio" name="affiliated" defaultChecked className="accent-blue-700" /> Yes
                    </label>
                    <label className="flex items-center gap-1.5 text-[12px] text-gray-700 cursor-pointer">
                      <input type="radio" name="affiliated" className="accent-blue-700" /> No
                    </label>
                  </div>
                </div>

                {/* Affiliating University */}
                <div className="border border-gray-200 rounded p-3">
                  <p className="text-[12px] font-medium text-gray-600 mb-2">Affiliating/Regulatory/Statutory Body</p>
                  <p className="text-[13px] text-gray-700 mb-3 ml-8">▼ Affiliating University</p>
                </div>

                {/* Statutory Body */}
                <div>
                  <div className="text-white text-[12.5px] font-semibold px-4 py-2 rounded-sm" style={{ backgroundColor: BRAND }}>
                    Statutory Body
                  </div>
                  <div className="p-3">
                    <p className="text-[12.5px] text-gray-700">State Board of Technical Education, Bihar</p>
                    <p className="text-[12.5px] text-gray-700 mt-2">All India Council for Technical Education</p>
                  </div>
                </div>

                {/* Address section header */}
                <div className="text-white text-[12.5px] font-semibold px-4 py-2 rounded-sm" style={{ backgroundColor: BRAND }}>
                  Address:
                </div>

                {/* Location radio */}
                <div>
                  <p className="text-[12px] text-gray-600 mb-1.5">Location of the Institution:-</p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-1.5 text-[12px] text-gray-700 cursor-pointer">
                      <input type="radio" name="location" defaultChecked className="accent-blue-700" /> Rural
                    </label>
                    <label className="flex items-center gap-1.5 text-[12px] text-gray-700 cursor-pointer">
                      <input type="radio" name="location" className="accent-blue-700" /> Urban
                    </label>
                  </div>
                </div>

                {/* Address fields */}
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Address Line 1:" value="aurangabad" />
                  <Field label="Address Line 2:" value="sanathua more" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Locality/City/Town/Village:" value="aurangabad" />
                  <Field label="Country:" value="INDIA" select />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="State:" value="Bihar" />
                  <Field label="District:" value="Aurangabad" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Subdistrict (Subdivision/Tehsil/Taluk/Taluka/Mandal/Man..." value="Aurangabad" select />
                  <Field label="Block:" value="AURANGABAD" select />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Pincode:" value="824101" />
                  <Field label="Website:" value="www.prabhukailashpolytechnic.in" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="Total Area (In acre):" value="5.006" highlight />
                  <Field label="Total Constructed Area (Ground level only) (In sq m):" value="4573" highlight />
                </div>

                <div className="grid grid-cols-2 gap-6 pb-2">
                  <Field label="Latitude (Range: 6.00000 - 38.00000 in degree):" value="24.77593" highlight />
                  <Field label="Longitude (Range: 68.00000 - 98.00000 in degree):" value="84.31916" highlight />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-white border-t border-white/10 py-4 px-4 text-center text-[12px] leading-6" style={{ backgroundColor: BRAND }}>
        <p>
          This site is designed, developed and hosted by{" "}
          <span className="cursor-pointer hover:underline text-yellow-400 font-medium whitespace-nowrap">National Informatics Centre (NIC)</span>
          {" "}, content provided by Statistics Divison, D/o
        </p>
        <p>
          Higher Education, Ministry of Education,{" "}
          <span className="cursor-pointer hover:underline text-yellow-400 font-medium whitespace-nowrap">Government of India</span>
        </p>
      </footer>
    </div>
  );
};

function Field({
  label,
  value,
  select,
  highlight,
}: {
  label: string;
  value: string;
  select?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <label
        className={`text-[11.5px] font-medium mb-0.5 block ${
          highlight ? "text-red-600" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      {select ? (
        <select
          defaultValue={value}
          className="w-full border-b border-gray-300 bg-transparent text-[12.5px] text-gray-800 py-1.5 focus:outline-none focus:border-blue-700"
        >
          <option>{value}</option>
        </select>
      ) : (
        <input
          type="text"
          defaultValue={value}
          className="w-full border-b border-gray-300 bg-transparent text-[12.5px] text-gray-800 py-1.5 focus:outline-none focus:border-blue-700"
        />
      )}
    </div>
  );
}

export default AisheStandalone;
