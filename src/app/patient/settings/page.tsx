"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Lock,
  User,
  Mail,
  Shield,
  Download,
  Trash2,
  Save,
  Smartphone,
} from "lucide-react";

// Mock settings data
const mockSettings = {
  notifications: {
    email: {
      appointments: true,
      labResults: true,
      prescriptions: true,
      reminders: false,
      newsletters: false,
    },
    sms: {
      appointments: true,
      labResults: false,
      prescriptions: true,
      reminders: true,
      newsletters: false,
    },
    push: {
      appointments: true,
      labResults: true,
      prescriptions: true,
      reminders: true,
      newsletters: false,
    },
  },
  privacy: {
    shareDataForResearch: false,
    allowMarketingCommunications: false,
    shareDataWithProviders: true,
    dataRetentionPeriod: "7years",
  },
  security: {
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30min",
    lastPasswordChange: "2024-09-15",
  },
  preferences: {
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    communicationPreference: "email",
  },
  account: {
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    emergencyContact: {
      name: "Jane Smith",
      phone: "(555) 987-6543",
    },
  },
};

export default function PatientSettings() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "account", label: "Account", icon: User },
  ];

  const updateNotificationSetting = (
    channel: string,
    type: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [channel]: {
          ...prev.notifications[channel as keyof typeof prev.notifications],
          [type]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const updatePrivacySetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateSecuritySetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updatePreference = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // In a real app, this would make an API call
    alert("Settings saved successfully!");
    setHasChanges(false);
  };

  const exportData = () => {
    // In a real app, this would initiate a data export
    alert(
      "Data export request submitted. You will receive an email when ready."
    );
  };

  const deleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert(
        "Account deletion request submitted. You will receive a confirmation email."
      );
    }
  };

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose how you want to be notified about important health information.
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    updateNotificationSetting("email", key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notifications.sms).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    updateNotificationSetting("sms", key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    updateNotificationSetting("push", key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Privacy Settings
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Control how your health data is used and shared.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Share Data for Research
              </h4>
              <p className="text-sm text-gray-600">
                Help improve healthcare by sharing anonymized data for medical
                research
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.shareDataForResearch}
                onChange={(e) =>
                  updatePrivacySetting("shareDataForResearch", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Marketing Communications
              </h4>
              <p className="text-sm text-gray-600">
                Receive information about health programs and services
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.allowMarketingCommunications}
                onChange={(e) =>
                  updatePrivacySetting(
                    "allowMarketingCommunications",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Share with Healthcare Providers
              </h4>
              <p className="text-sm text-gray-600">
                Allow authorized providers to access your health information
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.shareDataWithProviders}
                onChange={(e) =>
                  updatePrivacySetting(
                    "shareDataWithProviders",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Data Retention Period
            </h4>
            <select
              value={settings.privacy.dataRetentionPeriod}
              onChange={(e) =>
                updatePrivacySetting("dataRetentionPeriod", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1year">1 Year</option>
              <option value="3years">3 Years</option>
              <option value="5years">5 Years</option>
              <option value="7years">7 Years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={exportData}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export My Data</span>
            </Button>
            <Button
              variant="destructive"
              onClick={deleteAccount}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Security Settings
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Keep your account secure with these settings.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  settings.security.twoFactorEnabled
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {settings.security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateSecuritySetting(
                    "twoFactorEnabled",
                    !settings.security.twoFactorEnabled
                  )
                }
              >
                {settings.security.twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login Notifications</h4>
              <p className="text-sm text-gray-600">
                Get notified when someone logs into your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.loginNotifications}
                onChange={(e) =>
                  updateSecuritySetting("loginNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                updateSecuritySetting("sessionTimeout", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="15min">15 Minutes</option>
              <option value="30min">30 Minutes</option>
              <option value="1hour">1 Hour</option>
              <option value="2hours">2 Hours</option>
              <option value="4hours">4 Hours</option>
            </select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Password</h4>
            <p className="text-sm text-gray-600 mb-4">
              Last changed:{" "}
              {new Date(
                settings.security.lastPasswordChange
              ).toLocaleDateString()}
            </p>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize your portal experience.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Language</h4>
            <select
              value={settings.preferences.language}
              onChange={(e) => updatePreference("language", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="zh">中文</option>
              <option value="ko">한국어</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Time Zone</h4>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => updatePreference("timezone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
            </select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Date Format</h4>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) => updatePreference("dateFormat", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Preferred Communication Method
            </h4>
            <select
              value={settings.preferences.communicationPreference}
              onChange={(e) =>
                updatePreference("communicationPreference", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="phone">Phone Call</option>
              <option value="portal">Portal Messages</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Account Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Update your contact information and emergency contacts.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={settings.account.email}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="tel"
                value={settings.account.phone}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={settings.account.emergencyContact.name}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.account.emergencyContact.phone}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <Button variant="outline">Update Emergency Contact</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "notifications":
        return renderNotificationsTab();
      case "privacy":
        return renderPrivacyTab();
      case "security":
        return renderSecurityTab();
      case "preferences":
        return renderPreferencesTab();
      case "account":
        return renderAccountTab();
      default:
        return renderNotificationsTab();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </div>
        {hasChanges && (
          <Button
            onClick={saveSettings}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        )}
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
      {renderTabContent()}
    </div>
  );
}
