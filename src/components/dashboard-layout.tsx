import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({
  children,
  title = "Dashboard",
  description,
}: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any local storage or session data if needed
    // localStorage.clear();
    // sessionStorage.clear();

    // Navigate to index page
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b pt-5">
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center lg:ml-0 ml-14 sm:ml-16">
                {title && (
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  className="w-full  text-white hover:bg-blue-700 transition-colors"
                >
                  <span className="font-medium">Sign Out</span>
                </Button>
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
