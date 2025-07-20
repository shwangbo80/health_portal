"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  MapPinIcon,
  PlusIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Appointment } from "@/types";

const mockAppointments: Appointment[] = [
  {
    id: "apt_001",
    doctorId: "doc_001",
    doctorName: "Dr. Sarah Wilson",
    doctorSpecialty: "Cardiology",
    date: "2025-01-15",
    time: "2:30 PM",
    type: "telehealth",
    status: "upcoming",
    notes: "Follow-up consultation for heart health monitoring.",
  },
  {
    id: "apt_002",
    doctorId: "doc_002",
    doctorName: "Dr. Mike Johnson",
    doctorSpecialty: "Primary Care",
    date: "2025-01-22",
    time: "10:00 AM",
    type: "in-person",
    status: "upcoming",
    notes: "Annual physical examination and health screening.",
  },
  {
    id: "apt_003",
    doctorId: "doc_001",
    doctorName: "Dr. Sarah Wilson",
    doctorSpecialty: "Cardiology",
    date: "2024-12-20",
    time: "3:00 PM",
    type: "telehealth",
    status: "completed",
    notes: "Initial cardiology consultation. Reviewed test results.",
  },
  {
    id: "apt_004",
    doctorId: "doc_003",
    doctorName: "Dr. Emily Chen",
    doctorSpecialty: "Dermatology",
    date: "2025-02-05",
    time: "11:30 AM",
    type: "in-person",
    status: "upcoming",
    notes: "Routine skin check and mole examination.",
  },
];

export default function AppointmentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch =
      appointment.doctorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.doctorSpecialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const upcomingAppointments = mockAppointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const completedAppointments = mockAppointments.filter(
    (apt) => apt.status === "completed"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <ClockIcon className="w-4 h-4" />;
      case "completed":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "cancelled":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading your appointments..." />;
  }

  return (
    <DashboardLayout
      title="My Appointments"
      description="Manage your upcoming and past appointments"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="hidden">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">
            Manage your upcoming and past appointments
          </p>
        </div>
        <div className="ml-auto">
          <Link href="/dashboard/appointments/book">
            <Button className="flex items-center">
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingAppointments.length}
                </p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {completedAppointments.length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarIcon className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAppointments.length}
                </p>
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
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-2 border bg-white  border-gray-500 rounded-md text-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 min-h-[48px] sm:min-h-[40px]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as
                    | "all"
                    | "upcoming"
                    | "completed"
                    | "cancelled"
                )
              }
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 sm:py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-md min-h-[48px] sm:min-h-[40px] text-gray-700"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {appointment.doctorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.doctorSpecialty}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center space-x-1 ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{appointment.time}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      {appointment.type === "telehealth" ? (
                        <>
                          <VideoCameraIcon className="w-4 h-4 mr-2" />
                          <span>Telehealth</span>
                        </>
                      ) : (
                        <>
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          <span>In-person</span>
                        </>
                      )}
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  {appointment.status === "upcoming" && (
                    <>
                      {appointment.type === "telehealth" ? (
                        <Link
                          href={`/dashboard/appointments/${appointment.id}`}
                        >
                          <Button size="sm" className="w-full">
                            <VideoCameraIcon className="w-4 h-4 mr-1" />
                            Join Call
                          </Button>
                        </Link>
                      ) : (
                        <Link
                          href={`/dashboard/appointments/${appointment.id}`}
                        >
                          <Button size="sm" className="w-full">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </Link>
                      )}
                      <Button size="sm" variant="outline" className="w-full">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Reschedule
                      </Button>
                    </>
                  )}

                  {appointment.status === "completed" && (
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  )}

                  {/* Add a general View Details button for all appointments */}
                  <Link href={`/dashboard/appointments/${appointment.id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-blue-600 hover:text-blue-700"
                    >
                      <InformationCircleIcon className="w-4 h-4 mr-1" />
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You don't have any appointments scheduled yet"}
          </p>
          <Link href="/dashboard/appointments/book">
            <Button>
              <PlusIcon className="w-5 h-5 mr-2" />
              Book Your First Appointment
            </Button>
          </Link>
        </div>
      )}

      {/* Bottom padding for fixed navigation */}
      <div className="h-20 lg:h-0"></div>
    </DashboardLayout>
  );
}
