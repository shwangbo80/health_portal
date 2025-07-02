'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Search, 
  User, 
  Calendar, 
  Clock,
  Plus,
  Mail,
  MailOpen,
  Reply,
  Forward,
  Archive,
  Star,
  Paperclip
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  fromRole: 'patient' | 'provider' | 'staff' | 'admin';
  to: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'general' | 'appointment' | 'prescription' | 'lab-results' | 'insurance' | 'billing';
  attachments?: { name: string; type: string; size: string }[];
  patientId?: string;
  relatedTo?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    from: 'Maria Rodriguez',
    fromRole: 'patient',
    to: 'Dr. Sarah Johnson',
    subject: 'Question about blood sugar readings',
    preview: 'Hi Dr. Johnson, I have been monitoring my blood sugar as you requested...',
    content: 'Hi Dr. Johnson, I have been monitoring my blood sugar as you requested and I noticed some unusual readings. My morning readings have been consistently higher than usual (around 180-200) for the past week. Should I be concerned? I have been taking my medication as prescribed.',
    timestamp: '2024-12-24T09:30:00Z',
    isRead: false,
    isStarred: true,
    priority: 'high',
    category: 'general',
    patientId: 'ICP123456789'
  },
  {
    id: '2',
    from: 'James Thompson',
    fromRole: 'patient',
    to: 'Dr. Sarah Johnson',
    subject: 'Refill request for Albuterol inhaler',
    preview: 'Dear Dr. Johnson, I am running low on my albuterol inhaler...',
    content: 'Dear Dr. Johnson, I am running low on my albuterol inhaler and would like to request a refill. I have been using it more frequently lately due to increased shortness of breath. My current inhaler will last about 3 more days.',
    timestamp: '2024-12-24T08:15:00Z',
    isRead: false,
    isStarred: false,
    priority: 'urgent',
    category: 'prescription',
    patientId: 'IDC987654321'
  },
  {
    id: '3',
    from: 'Sarah Chen',
    fromRole: 'patient',
    to: 'Dr. Sarah Johnson',
    subject: 'Thank you for the annual physical',
    preview: 'Thank you for taking the time during my annual physical...',
    content: 'Thank you for taking the time during my annual physical yesterday. I appreciate your thorough examination and the health recommendations you provided. I will schedule the mammogram as discussed.',
    timestamp: '2024-12-23T16:45:00Z',
    isRead: true,
    isStarred: false,
    priority: 'normal',
    category: 'general',
    patientId: 'ICP456789123'
  },
  {
    id: '4',
    from: 'Robert Garcia',
    fromRole: 'patient',
    to: 'Dr. Sarah Johnson',
    subject: 'Lab results question',
    preview: 'I received my HbA1c results and wanted to ask about the numbers...',
    content: 'I received my HbA1c results and wanted to ask about the numbers. The result shows 7.2%. I know you mentioned you wanted it below 7%. What does this mean for my treatment plan?',
    timestamp: '2024-12-23T14:20:00Z',
    isRead: true,
    isStarred: false,
    priority: 'normal',
    category: 'lab-results',
    patientId: 'ICP789123456'
  },
  {
    id: '5',
    from: 'Medical Assistant Team',
    fromRole: 'staff',
    to: 'Dr. Sarah Johnson',
    subject: 'Patient no-show: Lisa Davis',
    preview: 'Patient Lisa Davis did not show up for her 3:00 PM appointment...',
    content: 'Patient Lisa Davis did not show up for her 3:00 PM appointment for thyroid function review. We attempted to call but received no answer. Please advise on rescheduling.',
    timestamp: '2024-12-23T15:30:00Z',
    isRead: true,
    isStarred: false,
    priority: 'normal',
    category: 'appointment',
    patientId: 'ICP444555666'
  },
  {
    id: '6',
    from: 'Jennifer Lee',
    fromRole: 'patient',
    to: 'Dr. Sarah Johnson',
    subject: 'Insurance prior authorization needed',
    preview: 'My insurance is requiring prior authorization for the MRI...',
    content: 'My insurance is requiring prior authorization for the MRI you ordered. They need additional documentation about the medical necessity. Can you please help with this?',
    timestamp: '2024-12-22T11:00:00Z',
    isRead: true,
    isStarred: false,
    priority: 'high',
    category: 'insurance',
    patientId: 'IDC654321987',
    attachments: [
      { name: 'Prior_Auth_Form.pdf', type: 'PDF', size: '245 KB' }
    ]
  },
  {
    id: '7',
    from: 'Pharmacy - CVS',
    fromRole: 'staff',
    to: 'Dr. Sarah Johnson',
    subject: 'Prescription clarification needed',
    preview: 'We need clarification on the Metformin prescription for Maria Rodriguez...',
    content: 'We need clarification on the Metformin prescription for Maria Rodriguez. The prescription shows 500mg twice daily, but the patient insurance requires generic substitution. Please confirm if generic is acceptable.',
    timestamp: '2024-12-22T09:45:00Z',
    isRead: false,
    isStarred: false,
    priority: 'normal',
    category: 'prescription',
    patientId: 'ICP123456789'
  }
];

export default function ProviderMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | Message['category']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Message['priority']>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || message.priority === filterPriority;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && message.isRead) ||
                       (filterRead === 'unread' && !message.isRead);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesRead;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'appointment': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'lab-results': return 'bg-yellow-100 text-yellow-800';
      case 'insurance': return 'bg-orange-100 text-orange-800';
      case 'billing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return <User className="h-4 w-4" />;
      case 'provider': return <User className="h-4 w-4" />;
      case 'staff': return <User className="h-4 w-4" />;
      case 'admin': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const unreadCount = mockMessages.filter(m => !m.isRead).length;
  const starredCount = mockMessages.filter(m => m.isStarred).length;
  const urgentCount = mockMessages.filter(m => m.priority === 'urgent').length;
  const todayCount = mockMessages.filter(m => 
    new Date(m.timestamp).toDateString() === new Date().toDateString()
  ).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with patients and staff</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Compose Message
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Starred</p>
                <p className="text-2xl font-bold text-yellow-600">{starredCount}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-green-600">{todayCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages by subject, sender, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value as 'all' | 'read' | 'unread')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as 'all' | Message['priority'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as 'all' | Message['category'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="appointment">Appointment</option>
                <option value="prescription">Prescription</option>
                <option value="lab-results">Lab Results</option>
                <option value="insurance">Insurance</option>
                <option value="billing">Billing</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-2">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`hover:shadow-md transition-shadow cursor-pointer ${!message.isRead ? 'bg-blue-50 border-blue-200' : ''}`}
            onClick={() => setSelectedMessage(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {message.isRead ? 
                      <MailOpen className="h-5 w-5 text-gray-400" /> : 
                      <Mail className="h-5 w-5 text-blue-600" />
                    }
                    {message.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  </div>
                  
                  <div className="flex items-center gap-2 min-w-0">
                    {getRoleIcon(message.fromRole)}
                    <span className={`font-medium truncate ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {message.from}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium truncate ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </span>
                      <div className="flex gap-1">
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                        <Badge className={getCategoryColor(message.category)}>
                          {message.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {message.attachments && message.attachments.length > 0 && (
                    <Paperclip className="h-4 w-4 text-gray-400" />
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No messages match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    ×
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(selectedMessage.fromRole)}
                    <span className="font-medium">{selectedMessage.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                  <Badge className={getPriorityColor(selectedMessage.priority)}>
                    {selectedMessage.priority}
                  </Badge>
                  <Badge className={getCategoryColor(selectedMessage.category)}>
                    {selectedMessage.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
                
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{attachment.name}</span>
                          <span className="text-sm text-gray-500">({attachment.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t p-4">
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm">
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  <Button size="sm" variant="outline">
                    <Forward className="mr-2 h-4 w-4" />
                    Forward
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                  <Button size="sm" variant="outline">
                    <Star className="mr-2 h-4 w-4" />
                    Star
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
