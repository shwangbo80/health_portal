"use client";

import { useState } from "react";
import { Users } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function PatientLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login logic for patients
    console.log("Patient login attempt:", formData);

    // Redirect to patient dashboard
    window.location.href = "/patient";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Patient Portal Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your health records and appointments
          </p>
        </div>

        {/* Login Form */}
        <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-6">
            <h2 className="flex items-center text-blue-700 text-xl font-semibold">
              <Users className="mr-2 h-5 w-5" />
              Patient Login
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in to Patient Portal
              </button>
            </form>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Demo Credentials
            </h3>
            <div className="space-y-1 text-xs text-blue-800">
              <p>
                <strong>Email:</strong> patient@demo.com
              </p>
              <p>
                <strong>Password:</strong> password
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Need a different portal?{" "}
            <a
              href="/auth/provider-login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Provider Login
            </a>
            {" or "}
            <a
              href="/auth/admin-login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Admin Login
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up here
            </a>
          </p>
          <p className="text-xs text-gray-500">For help, call (909) 890-2000</p>
        </div>
      </div>
    </div>
  );
}
