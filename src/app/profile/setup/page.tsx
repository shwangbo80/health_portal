"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { UserIcon, HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { MedicalCondition } from "@/types";

const medicalConditions: MedicalCondition[] = [
  { id: "diabetes", name: "Diabetes", selected: false },
  { id: "hypertension", name: "Hypertension", selected: false },
  { id: "heart-disease", name: "Heart Disease", selected: false },
  { id: "asthma", name: "Asthma", selected: false },
  { id: "arthritis", name: "Arthritis", selected: false },
  { id: "depression", name: "Depression", selected: false },
  { id: "anxiety", name: "Anxiety", selected: false },
  { id: "allergies", name: "Allergies", selected: false },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [conditions, setConditions] = useState(medicalConditions);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "",
    policyNumber: "",
    groupNumber: "",
  });

  const toggleCondition = (id: string) => {
    setConditions(conditions.map(condition => 
      condition.id === id 
        ? { ...condition, selected: !condition.selected }
        : condition
    ));
  };

  const tabs = [
    { id: "personal", name: "Personal Info", icon: UserIcon },
    { id: "medical", name: "Medical History", icon: HeartIcon },
    { id: "insurance", name: "Insurance", icon: ShieldCheckIcon },
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Setting up your profile..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">Help us provide you with personalized care</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}</span>
            <span>{Math.round(((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length) * 100)}% Complete</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-1 mb-6 sm:mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div key={tab.id} className="flex-shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-[44px] cursor-pointer hover:cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">{tab.name}</span>
                </button>
              </div>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "personal" && "Personal Information"}
              {activeTab === "medical" && "Medical History"}
              {activeTab === "insurance" && "Insurance Information"}
            </CardTitle>
            <CardDescription>
              {activeTab === "personal" && "Tell us about yourself"}
              {activeTab === "medical" && "Help us understand your health conditions"}
              {activeTab === "insurance" && "Add your insurance details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                      placeholder="San Francisco"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <Input
                      id="state"
                      value={personalInfo.state}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <Input
                      id="zipCode"
                      value={personalInfo.zipCode}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, zipCode: e.target.value })}
                      placeholder="94105"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Medical History Tab */}
            {activeTab === "medical" && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Select any conditions that apply to you. This helps us provide better care.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {conditions.map((condition) => (
                      <label
                        key={condition.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors min-h-[48px] ${
                          condition.selected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={condition.selected}
                          onChange={() => toggleCondition(condition.id)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {condition.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Tab */}
            {activeTab === "insurance" && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                    Insurance Provider
                  </label>
                  <Input
                    id="provider"
                    value={insuranceInfo.provider}
                    onChange={(e) => setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })}
                    placeholder="Blue Cross Blue Shield"
                  />
                </div>

                <div>
                  <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
                    Policy Number
                  </label>
                  <Input
                    id="policyNumber"
                    value={insuranceInfo.policyNumber}
                    onChange={(e) => setInsuranceInfo({ ...insuranceInfo, policyNumber: e.target.value })}
                    placeholder="ABC123456789"
                  />
                </div>

                <div>
                  <label htmlFor="groupNumber" className="block text-sm font-medium text-gray-700">
                    Group Number (Optional)
                  </label>
                  <Input
                    id="groupNumber"
                    value={insuranceInfo.groupNumber}
                    onChange={(e) => setInsuranceInfo({ ...insuranceInfo, groupNumber: e.target.value })}
                    placeholder="GRP001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Insurance Card
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4">
                      <Button variant="outline">
                        Choose File
                      </Button>
                      <p className="mt-2 text-sm text-gray-500">
                        Take a photo or upload an image of your insurance card
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1].id);
                  }
                }}
                disabled={activeTab === "personal"}
              >
                Previous
              </Button>

              <Button
                onClick={() => {
                  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1].id);
                  } else {
                    // Complete profile setup and navigate to dashboard
                    router.push("/dashboard");
                  }
                }}
              >
                {activeTab === "insurance" ? "Complete Setup" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
