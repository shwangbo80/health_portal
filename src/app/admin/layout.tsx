'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  Calendar,
  FileText,
  TestTube,
  MessageSquare,
  Settings,
  BarChart3,
  Shield,
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    name: 'Patient Management',
    href: '/admin/patients',
    icon: Users,
  },
  {
    name: 'Appointments',
    href: '/admin/appointments',
    icon: Calendar,
  },
  {
    name: 'Prescriptions',
    href: '/admin/prescriptions',
    icon: FileText,
  },
  {
    name: 'Lab Results',
    href: '/admin/lab-results',
    icon: TestTube,
  },
  {
    name: 'Messages',
    href: '/admin/messages',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Shield,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
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
            <h1 className="text-xl font-bold text-gray-900">IEHP Admin</h1>
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
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
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
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">AD</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@iehp.com</p>
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
            <h1 className="text-lg font-semibold text-gray-900">IEHP Admin</h1>
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
