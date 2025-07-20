"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading-spinner";
import {
  VideoCameraIcon,
  CalendarIcon,
  PhoneIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock upcoming telehealth appointments
const upcomingTelehealth = [
  {
    id: "apt_001",
    doctorName: "Dr. Sarah Wilson",
    doctorSpecialty: "Cardiology",
    date: "2025-01-15",
    time: "2:30 PM",
    status: "upcoming",
  },
  {
    id: "apt_005",
    doctorName: "Dr. Emily Chen",
    doctorSpecialty: "Dermatology",
    date: "2025-01-20",
    time: "11:00 AM",
    status: "upcoming",
  },
];

export default function TelehealthPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading telehealth..." />;
  }

  return (
    <DashboardLayout
      title="Telehealth"
      description="Virtual consultations and video appointments"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <VideoCameraIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start Video Call
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Join your scheduled appointment
            </p>
            <Button className="w-full">Join Call</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <CalendarIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Schedule Telehealth
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Book a virtual appointment
            </p>
            <Link href="/dashboard/appointments/book">
              <Button variant="outline" className="w-full">
                Schedule Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Test Connection
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Check your audio and video
            </p>
            <Button variant="outline" className="w-full">
              Test Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Telehealth Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <VideoCameraIcon className="w-6 h-6 text-blue-600 mr-2" />
            Upcoming Telehealth Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTelehealth.length > 0 ? (
            <div className="space-y-4">
              {upcomingTelehealth.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.doctorName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.doctorSpecialty}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button size="sm">
                        <VideoCameraIcon className="w-4 h-4 mr-1" />
                        Join Call
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <VideoCameraIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No telehealth appointments
              </h3>
              <p className="text-gray-500 mb-4">
                You don&apos;t have any upcoming virtual appointments scheduled
              </p>
              <Link href="/dashboard/appointments/book">
                <Button>Schedule Telehealth Appointment</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technology Requirements */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Telehealth Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Technical Requirements
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stable internet connection (minimum 1 Mbps)</li>
                <li>• Device with camera and microphone</li>
                <li>• Updated web browser (Chrome, Firefox, Safari)</li>
                <li>• Quiet, private environment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Before Your Appointment
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Test your camera and microphone</li>
                <li>• Prepare your questions and medical history</li>
                <li>• Have your insurance card ready</li>
                <li>• Ensure good lighting in your space</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
