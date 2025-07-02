'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Search, 
  User, 
  MapPin,
  Video,
  ArrowLeft,
  Plus,
  Save
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    phone: '(555) 123-4567',
    email: 'maria.rodriguez@email.com',
    lastVisit: '2024-12-15'
  },
  {
    id: '2',
    name: 'James Thompson',
    phone: '(555) 234-5678',
    email: 'james.thompson@email.com',
    lastVisit: '2024-12-20'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    phone: '(555) 345-6789',
    email: 'sarah.chen@email.com',
    lastVisit: '2024-11-28'
  }
];

export default function ScheduleAppointment() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    duration: '30',
    type: 'office-visit',
    reason: '',
    location: 'Main Clinic',
    room: '',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scheduling appointment:', { patient: selectedPatient, ...appointmentData });
    // Here you would typically make an API call to schedule the appointment
    alert('Appointment scheduled successfully!');
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/provider">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule New Appointment</h1>
          <p className="text-gray-600">Book an appointment for a patient</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedPatient ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPatient.phone}</p>
                    <p className="text-sm text-gray-600">{selectedPatient.email}</p>
                    {selectedPatient.lastVisit && (
                      <p className="text-xs text-gray-500">
                        Last visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.phone}</p>
                    {patient.lastVisit && (
                      <p className="text-xs text-gray-500">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8">
                    <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No patients found</p>
                    <Button className="mt-2" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Patient
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={appointmentData.date}
                    onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    value={appointmentData.duration}
                    onChange={(e) => setAppointmentData({...appointmentData, duration: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="15">15 minutes</option>
                    <option value="20">20 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setAppointmentData({...appointmentData, time})}
                      className={`p-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 ${
                        appointmentData.time === time
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : ''
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAppointmentData({...appointmentData, type: 'office-visit'})}
                    className={`p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 ${
                      appointmentData.type === 'office-visit'
                        ? 'bg-blue-50 border-blue-500'
                        : ''
                    }`}
                  >
                    <MapPin className="h-5 w-5 mb-1" />
                    <div className="font-medium">Office Visit</div>
                    <div className="text-sm text-gray-600">In-person appointment</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppointmentData({...appointmentData, type: 'telehealth'})}
                    className={`p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 ${
                      appointmentData.type === 'telehealth'
                        ? 'bg-blue-50 border-blue-500'
                        : ''
                    }`}
                  >
                    <Video className="h-5 w-5 mb-1" />
                    <div className="font-medium">Telehealth</div>
                    <div className="text-sm text-gray-600">Video consultation</div>
                  </button>
                </div>
              </div>

              {appointmentData.type === 'office-visit' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select
                      value={appointmentData.location}
                      onChange={(e) => setAppointmentData({...appointmentData, location: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Main Clinic">Main Clinic</option>
                      <option value="North Campus">North Campus</option>
                      <option value="South Campus">South Campus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room (Optional)
                    </label>
                    <Input
                      value={appointmentData.room}
                      onChange={(e) => setAppointmentData({...appointmentData, room: e.target.value})}
                      placeholder="e.g. Room 101"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <Input
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                  placeholder="e.g. Annual checkup, Follow-up visit"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                  placeholder="Additional notes for the appointment..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!selectedPatient || !appointmentData.date || !appointmentData.time || !appointmentData.reason}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Link href="/provider">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
