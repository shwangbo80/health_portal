"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  FileText,
  MessageSquare,
  Pill,
  User,
  Home,
  TestTube,
  Bell,
  Settings,
  Menu,
  X,
  Heart,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/patient", icon: Home },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Messages", href: "/patient/messages", icon: MessageSquare },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Lab Results", href: "/patient/lab-results", icon: TestTube },
  { name: "Health Records", href: "/patient/health-records", icon: FileText },
  { name: "Profile", href: "/patient/profile", icon: User },
  { name: "Notifications", href: "/patient/notifications", icon: Bell },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

interface PatientSidebarProps {
  className?: string;
}

export function PatientSidebar({ className }: PatientSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              IEHP Portal
            </span>
          </div>
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/patient" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Smith</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
