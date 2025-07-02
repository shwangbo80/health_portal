'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Calendar, 
  Shield,
  Mail,
  Phone,
  Save,
  Edit,
  Check,
  X
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  type: 'email' | 'sms' | 'app';
}

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: '1',
    title: 'New Patient Messages',
    description: 'Receive notifications when patients send new messages',
    enabled: true,
    type: 'email'
  },
  {
    id: '2',
    title: 'Appointment Reminders',
    description: 'Get notified 15 minutes before each appointment',
    enabled: true,
    type: 'app'
  },
  {
    id: '3',
    title: 'Critical Lab Results',
    description: 'Immediate alerts for critical lab values',
    enabled: true,
    type: 'sms'
  },
  {
    id: '4',
    title: 'Prescription Refill Requests',
    description: 'Notifications for pending prescription refills',
    enabled: false,
    type: 'email'
  },
  {
    id: '5',
    title: 'System Maintenance',
    description: 'Updates about system maintenance and downtime',
    enabled: true,
    type: 'email'
  }
];

export default function ProviderSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState(mockNotificationSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'MD',
    specialty: 'Internal Medicine',
    npi: '1234567890',
    licenseNumber: 'MD123456',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@iehp.org',
    address: '123 Medical Center Dr, San Bernardino, CA 92408',
    bio: 'Board-certified internal medicine physician with over 15 years of experience in primary care and chronic disease management.'
  });

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Professional Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <Input
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NPI Number
                  </label>
                  <Input
                    value={profileData.npi}
                    onChange={(e) => setProfileData({...profileData, npi: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <Input
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Office Address
                </label>
                <Input
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {notification.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(notification.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notification.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notification.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Notification Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">SMS</p>
                      <p className="text-sm text-gray-600">{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">In-App</p>
                      <p className="text-sm text-gray-600">Push notifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Working Hours</h3>
                  <div className="space-y-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="font-medium text-gray-900">{day}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            defaultValue="08:00"
                            className="w-24"
                          />
                          <span className="text-gray-500">to</span>
                          <Input
                            type="time"
                            defaultValue="17:00"
                            className="w-24"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <input type="checkbox" defaultChecked={day !== 'Saturday' && day !== 'Sunday'} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Appointment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Appointment Duration
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buffer Time Between Appointments
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="0">No buffer</option>
                        <option value="5">5 minutes</option>
                        <option value="10" selected>10 minutes</option>
                        <option value="15">15 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lunch Break
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          defaultValue="12:00"
                          className="flex-1"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          defaultValue="13:00"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Schedule Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="mr-1 h-3 w-3" />
                    Enabled
                  </Badge>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-600">Windows • Chrome • 192.168.1.100</p>
                      <p className="text-xs text-gray-500">Last activity: Just now</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Mobile App</p>
                      <p className="text-sm text-gray-600">iPhone • Safari • 192.168.1.101</p>
                      <p className="text-xs text-gray-500">Last activity: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
