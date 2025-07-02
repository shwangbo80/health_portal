"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Calendar,
  MessageSquare,
  TestTube,
  Pill,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
} from "lucide-react";

// Mock notifications data
interface Notification {
  id: string;
  type:
    | "appointment"
    | "lab"
    | "prescription"
    | "message"
    | "reminder"
    | "alert";
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionRequired?: boolean;
  actionUrl?: string;
  actionText?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Upcoming Appointment Reminder",
    message:
      "You have an appointment with Dr. Sarah Wilson tomorrow at 2:30 PM for Cardiology consultation.",
    date: "2025-01-14T10:00:00Z",
    read: false,
    priority: "high",
    actionRequired: true,
    actionUrl: "/patient/appointments",
    actionText: "View Appointment",
  },
  {
    id: "2",
    type: "lab",
    title: "Lab Results Available",
    message:
      "Your Comprehensive Metabolic Panel results from December 10th are now available for review.",
    date: "2025-01-12T14:30:00Z",
    read: false,
    priority: "medium",
    actionRequired: true,
    actionUrl: "/patient/lab-results",
    actionText: "View Results",
  },
  {
    id: "3",
    type: "prescription",
    title: "Prescription Ready for Pickup",
    message:
      "Your Lisinopril 10mg prescription is ready for pickup at IEHP Pharmacy - Main location.",
    date: "2025-01-11T16:45:00Z",
    read: true,
    priority: "medium",
    actionRequired: true,
    actionUrl: "/patient/prescriptions",
    actionText: "View Prescription",
  },
  {
    id: "4",
    type: "message",
    title: "New Message from Dr. Wilson",
    message:
      "Dr. Wilson has sent you a message regarding your recent lab results and medication adjustments.",
    date: "2025-01-10T09:15:00Z",
    read: false,
    priority: "medium",
    actionRequired: true,
    actionUrl: "/patient/messages",
    actionText: "Read Message",
  },
  {
    id: "5",
    type: "reminder",
    title: "Annual Physical Due",
    message:
      "It's time to schedule your annual physical examination. Contact your primary care provider to book an appointment.",
    date: "2025-01-09T12:00:00Z",
    read: true,
    priority: "low",
    actionRequired: true,
    actionUrl: "/patient/appointments/book",
    actionText: "Schedule Appointment",
  },
  {
    id: "6",
    type: "alert",
    title: "Prescription Refill Needed",
    message:
      "Your Metformin prescription has no refills remaining. Contact your doctor for a new prescription.",
    date: "2025-01-08T08:00:00Z",
    read: true,
    priority: "high",
    actionRequired: true,
    actionUrl: "/patient/prescriptions/refill",
    actionText: "Request Refill",
  },
  {
    id: "7",
    type: "appointment",
    title: "Appointment Confirmed",
    message:
      "Your appointment with Dr. Mike Johnson on January 22nd at 10:00 AM has been confirmed.",
    date: "2025-01-07T11:30:00Z",
    read: true,
    priority: "low",
    actionRequired: false,
  },
  {
    id: "8",
    type: "reminder",
    title: "Flu Shot Reminder",
    message:
      "Don't forget to get your annual flu vaccination. Schedule an appointment at any IEHP location.",
    date: "2025-01-05T10:00:00Z",
    read: true,
    priority: "low",
    actionRequired: true,
    actionUrl: "/patient/appointments/book",
    actionText: "Schedule Vaccination",
  },
];

const notificationTypes = [
  { id: "all", label: "All Notifications", icon: Bell },
  { id: "appointment", label: "Appointments", icon: Calendar },
  { id: "lab", label: "Lab Results", icon: TestTube },
  { id: "prescription", label: "Prescriptions", icon: Pill },
  { id: "message", label: "Messages", icon: MessageSquare },
  { id: "reminder", label: "Reminders", icon: Clock },
  { id: "alert", label: "Alerts", icon: AlertCircle },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      selectedType === "all" || notification.type === selectedType;
    const matchesRead = showUnreadOnly ? !notification.read : true;
    return matchesType && matchesRead;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Calendar;
      case "lab":
        return TestTube;
      case "prescription":
        return Pill;
      case "message":
        return MessageSquare;
      case "reminder":
        return Clock;
      case "alert":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800";
      case "lab":
        return "bg-green-100 text-green-800";
      case "prescription":
        return "bg-purple-100 text-purple-800";
      case "message":
        return "bg-indigo-100 text-indigo-800";
      case "reminder":
        return "bg-orange-100 text-orange-800";
      case "alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-gray-600">
            Stay updated with your healthcare information and appointments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {notificationTypes.map((type) => {
                const Icon = type.icon;
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Unread Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="unread-only"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="unread-only" className="text-sm text-gray-700">
                Show unread only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          return (
            <Card
              key={notification.id}
              className={`transition-all cursor-pointer hover:shadow-md ${
                !notification.read
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : "hover:bg-gray-50"
              } ${getPriorityColor(notification.priority)}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className={`font-semibold text-gray-900 ${
                              !notification.read ? "font-bold" : ""
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">
                              {new Date(notification.date).toLocaleString()}
                            </span>
                            <Badge
                              className={`text-xs ${getTypeColor(
                                notification.type
                              )}`}
                            >
                              {notification.type}
                            </Badge>
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                notification.priority
                              )}`}
                            >
                              {notification.priority} priority
                            </Badge>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>

                      {/* Action Button */}
                      {notification.actionRequired &&
                        notification.actionText && (
                          <div className="mt-4">
                            <Button size="sm" className="mr-2">
                              {notification.actionText}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              {showUnreadOnly
                ? "You have no unread notifications."
                : "You're all caught up! No notifications to display."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
