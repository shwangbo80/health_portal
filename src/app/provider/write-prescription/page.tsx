"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pill,
  Search,
  User,
  AlertTriangle,
  ArrowLeft,
  Save,
  Info,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  allergies: string[];
  currentMedications: string[];
}

interface Medication {
  id: string;
  name: string;
  genericName: string;
  strength: string[];
  dosageForm: string;
  category: string;
  isControlled: boolean;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Rodriguez",
    age: 40,
    allergies: ["Penicillin"],
    currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
  },
  {
    id: "2",
    name: "James Thompson",
    age: 64,
    allergies: [],
    currentMedications: ["Albuterol Inhaler", "Prednisone 10mg"],
  },
];

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Metformin",
    genericName: "Metformin HCl",
    strength: ["500mg", "850mg", "1000mg"],
    dosageForm: "Tablet",
    category: "Antidiabetic",
    isControlled: false,
  },
  {
    id: "2",
    name: "Lisinopril",
    genericName: "Lisinopril",
    strength: ["5mg", "10mg", "20mg", "40mg"],
    dosageForm: "Tablet",
    category: "ACE Inhibitor",
    isControlled: false,
  },
  {
    id: "3",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    strength: ["10mg", "20mg", "40mg", "80mg"],
    dosageForm: "Tablet",
    category: "Statin",
    isControlled: false,
  },
  {
    id: "4",
    name: "Oxycodone",
    genericName: "Oxycodone HCl",
    strength: ["5mg", "10mg", "15mg", "20mg"],
    dosageForm: "Tablet",
    category: "Opioid Analgesic",
    isControlled: true,
  },
];

const mockPharmacies = [
  {
    id: "1",
    name: "CVS Pharmacy #1234",
    address: "123 Main St, San Bernardino, CA",
  },
  { id: "2", name: "Walgreens #5678", address: "456 Oak Ave, Riverside, CA" },
  { id: "3", name: "Rite Aid #9012", address: "789 Pine St, Redlands, CA" },
];

export default function WritePrescription() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [medicationSearch, setMedicationSearch] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    strength: "",
    quantity: "",
    frequency: "twice-daily",
    duration: "30",
    instructions: "",
    indication: "",
    refills: "3",
    pharmacy: "",
    substitution: true,
    priority: "routine",
  });

  const [drugInteractions, setDrugInteractions] = useState<string[]>([]);
  const [allergyWarnings, setAllergyWarnings] = useState<string[]>([]);

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMedications = mockMedications.filter(
    (medication) =>
      medication.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
      medication.genericName
        .toLowerCase()
        .includes(medicationSearch.toLowerCase())
  );

  const checkInteractions = (medication: Medication, patient: Patient) => {
    // Mock drug interaction checking
    const interactions: string[] = [];
    const allergies: string[] = [];

    if (
      medication.name === "Metformin" &&
      patient.currentMedications.some((med) => med.includes("Insulin"))
    ) {
      interactions.push("Monitor blood glucose closely when used with insulin");
    }

    if (
      medication.name.toLowerCase().includes("penicillin") &&
      patient.allergies.includes("Penicillin")
    ) {
      allergies.push("SEVERE ALLERGY: Patient allergic to Penicillin");
    }

    setDrugInteractions(interactions);
    setAllergyWarnings(allergies);
  };

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
    if (selectedPatient) {
      checkInteractions(medication, selectedPatient);
    }
  };

  const handlePrescribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Prescribing:", {
      patient: selectedPatient,
      medication: selectedMedication,
      prescription: prescriptionData,
    });
    alert("Prescription sent successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/provider">
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Write New Prescription
          </h1>
          <p className="text-gray-600">Prescribe medication for a patient</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Patient
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {selectedPatient ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedPatient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Age: {selectedPatient.age}
                    </p>
                  </div>
                  <button
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Change
                  </button>
                </div>

                {selectedPatient.allergies.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-red-700 mb-1">
                      Allergies:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPatient.currentMedications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Current Medications:
                    </h4>
                    <div className="space-y-1">
                      {selectedPatient.currentMedications.map(
                        (medication, index) => (
                          <p key={index} className="text-sm text-gray-600">
                            {medication}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <h4 className="font-medium text-gray-900">
                      {patient.name}
                    </h4>
                    <p className="text-sm text-gray-600">Age: {patient.age}</p>
                    {patient.allergies.length > 0 && (
                      <p className="text-xs text-red-600">
                        Allergies: {patient.allergies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Medication Selection */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Select Medication
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search medications..."
                value={medicationSearch}
                onChange={(e) => setMedicationSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {selectedMedication ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedMedication.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedMedication.genericName}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedMedication.isControlled
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedMedication.category}
                      {selectedMedication.isControlled && " (Controlled)"}
                    </span>
                  </div>
                  <button
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setSelectedMedication(null)}
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Form: {selectedMedication.dosageForm}
                </p>
                <p className="text-sm text-gray-600">
                  Available strengths: {selectedMedication.strength.join(", ")}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleMedicationSelect(medication)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">
                        {medication.name}
                      </h4>
                      {medication.isControlled && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Controlled
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {medication.genericName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {medication.category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Prescription Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Save className="h-5 w-5" />
              Prescription Details
            </h3>
          </div>
          <div className="p-6">
            {/* Warnings */}
            {(allergyWarnings.length > 0 || drugInteractions.length > 0) && (
              <div className="mb-4 space-y-2">
                {allergyWarnings.map((warning, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <p className="text-sm font-medium text-red-800">
                        {warning}
                      </p>
                    </div>
                  </div>
                ))}
                {drugInteractions.map((interaction, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800">{interaction}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handlePrescribe} className="space-y-4">
              {selectedMedication && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Strength
                    </label>
                    <select
                      value={prescriptionData.strength}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          strength: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select strength</option>
                      {selectedMedication.strength.map((strength) => (
                        <option key={strength} value={strength}>
                          {strength}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={prescriptionData.quantity}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          quantity: e.target.value,
                        })
                      }
                      placeholder="30"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={prescriptionData.frequency}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      frequency: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="once-daily">Once daily</option>
                  <option value="twice-daily">Twice daily</option>
                  <option value="three-times-daily">Three times daily</option>
                  <option value="four-times-daily">Four times daily</option>
                  <option value="as-needed">As needed</option>
                  <option value="every-other-day">Every other day</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={prescriptionData.duration}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      duration: e.target.value,
                    })
                  }
                  placeholder="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  value={prescriptionData.instructions}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      instructions: e.target.value,
                    })
                  }
                  placeholder="Take with food..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indication
                </label>
                <input
                  type="text"
                  value={prescriptionData.indication}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      indication: e.target.value,
                    })
                  }
                  placeholder="e.g., Diabetes Type 2"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refills
                  </label>
                  <select
                    value={prescriptionData.refills}
                    onChange={(e) =>
                      setPrescriptionData({
                        ...prescriptionData,
                        refills: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="0">0 refills</option>
                    <option value="1">1 refill</option>
                    <option value="2">2 refills</option>
                    <option value="3">3 refills</option>
                    <option value="5">5 refills</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={prescriptionData.priority}
                    onChange={(e) =>
                      setPrescriptionData({
                        ...prescriptionData,
                        priority: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="stat">STAT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pharmacy
                </label>
                <select
                  value={prescriptionData.pharmacy}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      pharmacy: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select pharmacy</option>
                  {mockPharmacies.map((pharmacy) => (
                    <option key={pharmacy.id} value={pharmacy.id}>
                      {pharmacy.name} - {pharmacy.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="substitution"
                  checked={prescriptionData.substitution}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      substitution: e.target.checked,
                    })
                  }
                />
                <label htmlFor="substitution" className="text-sm text-gray-700">
                  Allow generic substitution
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !selectedPatient ||
                    !selectedMedication ||
                    !prescriptionData.strength ||
                    !prescriptionData.quantity ||
                    !prescriptionData.indication ||
                    !prescriptionData.pharmacy
                  }
                >
                  <Save className="mr-2 h-4 w-4" />
                  Send Prescription
                </button>
                <Link href="/provider">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
