"use client";

import { useState } from "react";
import {
  Calculator,
  Search,
  Pill,
  FileText,
  Book,
  Activity,
  Heart,
  Stethoscope,
  Brain,
  Zap,
  Target,
} from "lucide-react";

interface ClinicalTool {
  id: string;
  name: string;
  description: string;
  category:
    | "calculator"
    | "drug-checker"
    | "guidelines"
    | "reference"
    | "diagnostic";
  icon: React.ReactNode;
  featured: boolean;
  lastUsed?: string;
}

const mockClinicalTools: ClinicalTool[] = [
  {
    id: "1",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and weight classification",
    category: "calculator",
    icon: <Calculator className="h-6 w-6" />,
    featured: true,
    lastUsed: "2024-12-20",
  },
  {
    id: "2",
    name: "Drug Interaction Checker",
    description: "Check for potential drug interactions and contraindications",
    category: "drug-checker",
    icon: <Pill className="h-6 w-6" />,
    featured: true,
    lastUsed: "2024-12-19",
  },
  {
    id: "3",
    name: "Diabetes Management Guidelines",
    description: "ADA guidelines for diabetes management and monitoring",
    category: "guidelines",
    icon: <FileText className="h-6 w-6" />,
    featured: true,
  },
  {
    id: "4",
    name: "eGFR Calculator",
    description: "Estimated Glomerular Filtration Rate calculator",
    category: "calculator",
    icon: <Activity className="h-6 w-6" />,
    featured: false,
    lastUsed: "2024-12-18",
  },
  {
    id: "5",
    name: "Cardiovascular Risk Calculator",
    description: "ASCVD risk assessment tool",
    category: "calculator",
    icon: <Heart className="h-6 w-6" />,
    featured: true,
  },
  {
    id: "6",
    name: "Hypertension Guidelines",
    description: "ACC/AHA hypertension management guidelines",
    category: "guidelines",
    icon: <Target className="h-6 w-6" />,
    featured: false,
  },
  {
    id: "7",
    name: "Drug Dosage Calculator",
    description: "Calculate medication dosages based on weight and indication",
    category: "calculator",
    icon: <Calculator className="h-6 w-6" />,
    featured: false,
  },
  {
    id: "8",
    name: "ICD-10 Code Lookup",
    description: "Search and reference ICD-10 diagnostic codes",
    category: "reference",
    icon: <Book className="h-6 w-6" />,
    featured: false,
    lastUsed: "2024-12-17",
  },
  {
    id: "9",
    name: "Mental Health Screening Tools",
    description: "PHQ-9, GAD-7, and other mental health assessments",
    category: "diagnostic",
    icon: <Brain className="h-6 w-6" />,
    featured: true,
  },
  {
    id: "10",
    name: "Emergency Protocols",
    description: "Quick reference for emergency medical protocols",
    category: "reference",
    icon: <Zap className="h-6 w-6" />,
    featured: true,
  },
];

export default function ClinicalTools() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    "all" | ClinicalTool["category"]
  >("all");

  const filteredTools = mockClinicalTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || tool.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "calculator":
        return "bg-blue-100 text-blue-800";
      case "drug-checker":
        return "bg-red-100 text-red-800";
      case "guidelines":
        return "bg-green-100 text-green-800";
      case "reference":
        return "bg-purple-100 text-purple-800";
      case "diagnostic":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "calculator":
        return "Calculator";
      case "drug-checker":
        return "Drug Checker";
      case "guidelines":
        return "Guidelines";
      case "reference":
        return "Reference";
      case "diagnostic":
        return "Diagnostic";
      default:
        return category;
    }
  };

  const featuredTools = mockClinicalTools.filter((tool) => tool.featured);
  const recentlyUsed = mockClinicalTools
    .filter((tool) => tool.lastUsed)
    .sort(
      (a, b) =>
        new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime()
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clinical Tools</h1>
          <p className="text-gray-600">
            Access clinical calculators, guidelines, and references
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tools</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockClinicalTools.length}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-green-600">
                  {featuredTools.length}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recently Used
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {recentlyUsed.length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Book className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search clinical tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(
                  e.target.value as "all" | ClinicalTool["category"]
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="calculator">Calculators</option>
              <option value="drug-checker">Drug Checkers</option>
              <option value="guidelines">Guidelines</option>
              <option value="reference">References</option>
              <option value="diagnostic">Diagnostic Tools</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.slice(0, 6).map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {tool.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                          tool.category
                        )}`}
                      >
                        {getCategoryLabel(tool.category)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                {tool.lastUsed && (
                  <p className="text-xs text-gray-500 mb-3">
                    Last used: {new Date(tool.lastUsed).toLocaleDateString()}
                  </p>
                )}
                <button className="w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Open Tool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Tools */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Tools</h2>
        <div className="space-y-3">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {tool.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                            tool.category
                          )}`}
                        >
                          {getCategoryLabel(tool.category)}
                        </span>
                        {tool.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {tool.description}
                      </p>
                      {tool.lastUsed && (
                        <p className="text-xs text-gray-500 mt-1">
                          Last used:{" "}
                          {new Date(tool.lastUsed).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredTools.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-12 text-center">
            <Stethoscope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "No tools match the selected filters."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
