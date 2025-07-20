"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { SignupFormData } from "@/types";
import Link from "next/link";

interface Step1Props {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
}

export function Step1AccountCreation({
  formData,
  updateFormData,
  onNext,
}: Step1Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Create Your Account
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Set up your credentials to access your health portal
        </p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address *
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData({ email: e.target.value })
                }
                placeholder="Enter your email"
                className="block w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password *
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData({ password: e.target.value })
                }
                placeholder="Create a password"
                className="block w-full min-h-[44px] px-3 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center min-h-[44px] min-w-[44px] justify-center cursor-pointer hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with letters and numbers
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password *
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData({ confirmPassword: e.target.value })
                }
                placeholder="Confirm your password"
                className="block w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData({ acceptTerms: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
            </div>
            <label
              htmlFor="acceptTerms"
              className="ml-2 block text-sm text-gray-900 leading-relaxed"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
              , and consent to the use and disclosure of my health information
              as described in the{" "}
              <Link href="/hipaa" className="text-blue-600 hover:text-blue-500">
                HIPAA Notice
              </Link>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Continue to Personal Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
