import { Sidebar } from '@/components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({ 
  children, 
  title = "Dashboard", 
  description 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center lg:ml-0 ml-14 sm:ml-16">
                {title && (
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h1>
                    {description && (
                      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer hover:cursor-pointer">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
