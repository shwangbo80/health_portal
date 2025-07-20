import React, { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
