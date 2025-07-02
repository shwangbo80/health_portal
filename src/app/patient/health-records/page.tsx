"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Search,
  Heart,
  Stethoscope,
  TestTube,
  Pill,
  FileImage,
} from "lucide-react";

// Mock health records data
const mockHealthRecords = [
  {
    id: "1",
    type: "Visit Summary",
    title: "Annual Physical Exam",
    provider: "Dr. Mike Johnson",
    date: "2024-12-15",
    category: "primary-care",
    summary:
      "Complete physical examination with vital signs, lab review, and preventive care discussion.",
    attachments: ["physical-exam-2024.pdf"],
  },
  {
    id: "2",
    type: "Lab Results",
    title: "Comprehensive Metabolic Panel",
    provider: "LabCorp",
    date: "2024-12-10",
    category: "lab",
    summary:
      "Blood work showing glucose, electrolytes, kidney function, and liver function tests.",
    attachments: ["lab-results-12-10-2024.pdf"],
  },
  {
    id: "3",
    type: "Imaging Report",
    title: "Chest X-Ray",
    provider: "IEHP Radiology",
    date: "2024-11-28",
    category: "imaging",
    summary:
      "Chest X-ray showing clear lungs, normal heart size, and no acute findings.",
    attachments: ["chest-xray-11-28-2024.pdf", "xray-images.dcm"],
  },
  {
    id: "4",
    type: "Consultation",
    title: "Cardiology Consultation",
    provider: "Dr. Sarah Wilson",
    date: "2024-11-15",
    category: "specialty",
    summary:
      "Evaluation for hypertension management. Blood pressure well controlled on current medications.",
    attachments: ["cardiology-consult-11-15-2024.pdf"],
  },
  {
    id: "5",
    type: "Prescription History",
    title: "Medication Changes",
    provider: "Dr. Sarah Wilson",
    date: "2024-11-15",
    category: "medication",
    summary:
      "Lisinopril dosage increased from 5mg to 10mg daily for better blood pressure control.",
    attachments: ["prescription-changes-11-15-2024.pdf"],
  },
  {
    id: "6",
    type: "Immunization Record",
    title: "Annual Flu Vaccination",
    provider: "IEHP Pharmacy",
    date: "2024-10-20",
    category: "immunization",
    summary:
      "Received 2024-2025 seasonal influenza vaccine. No adverse reactions reported.",
    attachments: ["immunization-record-2024.pdf"],
  },
];

const categories = [
  { id: "all", label: "All Records", icon: FileText },
  { id: "primary-care", label: "Primary Care", icon: Stethoscope },
  { id: "specialty", label: "Specialty Care", icon: Heart },
  { id: "lab", label: "Lab Results", icon: TestTube },
  { id: "imaging", label: "Imaging", icon: FileImage },
  { id: "medication", label: "Medications", icon: Pill },
  { id: "immunization", label: "Immunizations", icon: User },
];

export default function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const filteredRecords = mockHealthRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || record.category === selectedCategory;

    // Date filtering
    let matchesDate = true;
    if (dateRange !== "all") {
      const recordDate = new Date(record.date);
      const now = new Date();
      const monthsAgo = new Date();

      switch (dateRange) {
        case "30days":
          monthsAgo.setDate(now.getDate() - 30);
          matchesDate = recordDate >= monthsAgo;
          break;
        case "3months":
          monthsAgo.setMonth(now.getMonth() - 3);
          matchesDate = recordDate >= monthsAgo;
          break;
        case "6months":
          monthsAgo.setMonth(now.getMonth() - 6);
          matchesDate = recordDate >= monthsAgo;
          break;
        case "1year":
          monthsAgo.setFullYear(now.getFullYear() - 1);
          matchesDate = recordDate >= monthsAgo;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.id === category);
    return categoryData?.icon || FileText;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "primary-care":
        return "bg-blue-100 text-blue-800";
      case "specialty":
        return "bg-purple-100 text-purple-800";
      case "lab":
        return "bg-green-100 text-green-800";
      case "imaging":
        return "bg-orange-100 text-orange-800";
      case "medication":
        return "bg-red-100 text-red-800";
      case "immunization":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (recordId: string, attachment: string) => {
    // In a real app, this would download the file
    alert(`Downloading ${attachment}`);
  };

  const handleView = (recordId: string) => {
    // In a real app, this would open a detailed view
    alert(`Opening detailed view for record ${recordId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600">
            View and download your medical records and test results
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download All Records</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => {
          const CategoryIcon = getCategoryIcon(record.category);
          return (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {record.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {record.provider}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(record.category)}>
                            {record.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-2">{record.summary}</p>

                      {/* Attachments */}
                      {record.attachments.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Attachments ({record.attachments.length})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {record.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md text-sm"
                              >
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {attachment}
                                </span>
                                <button
                                  onClick={() =>
                                    handleDownload(record.id, attachment)
                                  }
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(record.id)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No records found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or date range.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
