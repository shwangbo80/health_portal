"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { Doctor } from "@/types";

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    rating: 4.9,
    imageUrl: "/placeholder-doctor.jpg",
    availability: ["2025-01-15", "2025-01-16", "2025-01-17"],
  },
  {
    id: "2",
    name: "Dr. Mike Johnson",
    specialty: "Primary Care",
    rating: 4.8,
    imageUrl: "/placeholder-doctor.jpg",
    availability: ["2025-01-14", "2025-01-15", "2025-01-16"],
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Dermatology",
    rating: 4.9,
    imageUrl: "/placeholder-doctor.jpg",
    availability: ["2025-01-15", "2025-01-17", "2025-01-18"],
  },
];

const specialties = [
  "Primary Care",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "Pediatrics",
  "Gynecology",
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search for a Doctor</h2>
        <p className="text-gray-600">Find a doctor by name, specialty, or condition</p>
      </div>

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by symptom, specialty, or doctor name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 min-h-[44px]"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Popular Specialties</p>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty === selectedSpecialty ? "" : specialty)}
              className={`p-3 text-sm rounded-lg border text-left transition-colors min-h-[44px] cursor-pointer hover:cursor-pointer ${
                selectedSpecialty === specialty
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400 text-gray-700"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full"
        disabled={!searchQuery && !selectedSpecialty}
      >
        Find Doctors
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
          <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
        </div>
        <Button variant="outline" onClick={() => setStep(1)}>
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <Card 
            key={doctor.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedDoctor?.id === doctor.id ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 font-medium text-sm sm:text-lg">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{doctor.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">{doctor.rating}</span>
                    <span className="text-xs sm:text-sm text-gray-400 ml-2 hidden xs:inline">Next available: Today</span>
                  </div>
                </div>
                <div className="text-right">
                  <Button 
                    size="sm" 
                    variant={selectedDoctor?.id === doctor.id ? "default" : "outline"}
                    className="min-h-[40px] text-xs sm:text-sm"
                  >
                    {selectedDoctor?.id === doctor.id ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        onClick={() => setStep(3)} 
        className="w-full"
        disabled={!selectedDoctor}
      >
        Continue to Scheduling
      </Button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
          <p className="text-gray-600">Choose your preferred appointment slot</p>
        </div>
        <Button variant="outline" onClick={() => setStep(2)}>
          Back to Doctors
        </Button>
      </div>

      {selectedDoctor && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Available Dates</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {selectedDoctor?.availability.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`p-3 text-xs sm:text-sm rounded-lg border transition-colors min-h-[44px] cursor-pointer hover:cursor-pointer ${
                selectedDate === date
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400 text-gray-700"
              }`}
            >
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Available Times</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 text-xs sm:text-sm rounded-lg border transition-colors min-h-[44px] cursor-pointer hover:cursor-pointer ${
                  selectedTime === time
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button 
        onClick={() => setStep(4)} 
        className="w-full"
        disabled={!selectedDate || !selectedTime}
      >
        Continue to Confirmation
      </Button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Confirm Appointment</h2>
        <p className="text-gray-600">Review your appointment details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Doctor</p>
            <p className="text-gray-900">{selectedDoctor?.name}</p>
            <p className="text-sm text-gray-600">{selectedDoctor?.specialty}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Date & Time</p>
            <p className="text-gray-900">
              {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric',
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-gray-900">{selectedTime}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Type</p>
            <p className="text-gray-900">Telehealth Video Call</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button onClick={() => setStep(5)} className="w-full">
          Confirm Appointment
        </Button>
        <Button variant="outline" onClick={() => setStep(3)} className="w-full">
          Back to Scheduling
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Appointment Confirmed!</h2>
        <p className="text-gray-600">Your appointment has been successfully scheduled</p>
      </div>

      <Card>
        <CardContent className="p-6 text-left">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Appointment with</p>
              <p className="text-gray-900">{selectedDoctor?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Date & Time</p>
              <p className="text-gray-900">
                {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })} at {selectedTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button 
          className="w-full"
          onClick={() => router.push('/appointments')}
        >
          Add to Calendar
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => router.push('/appointments')}
        >
          View All Appointments
        </Button>
      </div>
    </div>
  );

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading appointment booking..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </div>
    </div>
  );
}
