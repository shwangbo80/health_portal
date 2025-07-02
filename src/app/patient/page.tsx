"use client";

import { useState } from "react";
import {
  Calendar,
  MessageSquare,
  Pill,
  TestTube,
  Clock,
  Heart,
  User,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Mock data for patient dashboard
const mockPatientData = {
  name: "John Smith",
  memberNumber: "IEH123456789",
  upcomingAppointments: [
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "2025-01-15",
      time: "2:30 PM",
      type: "telehealth",
      status: "confirmed",
    },
    {
      id: "2",
      doctorName: "Dr. Mike Johnson",
      specialty: "Primary Care",
      date: "2025-01-22",
      time: "10:00 AM",
      type: "in-person",
      status: "confirmed",
    },
  ],
  recentMessages: [
    {
      id: "1",
      from: "Dr. Sarah Wilson",
      subject: "Lab Results Available",
      date: "2025-01-08",
      unread: true,
    },
    {
      id: "2",
      from: "IEHP Admin",
      subject: "Appointment Reminder",
      date: "2025-01-07",
      unread: false,
    },
  ],
  activePrescriptions: [
    {
      id: "1",
      medication: "Lisinopril 10mg",
      prescriber: "Dr. Wilson",
      refillsLeft: 2,
      nextRefill: "2025-01-20",
    },
    {
      id: "2",
      medication: "Metformin 500mg",
      prescriber: "Dr. Johnson",
      refillsLeft: 0,
      nextRefill: "Needs renewal",
    },
  ],
  recentLabResults: [
    {
      id: "1",
      test: "Lipid Panel",
      date: "2025-01-05",
      status: "completed",
      critical: false,
    },
    {
      id: "2",
      test: "HbA1c",
      date: "2025-01-05",
      status: "completed",
      critical: false,
    },
  ],
  healthMetrics: {
    lastVisit: "2024-12-15",
    nextAppointment: "2025-01-15",
    activeConditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
  },
};

export default function PatientDashboard() {
  const [currentTime] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {mockPatientData.name}
          </h1>
          <p className="text-gray-600">
            Member ID: {mockPatientData.memberNumber}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/patient/appointments/book">
          <div className="h-20 w-full flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 cursor-pointer">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Book Appointment</span>
          </div>
        </Link>
        <Link href="/patient/messages">
          <div className="h-20 w-full flex flex-col items-center justify-center space-y-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer">
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm">Messages</span>
          </div>
        </Link>
        <Link href="/patient/prescriptions/refill">
          <div className="h-20 w-full flex flex-col items-center justify-center space-y-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer">
            <Pill className="h-6 w-6" />
            <span className="text-sm">Refill Rx</span>
          </div>
        </Link>
        <Link href="/patient/lab-results">
          <div className="h-20 w-full flex flex-col items-center justify-center space-y-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer">
            <TestTube className="h-6 w-6" />
            <span className="text-sm">Lab Results</span>
          </div>
        </Link>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Appointments
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockPatientData.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {appointment.doctorName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.specialty}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} at{" "}
                        {appointment.time}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 bg-white">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200">
                      View Details
                    </button>
                    {appointment.type === "telehealth" && (
                      <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
                        Join Call
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/patient/appointments">
              <div className="w-full mt-4 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer py-2 px-4 text-center flex items-center justify-center">
                View All Appointments
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Heart className="mr-2 h-5 w-5" />
              Health Summary
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Active Conditions
              </h4>
              <div className="space-y-1">
                {mockPatientData.healthMetrics.activeConditions.map(
                  (condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 bg-white mr-1"
                    >
                      {condition}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
              <div className="space-y-1">
                {mockPatientData.healthMetrics.allergies.map(
                  (allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-300 text-red-700 bg-red-50 mr-1"
                    >
                      {allergy}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Last visit:{" "}
                {new Date(
                  mockPatientData.healthMetrics.lastVisit
                ).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Next:{" "}
                {new Date(
                  mockPatientData.healthMetrics.nextAppointment
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <MessageSquare className="mr-2 h-5 w-5" />
              Recent Messages
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {mockPatientData.recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {message.from}
                      </p>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/patient/messages">
              <div className="w-full mt-4 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer py-2 px-4 text-center flex items-center justify-center">
                View All Messages
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Pill className="mr-2 h-5 w-5" />
              Active Prescriptions
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {mockPatientData.activePrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {prescription.medication}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Prescribed by {prescription.prescriber}
                      </p>
                      <p className="text-xs text-gray-500">
                        {prescription.refillsLeft > 0
                          ? `${prescription.refillsLeft} refills left`
                          : "Needs renewal"}
                      </p>
                    </div>
                    {prescription.refillsLeft === 0 ? (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <button className="w-full mt-2 px-3 py-1 text-sm border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200">
                    {prescription.refillsLeft > 0
                      ? "Request Refill"
                      : "Request Renewal"}
                  </button>
                </div>
              ))}
            </div>
            <Link href="/patient/prescriptions">
              <div className="w-full mt-4 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer py-2 px-4 text-center flex items-center justify-center">
                View All Prescriptions
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Lab Results */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <TestTube className="mr-2 h-5 w-5" />
              Recent Lab Results
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {mockPatientData.recentLabResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{result.test}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                  {result.critical ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
            <Link href="/patient/lab-results">
              <div className="w-full mt-4 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 cursor-pointer py-2 px-4 text-center flex items-center justify-center">
                View All Results
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
