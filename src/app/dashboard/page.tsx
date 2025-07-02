"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  CalendarIcon, 
  PlusIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading your dashboard..." />;
  }

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome, Soo</h1>
        <p className="text-gray-600 mt-1 sm:mt-2">Here&apos;s your health overview for today</p>
      </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Next Appointment */}
          <Link href="/appointments/apt_001">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-900">Next Appointment</CardTitle>
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">Jan 15, 2025</p>
                  <p className="text-sm text-gray-600">2:30 PM</p>
                  <p className="text-sm text-gray-600">Dr. Sarah Wilson</p>
                  <p className="text-xs text-blue-600">Cardiology</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* My Prescriptions */}
          <Link href="/prescriptions">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-900">My Prescriptions</CardTitle>
                  <DocumentTextIcon className="w-5 h-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">3 Active</p>
                  <p className="text-sm text-gray-600">2 Need Refill</p>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    View all prescriptions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Health Records */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-900">Health Records</CardTitle>
                <DocumentTextIcon className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">12 Records</p>
                <p className="text-sm text-gray-600">Last updated: Jan 10</p>
                <Button variant="link" className="p-0 h-auto text-xs">
                  View all records
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Book Appointment */}
          <Link href="/appointments/book">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-blue-900">Book Appointment</CardTitle>
                  <PlusIcon className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm text-blue-700">Schedule a new appointment with your healthcare provider</p>
                  <Button size="sm" className="mt-2">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Messages</span>
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">SW</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                    <p className="text-sm text-gray-500 truncate">Your test results are ready for review...</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">MJ</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Dr. Mike Johnson</p>
                    <p className="text-sm text-gray-500 truncate">Appointment reminder for tomorrow...</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
              <Link href="/messages">
                <Button variant="outline" className="w-full mt-4">
                  View All Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Appointments</span>
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/appointments/apt_001">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                      <p className="text-sm text-gray-600">Jan 15, 2025 at 2:30 PM</p>
                      <p className="text-xs text-blue-600">Cardiology • Telehealth</p>
                    </div>
                  </div>
                </Link>
                <Link href="/appointments/apt_002">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Dr. Mike Johnson</p>
                      <p className="text-sm text-gray-600">Jan 22, 2025 at 10:00 AM</p>
                      <p className="text-xs text-gray-600">Primary Care • In-person</p>
                    </div>
                  </div>
                </Link>
              </div>
              <Link href="/appointments">
                <Button variant="outline" className="w-full mt-4">
                  View All Appointments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
}
