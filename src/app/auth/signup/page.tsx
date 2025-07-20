"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { SignupFormData } from "@/types";
import {
  Stepper,
  Step1AccountCreation,
  Step2PersonalInfo,
  Step3Insurance,
  Step4MedicalHistory,
  Step5Verification,
} from "@/components/signup";

const STEPS = [
  { title: "Account", description: "Basic info" },
  { title: "Personal", description: "Your details" },
  { title: "Insurance", description: "Coverage info" },
  { title: "Medical", description: "Health history" },
  { title: "Verify", description: "Confirm identity" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    // Step 1: Account Creation
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,

    // Step 2: Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },

    // Step 3: Insurance Information
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    subscriberName: "",
    subscriberDateOfBirth: "",
    relationshipToSubscriber: "",

    // Step 4: Medical History
    allergies: [],
    medications: [],
    medicalConditions: [],
    emergencyMedicalInfo: "",
    primaryCarePhysician: "",

    // Step 5: Verification
    verificationCode: "",
    verificationMethod: "email",
  });

  // Add verification state for Step5Verification
  const [verificationSent, setVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Debug: Log when formData.verificationCode changes
  useEffect(() => {
    console.log(
      "[PARENT] formData.verificationCode:",
      formData.verificationCode
    );
  }, [formData.verificationCode]);

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const completeSignup = () => {
    // In a real app, this would submit the form to the backend
    console.log("Signup completed:", formData);
    router.push("/dashboard");
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Setting up registration..." />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1AccountCreation
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3Insurance
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4MedicalHistory
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5Verification
            formData={formData}
            updateFormData={updateFormData}
            onComplete={completeSignup}
            onBack={prevStep}
            verificationSent={verificationSent}
            setVerificationSent={setVerificationSent}
            countdown={countdown}
            setCountdown={setCountdown}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
            Create your health portal account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Progress Stepper */}
        <Stepper
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />
      </div>

      {/* Form Content */}
      <div className="mx-auto w-full max-w-2xl">{renderStep()}</div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Step {currentStep} of {STEPS.length} • Your information is protected
          by HIPAA regulations
        </p>
      </div>
    </div>
  );
}
