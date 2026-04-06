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
    <div className="bg-primary text-primary-foreground">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="p-1.5 rounded-full bg-accent hover:bg-accent/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-accent-foreground" />
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-xs opacity-80">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {rightContent}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
      {children && (
        <div className="px-6 pb-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}
