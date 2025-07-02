"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  ClipboardDocumentListIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ArrowPathIcon,
  InformationCircleIcon
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
  instructions: string;
  status: "active" | "completed" | "expired" | "canceled" | "pending_refill";
  isControlledSubstance: boolean;
  refillRequested: boolean;
  notes?: string;
}

const mockPrescriptions: Prescription[] = [
  {
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
    instructions: "Take with or without food. Take at the same time each day.",
    status: "active",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "Monitor cholesterol levels monthly"
  },
  {
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
    instructions: "Take in the morning. Monitor blood pressure regularly.",
    status: "pending_refill",
    isControlledSubstance: false,
    refillRequested: true,
    notes: "Patient responding well to treatment"
  },
  {
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
    instructions: "Take with meals to reduce stomach upset.",
    status: "active",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "Monitor blood glucose levels"
  },
  {
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
    instructions: "Take with food. Complete entire course even if feeling better.",
    status: "completed",
    isControlledSubstance: false,
    refillRequested: false,
    notes: "7-day course for bacterial infection"
  },
  {
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
    instructions: "Take only as needed for severe pain. Do not exceed 6 tablets in 24 hours.",
    status: "expired",
    isControlledSubstance: true,
    refillRequested: false,
    notes: "Post-surgical pain management"
  }
];

export default function PrescriptionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "pending_refill" | "completed" | "expired">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesFilter = filter === "all" || prescription.status === filter;
    const matchesSearch = prescription.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prescription.prescribingDoctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activePrescriptions = mockPrescriptions.filter(rx => rx.status === "active");
  const pendingRefills = mockPrescriptions.filter(rx => rx.status === "pending_refill");
  const needingRefill = mockPrescriptions.filter(rx => rx.refillsRemaining <= 1 && rx.status === "active");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending_refill":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "pending_refill":
        return <ClockIcon className="w-4 h-4" />;
      case "completed":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "expired":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "canceled":
        return <XMarkIcon className="w-4 h-4" />;
      default:
        return <ClipboardDocumentListIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading your prescriptions..." />;
  }

  return (
    <DashboardLayout 
      title="My Prescriptions" 
      description="Manage your medications and refills"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="hidden">
          <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600 mt-2">Manage your medications and refills</p>
        </div>
        <div className="ml-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link href="/prescriptions/refill">
            <Button variant="outline" className="flex items-center w-full sm:w-auto">
              <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Request Refill</span>
              <span className="sm:hidden">Refill</span>
            </Button>
          </Link>
          <Link href="/prescriptions/request">
            <Button className="flex items-center w-full sm:w-auto">
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Request Prescription</span>
              <span className="sm:hidden">Request</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{activePrescriptions.length}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingRefills.length}</p>
                <p className="text-sm text-gray-600">Pending Refill</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{needingRefill.length}</p>
                <p className="text-sm text-gray-600">Need Refill Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ClipboardDocumentListIcon className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockPrescriptions.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 sm:py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm min-h-[48px] sm:min-h-[40px]"
            >
              <option value="all">All Prescriptions</option>
              <option value="active">Active</option>
              <option value="pending_refill">Pending Refill</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
            <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{prescription.medicationName}</h3>
                      <p className="text-sm text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {prescription.isControlledSubstance && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          Controlled
                        </span>
                      )}
                      <div className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center space-x-1 ${getStatusColor(prescription.status)}`}>
                        {getStatusIcon(prescription.status)}
                        <span className="capitalize">{prescription.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-sm">
                      <p className="text-gray-500">Prescribed by</p>
                      <p className="font-medium text-gray-900">{prescription.prescribingDoctor}</p>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-500">Refills Remaining</p>
                      <p className={`font-medium ${prescription.refillsRemaining <= 1 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {prescription.refillsRemaining}
                      </p>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-500">Prescribed Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(prescription.prescribedDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-500">Pharmacy</p>
                      <p className="font-medium text-gray-900">{prescription.pharmacyName || 'Not selected'}</p>
                    </div>
                  </div>

                  {prescription.instructions && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{prescription.instructions}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <Link href={`/prescriptions/${prescription.id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      <InformationCircleIcon className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  
                  {prescription.status === "active" && prescription.refillsRemaining > 0 && (
                    <Link href={`/prescriptions/refill?id=${prescription.id}`}>
                      <Button size="sm" className="w-full">
                        <ArrowPathIcon className="w-4 h-4 mr-1" />
                        Request Refill
                      </Button>
                    </Link>
                  )}

                  {prescription.status === "pending_refill" && (
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      <ClockIcon className="w-4 h-4 mr-1" />
                      Refill Pending
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12">
          <ClipboardDocumentListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filter !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "You don&apos;t have any prescriptions yet"
            }
          </p>
          <Link href="/prescriptions/request">
            <Button>
              <PlusIcon className="w-5 h-5 mr-2" />
              Request New Prescription
            </Button>
          </Link>
        </div>
      )}

      {/* Bottom padding for fixed navigation */}
      <div className="h-20 lg:h-0"></div>
    </DashboardLayout>
  );
}
