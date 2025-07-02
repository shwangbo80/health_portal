"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  DocumentTextIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { LabResult } from "@/types";

const mockLabResults: LabResult[] = [
  {
    id: "1",
    testName: "Complete Blood Count (CBC)",
    date: "2025-01-08",
    status: "completed",
    result: "Normal",
    doctorNotes: "All values within normal range. Continue current lifestyle habits.",
    doctorName: "Dr. Sarah Wilson",
  },
  {
    id: "2",
    testName: "Lipid Panel",
    date: "2025-01-08",
    status: "completed",
    result: "Slightly Elevated",
    doctorNotes: "Cholesterol levels are slightly above normal. Recommend dietary changes and follow-up in 3 months.",
    doctorName: "Dr. Sarah Wilson",
  },
  {
    id: "3",
    testName: "Thyroid Function Test",
    date: "2025-01-10",
    status: "pending",
    doctorName: "Dr. Mike Johnson",
  },
  {
    id: "4",
    testName: "Vitamin D Level",
    date: "2024-12-15",
    status: "completed",
    result: "Low",
    doctorNotes: "Vitamin D deficiency detected. Prescribed supplements. Recheck in 6 weeks.",
    doctorName: "Dr. Emily Chen",
  },
  {
    id: "5",
    testName: "HbA1c (Diabetes)",
    date: "2025-01-12",
    status: "in-progress",
    doctorName: "Dr. Sarah Wilson",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "pending":
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    case "in-progress":
      return <ExclamationTriangleIcon className="w-5 h-5 text-blue-500" />;
    default:
      return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-700 bg-green-50 border-green-200";
    case "pending":
      return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "in-progress":
      return "text-blue-700 bg-blue-50 border-blue-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

const getResultColor = (result: string) => {
  if (result === "Normal") return "text-green-600";
  if (result === "Low" || result === "High" || result.includes("Elevated")) return "text-yellow-600";
  return "text-gray-600";
};

export default function LabResultsPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading your lab results..." />;
  }

  const completedResults = mockLabResults.filter(result => result.status === "completed");
  const pendingResults = mockLabResults.filter(result => result.status !== "completed");

  return (
    <DashboardLayout 
      title="Lab Results" 
      description="View and manage your laboratory test results"
    >

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{completedResults.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Completed Tests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{pendingResults.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Pending Results</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {new Date().toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Results */}
        {pendingResults.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Pending Results</h2>
            <div className="space-y-3 sm:space-y-4">
              {pendingResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        {getStatusIcon(result.status)}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{result.testName}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Ordered by {result.doctorName}</p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Test Date: {new Date(result.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                          {result.status.charAt(0).toUpperCase() + result.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Results */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Completed Results</h2>
          <div className="space-y-3 sm:space-y-4">
            {completedResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <CardTitle className="text-lg">{result.testName}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {new Date(result.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getResultColor(result.result!)}`}>
                        {result.result}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Doctor&apos;s Notes:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {result.doctorNotes}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Reviewed by <span className="font-medium">{result.doctorName}</span>
                      </p>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                        <Button size="sm">
                          Schedule Follow-up
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {mockLabResults.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lab results yet</h3>
              <p className="text-gray-500 mb-6">Your test results will appear here once they&apos;re available</p>
              <Button>Request Lab Work</Button>
            </CardContent>
          </Card>
        )}
    </DashboardLayout>
  );
}
