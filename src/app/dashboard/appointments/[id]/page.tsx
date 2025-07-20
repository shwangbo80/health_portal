"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  VideoCameraIcon,
  DocumentTextIcon,
  PhotoIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PrinterIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// Mock appointment data - in a real app this would come from an API
const mockAppointments = {
  apt_001: {
    id: "apt_001",
    doctorName: "Dr. Sarah Wilson",
    doctorSpecialty: "Cardiology",
    doctorImage: "/placeholder-doctor.jpg",
    doctorPhone: "(555) 123-4567",
    doctorEmail: "sarah.wilson@iehp.com",
    date: "2025-01-15",
    time: "2:30 PM",
    endTime: "3:00 PM",
    type: "telehealth",
    status: "upcoming",
    duration: "30 minutes",
    reason: "Follow-up consultation for heart health",
    symptoms: ["Chest pain", "Shortness of breath"],
    instructions:
      "Please have your blood pressure log ready for review. Take medications as prescribed.",
    hospital: {
      name: "IEHP Medical Center - Riverside",
      address: "10800 Magnolia Ave, Riverside, CA 92505",
      phone: "(951) 788-3000",
      department: "Cardiology Department - 3rd Floor",
      parkingInfo:
        "Free parking available in Structure A. Enter from Magnolia Ave.",
      checkInTime: "2:00 PM",
      estimatedWaitTime: "15-20 minutes",
    },
    insurance: {
      provider: "IEHP",
      memberID: "IEH123456789",
      groupNumber: "GRP001",
      copay: "$25.00",
      authorization: "AUTH-2025-001234",
    },
    telehealth: {
      platform: "IEHP Secure Video",
      joinLink: "https://video.iehp.com/room/apt_001",
      testLink: "https://video.iehp.com/test",
      requirements: [
        "Stable internet connection",
        "Camera and microphone",
        "Quiet environment",
      ],
    },
    preparation: [
      "Complete pre-visit questionnaire",
      "Gather current medications list",
      "Prepare blood pressure log",
      "Have insurance card ready",
    ],
  },
  apt_002: {
    id: "apt_002",
    doctorName: "Dr. Mike Johnson",
    doctorSpecialty: "Primary Care",
    doctorImage: "/placeholder-doctor.jpg",
    doctorPhone: "(555) 987-6543",
    doctorEmail: "mike.johnson@iehp.com",
    date: "2025-01-18",
    time: "10:00 AM",
    endTime: "10:30 AM",
    type: "in-person",
    status: "upcoming",
    duration: "30 minutes",
    reason: "Annual physical examination",
    symptoms: [],
    instructions: "Please fast for 12 hours before appointment for blood work.",
    hospital: {
      name: "IEHP Health Center - San Bernardino",
      address: "303 E Vanderbilt Way, San Bernardino, CA 92408",
      phone: "(909) 890-2000",
      department: "Primary Care - 1st Floor, Suite 101",
      parkingInfo: "Validated parking available. Bring ticket to reception.",
      checkInTime: "9:30 AM",
      estimatedWaitTime: "10-15 minutes",
    },
    insurance: {
      provider: "IEHP",
      memberID: "IEH123456789",
      groupNumber: "GRP001",
      copay: "$0.00",
      authorization: "Not required",
    },
    telehealth: undefined,
    preparation: [
      "Bring photo ID and insurance card",
      "Complete health history form",
      "List all current medications",
      "Fast for 12 hours (water only)",
    ],
  },
  apt_003: {
    id: "apt_003",
    doctorName: "Dr. Sarah Wilson",
    doctorSpecialty: "Cardiology",
    doctorImage: "/placeholder-doctor.jpg",
    doctorPhone: "(555) 123-4567",
    doctorEmail: "sarah.wilson@iehp.com",
    date: "2024-12-20",
    time: "3:00 PM",
    endTime: "3:30 PM",
    type: "telehealth",
    status: "completed",
    duration: "30 minutes",
    reason: "Initial cardiology consultation. Reviewed test results.",
    symptoms: ["Irregular heartbeat", "Fatigue"],
    instructions:
      "Continue current medications. Follow-up required in 3 months.",
    hospital: {
      name: "IEHP Medical Center - Riverside",
      address: "10800 Magnolia Ave, Riverside, CA 92505",
      phone: "(951) 788-3000",
      department: "Cardiology Department - 3rd Floor",
      parkingInfo:
        "Free parking available in Structure A. Enter from Magnolia Ave.",
      checkInTime: "2:30 PM",
      estimatedWaitTime: "15-20 minutes",
    },
    insurance: {
      provider: "IEHP",
      memberID: "IEH123456789",
      groupNumber: "GRP001",
      copay: "$25.00",
      authorization: "AUTH-2024-001122",
    },
    telehealth: {
      platform: "IEHP Secure Video",
      joinLink: "https://video.iehp.com/room/apt_003",
      testLink: "https://video.iehp.com/test",
      requirements: [
        "Stable internet connection",
        "Camera and microphone",
        "Quiet environment",
      ],
    },
    preparation: [
      "Review previous test results",
      "List any new symptoms",
      "Prepare questions for doctor",
      "Have insurance card ready",
    ],
  },
  apt_004: {
    id: "apt_004",
    doctorName: "Dr. Emily Chen",
    doctorSpecialty: "Dermatology",
    doctorImage: "/placeholder-doctor.jpg",
    doctorPhone: "(555) 456-7890",
    doctorEmail: "emily.chen@iehp.com",
    date: "2025-02-05",
    time: "11:30 AM",
    endTime: "12:00 PM",
    type: "in-person",
    status: "upcoming",
    duration: "30 minutes",
    reason: "Routine skin check and mole examination",
    symptoms: [],
    instructions:
      "Avoid makeup or lotions on day of appointment. Wear clothing that allows easy access to areas of concern.",
    hospital: {
      name: "IEHP Specialty Center - Ontario",
      address: "1201 S Bon View Ave, Ontario, CA 91761",
      phone: "(909) 456-7000",
      department: "Dermatology Department - 2nd Floor, Suite 201",
      parkingInfo:
        "Free patient parking in front lot. Additional parking in rear structure.",
      checkInTime: "11:00 AM",
      estimatedWaitTime: "10-15 minutes",
    },
    insurance: {
      provider: "IEHP",
      memberID: "IEH123456789",
      groupNumber: "GRP001",
      copay: "$35.00",
      authorization: "AUTH-2025-002345",
    },
    telehealth: undefined,
    preparation: [
      "Bring photo ID and insurance card",
      "List any skin concerns or changes",
      "Remove makeup and nail polish",
      "Wear comfortable, removable clothing",
    ],
  },
};

interface AppointmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AppointmentDetailPage({
  params,
}: AppointmentDetailPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  const resolvedParams = React.use(params);
  const appointmentId = resolvedParams.id;
  const appointment =
    mockAppointments[appointmentId as keyof typeof mockAppointments];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading appointment details..." />;
  }

  if (!appointment) {
    return (
      <DashboardLayout
        title="Appointment Not Found"
        description="The requested appointment could not be found"
      >
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <ExclamationTriangleIcon className="w-16 h-16 text-gray-400" />
          <p className="text-gray-500 text-lg">Appointment not found</p>
          <Button onClick={() => router.push("/appointments")}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Appointments
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleJoinCall = () => {
    setIsVideoCallActive(true);
    console.log("Joining video call...");
  };

  const handleEndCall = () => {
    setIsVideoCallActive(false);
    console.log("Ending video call...");
  };

  const handlePrintDetails = () => {
    window.print();
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(appointment.hospital.address);
    window.open(`https://maps.google.com?q=${address}`, "_blank");
  };

  const getStatusIcon = () => {
    switch (appointment.status) {
      case "upcoming":
        return <ClockIcon className="w-5 h-5 text-blue-600" />;
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout
      title="Appointment Details"
      description="View and manage your appointment information"
    >
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/appointments")}
              className="flex-shrink-0"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Appointments
            </Button>
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
            </div>
          </div>
          <Button variant="outline" onClick={handlePrintDetails}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Healthcare Provider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-xl">
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
                    <p className="text-gray-600">
                      {appointment.doctorSpecialty}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span>{appointment.doctorPhone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <VideoCameraIcon className="w-4 h-4 mr-2" />
                        <span>
                          Available for {appointment.type} consultation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Appointment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Date & Time
                    </h4>
                    <p className="text-gray-900">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-900 font-medium">
                      {appointment.time} - {appointment.endTime}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.duration}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Visit Type
                    </h4>
                    <p className="text-gray-900 capitalize font-medium">
                      {appointment.type}
                    </p>
                    {appointment.type === "telehealth" && (
                      <p className="text-sm text-gray-500">
                        Virtual consultation via secure video
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </h4>
                  <p className="text-gray-900">{appointment.reason}</p>
                  {appointment.symptoms.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        Symptoms
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {appointment.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {appointment.instructions && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Special Instructions
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {appointment.instructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Information (for in-person appointments) */}
            {appointment.type === "in-person" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Location & Check-in Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {appointment.hospital.name}
                      </h4>
                      <p className="text-gray-600">
                        {appointment.hospital.department}
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900">
                          {appointment.hospital.address}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-green-900 mb-2">
                          Check-in Information
                        </h5>
                        <div className="space-y-1 text-sm text-green-800">
                          <p>
                            <strong>Arrive by:</strong>{" "}
                            {appointment.hospital.checkInTime}
                          </p>
                          <p>
                            <strong>Expected wait:</strong>{" "}
                            {appointment.hospital.estimatedWaitTime}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">
                          Parking Information
                        </h5>
                        <p className="text-sm text-blue-800">
                          {appointment.hospital.parkingInfo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {appointment.hospital.phone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Telehealth Information (for virtual appointments) */}
            {appointment.type === "telehealth" && appointment.telehealth && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <VideoCameraIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Telehealth Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isVideoCallActive ? (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <VideoCameraIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Ready to join your appointment
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Your doctor will be available at the scheduled time
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                          <Button onClick={handleJoinCall} size="lg">
                            <VideoCameraIcon className="w-5 h-5 mr-2" />
                            Join Video Call
                          </Button>
                          <Button variant="outline" size="lg">
                            Test Camera & Audio
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Technical Requirements
                        </h4>
                        <div className="space-y-2">
                          {appointment.telehealth.requirements.map(
                            (req, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {req}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                        <div className="text-white text-center">
                          <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">
                            Video Call Active
                          </p>
                          <p className="text-sm opacity-75">
                            Connected with {appointment.doctorName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3">
                        <Button variant="outline">Mute</Button>
                        <Button variant="outline">Camera Off</Button>
                        <Button variant="destructive" onClick={handleEndCall}>
                          End Call
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Insurance Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Insurance & Billing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </h4>
                    <p className="text-gray-900 font-medium">
                      {appointment.insurance.provider}
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>Member ID:</strong>{" "}
                        {appointment.insurance.memberID}
                      </p>
                      <p>
                        <strong>Group:</strong>{" "}
                        {appointment.insurance.groupNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Cost Information
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointment.insurance.copay}
                    </p>
                    <p className="text-sm text-gray-500">
                      Copay for this visit
                    </p>
                    {appointment.insurance.authorization !== "Not required" && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Authorization:</strong>{" "}
                          {appointment.insurance.authorization}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preparation Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Preparation Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointment.preparation.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Reschedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PhotoIcon className="w-4 h-4 mr-2" />
                  Share Photos
                </Button>
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
                  Contact Office
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheckIcon className="w-4 h-4 mr-2" />
                  Technical Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
