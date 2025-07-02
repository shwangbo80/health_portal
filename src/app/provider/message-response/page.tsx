'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MessageSquare,
  User,
  Reply,
  CheckCircle,
  Clock,
  Paperclip,
  Send,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  subject: string;
  content: string;
  sentDate: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  type: 'general' | 'appointment' | 'prescription' | 'lab-results' | 'urgent';
  status: 'unread' | 'read' | 'replied';
  attachments?: string[];
}

const mockMessage: Message = {
  id: 'MSG001',
  patientId: '3',
  patientName: 'Michael Brown',
  patientEmail: 'michael.brown@email.com',
  subject: 'Question about chest pain symptoms',
  content: `Dr. Johnson,

I've been experiencing some mild chest discomfort over the past two days. It's not severe, but it's concerning me. The pain seems to come and go, and it's worse when I take deep breaths or move around quickly.

I'm not sure if this is related to my recent stress at work or if it could be something more serious. Should I be concerned? Do I need to come in for an appointment?

I'm currently taking my blood pressure medication as prescribed and haven't missed any doses.

Thank you for your time.

Best regards,
Michael Brown`,
  sentDate: '2024-06-30T14:30:00',
  priority: 'high',
  type: 'urgent',
  status: 'unread',
  attachments: [],
};

export default function MessageResponsePage() {
  const router = useRouter();
  const [response, setResponse] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [replied, setReplied] = useState(false);

  const handleSendResponse = () => {
    if (!response.trim()) {
      alert('Please enter a response message');
      return;
    }
    
    setReplied(true);
    setTimeout(() => {
      router.push('/provider');
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'appointment':
        return 'bg-green-100 text-green-800';
      case 'prescription':
        return 'bg-blue-100 text-blue-800';
      case 'lab-results':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (replied) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h1>
              <p className="text-green-700 mb-4">
                Your response to {mockMessage.patientName} has been sent successfully.
              </p>
              <div className="text-sm text-green-600">
                Redirecting to dashboard...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Message</h1>
              <p className="mt-1 text-gray-600">Review and respond to patient message</p>
            </div>
          </div>
        </div>

        {/* Patient & Message Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Message Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium">{mockMessage.patientName}</p>
                <p className="text-xs text-gray-500">{mockMessage.patientEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Received</p>
                <p className="font-medium">{new Date(mockMessage.sentDate).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">
                  {new Date(mockMessage.sentDate).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(mockMessage.priority)}`}>
                  {mockMessage.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(mockMessage.type)}`}>
                  {mockMessage.type}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Original Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Patient Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Subject: {mockMessage.subject}</h3>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {mockMessage.content}
                  </div>
                </div>

                {mockMessage.attachments && mockMessage.attachments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Attachments</p>
                    <div className="space-y-2">
                      {mockMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center rounded-lg border p-3">
                          <Paperclip className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clinical Assessment */}
                {mockMessage.type === 'urgent' && (
                  <div className="rounded-lg bg-red-50 p-4">
                    <h4 className="font-medium text-red-900 mb-2">Clinical Assessment Required</h4>
                    <p className="text-sm text-red-700">
                      This message contains urgent medical concerns that require immediate clinical evaluation and response.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Response */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Reply className="mr-2 h-5 w-5" />
                Your Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Quick Response Templates */}
                <div>
                  <Label>Quick Response Templates</Label>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setResponse('Thank you for reaching out. Based on your symptoms, I recommend you come in for an evaluation. Please call our office to schedule an appointment as soon as possible.')}
                    >
                      Schedule Urgent Appointment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setResponse('I understand your concern about chest discomfort. Given your symptoms, this requires immediate evaluation. Please come to the emergency room or call 911 if symptoms worsen.')}
                    >
                      Emergency Assessment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setResponse('Thank you for your message. I will review your chart and get back to you with specific recommendations within 24 hours.')}
                    >
                      Review Required
                    </Button>
                  </div>
                </div>

                {/* Response Message */}
                <div>
                  <Label htmlFor="response">Response Message *</Label>
                  <Textarea
                    id="response"
                    placeholder="Type your response to the patient..."
                    value={response}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setResponse(e.target.value)}
                    className="mt-1"
                    rows={8}
                  />
                </div>

                {/* Action Taken */}
                <div>
                  <Label htmlFor="actionTaken">Clinical Actions Taken</Label>
                  <Textarea
                    id="actionTaken"
                    placeholder="Document any clinical actions, referrals, or follow-up orders..."
                    value={actionTaken}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setActionTaken(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/provider/patients/${mockMessage.patientId}`)}
                    >
                      View Patient Chart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/schedule-appointment')}
                    >
                      Schedule Appointment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/order-lab')}
                    >
                      Order Lab Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/write-prescription')}
                    >
                      Write Prescription
                    </Button>
                  </div>
                </div>

                {/* Response Time */}
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-800">Response Time</p>
                      <p className="text-sm text-blue-700">
                        {mockMessage.priority === 'urgent' 
                          ? 'Target: Within 1-2 hours'
                          : mockMessage.priority === 'high'
                          ? 'Target: Within 4-6 hours'
                          : 'Target: Within 24-48 hours'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleSendResponse}
            disabled={!response.trim()}
            className="flex flex-1 items-center justify-center"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Response
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
