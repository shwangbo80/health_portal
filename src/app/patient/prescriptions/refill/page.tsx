"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  AlertCircle,
  Search,
  ChevronLeft,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import Link from "next/link";

// Mock prescription data
interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  prescriber: string;
  prescribedDate: string;
  lastRefill: string;
  nextRefillDate: string;
  refillsRemaining: number;
  totalRefills: number;
  quantity: number;
  daysSupply: number;
  instructions: string;
  status: "active" | "expired" | "pending";
  canRefill: boolean;
  pharmacy: string;
  ndc: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    medication: "Lisinopril",
    dosage: "10mg",
    prescriber: "Dr. Sarah Wilson",
    prescribedDate: "2024-10-15",
    lastRefill: "2024-12-15",
    nextRefillDate: "2025-01-15",
    refillsRemaining: 2,
    totalRefills: 5,
    quantity: 30,
    daysSupply: 30,
    instructions: "Take once daily with or without food",
    status: "active",
    canRefill: true,
    pharmacy: "IEHP Pharmacy - Main",
    ndc: "12345-678-90",
  },
  {
    id: "2",
    medication: "Metformin",
    dosage: "500mg",
    prescriber: "Dr. Mike Johnson",
    prescribedDate: "2024-09-20",
    lastRefill: "2024-12-20",
    nextRefillDate: "2025-01-20",
    refillsRemaining: 0,
    totalRefills: 3,
    quantity: 60,
    daysSupply: 30,
    instructions: "Take twice daily with meals",
    status: "active",
    canRefill: false,
    pharmacy: "IEHP Pharmacy - Downtown",
    ndc: "98765-432-10",
  },
  {
    id: "3",
    medication: "Atorvastatin",
    dosage: "20mg",
    prescriber: "Dr. Sarah Wilson",
    prescribedDate: "2024-11-01",
    lastRefill: "2024-12-01",
    nextRefillDate: "2025-01-01",
    refillsRemaining: 4,
    totalRefills: 5,
    quantity: 30,
    daysSupply: 30,
    instructions: "Take once daily in the evening",
    status: "active",
    canRefill: true,
    pharmacy: "IEHP Pharmacy - Main",
    ndc: "11111-222-33",
  },
  {
    id: "4",
    medication: "Omeprazole",
    dosage: "40mg",
    prescriber: "Dr. Emily Davis",
    prescribedDate: "2024-08-15",
    lastRefill: "2024-11-15",
    nextRefillDate: "2024-12-15",
    refillsRemaining: 1,
    totalRefills: 3,
    quantity: 30,
    daysSupply: 30,
    instructions: "Take once daily before breakfast",
    status: "expired",
    canRefill: false,
    pharmacy: "IEHP Pharmacy - Specialty",
    ndc: "44444-555-66",
  },
];

const pharmacyLocations = [
  {
    id: "main",
    name: "IEHP Pharmacy - Main",
    address: "123 Main Street, Los Angeles, CA 90210",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
  },
  {
    id: "downtown",
    name: "IEHP Pharmacy - Downtown",
    address: "456 Downtown Blvd, Los Angeles, CA 90015",
    phone: "(555) 987-6543",
    hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
  },
  {
    id: "specialty",
    name: "IEHP Pharmacy - Specialty",
    address: "789 Medical Center Dr, Los Angeles, CA 90024",
    phone: "(555) 456-7890",
    hours: "Mon-Fri: 9AM-5PM",
  },
];

export default function PrescriptionRefill() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>(
    []
  );
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [showRefillableOnly, setShowRefillableOnly] = useState(true);

  const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
    const matchesSearch = prescription.medication
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRefillable = showRefillableOnly
      ? prescription.canRefill
      : true;
    return matchesSearch && matchesRefillable;
  });

  const handlePrescriptionSelect = (prescriptionId: string) => {
    setSelectedPrescriptions((prev) =>
      prev.includes(prescriptionId)
        ? prev.filter((id) => id !== prescriptionId)
        : [...prev, prescriptionId]
    );
  };

  const handleSelectAll = () => {
    const refillableIds = filteredPrescriptions
      .filter((p) => p.canRefill)
      .map((p) => p.id);
    setSelectedPrescriptions(
      selectedPrescriptions.length === refillableIds.length ? [] : refillableIds
    );
  };

  const handleRefillRequest = () => {
    if (selectedPrescriptions.length === 0) {
      alert("Please select at least one prescription to refill.");
      return;
    }
    if (!selectedPharmacy) {
      alert("Please select a pharmacy for pickup.");
      return;
    }
    // In a real app, this would make an API call
    alert(
      `Refill request submitted for ${selectedPrescriptions.length} prescription(s). You will receive a notification when ready for pickup.`
    );
    // Reset form
    setSelectedPrescriptions([]);
    setSelectedPharmacy("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canRefillPrescription = (prescription: Prescription) => {
    return prescription.canRefill && prescription.status === "active";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Prescription Refills
          </h1>
          <p className="text-gray-600">Request refills for your medications</p>
        </div>
        <Link href="/patient/prescriptions">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Prescriptions
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="refillable"
                checked={showRefillableOnly}
                onChange={(e) => setShowRefillableOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="refillable" className="text-sm text-gray-700">
                Show refillable only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescription Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Select Prescriptions to Refill</CardTitle>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedPrescriptions.length ===
              filteredPrescriptions.filter((p) => p.canRefill).length
                ? "Deselect All"
                : "Select All Refillable"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedPrescriptions.includes(prescription.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                } ${
                  !canRefillPrescription(prescription)
                    ? "opacity-60"
                    : "cursor-pointer hover:border-gray-300"
                }`}
                onClick={() =>
                  canRefillPrescription(prescription) &&
                  handlePrescriptionSelect(prescription.id)
                }
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center pt-1">
                    <input
                      type="checkbox"
                      checked={selectedPrescriptions.includes(prescription.id)}
                      onChange={() => handlePrescriptionSelect(prescription.id)}
                      disabled={!canRefillPrescription(prescription)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {prescription.medication} {prescription.dosage}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Prescribed by {prescription.prescriber}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {prescription.instructions}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                        {!canRefillPrescription(prescription) && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {prescription.refillsRemaining === 0
                              ? "No refills remaining"
                              : "Cannot refill"}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-gray-500">Last Refilled:</span>
                        <p className="font-medium">
                          {new Date(
                            prescription.lastRefill
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Refill Date:</span>
                        <p className="font-medium">
                          {new Date(
                            prescription.nextRefillDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          Refills Remaining:
                        </span>
                        <p className="font-medium">
                          {prescription.refillsRemaining} of{" "}
                          {prescription.totalRefills}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <p className="font-medium">
                          {prescription.quantity} ({prescription.daysSupply}{" "}
                          days)
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        Current Pharmacy: {prescription.pharmacy}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No prescriptions found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy Selection */}
      {selectedPrescriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Pickup Pharmacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pharmacyLocations.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  onClick={() => setSelectedPharmacy(pharmacy.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPharmacy === pharmacy.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{pharmacy.address}</span>
                    </div>
                    <p>📞 {pharmacy.phone}</p>
                    <p>🕒 {pharmacy.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary and Submit */}
      {selectedPrescriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Refill Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Selected Prescriptions ({selectedPrescriptions.length})
                </h4>
                <div className="space-y-2">
                  {selectedPrescriptions.map((id) => {
                    const prescription = mockPrescriptions.find(
                      (p) => p.id === id
                    );
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>
                          {prescription?.medication} {prescription?.dosage}
                        </span>
                        <span className="text-gray-600">
                          Qty: {prescription?.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedPharmacy && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Pickup Location
                  </h4>
                  <p className="text-sm">
                    {
                      pharmacyLocations.find((p) => p.id === selectedPharmacy)
                        ?.name
                    }
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRefillRequest}
                  disabled={!selectedPharmacy}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Submit Refill Request</span>
                </Button>
              </div>

              <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Important Notes:</p>
                    <ul className="mt-1 space-y-1 list-disc list-inside ml-4">
                      <li>
                        Refill requests are typically processed within 24 hours
                      </li>
                      <li>
                        You will receive a notification when your prescription
                        is ready
                      </li>
                      <li>Bring a valid ID when picking up your medications</li>
                      <li>Contact your pharmacy if you have any questions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
