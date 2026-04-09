import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ModuleBannerProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

export function ModuleBanner({
  title,
  subtitle = "Centralised data exchange for Higher Educational Institutions (HEIs)",
  showBack = true,
  onBack,
  rightContent,
  children
}: ModuleBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-primary-foreground shadow-sm">
      <div className="px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="p-1 rounded-full bg-accent hover:bg-accent/90 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-accent-foreground" />
            </button>
          )}
          <div>
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            <p className="text-[10px] opacity-80 leading-tight">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {rightContent}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:bg-accent/90 transition-all shadow-sm active:scale-95"
          >
            Dashboard
          </button>
        </div>
      </div>
      {children && (
        <div className="px-6 pb-2 pt-0 border-t border-white/5 bg-primary/20">
          {children}
        </div>
      )}
    </div>
  );
}
