'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Calendar,
  Users,
  FileText,
  TestTube,
  MessageSquare,
  Settings,
  Stethoscope,
  ClipboardList,
  CheckSquare,
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProviderLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/provider',
    icon: Home,
  },
  {
    name: 'My Schedule',
    href: '/provider/schedule',
    icon: Calendar,
  },
  {
    name: 'My Patients',
    href: '/provider/patients',
    icon: Users,
  },
  {
    name: 'Appointments',
    href: '/provider/appointments',
    icon: ClipboardList,
  },
  {
    name: 'Prescriptions',
    href: '/provider/prescriptions',
    icon: FileText,
  },
  {
    name: 'Lab Results',
    href: '/provider/lab-results',
    icon: TestTube,
  },
  {
    name: 'Tasks',
    href: '/provider/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Messages',
    href: '/provider/messages',
    icon: MessageSquare,
  },
  {
    name: 'Clinical Tools',
    href: '/provider/tools',
    icon: Stethoscope,
  },
  {
    name: 'Settings',
    href: '/provider/settings',
    icon: Settings,
  },
];

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any local storage or session data if needed
    // localStorage.clear();
    // sessionStorage.clear();
    
    // Navigate to index page
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 bg-white shadow-lg lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6">
            <h1 className="text-xl font-bold text-gray-900">IEHP Provider</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">DR</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Dr. Sarah Johnson</p>
                <p className="text-xs text-gray-500">Cardiologist</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      <div className="lg:hidden">
        {/* This would be a mobile sidebar toggle in a real app */}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation for mobile */}
        <div className="bg-white shadow-sm lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-lg font-semibold text-gray-900">IEHP Provider</h1>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
