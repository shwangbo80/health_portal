"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  CogIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    description: 'Overview and quick actions'
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: CalendarIcon,
    description: 'Schedule and manage appointments'
  },
  {
    name: 'Prescriptions',
    href: '/prescriptions',
    icon: ClipboardDocumentListIcon,
    description: 'Manage medications and refills'
  },
  {
    name: 'Lab Results',
    href: '/lab-results',
    icon: DocumentTextIcon,
    description: 'View test results and reports'
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: ChatBubbleLeftRightIcon,
    description: 'Communicate with providers'
  },
  {
    name: 'Telehealth',
    href: '/appointments/telehealth',
    icon: PhoneIcon,
    description: 'Virtual consultations'
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: UserIcon,
    description: 'Personal information and settings'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-white rounded-md p-3 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer hover:cursor-pointer"
        >
          <span className="sr-only">Open sidebar</span>
          {isOpen ? (
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="ml-3 font-bold text-gray-900">IEHP Portal</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              // Fix active state logic to prevent multiple items being active
              let isActive = false;
              
              if (item.href === '/appointments/telehealth') {
                // Only active if exactly on telehealth page
                isActive = pathname === '/appointments/telehealth';
              } else if (item.href === '/appointments') {
                // Only active if on appointments page but NOT telehealth
                isActive = pathname === '/appointments' || (pathname.startsWith('/appointments/') && !pathname.includes('telehealth'));
              } else if (item.href === '/prescriptions') {
                // Active for prescriptions and individual prescription pages
                isActive = pathname === '/prescriptions' || pathname.startsWith('/prescriptions/');
              } else if (item.href === '/dashboard') {
                // Only active if exactly on dashboard
                isActive = pathname === '/dashboard';
              } else {
                // For other routes, check if pathname starts with the href
                isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'group flex items-center px-3 py-3 sm:py-4 text-sm font-medium transition-colors relative min-h-[48px]',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700"></div>
                  )}
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500 truncate mt-0.5 hidden sm:block">
                        {item.description}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-3 sm:p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Soo</p>
                <p className="text-xs text-gray-500 truncate">Patient ID: 123456</p>
              </div>
              <Link
                href="/profile"
                className="ml-2 p-2 text-gray-400 hover:text-gray-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <CogIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
