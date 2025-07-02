"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ConversationView } from "@/components/messages/conversation-view";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Message, Conversation } from "@/types";

interface ConversationPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock data - in a real app this would come from an API
const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "doctor1",
    senderName: "Dr. Sarah Wilson",
    content:
      "Your test results are ready for review. Everything looks normal, but I'd like to discuss a few points with you during our next appointment.",
    timestamp: "2025-01-10T14:30:00Z",
    attachments: ["lab-results.pdf"],
  },
  {
    id: "2",
    senderId: "patient",
    senderName: "You",
    content:
      "Thank you, Dr. Wilson. Should I be concerned about anything in particular?",
    timestamp: "2025-01-10T15:00:00Z",
  },
  {
    id: "3",
    senderId: "doctor1",
    senderName: "Dr. Sarah Wilson",
    content:
      "No major concerns. Your cholesterol levels are slightly elevated, but we can address this with diet and exercise modifications.",
    timestamp: "2025-01-10T15:15:00Z",
  },
  {
    id: "4",
    senderId: "doctor2",
    senderName: "Dr. Mike Johnson",
    content:
      "Appointment reminder: You have an appointment scheduled for tomorrow at 10:00 AM. Please bring your insurance card and a list of current medications.",
    timestamp: "2025-01-09T10:00:00Z",
  },
];

const conversations: Conversation[] = [
  {
    id: "doctor1",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    lastMessage: "No major concerns. Your cholesterol...",
    timestamp: "2 hours ago",
    unread: 0,
  },
  {
    id: "doctor2",
    name: "Dr. Mike Johnson",
    specialty: "Primary Care",
    lastMessage: "Appointment reminder: You have...",
    timestamp: "1 day ago",
    unread: 1,
  },
  {
    id: "doctor3",
    name: "Dr. Emily Chen",
    specialty: "Dermatology",
    lastMessage: "How are you feeling after the...",
    timestamp: "3 days ago",
    unread: 0,
  },
];

export default function ConversationPage({ params }: ConversationPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const resolvedParams = React.use(params);
  const conversationId = resolvedParams.id;

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Find the conversation
  const conversation = conversations.find((c) => c.id === conversationId);

  // Filter messages for this conversation
  const conversationMessages = mockMessages.filter(
    (m) => m.senderId === conversationId || m.senderId === "patient"
  );

  if (isLoading) {
    return <LoadingPage message="Loading conversation..." />;
  }

  if (!conversation) {
    return (
      <DashboardLayout
        title="Conversation Not Found"
        description="The requested conversation could not be found"
      >
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-gray-500">Conversation not found</p>
          <Button onClick={() => router.push("/messages")}>
            Back to Messages
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={conversation.name}
      description={conversation.specialty}
    >
      {/* Mobile back button */}
      <div className="md:hidden mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/messages")}
          className="flex items-center space-x-2 p-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Messages</span>
        </Button>
      </div>

      {/* Conversation view taking full screen on mobile */}
      <div className="h-[calc(100vh-12rem)] md:h-[600px]">
        <ConversationView
          conversation={conversation}
          messages={conversationMessages}
          onSendMessage={(message: string) => {
            console.log("Sending message:", message);
            // In a real app, this would send the message to an API
          }}
        />
      </div>
    </DashboardLayout>
  );
}
