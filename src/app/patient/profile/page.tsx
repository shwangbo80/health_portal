"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  User,
  Edit3,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertTriangle,
  Shield,
  FileText,
  Camera,
} from "lucide-react";

// Mock patient profile data
const mockProfileData = {
  personalInfo: {
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    ssn: "***-**-1234",
    memberNumber: "IEH123456789",
    photo: null,
  },
  contactInfo: {
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    address: {
      street: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
    },
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "(555) 987-6543",
    },
  },
  healthInfo: {
    primaryCareProvider: "Dr. Mike Johnson",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    bloodType: "O+",
    organDonor: true,
  },
  insuranceInfo: {
    planName: "IEHP DualChoice Cal MediConnect",
    memberId: "IEH123456789",
    groupNumber: "GROUP001",
    effectiveDate: "2024-01-01",
    copayPrimary: "$15",
    copaySpecialist: "$25",
  },
  preferences: {
    language: "English",
    communicationMethod: "Email",
    appointmentReminders: true,
    healthTips: true,
    newsletters: false,
  },
};

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "health", label: "Health Info", icon: Heart },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "preferences", label: "Preferences", icon: FileText },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {mockProfileData.personalInfo.photo ? (
              <Image
                src={mockProfileData.personalInfo.photo}
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {mockProfileData.personalInfo.firstName}{" "}
            {mockProfileData.personalInfo.lastName}
          </h3>
          <p className="text-gray-600">
            Member ID: {mockProfileData.personalInfo.memberNumber}
          </p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.personalInfo.firstName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.personalInfo.lastName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {new Date(
              mockProfileData.personalInfo.dateOfBirth
            ).toLocaleDateString()}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.personalInfo.gender}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Social Security Number
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.personalInfo.ssn}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Member Number
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.personalInfo.memberNumber}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="p-3 bg-gray-50 rounded-md flex items-center">
            <Phone className="w-4 h-4 text-gray-400 mr-2" />
            {mockProfileData.contactInfo.phone}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="p-3 bg-gray-50 rounded-md flex items-center">
            <Mail className="w-4 h-4 text-gray-400 mr-2" />
            {mockProfileData.contactInfo.email}
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Home Address
        </label>
        <div className="p-3 bg-gray-50 rounded-md flex items-start">
          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
          <div>
            <div>{mockProfileData.contactInfo.address.street}</div>
            <div>
              {mockProfileData.contactInfo.address.city},{" "}
              {mockProfileData.contactInfo.address.state}{" "}
              {mockProfileData.contactInfo.address.zipCode}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-3">
          Emergency Contact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="p-3 bg-gray-50 rounded-md">
              {mockProfileData.contactInfo.emergencyContact.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <div className="p-3 bg-gray-50 rounded-md">
              {mockProfileData.contactInfo.emergencyContact.relationship}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="p-3 bg-gray-50 rounded-md">
              {mockProfileData.contactInfo.emergencyContact.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Care Provider
        </label>
        <div className="p-3 bg-gray-50 rounded-md">
          {mockProfileData.healthInfo.primaryCareProvider}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Type
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.healthInfo.bloodType}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organ Donor
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.healthInfo.organDonor ? "Yes" : "No"}
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <div className="flex flex-wrap gap-2">
          {mockProfileData.healthInfo.allergies.map((allergy, index) => (
            <Badge
              key={index}
              variant="destructive"
              className="flex items-center"
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              {allergy}
            </Badge>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <div className="space-y-2">
          {mockProfileData.healthInfo.medications.map((medication, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-md">
              {medication}
            </div>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical Conditions
        </label>
        <div className="flex flex-wrap gap-2">
          {mockProfileData.healthInfo.medicalConditions.map(
            (condition, index) => (
              <Badge key={index} variant="secondary">
                {condition}
              </Badge>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderInsuranceInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Name
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.insuranceInfo.planName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Member ID
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.insuranceInfo.memberId}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Number
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.insuranceInfo.groupNumber}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Effective Date
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {new Date(
              mockProfileData.insuranceInfo.effectiveDate
            ).toLocaleDateString()}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Care Copay
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.insuranceInfo.copayPrimary}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialist Copay
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.insuranceInfo.copaySpecialist}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Language
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.preferences.language}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Communication Method
          </label>
          <div className="p-3 bg-gray-50 rounded-md">
            {mockProfileData.preferences.communicationMethod}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-3">
          Notification Preferences
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span>Appointment Reminders</span>
            <Badge
              className={
                mockProfileData.preferences.appointmentReminders
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {mockProfileData.preferences.appointmentReminders
                ? "Enabled"
                : "Disabled"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span>Health Tips</span>
            <Badge
              className={
                mockProfileData.preferences.healthTips
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {mockProfileData.preferences.healthTips ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span>Newsletters</span>
            <Badge
              className={
                mockProfileData.preferences.newsletters
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {mockProfileData.preferences.newsletters ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "contact":
        return renderContactInfo();
      case "health":
        return renderHealthInfo();
      case "insurance":
        return renderInsuranceInfo();
      case "preferences":
        return renderPreferences();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">{renderTabContent()}</CardContent>
      </Card>
    </div>
  );
}
