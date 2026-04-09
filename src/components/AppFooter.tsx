import { Link } from "react-router-dom";

export function AppFooter() {
  return (
    <footer className="w-full bg-white border-t border-border/50 py-3 px-6 flex items-center justify-between text-[11px] text-muted-foreground shrink-0 overflow-hidden">
      <div className="flex items-center gap-6">
        <Link to="/privacy-policy" className="hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms-of-use" className="hover:text-primary transition-colors">
          Terms of Use
        </Link>
      </div>
      <div>
        Copyright © 2026 One Nation One Data
      </div>
    </footer>
  );
}
