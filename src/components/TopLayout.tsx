import { ReactNode } from "react";
import { DashboardLayout } from "./DashboardLayout";

interface TopLayoutProps {
  children: ReactNode;
}

export function TopLayout({ children }: TopLayoutProps) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
