"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  ClipboardDocumentListIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PrinterIcon,
  ArrowPathIcon,
  ClockIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  route: string;
  frequency: string;
  quantityPrescribed: number;
  refillsRemaining: number;
  prescribedDate: string;
  startDate: string;
  endDate?: string;
  prescribingDoctor: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  instructions: string;
  status: "active" | "completed" | "expired" | "canceled" | "pending_refill";
  isControlledSubstance: boolean;
  refillRequested: boolean;
  notes?: string;
  sideEffects?: string[];
  interactions?: string[];
  ndc?: string;
  lotNumber?: string;
  expirationDate?: string;
}

// Mock prescription data - in a real app this would come from an API
const mockPrescriptions: { [key: string]: Prescription } = {
  rx_001: {
    id: "rx_001",
    medicationName: "Lipitor (Atorvastatin)",
    dosage: "20 mg tablet",
    route: "oral",
    frequency: "1 tablet once daily",
    quantityPrescribed: 30,
    refillsRemaining: 3,
    prescribedDate: "2024-12-15",
    startDate: "2024-12-15",
    prescribingDoctor: "Dr. Sarah Wilson",
    pharmacyName: "IEHP Pharmacy - Riverside",
    pharmacyAddress: "10800 Magnolia Ave, Riverside, CA 92505",
    pharmacyPhone: "(951) 788-3000",
    instructions: "Take with or without food. Take at the same time each day.",
    status: "active",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "Monitor cholesterol levels monthly",
    sideEffects: ["Muscle pain", "Digestive issues", "Headache"],
    interactions: ["Warfarin", "Digoxin", "Cyclosporine"],
    ndc: "0071-0156-23",
    expirationDate: "2025-12-15",
  },
  rx_002: {
    id: "rx_002",
    medicationName: "Lisinopril",
    dosage: "10 mg tablet",
    route: "oral",
    frequency: "1 tablet once daily",
    quantityPrescribed: 90,
    refillsRemaining: 2,
    prescribedDate: "2024-11-20",
    startDate: "2024-11-20",
    prescribingDoctor: "Dr. Mike Johnson",
    pharmacyName: "CVS Pharmacy #1234",
    pharmacyAddress: "123 Main St, Riverside, CA 92501",
    pharmacyPhone: "(951) 555-0123",
    instructions: "Take in the morning. Monitor blood pressure regularly.",
    status: "pending_refill",
    isControlledSubstance: false,
    refillRequested: true,
    notes: "Patient responding well to treatment",
    sideEffects: ["Dry cough", "Dizziness", "Fatigue"],
    interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
    ndc: "0071-3112-23",
    expirationDate: "2025-11-20",
  },
  rx_003: {
    id: "rx_003",
    medicationName: "Metformin",
    dosage: "500 mg tablet",
    route: "oral",
    frequency: "1 tablet twice daily",
    quantityPrescribed: 60,
    refillsRemaining: 5,
    prescribedDate: "2024-10-10",
    startDate: "2024-10-10",
    prescribingDoctor: "Dr. Emily Chen",
    pharmacyName: "IEHP Pharmacy - San Bernardino",
    pharmacyAddress: "303 E Vanderbilt Way, San Bernardino, CA 92408",
    pharmacyPhone: "(909) 890-2000",
    instructions: "Take with meals to reduce stomach upset.",
    status: "active",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "Monitor blood glucose levels",
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste"],
    interactions: ["Alcohol", "Contrast dye", "Topiramate"],
    ndc: "0093-1077-01",
    expirationDate: "2025-10-10",
  },
  rx_004: {
    id: "rx_004",
    medicationName: "Amoxicillin",
    dosage: "500 mg capsule",
    route: "oral",
    frequency: "1 capsule three times daily",
    quantityPrescribed: 21,
    refillsRemaining: 0,
    prescribedDate: "2024-12-01",
    startDate: "2024-12-01",
    endDate: "2024-12-08",
    prescribingDoctor: "Dr. Mike Johnson",
    pharmacyName: "Walgreens #5678",
    pharmacyAddress: "456 Oak Street, Riverside, CA 92502",
    pharmacyPhone: "(951) 555-0456",
    instructions:
      "Take with food. Complete entire course even if feeling better.",
    status: "completed",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "7-day course for bacterial infection",
    sideEffects: ["Nausea", "Diarrhea", "Allergic reactions"],
    interactions: ["Warfarin", "Methotrexate", "Oral contraceptives"],
    ndc: "0781-1506-05",
    expirationDate: "2025-12-01",
  },
  rx_005: {
    id: "rx_005",
    medicationName: "Hydrocodone/Acetaminophen",
    dosage: "5/325 mg tablet",
    route: "oral",
    frequency: "1 tablet every 4-6 hours as needed",
    quantityPrescribed: 20,
    refillsRemaining: 0,
    prescribedDate: "2024-11-15",
    startDate: "2024-11-15",
    endDate: "2024-11-25",
    prescribingDoctor: "Dr. Sarah Wilson",
    pharmacyName: "IEHP Pharmacy - Riverside",
    pharmacyAddress: "10800 Magnolia Ave, Riverside, CA 92505",
    pharmacyPhone: "(951) 788-3000",
    instructions:
      "Take only as needed for severe pain. Do not exceed 6 tablets in 24 hours.",
    status: "expired",
    isControlledSubstance: true,
    refillRequested: false,
    notes: "Post-surgical pain management",
    sideEffects: [
      "Drowsiness",
      "Constipation",
      "Nausea",
      "Respiratory depression",
    ],
    interactions: ["Alcohol", "Benzodiazepines", "MAO inhibitors"],
    ndc: "0406-0512-01",
    expirationDate: "2024-11-25",
  },
};

interface PrescriptionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PrescriptionDetailPage({
  params,
}: PrescriptionDetailPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const resolvedParams = React.use(params);
  const prescriptionId = resolvedParams.id;
  const prescription = mockPrescriptions[prescriptionId];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading prescription details..." />;
  }

  if (!prescription) {
    return (
      <DashboardLayout
        title="Prescription Not Found"
        description="The requested prescription could not be found"
      >
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <ExclamationTriangleIcon className="w-16 h-16 text-gray-400" />
          <p className="text-gray-500 text-lg">Prescription not found</p>
          <Button onClick={() => router.push("/prescriptions")}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Prescriptions
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handlePrintDetails = () => {
    window.print();
  };

  const handleGetDirections = () => {
    if (prescription.pharmacyAddress) {
      const address = encodeURIComponent(prescription.pharmacyAddress);
      window.open(`https://maps.google.com?q=${address}`, "_blank");
    }
  };

  const getStatusIcon = () => {
    switch (prescription.status) {
      case "active":
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case "pending_refill":
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-blue-600" />;
      case "expired":
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />;
      case "canceled":
        return <XMarkIcon className="w-5 h-5 text-red-600" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (prescription.status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending_refill":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout
      title="Prescription Details"
      description="View and manage your prescription information"
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
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
              >
                {prescription.status.charAt(0).toUpperCase() +
                  prescription.status.slice(1).replace("_", " ")}
              </span>
              {prescription.isControlledSubstance && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Controlled Substance
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {prescription.status === "active" &&
              prescription.refillsRemaining > 0 && (
                <Link href={`/prescriptions/refill?id=${prescription.id}`}>
                  <Button className="w-full sm:w-auto">
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    Request Refill
                  </Button>
                </Link>
              )}
            {prescription.status === "pending_refill" && (
              <Button variant="outline" disabled className="w-full sm:w-auto">
                <ClockIcon className="w-4 h-4 mr-2" />
                Refill Pending
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handlePrintDetails}
              className="w-full sm:w-auto"
            >
              <PrinterIcon className="w-4 h-4 mr-2" />
              Print Details
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Medication Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Medication Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {prescription.medicationName}
                    </h3>
                    <p className="text-gray-600">{prescription.dosage}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Administration
                      </h4>
                      <p className="text-gray-900 capitalize">
                        {prescription.route}
                      </p>
                      <p className="text-gray-900">{prescription.frequency}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Quantity & Refills
                      </h4>
                      <p className="text-gray-900">
                        Quantity: {prescription.quantityPrescribed}
                      </p>
                      <p
                        className={`${
                          prescription.refillsRemaining <= 1
                            ? "text-orange-600"
                            : "text-gray-900"
                        }`}
                      >
                        Refills remaining: {prescription.refillsRemaining}
                      </p>
                    </div>
                  </div>

                  {prescription.ndc && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        NDC Number
                      </h4>
                      <p className="text-gray-900 font-mono">
                        {prescription.ndc}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prescribing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Prescribing Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Prescribed by
                    </h4>
                    <p className="text-gray-900 font-medium">
                      {prescription.prescribingDoctor}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Dates
                    </h4>
                    <p className="text-gray-900">
                      Prescribed:{" "}
                      {new Date(
                        prescription.prescribedDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-gray-900">
                      Start:{" "}
                      {new Date(prescription.startDate).toLocaleDateString()}
                    </p>
                    {prescription.endDate && (
                      <p className="text-gray-900">
                        End:{" "}
                        {new Date(prescription.endDate).toLocaleDateString()}
                      </p>
                    )}
                    {prescription.expirationDate && (
                      <p className="text-gray-900">
                        Expires:{" "}
                        {new Date(
                          prescription.expirationDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions & Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Instructions & Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Patient Instructions
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {prescription.instructions}
                    </p>
                  </div>

                  {prescription.notes && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Provider Notes
                      </h4>
                      <p className="text-gray-700 text-sm">
                        {prescription.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy Information */}
            {prescription.pharmacyName && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BuildingStorefrontIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Pharmacy Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {prescription.pharmacyName}
                      </h4>
                    </div>

                    {prescription.pharmacyAddress && (
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-900">
                            {prescription.pharmacyAddress}
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 hover:text-blue-700"
                            onClick={handleGetDirections}
                          >
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    )}

                    {prescription.pharmacyPhone && (
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {prescription.pharmacyPhone}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Side Effects & Interactions */}
            {(prescription.sideEffects?.length ||
              prescription.interactions?.length) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-orange-600" />
                    Safety Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prescription.sideEffects &&
                      prescription.sideEffects.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">
                            Common Side Effects
                          </h4>
                          <div className="space-y-2">
                            {prescription.sideEffects.map((effect, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">
                                  {effect}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {prescription.interactions &&
                      prescription.interactions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">
                            Drug Interactions
                          </h4>
                          <div className="space-y-2">
                            {prescription.interactions.map(
                              (interaction, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                                  <span className="text-sm text-gray-700">
                                    {interaction}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prescription.status === "active" &&
                  prescription.refillsRemaining > 0 && (
                    <Button className="w-full justify-start">
                      <ArrowPathIcon className="w-4 h-4 mr-2" />
                      Request Refill
                    </Button>
                  )}

                {prescription.status === "pending_refill" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    disabled
                  >
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Refill Pending
                  </Button>
                )}

                <Button variant="outline" className="w-full justify-start">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Contact Pharmacy
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Contact Doctor
                </Button>
              </CardContent>
            </Card>

            {/* Important Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-orange-600" />
                  Important Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Take exactly as prescribed by your doctor
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Do not share this medication with others
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Store at room temperature away from moisture
                    </p>
                  </div>
                  {prescription.isControlledSubstance && (
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        This is a controlled substance - keep secure
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Medication Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheckIcon className="w-4 h-4 mr-2" />
                  Report Side Effects
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
