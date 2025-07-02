"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { MessagesContainer } from "@/components/messages";
import { ConversationList } from "@/components/messages/conversation-list";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { Message, Conversation } from "@/types";

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "doctor1",
    senderName: "Dr. Sarah Wilson",
    content: "Your test results are ready for review. Everything looks normal, but I'd like to discuss a few points with you during our next appointment.",
    timestamp: "2025-01-10T14:30:00Z",
    attachments: ["lab-results.pdf"],
  },
  {
    id: "2",
    senderId: "patient",
    senderName: "You",
    content: "Thank you, Dr. Wilson. Should I be concerned about anything in particular?",
    timestamp: "2025-01-10T15:00:00Z",
  },
  {
    id: "3",
    senderId: "doctor1",
    senderName: "Dr. Sarah Wilson",
    content: "No major concerns. Your cholesterol levels are slightly elevated, but we can address this with diet and exercise modifications.",
    timestamp: "2025-01-10T15:15:00Z",
  },
  {
    id: "4",
    senderId: "doctor2",
    senderName: "Dr. Mike Johnson",
    content: "Appointment reminder: You have an appointment scheduled for tomorrow at 10:00 AM. Please bring your insurance card and a list of current medications.",
    timestamp: "2025-01-09T10:00:00Z",
  },
];

const conversations: Conversation[] = [
  { id: "doctor1", name: "Dr. Sarah Wilson", specialty: "Cardiology", lastMessage: "No major concerns. Your cholesterol...", timestamp: "2 hours ago", unread: 0 },
  { id: "doctor2", name: "Dr. Mike Johnson", specialty: "Primary Care", lastMessage: "Appointment reminder: You have...", timestamp: "1 day ago", unread: 1 },
  { id: "doctor3", name: "Dr. Emily Chen", specialty: "Dermatology", lastMessage: "How are you feeling after the...", timestamp: "3 days ago", unread: 0 },
];

export default function MessagesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading your messages..." />;
  }
  
  return (
    <DashboardLayout title="Messages" description="Communicate with your healthcare providers">
      {/* Desktop: Show full messages container */}
      <div className="hidden md:block">
        <MessagesContainer conversations={conversations} messages={mockMessages} />
      </div>
      
      {/* Mobile: Show only conversation list */}
      <div className="md:hidden">
        <ConversationList 
          conversations={conversations} 
          selectedConversation=""
          onConversationSelect={(id) => {
            // Navigate to individual conversation page on mobile
            router.push(`/messages/${id}`);
          }}
        />
      </div>
    </DashboardLayout>
  );
}
