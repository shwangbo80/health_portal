"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  ArrowPathIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  refillsRemaining: number;
  prescribingDoctor: string;
  currentPharmacy: string;
  frequency: string;
  quantityPrescribed: number;
}

interface RefillRequest {
  prescriptionId: string;
  medicationName: string;
  dosage: string;
  currentPharmacy: string;
  refillsRemaining: number;
  prescribingDoctor: string;
  requestedQuantity: number;
  deliveryMethod: "pickup" | "delivery" | "mail";
  preferredPharmacy: string;
  urgency: "routine" | "urgent" | "emergency";
  notes: string;
  contactMethod: "phone" | "email" | "portal";
  contactInfo: string;
}

// Loading component
function LoadingPage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

const mockPrescriptions = [
  {
    id: "rx_001",
    medicationName: "Lipitor (Atorvastatin)",
    dosage: "20 mg tablet",
    refillsRemaining: 3,
    prescribingDoctor: "Dr. Sarah Wilson",
    currentPharmacy: "IEHP Pharmacy - Riverside",
    frequency: "1 tablet once daily",
    quantityPrescribed: 30,
  },
  {
    id: "rx_002",
    medicationName: "Lisinopril",
    dosage: "10 mg tablet",
    refillsRemaining: 2,
    prescribingDoctor: "Dr. Mike Johnson",
    currentPharmacy: "CVS Pharmacy #1234",
    frequency: "1 tablet once daily",
    quantityPrescribed: 90,
  },
  {
    id: "rx_003",
    medicationName: "Metformin",
    dosage: "500 mg tablet",
    refillsRemaining: 5,
    prescribingDoctor: "Dr. Emily Chen",
    currentPharmacy: "IEHP Pharmacy - San Bernardino",
    frequency: "1 tablet twice daily",
    quantityPrescribed: 60,
  },
];

// Component that uses useSearchParams - needs to be wrapped in Suspense
function RefillPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prescriptionId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  const [formData, setFormData] = useState<RefillRequest>({
    prescriptionId: "",
    medicationName: "",
    dosage: "",
    currentPharmacy: "",
    refillsRemaining: 0,
    prescribingDoctor: "",
    requestedQuantity: 0,
    deliveryMethod: "pickup",
    preferredPharmacy: "",
    urgency: "routine",
    notes: "",
    contactMethod: "portal",
    contactInfo: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // If prescription ID is provided, pre-fill the form
      if (prescriptionId) {
        const prescription = mockPrescriptions.find(
          (p) => p.id === prescriptionId
        );
        if (prescription) {
          setSelectedPrescription(prescription);
          setFormData((prev) => ({
            ...prev,
            prescriptionId: prescription.id,
            medicationName: prescription.medicationName,
            dosage: prescription.dosage,
            currentPharmacy: prescription.currentPharmacy,
            refillsRemaining: prescription.refillsRemaining,
            prescribingDoctor: prescription.prescribingDoctor,
            requestedQuantity: prescription.quantityPrescribed,
            preferredPharmacy: prescription.currentPharmacy,
          }));
          setStep(2); // Skip prescription selection
        }
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [prescriptionId]);

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setFormData((prev) => ({
      ...prev,
      prescriptionId: prescription.id,
      medicationName: prescription.medicationName,
      dosage: prescription.dosage,
      currentPharmacy: prescription.currentPharmacy,
      refillsRemaining: prescription.refillsRemaining,
      prescribingDoctor: prescription.prescribingDoctor,
      requestedQuantity: prescription.quantityPrescribed,
      preferredPharmacy: prescription.currentPharmacy,
    }));
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setStep(4); // Success step
  };

  if (isLoading) {
    return <LoadingPage message="Loading refill request..." />;
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Select Prescription to Refill
              </h2>
              <p className="text-gray-600">
                Choose which prescription you&apos;d like to request a refill
                for.
              </p>
            </div>

            <div className="space-y-3">
              {mockPrescriptions
                .filter((p) => p.refillsRemaining > 0)
                .map((prescription) => (
                  <div
                    key={prescription.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePrescriptionSelect(prescription)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ClipboardDocumentListIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {prescription.medicationName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {prescription.dosage} • {prescription.frequency}
                            </p>
                            <p className="text-sm text-gray-500">
                              Dr. {prescription.prescribingDoctor}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {prescription.refillsRemaining} refills left
                          </p>
                          <p className="text-xs text-gray-500">
                            {prescription.currentPharmacy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {mockPrescriptions.filter((p) => p.refillsRemaining > 0).length ===
              0 && (
              <div className="text-center py-8">
                <ExclamationTriangleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Refills Available
                </h3>
                <p className="text-gray-500">
                  You don&apos;t have any prescriptions with remaining refills.
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Refill Details
              </h2>
              <p className="text-gray-600">
                Specify your refill preferences and delivery options.
              </p>
            </div>

            {/* Selected Prescription Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <ClipboardDocumentListIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedPrescription?.medicationName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedPrescription?.dosage}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedPrescription?.refillsRemaining} refills remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Requested
                </label>
                <input
                  type="number"
                  value={formData.requestedQuantity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      requestedQuantity: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Standard quantity: {selectedPrescription?.quantityPrescribed}
                </p>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      urgency: e.target.value as
                        | "routine"
                        | "urgent"
                        | "emergency",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="routine">Routine (3-5 business days)</option>
                  <option value="urgent">Urgent (1-2 business days)</option>
                  <option value="emergency">Emergency (Same day)</option>
                </select>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Method
                </label>
                <select
                  value={formData.deliveryMethod}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryMethod: e.target.value as
                        | "pickup"
                        | "delivery"
                        | "mail",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pickup">Pickup at Pharmacy</option>
                  <option value="delivery">Home Delivery</option>
                  <option value="mail">Mail Order</option>
                </select>
              </div>

              {/* Preferred Pharmacy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Pharmacy
                </label>
                <select
                  value={formData.preferredPharmacy}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredPharmacy: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="IEHP Pharmacy - Riverside">
                    IEHP Pharmacy - Riverside
                  </option>
                  <option value="IEHP Pharmacy - San Bernardino">
                    IEHP Pharmacy - San Bernardino
                  </option>
                  <option value="CVS Pharmacy #1234">CVS Pharmacy #1234</option>
                  <option value="Walgreens #5678">Walgreens #5678</option>
                </select>
              </div>

              {/* Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={formData.contactMethod}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactMethod: e.target.value as
                        | "phone"
                        | "email"
                        | "portal",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="portal">Patient Portal</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: e.target.value,
                    }))
                  }
                  placeholder={
                    formData.contactMethod === "phone"
                      ? "Phone number"
                      : formData.contactMethod === "email"
                      ? "Email address"
                      : "Portal notifications"
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions or Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={3}
                placeholder="Any special instructions for your refill request..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Selection
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Review Request
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Review Your Refill Request
              </h2>
              <p className="text-gray-600">
                Please review all details before submitting your request.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Prescription Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Medication</p>
                    <p className="font-medium">{formData.medicationName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dosage</p>
                    <p className="font-medium">{formData.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prescribing Doctor</p>
                    <p className="font-medium">{formData.prescribingDoctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity Requested</p>
                    <p className="font-medium">
                      {formData.requestedQuantity} tablets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery & Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Delivery Method</p>
                    <p className="font-medium capitalize">
                      {formData.deliveryMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preferred Pharmacy</p>
                    <p className="font-medium">{formData.preferredPharmacy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Urgency</p>
                    <p className="font-medium capitalize">{formData.urgency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Method</p>
                    <p className="font-medium capitalize">
                      {formData.contactMethod}
                    </p>
                  </div>
                </div>
                {formData.notes && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Special Instructions
                    </p>
                    <p className="font-medium">{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    Important Information
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your refill request will be processed within the timeframe
                    specified by your urgency level. You will receive
                    confirmation once your pharmacy has prepared your
                    medication.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    Submit Refill Request
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Refill Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your refill request for {formData.medicationName} has been
              successfully submitted. You will receive confirmation within{" "}
              {formData.urgency === "emergency"
                ? "2 hours"
                : formData.urgency === "urgent"
                ? "24 hours"
                : "2-3 business days"}
              .
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/prescriptions")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
                View All Prescriptions
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 w-full sm:w-auto ml-3"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Request Prescription Refill"
      description="Request a refill for your existing prescriptions"
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps (only show for steps 1-3) */}
        {step <= 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">
                  Select Prescription
                </span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Refill Details</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium">
                  Review & Submit
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">{renderStepContent()}</div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 lg:h-0"></div>
    </DashboardLayout>
  );
}

// Main page component with Suspense boundary
export default function RequestRefillPage() {
  return (
    <Suspense fallback={<LoadingPage message="Loading refill request..." />}>
      <RefillPageContent />
    </Suspense>
  );
}
