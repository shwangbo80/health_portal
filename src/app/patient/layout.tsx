"use client";

import { ReactNode } from "react";
import { PatientSidebar } from "@/components/patient-sidebar";

interface PatientLayoutProps {
  children: ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar />
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  );
}
