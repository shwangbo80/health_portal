"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Search,
  ChevronLeft,
  Video,
  Building,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

// Mock data for providers and time slots
interface Provider {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  nextAvailable: string;
  image: string | null;
  acceptingNewPatients: boolean;
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    location: "IEHP Main Campus",
    rating: 4.9,
    nextAvailable: "2025-01-15",
    image: null,
    acceptingNewPatients: true,
  },
  {
    id: "2",
    name: "Dr. Mike Johnson",
    specialty: "Primary Care",
    location: "IEHP Downtown Clinic",
    rating: 4.7,
    nextAvailable: "2025-01-12",
    image: null,
    acceptingNewPatients: true,
  },
  {
    id: "3",
    name: "Dr. Emily Davis",
    specialty: "Dermatology",
    location: "IEHP Specialty Center",
    rating: 4.8,
    nextAvailable: "2025-01-18",
    image: null,
    acceptingNewPatients: false,
  },
  {
    id: "4",
    name: "Dr. Robert Lee",
    specialty: "Orthopedics",
    location: "IEHP Sports Medicine",
    rating: 4.6,
    nextAvailable: "2025-01-20",
    image: null,
    acceptingNewPatients: true,
  },
];

const mockTimeSlots = {
  "2025-07-02": [
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "9:30 AM", available: false, type: "in-person" },
    { time: "10:00 AM", available: true, type: "telehealth" },
    { time: "10:30 AM", available: true, type: "in-person" },
    { time: "11:00 AM", available: false, type: "telehealth" },
    { time: "2:00 PM", available: true, type: "in-person" },
    { time: "2:30 PM", available: true, type: "telehealth" },
    { time: "3:00 PM", available: true, type: "in-person" },
    { time: "5:30 PM", available: true, type: "telehealth" },
  ],
  "2025-07-03": [
    { time: "8:30 AM", available: true, type: "in-person" },
    { time: "9:00 AM", available: true, type: "telehealth" },
    { time: "10:00 AM", available: false, type: "in-person" },
    { time: "10:30 AM", available: true, type: "in-person" },
    { time: "1:00 PM", available: true, type: "telehealth" },
    { time: "1:30 PM", available: true, type: "in-person" },
    { time: "2:00 PM", available: false, type: "telehealth" },
    { time: "3:30 PM", available: true, type: "in-person" },
    { time: "6:00 PM", available: true, type: "telehealth" },
  ],
  "2025-07-04": [
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "9:30 AM", available: true, type: "telehealth" },
    { time: "10:00 AM", available: true, type: "in-person" },
    { time: "11:00 AM", available: false, type: "telehealth" },
    { time: "2:00 PM", available: true, type: "in-person" },
    { time: "2:30 PM", available: true, type: "telehealth" },
    { time: "3:00 PM", available: false, type: "in-person" },
    { time: "4:00 PM", available: true, type: "telehealth" },
  ],
  "2025-07-07": [
    { time: "8:00 AM", available: true, type: "in-person" },
    { time: "8:30 AM", available: true, type: "telehealth" },
    { time: "9:00 AM", available: false, type: "in-person" },
    { time: "10:00 AM", available: true, type: "telehealth" },
    { time: "10:30 AM", available: true, type: "in-person" },
    { time: "1:00 PM", available: true, type: "telehealth" },
    { time: "2:00 PM", available: true, type: "in-person" },
    { time: "3:30 PM", available: true, type: "telehealth" },
    { time: "5:00 PM", available: true, type: "in-person" },
  ],
  "2025-07-08": [
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "9:30 AM", available: true, type: "telehealth" },
    { time: "10:00 AM", available: true, type: "in-person" },
    { time: "11:00 AM", available: true, type: "telehealth" },
    { time: "1:30 PM", available: false, type: "in-person" },
    { time: "2:00 PM", available: true, type: "telehealth" },
    { time: "2:30 PM", available: true, type: "in-person" },
    { time: "4:00 PM", available: true, type: "telehealth" },
    { time: "6:30 PM", available: true, type: "in-person" },
  ],
  "2025-07-09": [
    { time: "8:30 AM", available: true, type: "telehealth" },
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "10:00 AM", available: false, type: "telehealth" },
    { time: "10:30 AM", available: true, type: "in-person" },
    { time: "11:30 AM", available: true, type: "telehealth" },
    { time: "1:00 PM", available: true, type: "in-person" },
    { time: "2:30 PM", available: true, type: "telehealth" },
    { time: "3:00 PM", available: true, type: "in-person" },
    { time: "5:30 PM", available: true, type: "telehealth" },
  ],
  "2025-07-10": [
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "9:30 AM", available: false, type: "telehealth" },
    { time: "10:00 AM", available: true, type: "in-person" },
    { time: "11:00 AM", available: true, type: "telehealth" },
    { time: "1:30 PM", available: true, type: "in-person" },
    { time: "2:00 PM", available: true, type: "telehealth" },
    { time: "3:00 PM", available: false, type: "in-person" },
    { time: "4:30 PM", available: true, type: "telehealth" },
  ],
  "2025-07-11": [
    { time: "8:00 AM", available: true, type: "telehealth" },
    { time: "9:00 AM", available: true, type: "in-person" },
    { time: "9:30 AM", available: true, type: "telehealth" },
    { time: "10:30 AM", available: false, type: "in-person" },
    { time: "1:00 PM", available: true, type: "telehealth" },
    { time: "1:30 PM", available: true, type: "in-person" },
    { time: "2:30 PM", available: true, type: "telehealth" },
    { time: "3:30 PM", available: true, type: "in-person" },
    { time: "6:00 PM", available: true, type: "telehealth" },
  ],
};

const appointmentTypes = [
  { id: "routine", label: "Routine Check-up", duration: "30 min" },
  { id: "followup", label: "Follow-up Visit", duration: "15 min" },
  { id: "physical", label: "Annual Physical", duration: "60 min" },
  { id: "consultation", label: "Consultation", duration: "45 min" },
  { id: "urgent", label: "Urgent Care", duration: "20 min" },
];

const specialties = [
  "Primary Care",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Orthopedics",
  "Psychiatry",
  "Pulmonology",
  "Urology",
];

export default function BookAppointment() {
  const [step, setStep] = useState(1); // 1: Select Provider, 2: Select Date/Time, 3: Confirm
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [appointmentReason, setAppointmentReason] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  // Filter providers based on search and filters
  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty
      ? provider.specialty === selectedSpecialty
      : true;
    const matchesAvailability = showOnlyAvailable
      ? provider.acceptingNewPatients
      : true;

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  // Generate next 14 days for date selection
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends for this example
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);
    setStep(2);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(3);
  };

  const handleBookAppointment = () => {
    if (!selectedProvider || !selectedDate || !selectedTime || !selectedType) {
      alert("Please complete all required fields");
      return;
    }

    // In a real app, this would make an API call
    alert(
      `Appointment booked successfully!\n\nDetails:\n• Provider: ${
        selectedProvider.name
      }\n• Date: ${new Date(
        selectedDate
      ).toLocaleDateString()}\n• Time: ${selectedTime}\n• Type: ${
        appointmentTypes.find((t) => t.id === selectedType)?.label
      }`
    );

    // Redirect to appointments page
    setTimeout(() => {
      window.location.href = "/patient/appointments";
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="available" className="text-sm text-gray-700">
            Accepting new patients
          </label>
        </div>
      </div>

      {/* Providers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleProviderSelect(provider)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                <p className="text-blue-600 font-medium">
                  {provider.specialty}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {provider.location}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Rating: {provider.rating}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        provider.acceptingNewPatients
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {provider.acceptingNewPatients
                        ? "Accepting patients"
                        : "Not accepting"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Next available:{" "}
                  {new Date(provider.nextAvailable).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No providers found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Selected Provider */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {selectedProvider?.name}
              </h3>
              <p className="text-blue-600">{selectedProvider?.specialty}</p>
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Change Provider
          </button>
        </div>
      </div>

      {/* Appointment Type */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Appointment Type
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointmentTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedType === type.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{type.label}</span>
                  <span className="text-sm text-gray-500">{type.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Select Date</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dateOptions.slice(0, 8).map((date) => {
              const dateObj = new Date(date);
              const isSelected = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 text-center border rounded-lg transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-xs text-gray-600">
                    {dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Selection Guidance */}
      {selectedDate && !selectedType && (
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-yellow-800">
            <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-xs font-bold text-yellow-800">!</span>
            </div>
            <p className="text-sm">
              Please select an appointment type above to view available times.
            </p>
          </div>
        </div>
      )}

      {/* Time Selection */}
      {selectedDate && selectedType && (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Available Times
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(
                mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] || []
              ).map((slot, index) => (
                <button
                  key={index}
                  onClick={() =>
                    slot.available &&
                    handleDateTimeSelect(selectedDate, slot.time)
                  }
                  disabled={!slot.available}
                  className={`p-3 text-center border rounded-lg transition-colors ${
                    slot.available
                      ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    {slot.type === "telehealth" ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <Building className="w-3 h-3" />
                    )}
                    <span className="text-sm font-medium">{slot.time}</span>
                  </div>
                  <div className="text-xs text-gray-600 capitalize">
                    {slot.type}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More Available Times */}
      {selectedDate && selectedType && (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              More Available Times
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              All available time slots for{" "}
              {new Date(selectedDate).toLocaleDateString()}:
            </p>
            <div className="space-y-3">
              {/* Morning Times */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Morning (8:00 AM - 12:00 PM)
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {(
                    mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] ||
                    []
                  )
                    .filter((slot) => {
                      const hour = parseInt(slot.time.split(":")[0]);
                      const isPM = slot.time.includes("PM");
                      const time24 =
                        isPM && hour !== 12
                          ? hour + 12
                          : !isPM && hour === 12
                          ? 0
                          : hour;
                      return time24 >= 8 && time24 < 12;
                    })
                    .map((slot, index) => (
                      <button
                        key={`morning-${index}`}
                        onClick={() =>
                          slot.available &&
                          handleDateTimeSelect(selectedDate, slot.time)
                        }
                        disabled={!slot.available}
                        className={`p-3 text-center border rounded-lg transition-all duration-200 ${
                          slot.available
                            ? "border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          {slot.type === "telehealth" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <Building className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 capitalize mt-1">
                          {slot.type}
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Afternoon Times */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Afternoon (12:00 PM - 5:00 PM)
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {(
                    mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] ||
                    []
                  )
                    .filter((slot) => {
                      const hour = parseInt(slot.time.split(":")[0]);
                      const isPM = slot.time.includes("PM");
                      const time24 =
                        isPM && hour !== 12
                          ? hour + 12
                          : !isPM && hour === 12
                          ? 0
                          : hour;
                      return (
                        (time24 >= 12 && time24 < 17) || (isPM && hour === 12)
                      );
                    })
                    .map((slot, index) => (
                      <button
                        key={`afternoon-${index}`}
                        onClick={() =>
                          slot.available &&
                          handleDateTimeSelect(selectedDate, slot.time)
                        }
                        disabled={!slot.available}
                        className={`p-3 text-center border rounded-lg transition-all duration-200 ${
                          slot.available
                            ? "border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          {slot.type === "telehealth" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <Building className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 capitalize mt-1">
                          {slot.type}
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Evening Times */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Evening (5:00 PM - 8:00 PM)
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {(
                    mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] ||
                    []
                  )
                    .filter((slot) => {
                      const hour = parseInt(slot.time.split(":")[0]);
                      const isPM = slot.time.includes("PM");
                      const time24 =
                        isPM && hour !== 12
                          ? hour + 12
                          : !isPM && hour === 12
                          ? 0
                          : hour;
                      return time24 >= 17 && time24 < 20;
                    })
                    .map((slot, index) => (
                      <button
                        key={`evening-${index}`}
                        onClick={() =>
                          slot.available &&
                          handleDateTimeSelect(selectedDate, slot.time)
                        }
                        disabled={!slot.available}
                        className={`p-3 text-center border rounded-lg transition-all duration-200 ${
                          slot.available
                            ? "border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          {slot.type === "telehealth" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <Building className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 capitalize mt-1">
                          {slot.type}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedDate && selectedType && (
        <div className="flex justify-end">
          <button
            onClick={() => setStep(3)}
            disabled={!selectedTime}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              selectedTime
                ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue to Review
            <span className="ml-2">→</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Appointment Summary */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Appointment Summary
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Provider</h4>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{selectedProvider?.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedProvider?.specialty}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Date & Time</h4>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(selectedDate).toLocaleDateString()}</span>
                <Clock className="w-4 h-4 text-gray-400 ml-4" />
                <span>{selectedTime}</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Location</h4>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{selectedProvider?.location}</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Appointment Type
              </h4>
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="capitalize">
                  {appointmentTypes.find((t) => t.id === selectedType)?.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reason for Visit */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Reason for Visit (Optional)
          </h3>
        </div>
        <div className="p-6">
          <textarea
            value={appointmentReason}
            onChange={(e) => setAppointmentReason(e.target.value)}
            placeholder="Please describe the reason for your visit or any specific concerns..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Other Available Times */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Other Available Times
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Need a different time? Here are other available slots with{" "}
            {selectedProvider?.name}:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {selectedDate &&
              (mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] || [])
                .filter((slot) => slot.available && slot.time !== selectedTime)
                .slice(0, 6)
                .map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedTime(slot.time);
                    }}
                    className="p-3 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      {slot.type === "telehealth" ? (
                        <Video className="w-3 h-3" />
                      ) : (
                        <Building className="w-3 h-3" />
                      )}
                      <span className="text-sm font-medium">{slot.time}</span>
                    </div>
                    <div className="text-xs text-gray-600 capitalize">
                      {slot.type}
                    </div>
                  </button>
                ))}
          </div>
          {selectedDate &&
            (
              mockTimeSlots[selectedDate as keyof typeof mockTimeSlots] || []
            ).filter((slot) => slot.available && slot.time !== selectedTime)
              .length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No other times available for this date
              </p>
            )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setStep(2)}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Date Selection
        </button>
        <button
          onClick={handleBookAppointment}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Book an Appointment
          </h1>
          <p className="text-gray-600">
            Schedule your visit with a healthcare provider
          </p>
        </div>
        <Link href="/patient/appointments">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </button>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
