import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Building2, BookOpen, LogIn, Search, Users, ChevronDown, Globe, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top accessibility bar */}
      <div className="bg-navy-dark text-primary-foreground text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1 cursor-pointer hover:underline">⊕ Skip to Main Content</span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">⊕ Skip to Navigation</span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">♿ Screen Reader Access</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:underline">☁ Downloads</span>
            <span className="cursor-pointer hover:underline">❓ FAQs</span>
            <span className="cursor-pointer hover:underline">✉ Contact Us</span>
          </div>
        </div>
      </div>

      {/* Header with logo */}
      <header className="bg-card py-4 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
            <img src="/images/ONOD-logo.png" alt="ONOD Logo" className="h-12 w-auto object-contain" />
          <div className="text-right hidden md:block">
            <p className="text-lg font-semibold text-orange">विकसित भारत</p>
            <p className="text-xs text-muted-foreground">अभियान 🇮🇳</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center flex-wrap">
          {[
            { label: "Home", icon: Home, href: "/" },
            { label: "About", icon: Info },
            { label: "Member Institutions", icon: Building2 },
            { label: "Publishers", icon: BookOpen },
            { label: "How to Join?", icon: Globe },
            { label: "How to Access?", icon: Search },
            { label: "Register", icon: Users },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href || "#"}
              className="px-4 py-3 text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-1.5"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}

          {/* Login dropdown */}
          <div className="relative">
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="px-4 py-3 text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-1.5"
            >
              <LogIn size={16} />
              Login
              <ChevronDown size={14} />
            </button>
            {loginOpen && (
              <div className="absolute top-full left-0 bg-card border border-border rounded-md shadow-lg z-50 min-w-[180px]">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setLoginOpen(false)}
                >
                  User Login
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                  onClick={() => setLoginOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>

          <Link to="#" className="px-4 py-3 text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-1.5">
            <Search size={16} />
            Search & Browse
          </Link>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative">
        <div
          className="h-[400px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-5xl font-bold text-primary-foreground mb-2">ONOD</h2>
              <div className="w-16 h-1 bg-orange mb-3"></div>
              <p className="text-primary-foreground text-lg mb-1">One Nation One Data</p>
              <p className="text-teal text-base">An Initiative of Govt. of India</p>
              <Link
                to="#"
                className="inline-block mt-6 bg-navy-dark text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-navy-light transition-colors"
              >
                ONOD Outreach Programmes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Ticker */}
      <div className="bg-muted py-3 px-4">
        <div className="container mx-auto flex items-center gap-4">
          <span className="font-bold text-primary text-lg shrink-0">LATEST</span>
          <div className="overflow-hidden">
            <p className="text-sm text-foreground animate-pulse">
              Webinar: How to Access e-resources under One Nation One Data (ONOD) on <strong>April 10, 2026</strong> at <strong>3:00 PM (IST)</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">🔍 Search</p>
              <h3 className="text-2xl font-bold text-foreground mb-4">Journal Articles</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search Journal Articles based on Keyword, Subject"
                    className="flex-1 px-4 py-3 border border-input rounded-md text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-navy-light transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
                <p className="font-semibold mb-2">Access to e-Resources</p>
                <button className="border border-primary-foreground px-4 py-2 rounded text-sm hover:bg-navy-light transition-colors">
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-10 px-4 bg-card">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">📊 Summary</p>
              <h3 className="text-2xl font-bold text-foreground mb-6">Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Member Institutions", value: "6,500+", bg: "bg-accent/30" },
                  { label: "Fulltext Downloads - 2025", value: "1,140 Lakhs+", bg: "bg-green/20" },
                  { label: "Fulltext Downloads - 2026", value: "190 Lakhs+", bg: "bg-destructive/10" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.bg} rounded-lg p-4 text-center border border-border`}>
                    <p className="text-xs font-medium text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-xl font-bold text-accent">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">🔍 Search & Browse</p>
              <h3 className="text-2xl font-bold text-foreground mb-6">Journals</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Browse A-Z Journal Titles", value: "13,000+" },
                  { label: "Browse Broad Subject Categories", value: "27" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted rounded-lg p-4 text-center border border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">{item.label}</p>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6">About ONOD</h3>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                The Prime Minister of India in his address to the Nation from the ramparts of the Red Fort on 15th August, 2022, had pointed out the importance of Research and Development in our country in the <em>Amrit Kaal</em>. He had given the clarion call of <strong>"Jai Anusandhan"</strong> on the occasion.
              </p>
              <p>
                The Government of India approved One Nation One Data scheme to provide country-wide access to international high impact scholarly research articles and journal publications to students, faculty and researchers of all Higher Education Institutions managed by the central government and state governments and Research & Development Institutions.
              </p>
              <Link to="#" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:bg-navy-light transition-colors">
                Read More ≫
              </Link>
            </div>
            <div className="flex gap-8">
              {[
                { icon: Building2, title: "Member Institutions", desc: "6,500+ Govt. Higher Education Institutions" },
                { icon: Users, title: "Publishers", desc: "Global 30+ publishers" },
                { icon: BookOpen, title: "Journal Titles", desc: "13,000+ Fulltext Journals" },
                { icon: Globe, title: "Access Model", desc: "IP-based access and off-campus access through INFED" },
              ].map((item) => (
                <div key={item.title} className="text-center max-w-[140px]">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-4 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <p className="text-sm opacity-80 mb-2">Information and Library Network Centre</p>
            <p className="text-sm opacity-80 flex items-center gap-1"><MapPin size={14} /> Infocity, Gandhinagar - 382007.</p>
            <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><Phone size={14} /> +91 79 2326 8245</p>
            <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><Mail size={14} /> support@onod.gov.in</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Users Link</h4>
            {["How to Join?", "Training Programmes", "FAQs", "Activate User Account", "User Guides"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer">› {l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Librarians</h4>
            {["Registration", "Administrator Login", "Notices", "Downloads"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer">› {l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Important Link</h4>
            {["ICT Initiatives of MoE", "AISHE", "Web Analytics", "Institute Dashboard"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer flex items-center gap-1">› {l} <ExternalLink size={10} /></p>
            ))}
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-navy-light flex justify-between items-center text-sm opacity-70">
          <p>© 2025 INFLIBNET Centre, Gandhinagar. All rights reserved.</p>
          <p className="cursor-pointer hover:opacity-100">⬆ Back to top</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
