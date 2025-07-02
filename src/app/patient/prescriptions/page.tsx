"use client";

import { useState } from "react";
import {
  Pill,
  Search,
  RefreshCw,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Plus,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Mock prescriptions data
interface ActivePrescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescriber: string;
  prescribedDate: string;
  refillsLeft: number;
  nextRefillDate: string;
  pharmacy: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
  instructions: string;
  condition: string;
}

const mockPrescriptions = {
  active: [
    {
      id: "1",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescriber: "Dr. Sarah Wilson",
      prescribedDate: "2024-12-15",
      refillsLeft: 2,
      nextRefillDate: "2025-01-20",
      pharmacy: "CVS Pharmacy",
      pharmacyAddress: "123 Main St, San Bernardino, CA",
      pharmacyPhone: "(909) 555-0123",
      instructions: "Take with food. Monitor blood pressure regularly.",
      condition: "Hypertension",
    },
    {
      id: "2",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescriber: "Dr. Mike Johnson",
      prescribedDate: "2024-11-28",
      refillsLeft: 0,
      nextRefillDate: "Renewal needed",
      pharmacy: "Walgreens",
      pharmacyAddress: "456 Oak Ave, San Bernardino, CA",
      pharmacyPhone: "(909) 555-0456",
      instructions: "Take with meals to reduce stomach upset.",
      condition: "Type 2 Diabetes",
    },
    {
      id: "3",
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescriber: "Dr. Sarah Wilson",
      prescribedDate: "2024-12-01",
      refillsLeft: 5,
      nextRefillDate: "2025-02-15",
      pharmacy: "CVS Pharmacy",
      pharmacyAddress: "123 Main St, San Bernardino, CA",
      pharmacyPhone: "(909) 555-0123",
      instructions: "Take at bedtime. Report any muscle pain.",
      condition: "High Cholesterol",
    },
  ],
  past: [
    {
      id: "4",
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      prescriber: "Dr. Mike Johnson",
      prescribedDate: "2024-10-15",
      completedDate: "2024-10-25",
      pharmacy: "CVS Pharmacy",
      condition: "Bacterial Infection",
    },
  ],
};

export default function PatientPrescriptions() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [searchTerm, setSearchTerm] = useState("");

  const currentPrescriptions =
    activeTab === "active" ? mockPrescriptions.active : mockPrescriptions.past;

  const filteredPrescriptions = currentPrescriptions.filter(
    (prescription) =>
      prescription.medication
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.prescriber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRefillStatus = (refillsLeft: number) => {
    if (refillsLeft === 0) {
      return {
        color: "bg-red-100 text-red-800",
        text: "Renewal Needed",
        icon: AlertCircle,
      };
    } else if (refillsLeft <= 1) {
      return {
        color: "bg-yellow-100 text-yellow-800",
        text: "Low Refills",
        icon: AlertCircle,
      };
    } else {
      return {
        color: "bg-green-100 text-green-800",
        text: "Active",
        icon: CheckCircle,
      };
    }
  };

  const handleRefillRequest = (prescriptionId: string) => {
    console.log("Requesting refill for prescription:", prescriptionId);
    // In a real app, this would make an API call
  };

  const handleRenewalRequest = (prescriptionId: string) => {
    console.log("Requesting renewal for prescription:", prescriptionId);
    // In a real app, this would make an API call
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600">Manage your medications and refills</p>
        </div>
        <Link href="/patient/prescriptions/request">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="mr-2 h-4 w-4" />
            Request New Prescription
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search medications, prescribers, or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active Medications ({mockPrescriptions.active.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "past"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Past Medications ({mockPrescriptions.past.length})
          </button>
        </nav>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-4">
                  {/* Medication Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Pill className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {prescription.medication} {prescription.dosage}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {prescription.frequency}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {activeTab === "active" && (
                        <>
                          {(() => {
                            const activePrescription = prescription as ActivePrescription;
                            const status = getRefillStatus(
                              activePrescription.refillsLeft
                            );
                            const StatusIcon = status.icon;
                            return (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {status.text}
                              </span>
                            );
                          })()}
                        </>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 text-gray-700">{prescription.condition}</span>
                    </div>
                  </div>

                  {/* Prescription Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-400" />
                      <span>Dr. {prescription.prescriber}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>
                        Prescribed:{" "}
                        {new Date(
                          prescription.prescribedDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    {activeTab === "active" && (
                      <div className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 text-gray-400" />
                        <span>
                          {activeTab === "active" &&
                          "refillsLeft" in prescription
                            ? prescription.refillsLeft === 0
                              ? "Renewal needed"
                              : `${prescription.refillsLeft} refills left`
                            : "Completed"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pharmacy Info */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Pharmacy Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{prescription.pharmacy}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <span>
                          {"pharmacyPhone" in prescription
                            ? prescription.pharmacyPhone
                            : "N/A"}
                        </span>
                      </div>
                      <div className="sm:col-span-2 text-xs text-gray-500">
                        {"pharmacyAddress" in prescription
                          ? prescription.pharmacyAddress
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  {"instructions" in prescription &&
                    prescription.instructions && (
                      <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                        <strong>Instructions:</strong>{" "}
                        {prescription.instructions}
                      </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full lg:w-auto">
                  {activeTab === "active" ? (
                    <>
                      <Link href={`/prescriptions/${prescription.id}`}>
                        <button className="w-full lg:w-auto inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </button>
                      </Link>
                      {activeTab === "active" &&
                      "refillsLeft" in prescription &&
                      prescription.refillsLeft > 0 ? (
                        <button
                          className="w-full lg:w-auto inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={() => handleRefillRequest(prescription.id)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Request Refill
                        </button>
                      ) : (
                        <button
                          className="w-full lg:w-auto inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => handleRenewalRequest(prescription.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" /                        >
                          Request Renewal
                        </button>
                      )}
                    </>
                  ) : (
                    <button className="w-full lg:w-auto inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View History
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrescriptions.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="py-12 text-center">
            <Pill className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No {activeTab} prescriptions found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms."
                : activeTab === "active"
                ? "You don't have any active prescriptions."
                : "You don't have any past prescriptions recorded."}
            </p>
            {activeTab === "active" && !searchTerm && (
              <div className="mt-6">
                <Link href="/patient/prescriptions/request">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Your First Prescription
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {activeTab === "active" && filteredPrescriptions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/patient/prescriptions/refill">
                <button className="w-full h-16 flex flex-col items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <RefreshCw className="h-5 w-5 mb-1" />
                  <span>Refill Multiple</span>
                </button>
              </Link>
              <Link href="/patient/prescriptions/transfer">
                <button className="w-full h-16 flex flex-col items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MapPin className="h-5 w-5 mb-1" />
                  <span>Transfer Pharmacy</span>
                </button>
              </Link>
              <Link href="/patient/prescriptions/history">
                <button className="w-full h-16 flex flex-col items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Clock className="h-5 w-5 mb-1" />
                  <span>View Full History</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
