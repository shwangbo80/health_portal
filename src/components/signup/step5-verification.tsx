"use client";

import { useState, useEffect } from "react";
import { SignupFormData } from "@/types";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Step5Props {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function Step5Verification({ formData, updateFormData, onComplete, onBack }: Step5Props) {
  const [verificationSent, setVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendVerificationCode = () => {
    setVerificationSent(true);
    setCountdown(60);
    // In a real app, this would call an API to send the verification code
    console.log(`Sending verification code to ${formData.verificationMethod === 'email' ? formData.email : formData.phone}`);
  };

  const resendCode = () => {
    if (countdown === 0) {
      sendVerificationCode();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify the code with the backend
    onComplete();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Account Verification</h3>
        <p className="mt-1 text-sm text-gray-600">
          We need to verify your {formData.verificationMethod === 'email' ? 'email address' : 'phone number'} to secure your account
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {/* Verification Method Selection */}
          {!verificationSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you like to receive your verification code?
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="verificationMethod"
                    value="email"
                    checked={formData.verificationMethod === 'email'}
                    onChange={(e) => updateFormData({ verificationMethod: e.target.value as 'email' | 'sms' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Email: {formData.email}
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="verificationMethod"
                    value="sms"
                    checked={formData.verificationMethod === 'sms'}
                    onChange={(e) => updateFormData({ verificationMethod: e.target.value as 'email' | 'sms' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    SMS: {formData.phone}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Send Verification Code */}
          {!verificationSent && (
            <button 
              onClick={sendVerificationCode} 
              className="w-full"
              disabled={!formData.verificationMethod}
            >
              Send Verification Code
            </button>
          )}

          {/* Verification Code Input */}
          {verificationSent && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Verification code sent
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        We sent a 6-digit code to your {formData.verificationMethod === 'email' ? 'email' : 'phone'}. 
                        Please check and enter it below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                    Verification code
                  </label>
                  <div className="mt-1">
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      maxLength={6}
                      value={formData.verificationCode}
                      onChange={(e) => updateFormData({ verificationCode: e.target.value.replace(/\D/g, '') })}
                      placeholder="Enter 6-digit code"
                      className="min-h-[44px] text-center text-lg tracking-widest"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Didn&apos;t receive the code?{' '}
                    <button
                      type="button"
                      onClick={resendCode}
                      disabled={countdown > 0}
                      className={`font-medium ${
                        countdown > 0 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-blue-600 hover:text-blue-500 cursor-pointer hover:cursor-pointer'
                      }`}
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                    </button>
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={onBack} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Back
                  </button>
                  <button type="submit" className="flex-1">
                    Verify & Complete Registration
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Account security
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Verification helps protect your health information and ensures only you can access your account. 
                    Keep your verification codes confidential and never share them with others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
