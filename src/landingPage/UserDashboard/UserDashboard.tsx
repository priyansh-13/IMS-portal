import { Link } from "react-router-dom";
import { Building2, GraduationCap, Users, LogOut } from "lucide-react";
import emblem from "@/assets/emblem.png";

const tiles = [
  {
    title: "My Institute",
    description: "View and manage your institution's profile, details and resources.",
    icon: Building2,
    href: "#",
    completion: 75,
    status: "In Progress" as const,
  },
  {
    title: "AISHE",
    description: "All India Survey on Higher Education — submit institution data and forms.",
    icon: GraduationCap,
    href: "/aishe",
    completion: 50,
    status: "In Progress" as const,
  },
  {
    title: "UGC Participation",
    description: "University Grants Commission participation and compliance portal.",
    icon: Users,
    href: "#",
    completion: 100,
    status: "Complete" as const,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={emblem} alt="Emblem" width={40} height={40} className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold">ONOD</h1>
              <p className="text-xs opacity-80">One Nation One Data</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
            <LogOut size={16} /> Logout
          </Link>
        </div>
      </header>

      {/* Info bar */}
      <div className="bg-navy-light text-primary-foreground py-2 px-4 text-xs">
        <div className="container mx-auto flex gap-8 flex-wrap">
          <span>User Role: University Nodal Officer</span>
          <span>AISHE Code: U-0167</span>
          <span>Maharshi Dayanand University, Rohtak</span>
          <span>State: Haryana</span>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">All Modules</h2>
          <p className="text-sm text-muted-foreground">Showing 3 of 3 modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="bg-card border-2 border-dashed border-accent/40 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-muted p-3 rounded-lg">
                  <tile.icon size={24} className="text-primary" />
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    tile.status === "Complete"
                      ? "bg-green/10 text-green border-green/30"
                      : "bg-accent/10 text-accent border-accent/30"
                  }`}
                >
                  ● {tile.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {tile.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{tile.description}</p>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-accent uppercase">Completion</span>
                  <span className="font-bold text-accent">{tile.completion}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      tile.completion === 100 ? "bg-green" : "bg-accent"
                    }`}
                    style={{ width: `${tile.completion}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
