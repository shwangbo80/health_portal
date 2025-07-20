"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  PlusIcon,
  ArrowLeftIcon,
  UserIcon,
  DocumentTextIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface RequestForm {
  medicationName: string;
  reasonForRequest: string;
  symptoms: string;
  currentMedications: string;
  allergies: string;
  preferredPharmacy: string;
  urgency: "routine" | "urgent" | "emergency";
  requestType: "new" | "renewal" | "change";
  previouslyTaken: boolean;
  doctorPreference: string;
  additionalNotes: string;
}

const mockDoctors = [
  "Dr. Sarah Wilson - Cardiology",
  "Dr. Mike Johnson - Primary Care",
  "Dr. Emily Chen - Dermatology",
  "Any available doctor",
];

const mockPharmacies = [
  "IEHP Pharmacy - Riverside",
  "IEHP Pharmacy - San Bernardino",
  "CVS Pharmacy #1234",
  "Walgreens #5678",
  "Other (specify in notes)",
];

export default function RequestPrescriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RequestForm>({
    medicationName: "",
    reasonForRequest: "",
    symptoms: "",
    currentMedications: "",
    allergies: "",
    preferredPharmacy: "",
    urgency: "routine",
    requestType: "new",
    previouslyTaken: false,
    doctorPreference: "",
    additionalNotes: "",
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (
    field: keyof RequestForm,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Show success message and redirect
    alert(
      "Prescription request submitted successfully! You will receive a confirmation email shortly."
    );
    router.push("/prescriptions");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "routine":
        return "bg-blue-100 text-blue-800";
      case "urgent":
        return "bg-yellow-100 text-yellow-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading prescription request form..." />;
  }

  return (
    <DashboardLayout
      title="Request Prescription"
      description="Request a new prescription from your healthcare provider"
    >
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/prescriptions")}
              className="flex-shrink-0"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Prescriptions
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medication Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.medicationName}
                      onChange={(e) =>
                        handleInputChange("medicationName", e.target.value)
                      }
                      placeholder="Enter medication name (brand or generic)"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Request Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.requestType}
                        onChange={(e) =>
                          handleInputChange("requestType", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="new">New Prescription</option>
                        <option value="renewal">Prescription Renewal</option>
                        <option value="change">Dosage/Medication Change</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.urgency}
                        onChange={(e) =>
                          handleInputChange("urgency", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="routine">
                          Routine (3-5 business days)
                        </option>
                        <option value="urgent">
                          Urgent (1-2 business days)
                        </option>
                        <option value="emergency">Emergency (Same day)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.previouslyTaken}
                        onChange={(e) =>
                          handleInputChange("previouslyTaken", e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        I have taken this medication before
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Request <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.reasonForRequest}
                      onChange={(e) =>
                        handleInputChange("reasonForRequest", e.target.value)
                      }
                      placeholder="Please describe why you need this medication..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Symptoms
                    </label>
                    <textarea
                      value={form.symptoms}
                      onChange={(e) =>
                        handleInputChange("symptoms", e.target.value)
                      }
                      placeholder="Describe any symptoms you're experiencing..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      value={form.currentMedications}
                      onChange={(e) =>
                        handleInputChange("currentMedications", e.target.value)
                      }
                      placeholder="List all medications you're currently taking..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Known Allergies
                    </label>
                    <textarea
                      value={form.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      placeholder="List any drug allergies or adverse reactions..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Provider & Pharmacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Provider & Pharmacy Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Doctor
                    </label>
                    <select
                      value={form.doctorPreference}
                      onChange={(e) =>
                        handleInputChange("doctorPreference", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a doctor...</option>
                      {mockDoctors.map((doctor, index) => (
                        <option key={index} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Pharmacy
                    </label>
                    <select
                      value={form.preferredPharmacy}
                      onChange={(e) =>
                        handleInputChange("preferredPharmacy", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a pharmacy...</option>
                      {mockPharmacies.map((pharmacy, index) => (
                        <option key={index} value={pharmacy}>
                          {pharmacy}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={form.additionalNotes}
                      onChange={(e) =>
                        handleInputChange("additionalNotes", e.target.value)
                      }
                      placeholder="Any additional information you'd like to share..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Request Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-500">Request Type</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {form.requestType.replace("_", " ")}
                    </p>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-500">Urgency Level</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                        form.urgency
                      )}`}
                    >
                      {form.urgency.charAt(0).toUpperCase() +
                        form.urgency.slice(1)}
                    </span>
                  </div>

                  {form.medicationName && (
                    <div className="text-sm">
                      <p className="text-gray-500">Medication</p>
                      <p className="font-medium text-gray-900">
                        {form.medicationName}
                      </p>
                    </div>
                  )}

                  {form.doctorPreference && (
                    <div className="text-sm">
                      <p className="text-gray-500">Preferred Doctor</p>
                      <p className="font-medium text-gray-900">
                        {form.doctorPreference}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Routine requests are processed within 3-5 business days
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        You will receive a confirmation email once submitted
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Your doctor may contact you for additional information
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        For emergencies, call 911 or go to the nearest ER
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/prescriptions")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || !form.medicationName || !form.reasonForRequest
              }
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
