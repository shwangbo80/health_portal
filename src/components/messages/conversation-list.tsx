"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Conversation } from "@/types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string;
  onConversationSelect: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  selectedConversation,
  onConversationSelect,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 md:border-r border-gray-200 flex flex-col">
      {/* Search Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-base sm:text-sm min-h-[48px] sm:min-h-[40px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onConversationSelect(conversation.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 ${
              selectedConversation === conversation.id
                ? "bg-blue-50 border-blue-200"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium text-sm">
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {conversation.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  {conversation.specialty}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
