"use client";

import { useState } from "react";
import {
  TestTube,
  Search,
  Calendar,
  User,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

// Mock lab results data
const mockLabResults = [
  {
    id: "1",
    testName: "Comprehensive Metabolic Panel",
    orderDate: "2025-01-05",
    collectionDate: "2025-01-06",
    resultDate: "2025-01-07",
    status: "completed",
    orderedBy: "Dr. Sarah Wilson",
    category: "Chemistry",
    critical: false,
    results: [
      {
        name: "Glucose",
        value: "95",
        unit: "mg/dL",
        normal: "70-100",
        status: "normal",
        trend: "stable",
      },
      {
        name: "BUN",
        value: "18",
        unit: "mg/dL",
        normal: "7-20",
        status: "normal",
        trend: "up",
      },
      {
        name: "Creatinine",
        value: "1.1",
        unit: "mg/dL",
        normal: "0.6-1.2",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Sodium",
        value: "142",
        unit: "mEq/L",
        normal: "136-145",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Potassium",
        value: "4.2",
        unit: "mEq/L",
        normal: "3.5-5.0",
        status: "normal",
        trend: "stable",
      },
    ],
    notes: "All values within normal range. Continue current medications.",
    nextAction: "Routine follow-up in 3 months",
  },
  {
    id: "2",
    testName: "Lipid Panel",
    orderDate: "2025-01-05",
    collectionDate: "2025-01-06",
    resultDate: "2025-01-07",
    status: "completed",
    orderedBy: "Dr. Sarah Wilson",
    category: "Chemistry",
    critical: false,
    results: [
      {
        name: "Total Cholesterol",
        value: "195",
        unit: "mg/dL",
        normal: "<200",
        status: "normal",
        trend: "down",
      },
      {
        name: "LDL Cholesterol",
        value: "115",
        unit: "mg/dL",
        normal: "<100",
        status: "high",
        trend: "stable",
      },
      {
        name: "HDL Cholesterol",
        value: "55",
        unit: "mg/dL",
        normal: ">40",
        status: "normal",
        trend: "up",
      },
      {
        name: "Triglycerides",
        value: "125",
        unit: "mg/dL",
        normal: "<150",
        status: "normal",
        trend: "down",
      },
    ],
    notes: "LDL slightly elevated. Consider dietary modifications.",
    nextAction: "Recheck in 6 weeks after dietary changes",
  },
  {
    id: "3",
    testName: "HbA1c",
    orderDate: "2024-12-28",
    collectionDate: "2024-12-29",
    resultDate: "2024-12-30",
    status: "completed",
    orderedBy: "Dr. Mike Johnson",
    category: "Endocrinology",
    critical: false,
    results: [
      {
        name: "Hemoglobin A1c",
        value: "6.8",
        unit: "%",
        normal: "<7.0",
        status: "normal",
        trend: "down",
      },
    ],
    notes: "Good diabetes control. Keep up current regimen.",
    nextAction: "Next HbA1c in 3 months",
  },
  {
    id: "4",
    testName: "Complete Blood Count",
    orderDate: "2024-12-20",
    collectionDate: "2024-12-21",
    resultDate: "2024-12-21",
    status: "completed",
    orderedBy: "Dr. Mike Johnson",
    category: "Hematology",
    critical: false,
    results: [
      {
        name: "White Blood Cells",
        value: "7.2",
        unit: "K/uL",
        normal: "4.0-11.0",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Red Blood Cells",
        value: "4.5",
        unit: "M/uL",
        normal: "4.2-5.4",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        normal: "12.0-16.0",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Hematocrit",
        value: "42.1",
        unit: "%",
        normal: "36.0-46.0",
        status: "normal",
        trend: "stable",
      },
      {
        name: "Platelets",
        value: "285",
        unit: "K/uL",
        normal: "150-450",
        status: "normal",
        trend: "stable",
      },
    ],
    notes: "All blood counts within normal limits.",
    nextAction: "Routine monitoring as needed",
  },
];

export default function PatientLabResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const filteredResults = mockLabResults.filter((result) => {
    const matchesSearch =
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.orderedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || result.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getResultColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-red-600 font-semibold";
      case "low":
        return "text-blue-600 font-semibold";
      case "critical":
        return "text-red-700 font-bold";
      case "normal":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-blue-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleDownloadReport = (resultId: string) => {
    console.log("Downloading report for:", resultId);
    // In a real app, this would download the PDF report
  };

  const handleViewDetails = (resultId: string) => {
    setSelectedResult(selectedResult === resultId ? null : resultId);
  };

  const getOverallStatus = (results: Array<{ status: string }>) => {
    const hasHigh = results.some(
      (r) => r.status === "high" || r.status === "critical"
    );
    const hasLow = results.some((r) => r.status === "low");

    if (hasHigh)
      return {
        status: "attention",
        icon: AlertTriangle,
        color: "text-orange-600",
      };
    if (hasLow)
      return { status: "review", icon: AlertTriangle, color: "text-blue-600" };
    return { status: "normal", icon: CheckCircle, color: "text-green-600" };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Results</h1>
          <p className="text-gray-600">
            View your laboratory test results and trends
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Download className="mr-2 h-4 w-4" />
          Download All Reports
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Results
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockLabResults.length}
                </p>
              </div>
              <TestTube className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    mockLabResults.filter(
                      (r) => new Date(r.resultDate) > new Date("2025-01-01")
                    ).length
                  }
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Need Attention
                </p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Normal</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockLabResults.length - 1}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search by test name, doctor, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lab Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => {
          const overallStatus = getOverallStatus(result.results);
          const StatusIcon = overallStatus.icon;
          const isExpanded = selectedResult === result.id;

          return (
            <div
              key={result.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <TestTube className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {result.testName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {result.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              result.status
                            )}`}
                          >
                            {result.status}
                          </span>
                          <div
                            className={`flex items-center gap-1 ${overallStatus.color}`}
                          >
                            <StatusIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {overallStatus.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-400" />
                          <span>Ordered by {result.orderedBy}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span>
                            Collected:{" "}
                            {new Date(
                              result.collectionDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          <span>
                            Results:{" "}
                            {new Date(result.resultDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => handleViewDetails(result.id)}
                        className="flex-1 lg:flex-none inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={() => handleDownloadReport(result.id)}
                        className="flex-1 lg:flex-none inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t pt-4 space-y-4">
                      {/* Results Table */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Test Results
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Test</th>
                                <th className="text-left py-2">Result</th>
                                <th className="text-left py-2">Normal Range</th>
                                <th className="text-left py-2">Status</th>
                                <th className="text-left py-2">Trend</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.results.map((test, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2 font-medium">
                                    {test.name}
                                  </td>
                                  <td className="py-2">
                                    <span
                                      className={getResultColor(test.status)}
                                    >
                                      {test.value} {test.unit}
                                    </span>
                                  </td>
                                  <td className="py-2 text-gray-600">
                                    {test.normal}
                                  </td>
                                  <td className="py-2">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        test.status === "normal"
                                          ? "border-green-200 text-green-700"
                                          : test.status === "high"
                                          ? "border-red-200 text-red-700"
                                          : test.status === "low"
                                          ? "border-blue-200 text-blue-700"
                                          : "border-gray-200 text-gray-700"
                                      }`}
                                    >
                                      {test.status}
                                    </span>
                                  </td>
                                  <td className="py-2">
                                    {getTrendIcon(test.trend)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Notes and Next Action */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {result.notes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-1">
                              Doctor&apos;s Notes
                            </h4>
                            <p className="text-sm text-blue-800">
                              {result.notes}
                            </p>
                          </div>
                        )}
                        {result.nextAction && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-1">
                              Next Action
                            </h4>
                            <p className="text-sm text-green-800">
                              {result.nextAction}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResults.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="py-12 text-center">
            <TestTube className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No lab results found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You don't have any lab results yet."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
