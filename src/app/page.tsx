import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Users, Stethoscope, Shield } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg text-center space-y-6 sm:space-y-8">
        {/* Logo and App Name */}
        <div className="space-y-3 sm:space-y-4">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <HeartIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            IEHP Portal
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Your health, one tap away
          </p>
        </div>

        {/* Illustration placeholder */}
        <div className="bg-blue-100 rounded-lg p-6 sm:p-8 mx-2 sm:mx-4">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Secure & Private</p>
              <p className="text-xs text-gray-500">
                Your health data is protected
              </p>
            </div>
          </div>
        </div>

        {/* Portal Access Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Choose Your Portal
          </h2>

          {/* Patient Portal Button*/}
          <Button
            className="p-8 rounded-4xl  hover:text-white transition-colors w-auto"
            size="lg"
            variant="outline"
          >
            <Link href="/auth/patient-login" className="flex items-center">
              <Users className="h-8 w-8 me-3" />
              <span className="text-base">Patient Portal</span>
            </Link>
          </Button>

          {/* Admin Portal Button*/}
          <Link href="/auth/provider-login" className="block">
            <Button
              className="p-8 rounded-4xl  hover:text-white transition-colors w-auto"
              size="lg"
              variant="outline"
            >
              <Stethoscope className="h-8 w-8 me-3" />
              <span className="text-base">Provider Portal</span>
            </Button>
          </Link>

          {/* Provider Portal Button*/}
          <Link href="/auth/admin-login" className="block">
            <Button
              className="p-8 rounded-4xl  hover:text-white transition-colors w-auto"
              size="lg"
              variant="outline"
            >
              <Shield className="h-8 w-8 me-3" />
              <span className="text-base">admin Portal</span>
            </Button>
          </Link>
        </div>

        {/* Alternative Login Options */}
        <div className="space-y-3 sm:space-y-4">
          <Link href="/auth/signup" className="block">
            <Button className="w-full min-h-[48px]" size="lg">
              Sign Up for Patient Portal
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 space-y-2">
          <p>By continuing, you agree to our Terms of Service</p>
          <p>and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
