"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Welcome() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow login for demo credentials
    if (
      formData.email === "demo@email.com" &&
      formData.password === "password"
    ) {
      setError("");
      window.location.href = "/dashboard";
    } else {
      setError("Invalid email or password. Please use the demo credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-3 sm:p-4">
      <div className=" flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <Image
                src="/iehp-logo.png"
                alt="IEHP Logo"
                width={64}
                height={64}
              />
            </div>
            <div className="mt-10">
              <h2 className="flex items-center text-black text-xl font-semibold justify-center">
                <Users className="mr-2 h-5 w-5" />
                Patient Login
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Access your health records and appointments
            </p>
          </div>

          {/* Login Form */}
          <div className="border-1 border-blue-300 rounded-lg overflow-hidden w-sm">
            <div className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-700 rounded-md px-3 py-2 text-sm mb-2">
                    {error}
                  </div>
                )}
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
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] text-gray-900"
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
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400  disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] text-gray-900"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                  Sign in to Patient Portal
                </button>
              </form>
              {/* Demo Credentials */}
              <div className="mt-4">
                <div className="">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    Demo Credentials
                  </h3>
                  <div className="space-y-1 text-xs text-blue-800">
                    <p>
                      <strong>Email:</strong> demo@email.com
                    </p>
                    <p>
                      <strong>Password:</strong> password
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </a>
            </p>
            <p className="text-xs text-gray-500">
              For help, call (909) 890-2000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
