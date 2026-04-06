import { cn } from "@/lib/utils";

interface ModuleBannerProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function ModuleBanner({
  title,
  subtitle = "Centralised data exchange for Higher Educational Institutions (HEIs)",
  children
}: ModuleBannerProps) {
  return (
    <div className="bg-primary text-primary-foreground shadow-sm">
      <div className={cn("px-4 md:px-6 flex items-center min-w-0 flex-1", children ? "py-1.5" : "py-5")}>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight truncate", children ? "text-sm md:text-base" : "text-base md:text-lg")}>{title}</h2>
          <p className={cn("opacity-80 leading-tight hidden sm:block truncate mt-0.5", children ? "text-[10px] md:text-[11px]" : "text-[11px] md:text-xs")}>{subtitle}</p>
        </div>
      </div>
      {children && (
        <div className="px-4 md:px-6 pb-2 pt-0 w-full">
          {children}
        </div>
      )}
    </div>
  );
}
