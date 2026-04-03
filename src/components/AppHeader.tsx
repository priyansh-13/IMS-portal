import { Search, Bell, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-50 gap-2">
      <div className="flex items-center gap-2 lg:gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Search */}
        <div className="relative w-full max-w-[150px] sm:max-w-[250px] lg:w-80 lg:max-w-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 lg:pl-10 h-9 lg:h-10 text-sm bg-background border-border"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">ONOD User</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
