"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  User,
  Paperclip,
  Send,
  Plus,
  ArrowLeft,
  Clock,
} from "lucide-react";

// Mock messages data
const mockConversations = [
  {
    id: "1",
    providerName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    lastMessage:
      "Your lab results are ready for review. Please schedule a follow-up appointment.",
    timestamp: "2025-01-08 2:30 PM",
    unread: true,
    avatar: "/placeholder-doctor.jpg",
  },
  {
    id: "2",
    providerName: "IEHP Admin",
    specialty: "Administration",
    lastMessage:
      "Reminder: Your appointment with Dr. Johnson is tomorrow at 10:00 AM.",
    timestamp: "2025-01-07 10:15 AM",
    unread: false,
    avatar: "/placeholder-admin.jpg",
  },
  {
    id: "3",
    providerName: "Dr. Mike Johnson",
    specialty: "Primary Care",
    lastMessage:
      "Thank you for visiting today. Please continue taking your medication as prescribed.",
    timestamp: "2025-01-05 4:45 PM",
    unread: false,
    avatar: "/placeholder-doctor.jpg",
  },
];

const mockMessages = {
  "1": [
    {
      id: "1",
      sender: "Dr. Sarah Wilson",
      content:
        "Hello John! I wanted to follow up on your recent visit. How are you feeling with the new medication?",
      timestamp: "2025-01-07 9:00 AM",
      isProvider: true,
    },
    {
      id: "2",
      sender: "John Smith",
      content:
        "Hi Dr. Wilson, I'm feeling much better. The chest pain has decreased significantly.",
      timestamp: "2025-01-07 11:30 AM",
      isProvider: false,
    },
    {
      id: "3",
      sender: "Dr. Sarah Wilson",
      content:
        "That's great to hear! Your lab results are ready for review. Please schedule a follow-up appointment.",
      timestamp: "2025-01-08 2:30 PM",
      isProvider: true,
    },
  ],
};

export default function PatientMessages() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleStartNewMessage = () => {
    // In a real app, this would open a provider selection modal
    console.log("Starting new message");
  };

  const selectedConversationData = selectedConversation
    ? mockConversations.find((conv) => conv.id === selectedConversation)
    : null;

  const conversationMessages = selectedConversation
    ? mockMessages[selectedConversation as keyof typeof mockMessages] || []
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">
            Communicate with your healthcare providers
          </p>
        </div>
        <button
          onClick={handleStartNewMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
              <MessageSquare className="mr-2 h-5 w-5" />
              Conversations
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <div className="space-y-0">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.providerName}
                        </p>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {conversation.specialty}
                      </p>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {conversation.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <button
                    className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversationData?.providerName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversationData?.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4"
                style={{ height: "calc(100% - 140px)" }}
              >
                <div className="space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isProvider ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isProvider
                            ? "bg-gray-100 text-gray-900"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`flex items-center mt-1 text-xs ${
                            message.isProvider
                              ? "text-gray-500"
                              : "text-blue-100"
                          }`}
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewMessage(e.target.value)
                    }
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No conversation selected
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
