'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Search, 
  User, 
  Clock, 
  MapPin,
  Video,
  FileText,
  Plus,
  ChevronRight
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  appointmentType: 'office-visit' | 'telehealth' | 'follow-up' | 'consultation' | 'procedure';
  date: string;
  time: string;
  duration: number; // minutes
  status: 'scheduled' | 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  location?: string;
  roomNumber?: string;
  insurance: string;
  lastVisit?: string;
  notes?: string;
  isUrgent?: boolean;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    appointmentType: 'follow-up',
    date: '2024-12-25',
    time: '09:00',
    duration: 30,
    status: 'scheduled',
    reason: 'Diabetes follow-up and lab review',
    location: 'Main Clinic',
    roomNumber: 'Room 101',
    insurance: 'IEHP Complete Care',
    lastVisit: '2024-12-15',
    notes: 'Patient has concerns about recent glucose readings',
    isUrgent: true
  },
  {
    id: '2',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    appointmentType: 'telehealth',
    date: '2024-12-25',
    time: '10:30',
    duration: 20,
    status: 'confirmed',
    reason: 'COPD medication review',
    insurance: 'IEHP DualChoice',
    lastVisit: '2024-12-20'
  },
  {
    id: '3',
    patientName: 'Sarah Chen',
    patientId: 'ICP456789123',
    appointmentType: 'office-visit',
    date: '2024-12-25',
    time: '11:00',
    duration: 45,
    status: 'checked-in',
    reason: 'Annual physical examination',
    location: 'Main Clinic',
    roomNumber: 'Room 102',
    insurance: 'IEHP Complete Care',
    lastVisit: '2023-12-01'
  },
  {
    id: '4',
    patientName: 'Robert Garcia',
    patientId: 'ICP789123456',
    appointmentType: 'follow-up',
    date: '2024-12-25',
    time: '14:00',
    duration: 30,
    status: 'scheduled',
    reason: 'HbA1c results discussion',
    location: 'Main Clinic',
    roomNumber: 'Room 103',
    insurance: 'IEHP Complete Care',
    lastVisit: '2024-12-15',
    notes: 'HbA1c results show 7.2% - need medication adjustment'
  },
  {
    id: '5',
    patientName: 'Jennifer Lee',
    patientId: 'IDC654321987',
    appointmentType: 'consultation',
    date: '2024-12-26',
    time: '09:30',
    duration: 60,
    status: 'scheduled',
    reason: 'Chronic headache evaluation',
    location: 'Neurology Clinic',
    roomNumber: 'Room 201',
    insurance: 'IEHP DualChoice',
    lastVisit: '2024-10-15'
  },
  {
    id: '6',
    patientName: 'Michael Brown',
    patientId: 'ICP111222333',
    appointmentType: 'procedure',
    date: '2024-12-26',
    time: '11:00',
    duration: 90,
    status: 'confirmed',
    reason: 'Minor surgical procedure',
    location: 'Surgery Center',
    roomNumber: 'OR 1',
    insurance: 'IEHP Complete Care',
    lastVisit: '2024-12-10'
  },
  {
    id: '7',
    patientName: 'Lisa Davis',
    patientId: 'ICP444555666',
    appointmentType: 'office-visit',
    date: '2024-12-24',
    time: '15:00',
    duration: 30,
    status: 'no-show',
    reason: 'Thyroid function review',
    location: 'Main Clinic',
    roomNumber: 'Room 104',
    insurance: 'IEHP Complete Care',
    lastVisit: '2024-11-20'
  }
];

export default function ProviderAppointments() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Appointment['status']>('all');
  const [filterType, setFilterType] = useState<'all' | Appointment['appointmentType']>('all');

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientId.includes(searchTerm);
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesType = filterType === 'all' || appointment.appointmentType === filterType;
    
    return matchesSearch && matchesDate && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'checked-in': return 'bg-purple-100 text-purple-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'telehealth': return <Video className="h-4 w-4" />;
      case 'office-visit': return <MapPin className="h-4 w-4" />;
      case 'follow-up': return <User className="h-4 w-4" />;
      case 'consultation': return <FileText className="h-4 w-4" />;
      case 'procedure': return <FileText className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'office-visit': return 'Office Visit';
      case 'telehealth': return 'Telehealth';
      case 'follow-up': return 'Follow-up';
      case 'consultation': return 'Consultation';
      case 'procedure': return 'Procedure';
      default: return type;
    }
  };

  const todayAppointments = mockAppointments.filter(a => 
    new Date(a.date).toDateString() === new Date().toDateString()
  ).length;

  const upcomingAppointments = mockAppointments.filter(a => 
    new Date(a.date) > new Date() && a.status !== 'cancelled'
  ).length;

  const checkedInPatients = mockAppointments.filter(a => 
    a.status === 'checked-in' || a.status === 'in-progress'
  ).length;

  const urgentAppointments = mockAppointments.filter(a => a.isUrgent).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your appointment schedule</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                <p className="text-2xl font-bold text-blue-600">{todayAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checked In</p>
                <p className="text-2xl font-bold text-purple-600">{checkedInPatients}</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{upcomingAppointments}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentAppointments}</p>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
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
                  placeholder="Search by patient name, reason, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | Appointment['status'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="checked-in">Checked In</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | Appointment['appointmentType'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="office-visit">Office Visit</option>
                <option value="telehealth">Telehealth</option>
                <option value="follow-up">Follow-up</option>
                <option value="consultation">Consultation</option>
                <option value="procedure">Procedure</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className={`hover:shadow-md transition-shadow ${appointment.isUrgent ? 'border-red-200' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {appointment.patientName}
                      {appointment.isUrgent && (
                        <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                      )}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getTypeIcon(appointment.appointmentType)}
                        <span className="ml-1">{getTypeLabel(appointment.appointmentType)}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">{appointment.reason}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {appointment.time} ({appointment.duration} min)
                    </div>
                    {appointment.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {appointment.location} {appointment.roomNumber && `- ${appointment.roomNumber}`}
                      </div>
                    )}
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      {appointment.insurance}
                    </div>
                  </div>
                  
                  {appointment.lastVisit && (
                    <div className="text-sm text-gray-500">
                      Last visit: {new Date(appointment.lastVisit).toLocaleDateString()}
                    </div>
                  )}
                  
                  {appointment.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto">
                  {appointment.status === 'checked-in' && (
                    <Button 
                      size="sm" 
                      className="flex-1 lg:flex-none"
                      onClick={() => router.push(`/provider/start-visit?appointmentId=${appointment.id}`)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Start Visit
                    </Button>
                  )}
                  {appointment.appointmentType === 'telehealth' && appointment.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => router.push(`/provider/join-video?appointmentId=${appointment.id}`)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Video
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 lg:flex-none"
                    onClick={() => router.push(`/provider/patients/${appointment.patientId}`)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Chart
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 lg:flex-none"
                    onClick={() => router.push(`/provider/appointment-details?appointmentId=${appointment.id}`)}
                  >
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No appointments match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
