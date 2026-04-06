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
      <div className="px-4 md:px-6 py-1.5 flex items-center min-w-0">
        <div className="min-w-0">
          <h2 className="text-sm md:text-base font-semibold leading-tight truncate">{title}</h2>
          <p className="text-[10px] md:text-[11px] opacity-80 leading-tight hidden sm:block truncate">{subtitle}</p>
        </div>
      </div>
      {children && (
        <div className="px-4 md:px-6 pb-2 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}
