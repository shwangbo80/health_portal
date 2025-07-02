"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Phone,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";

// Mock patient appointments data
const mockAppointments = {
  upcoming: [
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "2025-01-15",
      time: "2:30 PM",
      type: "telehealth",
      status: "confirmed",
      location: "Video Call",
      notes: "Follow-up for blood pressure medication adjustment",
    },
    {
      id: "2",
      doctorName: "Dr. Mike Johnson",
      specialty: "Primary Care",
      date: "2025-01-22",
      time: "10:00 AM",
      type: "in-person",
      status: "confirmed",
      location: "IEHP Medical Center - Room 201",
      notes: "Annual physical examination",
    },
  ],
  past: [
    {
      id: "3",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "2024-12-15",
      time: "3:00 PM",
      type: "in-person",
      status: "completed",
      location: "IEHP Medical Center - Room 305",
      notes: "Blood pressure check and medication review",
    },
    {
      id: "4",
      doctorName: "Dr. Lisa Chen",
      specialty: "Endocrinology",
      date: "2024-11-28",
      time: "1:15 PM",
      type: "telehealth",
      status: "completed",
      location: "Video Call",
      notes: "Diabetes management consultation",
    },
  ],
};

export default function PatientAppointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "telehealth" ? (
      <Video className="h-4 w-4 text-blue-600" />
    ) : (
      <MapPin className="h-4 w-4 text-green-600" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">
            View and manage your healthcare appointments
          </p>
        </div>
        <Link href="/patient/appointments/book">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Upcoming ({mockAppointments.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "past"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Past Appointments ({mockAppointments.past.length})
          </button>
        </nav>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {(activeTab === "upcoming"
          ? mockAppointments.upcoming
          : mockAppointments.past
        ).map((appointment) => (
          <Card
            key={appointment.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  {/* Doctor and Specialty */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {getTypeIcon(appointment.type)}
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Date, Time, Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      {appointment.type === "telehealth" ? (
                        <Video className="mr-2 h-4 w-4 text-gray-400" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      )}
                      <span className="truncate">{appointment.location}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <strong>Notes:</strong> {appointment.notes}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full lg:w-auto">
                  {activeTab === "upcoming" ? (
                    <>
                      <Link href={`/patient/appointments/${appointment.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 lg:flex-none"
                        >
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      {appointment.type === "telehealth" && (
                        <Button size="sm" className="flex-1 lg:flex-none">
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </Button>
                      )}
                      {appointment.type === "in-person" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 lg:flex-none"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call Office
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Link href={`/patient/appointments/${appointment.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 lg:flex-none"
                        >
                          View Summary
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 lg:flex-none"
                      >
                        Book Follow-up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {(activeTab === "upcoming"
        ? mockAppointments.upcoming
        : mockAppointments.past
      ).length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No {activeTab} appointments
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "upcoming"
                ? "You don't have any upcoming appointments scheduled."
                : "You don't have any past appointments recorded."}
            </p>
            {activeTab === "upcoming" && (
              <div className="mt-6">
                <Link href="/patient/appointments/book">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Book Your First Appointment
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
