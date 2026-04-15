import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Building2, BookOpen, LogIn, Search, Users, ChevronDown, Globe, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(scrollNext, 5000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi, scrollNext]);

  const slides = [
    {
      image: "/images/hero-1.png",
      title: "ONOD",
      subtitle: "One Nation One Data",
      description: "An Initiative of Govt. of India"
    },
    {
      image: "/images/hero-2.png",
      title: "JAI ANUSANDHAN",
      subtitle: "Knowledge for All",
      description: "Empowering research through data accessibility"
    },
    {
      image: "/images/hero-3.png",
      title: "FUTURE READY",
      subtitle: "Learning & Excellence",
      description: "Equipping institutions with global research resources"
    },
    {
      image: "/images/hero-banner.jpg",
      title: "INNOVATION",
      subtitle: "Research & Development",
      description: "Driving the next wave of scientific discovery"
    }
  ];

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
            { label: "About us", icon: Info },
            { label: "Participant Institute", icon: Building2 },
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
                  University Login
                </Link>
                <Link
                  to="/aishe-college"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                  onClick={() => setLoginOpen(false)}
                >
                  College Login
                </Link>
                <Link
                  to="/aishe-standalone"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                  onClick={() => setLoginOpen(false)}
                >
                  Standalone Login
                </Link>
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center px-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/60 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-navy-light/50 border border-primary-foreground/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30 w-48 lg:w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div
                className="h-[400px] bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-lg">
                    <h2 className="text-5xl font-bold text-white mb-2">{slide.title}</h2>
                    <div className="w-16 h-1 bg-orange mb-3"></div>
                    <p className="text-white text-lg mb-1">{slide.subtitle}</p>
                    <p className="text-teal text-base">{slide.description}</p>
                    <Link
                      to="#"
                      className="inline-block mt-6 bg-navy-dark text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-navy-light transition-colors"
                    >
                      ONOD Outreach Programmes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index ? "bg-orange w-4" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Minister Section */}
      <section className="bg-muted/50 py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* PM Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-card p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 shadow-inner">
                <img src="/images/pm-modi.png" alt="Shri Narendra Modi" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-foreground">Shri Narendra Modi</h4>
                <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">Hon'ble Prime Minister of India</p>
                <div className="w-12 h-0.5 bg-orange mb-3 mx-auto sm:mx-0"></div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "Research and development are the cornerstones of a developed nation. Through ONOD, we empower our youth with the knowledge to build a Viksit Bharat."
                </p>
              </div>
            </div>

            {/* Education Minister Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-card p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 shadow-inner">
                <img src="/images/education-minister.png" alt="Shri Dharmendra Pradhan" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-foreground">Shri Dharmendra Pradhan</h4>
                <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">Hon'ble Education Minister</p>
                <div className="w-12 h-0.5 bg-orange mb-3 mx-auto sm:mx-0"></div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "We are committed to making education accessible and research-driven. This initiative marks a significant step towards global academic excellence."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Latest Sections */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Box */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col h-[350px]">
              <h3 className="text-xl font-bold text-orange mb-4">About ONOD</h3>
              <div className="text-sm text-foreground/80 leading-relaxed overflow-hidden text-ellipsis mb-6">
                <p>
                  The National Education Policy (NEP) 2020 underscores the need for motivated, energized, and capable faculty in higher education. The capacity building for teachers at all levels is a key focus. Existing mechanisms and missions are being strengthened and rebranded as ONE NATION ONE DATA (ONOD) to ensure a more holistic and integrated approach to data accessibility and research excellence.
                </p>
              </div>
              <div className="mt-auto">
                <Link to="#" className="text-orange font-bold flex items-center gap-2 hover:underline transition-all">
                  Read More <span>→</span>
                </Link>
              </div>
            </div>

            {/* Latest Box */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border h-[350px] flex flex-col overflow-hidden">
              <h3 className="text-xl font-bold text-orange mb-4">Latest @ONOD</h3>
              <div className="relative flex-1 overflow-hidden">
                <div className="absolute inset-0 animate-marquee-vertical space-y-4">
                  {[
                    "Faculty Development Register and attend at: https://gurusetu.org/",
                    "Capacity Building Programme for Training Administrative Staff by IIT Madras",
                    "Click here to view Programme Status of ONOD as on 14.11.2025",
                    "Faculty Needs Assessment on Inclusive Classrooms under Capacity Building",
                    "Post Budget Webinar 2026-27 | Education, Skills & University Townships | Towards Viksit Bharat @2047",
                    "GURUSETU – A New Pilot Initiative for Faculty Development Register and attend at: https://gurusetu.org/",
                    "National Level Webinar on NEP 2020 Implementation Strategies",
                    "New Course Launch: Digital Pedagogy and Online Assessment",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group cursor-pointer border-b border-border pb-3 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange shrink-0 mt-1.5"></div>
                      <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                  {/* Duplicate items for seamless loop */}
                  {[
                    "Faculty Development Register and attend at: https://gurusetu.org/",
                    "Capacity Building Programme for Training Administrative Staff by IIT Madras",
                  ].map((item, i) => (
                    <div key={`dup-${i}`} className="flex items-start gap-3 group border-b border-border pb-3 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange shrink-0 mt-1.5"></div>
                      <p className="text-sm text-foreground/80">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centres at a Glance */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10"></div>
            <h2 className="text-3xl font-bold text-navy-dark bg-card px-6 inline-block">ONOD Centres at a Glance</h2>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="bg-navy-dark text-white px-6 py-2 rounded shadow-md text-sm font-medium hover:bg-navy-light transition-all">
              ONOD Centers
            </button>
            <button className="bg-[#1a2b4b] text-white px-6 py-2 rounded shadow-md text-sm font-medium hover:bg-navy-light transition-all">
              NFLP Centers
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Map Column */}
            <div className="flex-1 relative bg-[#f8faff] rounded-xl p-8 border border-border/50 shadow-inner min-h-[500px] flex items-center justify-center">
              <img src="/images/india-centers-map.png" alt="India Centres Map" className="max-w-full h-auto object-contain transition-transform hover:scale-[1.02] duration-500" />
            </div>

            {/* Table Column */}
            <div className="lg:w-[500px] xl:w-[600px] bg-white rounded-xl shadow-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-navy-dark text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">State</th>
                      <th className="px-4 py-3 font-semibold">Center Name</th>
                      <th className="px-4 py-3 font-semibold text-center">Training List</th>
                      <th className="px-4 py-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {[
                      { state: "Andhra Pradesh", name: "National Sanskrit University, Tirupati", count: 12 },
                      { state: "Andhra Pradesh", name: "Andhra University, Vishakhapatnam", count: 58 },
                      { state: "Andhra Pradesh", name: "Sri Venkateswara University, Tirupati", count: 18 },
                      { state: "Andhra Pradesh", name: "Central University of Andhra Pradesh", count: 4 },
                      { state: "Assam", name: "Assam University, Silchar", count: 58 },
                      { state: "Assam", name: "Indian Institute of Technology Guwahati, Guwahati", count: 0 },
                      { state: "Assam", name: "Tezpur University, Tezpur", count: 27 },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 text-muted-foreground">{row.state}</td>
                        <td className="px-4 py-4 font-medium text-foreground">{row.name}</td>
                        <td className="px-4 py-4 text-center">
                          <button className="bg-teal text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-teal/80 transition-all">
                            View ({row.count})
                          </button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button className="bg-orange text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-orange/80 shadow-sm transition-all">
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-muted/20 p-3 text-right">
                <button className="text-navy-dark text-xs font-bold hover:underline">View All Centres →</button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Digital Initiatives */}
      <section className="py-12 px-4 bg-[#e8f4ff] border-t border-border overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#c2e0ff] -z-10"></div>
            <h2 className="text-3xl font-bold text-[#1a4b8c] bg-[#e8f4ff] px-6 inline-block uppercase tracking-tight">Digital Initiatives</h2>
          </div>

          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee-horizontal gap-12 items-center whitespace-nowrap">
              {[
                { name: "Swayam Prabha", src: "/images/swayam-prabha.png" },
                { name: "AISHE", src: "/images/aishe.png" },
                { name: "NTA", src: "/images/nta.png" },
                { name: "UGC", src: "/images/UGC_India_Logo.png" },
                { name: "AICTE", src: "/images/AICTE.png" },
                { name: "NIRF", src: "/images/NIRF.png" },
                { name: "NAAC", src: "/images/NAAC.png" },
                { name: "ONOD", src: "/images/ONOD-logo.png" },
              ].concat([
                { name: "Swayam Prabha", src: "/images/swayam-prabha.png" },
                { name: "AISHE", src: "/images/aishe.png" },
                { name: "NTA", src: "/images/nta.png" },
                { name: "UGC", src: "/images/UGC_India_Logo.png" },
                { name: "AICTE", src: "/images/AICTE.png" },
                { name: "NIRF", src: "/images/NIRF.png" },
                { name: "NAAC", src: "/images/NAAC.png" },
                { name: "ONOD", src: "/images/ONOD-logo.png" },
              ]).map((logo, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-[#d1e9ff] h-24 w-48 flex items-center justify-center shrink-0">
                  <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
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
            <p className="text-sm opacity-80 mb-2 font-bold uppercase tracking-wide">Information and Library Network Centre</p>
            <p className="text-sm opacity-80 flex items-center gap-1"><MapPin size={14} /> Infocity, Gandhinagar - 382007.</p>
            <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><Phone size={14} /> +91 79 2326 8245</p>
            <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><Mail size={14} /> support@onod.gov.in</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Users Link</h4>
            {["How to Join?", "Training Programmes", "FAQs", "Activate User Account", "User Guides"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer transition-all">› {l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Librarians</h4>
            {["Registration", "Administrator Login", "Notices", "Downloads"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer transition-all">› {l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Important Link</h4>
            {["ICT Initiatives of MoE", "AISHE", "Web Analytics", "Institute Dashboard"].map((l) => (
              <p key={l} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer flex items-center gap-1 transition-all">› {l} <ExternalLink size={10} /></p>
            ))}
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-navy-light flex justify-between items-center text-sm opacity-70">
          <p>© 2025 INFLIBNET Centre, Gandhinagar. All rights reserved.</p>
          <p className="cursor-pointer hover:opacity-100 flex items-center gap-1">⬆ Back to top</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
