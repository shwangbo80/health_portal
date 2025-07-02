"use client";

import { useState } from "react";
import {
  PaperClipIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Message, Conversation } from "@/types";

interface ConversationViewProps {
  conversation: Conversation | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ConversationView({
  conversation,
  messages,
  onSendMessage,
}: ConversationViewProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No conversation selected
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {conversation.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {conversation.name}
            </h2>
            <p className="text-sm text-gray-600">{conversation.specialty}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === "patient" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md ${
                message.senderId === "patient" ? "order-2" : "order-1"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.senderId === "patient"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-xs"
                      >
                        <PaperClipIcon className="w-4 h-4" />
                        <span className="underline cursor-pointer">
                          {attachment}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p
                className={`text-xs text-gray-500 mt-1 ${
                  message.senderId === "patient" ? "text-right" : "text-left"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
            {message.senderId !== "patient" && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 order-1">
                <span className="text-blue-600 font-medium text-xs">
                  {message.senderName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200">
            <PaperClipIcon className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSendMessage()
              }
              className="w-full pr-12 min-h-[44px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
