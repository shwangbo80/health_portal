'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Search,
  User,
  Send,
  Paperclip,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  mrn: string;
  lastVisit: string;
  email: string;
  phone: string;
}

interface Provider {
  id: string;
  name: string;
  specialty: string;
  department: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    dateOfBirth: '1985-03-15',
    mrn: 'MRN-001234',
    lastVisit: '2024-01-10',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
  },
  {
    id: '2',
    name: 'Emily Davis',
    dateOfBirth: '1990-07-22',
    mrn: 'MRN-002345',
    lastVisit: '2024-01-08',
    email: 'emily.davis@email.com',
    phone: '(555) 234-5678',
  },
  {
    id: '3',
    name: 'Michael Brown',
    dateOfBirth: '1978-11-03',
    mrn: 'MRN-003456',
    lastVisit: '2024-01-05',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    dateOfBirth: '1992-05-18',
    mrn: 'MRN-004567',
    lastVisit: '2024-01-12',
    email: 'sarah.wilson@email.com',
    phone: '(555) 456-7890',
  },
];

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Amanda Rodriguez',
    specialty: 'Internal Medicine',
    department: 'Primary Care',
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialty: 'Cardiology',
    department: 'Cardiology',
  },
  {
    id: '3',
    name: 'Dr. Lisa Thompson',
    specialty: 'Endocrinology',
    department: 'Endocrinology',
  },
  {
    id: '4',
    name: 'Dr. Robert Kim',
    specialty: 'Orthopedics',
    department: 'Orthopedic Surgery',
  },
];

export default function SendMessagePage() {
  const router = useRouter();
  const [recipientType, setRecipientType] = useState<'patient' | 'provider'>('patient');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<Patient | Provider | null>(null);
  const [messageType, setMessageType] = useState('general');
  const [priority, setPriority] = useState('normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProviders = mockProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedRecipient || !subject.trim() || !message.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would submit to an API
    alert(`Message sent successfully to ${('name' in selectedRecipient) ? selectedRecipient.name : ''}`);
    router.push('/provider');
  };

  const getRecipientName = (recipient: Patient | Provider | null): string => {
    if (!recipient) return '';
    return 'name' in recipient ? recipient.name : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Send Message</h1>
              <p className="mt-1 text-gray-600">Send secure messages to patients or providers</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recipient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Select Recipient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recipient Type */}
                <div>
                  <Label>Recipient Type</Label>
                  <div className="mt-2 flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipientType"
                        value="patient"
                        checked={recipientType === 'patient'}
                        onChange={() => {
                          setRecipientType('patient');
                          setSelectedRecipient(null);
                          setSearchTerm('');
                        }}
                        className="mr-2"
                      />
                      Patient
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipientType"
                        value="provider"
                        checked={recipientType === 'provider'}
                        onChange={() => {
                          setRecipientType('provider');
                          setSelectedRecipient(null);
                          setSearchTerm('');
                        }}
                        className="mr-2"
                      />
                      Provider
                    </label>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={`Search ${recipientType}s...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Selected Recipient */}
                {selectedRecipient ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{getRecipientName(selectedRecipient)}</h3>
                        {recipientType === 'patient' ? (
                          <div>
                            <p className="text-sm text-gray-600">
                              DOB: {new Date((selectedRecipient as Patient).dateOfBirth).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">MRN: {(selectedRecipient as Patient).mrn}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-600">{(selectedRecipient as Provider).specialty}</p>
                            <p className="text-sm text-gray-600">{(selectedRecipient as Provider).department}</p>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRecipient(null)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {recipientType === 'patient' ? (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
                          onClick={() => setSelectedRecipient(patient)}
                        >
                          <h3 className="font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                        </div>
                      ))
                    ) : (
                      filteredProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
                          onClick={() => setSelectedRecipient(provider)}
                        >
                          <h3 className="font-medium text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.specialty}</p>
                          <p className="text-sm text-gray-600">{provider.department}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Message Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="messageType">Message Type</Label>
                  <select
                    id="messageType"
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="general">General Communication</option>
                    <option value="appointment">Appointment Related</option>
                    <option value="prescription">Prescription Related</option>
                    <option value="lab-results">Lab Results</option>
                    <option value="referral">Referral</option>
                    <option value="urgent">Urgent Medical</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {(priority === 'urgent' || messageType === 'urgent') && (
                  <div className="rounded-lg bg-red-50 p-3">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-800">
                        <strong>Urgent Message:</strong> This message will be flagged for immediate attention
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Expected response time: {priority === 'urgent' ? '1-2 hours' : priority === 'high' ? '4-6 hours' : '24-48 hours'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Composition */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  className="mt-1"
                  rows={8}
                />
              </div>

              {/* Attachments */}
              <div>
                <Label>Attachments</Label>
                <div className="mt-2">
                  <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-gray-400">
                    <div className="text-center">
                      <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload files</p>
                      <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center">
                          <Paperclip className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({Math.round(file.size / 1024)} KB)
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedRecipient || !subject.trim() || !message.trim()}
            className="flex flex-1 items-center justify-center"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Message
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
