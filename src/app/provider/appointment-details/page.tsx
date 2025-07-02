'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  Phone,
  Mail,
  FileText,
  Video,
  ArrowLeft,
  Edit,
  Trash2,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

// Mock appointment data
const mockAppointmentDetails = {
  '1': {
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
    isUrgent: true,
    patientPhone: '(555) 123-4567',
    patientEmail: 'maria.rodriguez@email.com',
    patientAge: 58,
    patientGender: 'Female',
    emergencyContact: 'Carlos Rodriguez - (555) 123-4568',
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: [
      'Metformin 500mg - Twice daily',
      'Lisinopril 10mg - Once daily',
      'Atorvastatin 20mg - Once daily'
    ],
    appointmentHistory: [
      { date: '2024-12-15', reason: 'Lab results review', status: 'completed' },
      { date: '2024-11-20', reason: 'Routine diabetes check', status: 'completed' },
      { date: '2024-10-15', reason: 'Medication adjustment', status: 'completed' }
    ],
    vitals: {
      bloodPressure: '142/88',
      heartRate: '78',
      temperature: '98.6°F',
      weight: '165 lbs',
      height: '5\'4"',
      bmi: '28.3'
    }
  },
  '2': {
    id: '2',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    appointmentType: 'telehealth',
    date: '2024-12-25',
    time: '10:30',
    duration: 20,
    status: 'confirmed',
    reason: 'COPD medication review',
    location: undefined,
    roomNumber: undefined,
    insurance: 'IEHP DualChoice',
    lastVisit: '2024-12-20',
    notes: undefined,
    isUrgent: false,
    patientPhone: '(555) 234-5678',
    patientEmail: 'james.thompson@email.com',
    patientAge: 72,
    patientGender: 'Male',
    emergencyContact: 'Susan Thompson - (555) 234-5679',
    allergies: ['Aspirin'],
    currentMedications: [
      'Albuterol inhaler - As needed',
      'Fluticasone/Salmeterol - Twice daily',
      'Prednisone 5mg - Once daily'
    ],
    appointmentHistory: [
      { date: '2024-12-20', reason: 'COPD exacerbation', status: 'completed' },
      { date: '2024-11-25', reason: 'Routine COPD management', status: 'completed' }
    ],
    vitals: {
      bloodPressure: '135/82',
      heartRate: '88',
      temperature: '97.8°F',
      weight: '178 lbs',
      height: '5\'10"',
      oxygenSaturation: '92%'
    }
  }
};

function AppointmentDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || '1';
  
  const appointment = mockAppointmentDetails[appointmentId as keyof typeof mockAppointmentDetails] || mockAppointmentDetails['1'];

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
      case 'telehealth': return <Video className="h-5 w-5 text-blue-500" />;
      case 'office-visit': return <MapPin className="h-5 w-5 text-green-500" />;
      case 'follow-up': return <User className="h-5 w-5 text-purple-500" />;
      case 'consultation': return <FileText className="h-5 w-5 text-orange-500" />;
      case 'procedure': return <FileText className="h-5 w-5 text-red-500" />;
      default: return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointment Details</h1>
              <p className="mt-2 text-gray-600">View and manage appointment information</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Patient
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Appointment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Appointment Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                    <p className="text-gray-600">{appointment.reason}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <div className="flex items-center">
                        {getTypeIcon(appointment.appointmentType)}
                        <span className="ml-2 text-sm font-medium">
                          {appointment.appointmentType.replace('-', ' ')}
                        </span>
                      </div>
                      {appointment.isUrgent && (
                        <Badge variant="destructive">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-gray-600">{appointment.time} ({appointment.duration} min)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {appointment.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-3 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-gray-600">
                            {appointment.location}
                            {appointment.roomNumber && ` - ${appointment.roomNumber}`}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center">
                      <FileText className="mr-3 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Insurance</p>
                        <p className="text-sm text-gray-600">{appointment.insurance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-gray-900 mb-2">Notes</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Vitals */}
            {appointment.vitals && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(appointment.vitals).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-lg font-semibold text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointment History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointment.appointmentHistory.map((apt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{apt.reason}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(apt.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(apt.status)}>
                        {apt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Info Sidebar */}
          <div className="space-y-6">
            {/* Patient Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Patient ID</p>
                  <p className="text-sm text-gray-600">{appointment.patientId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Age & Gender</p>
                  <p className="text-sm text-gray-600">{appointment.patientAge} years old, {appointment.patientGender}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
                  <p className="text-sm text-gray-600">{appointment.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Visit</p>
                  <p className="text-sm text-gray-600">
                    {new Date(appointment.lastVisit).toLocaleDateString()}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push(`/provider/patients/${appointment.patientId}`)}
                >
                  View Full Chart
                </Button>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {appointment.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">{allergy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointment.currentMedications.map((medication, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">{medication}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentDetailsContent />
    </Suspense>
  );
}
