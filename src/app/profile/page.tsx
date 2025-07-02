"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  UserIcon, 
  CreditCardIcon, 
  BellIcon, 
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Soo",
    lastName: "Kim",
    email: "soo.kim@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, San Francisco, CA 94105",
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    messages: true,
    labResults: true,
    medications: false,
    marketing: false,
  });

  const menuItems = [
    {
      title: "Personal Information",
      description: "Update your name, contact details, and address",
      icon: UserIcon,
      action: () => setIsEditing(!isEditing),
    },
    {
      title: "Payment Methods",
      description: "Manage your payment cards and billing information",
      icon: CreditCardIcon,
      action: () => console.log("Payment methods"),
    },
    {
      title: "Privacy & Security",
      description: "Control your privacy settings and security preferences",
      icon: ShieldCheckIcon,
      action: () => console.log("Privacy settings"),
    },
  ];

  const handleSaveProfile = () => {
    // Handle profile save
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleLogout = () => {
    // Clear any local storage or session data if needed
    // localStorage.clear();
    // sessionStorage.clear();
    
    // Navigate to index page
    router.push("/");
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading your profile..." />;
  }

  return (
    <DashboardLayout title="Profile & Settings" description="Manage your account and preferences">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">
              {profileData.firstName[0]}{profileData.lastName[0]}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <p className="text-gray-600">{profileData.email}</p>
        </div>

        {/* Personal Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleSaveProfile} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="text-sm text-gray-900">{profileData.firstName} {profileData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Email:</span>
                  <span className="text-sm text-gray-900">{profileData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Phone:</span>
                  <span className="text-sm text-gray-900">{profileData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Date of Birth:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Address:</span>
                  <span className="text-sm text-gray-900">{profileData.address}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BellIcon className="w-5 h-5 mr-2 text-blue-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {key === 'appointments' && 'Get reminders about upcoming appointments'}
                      {key === 'messages' && 'New messages from your healthcare providers'}
                      {key === 'labResults' && 'When your lab results are ready'}
                      {key === 'medications' && 'Medication reminders and refill alerts'}
                      {key === 'marketing' && 'Health tips and promotional content'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <button
                  onClick={item.action}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          className="w-full  text-white hover:bg-blue-700 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </DashboardLayout>
  );
}
