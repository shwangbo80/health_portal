"use client";

import { useState } from "react";
import { ConversationList } from "./conversation-list";
import { ConversationView } from "./conversation-view";
import { Message, Conversation } from "@/types";

interface MessagesContainerProps {
  conversations: Conversation[];
  messages: Message[];
}

export function MessagesContainer({
  conversations,
  messages,
}: MessagesContainerProps) {
  const [selectedConversation, setSelectedConversation] = useState("doctor1");

  const conversationMessages = messages.filter(
    (msg) =>
      msg.senderId === selectedConversation ||
      (msg.senderId === "patient" && selectedConversation)
  );

  const selectedDoctor = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = (message: string) => {
    // Handle sending message logic here
    console.log("Sending message:", message);
    // In a real app, this would make an API call to send the message
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  return (
    <div className="h-[calc(100vh-10rem)] sm:h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm border border-gray-200 flex">
      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        onConversationSelect={handleConversationSelect}
      />
      <ConversationView
        conversation={selectedDoctor || null}
        messages={conversationMessages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
