'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, MapPin, Video, Phone, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  duration: number;
  type: 'appointment' | 'blocked' | 'break';
  patient?: {
    name: string;
    id: string;
  };
  appointmentType?: 'in-person' | 'telehealth' | 'phone';
  status?: 'confirmed' | 'pending' | 'cancelled';
  location?: string;
  notes?: string;
}

const mockSchedule: ScheduleItem[] = [
  {
    id: '1',
    time: '08:00',
    duration: 30,
    type: 'appointment',
    patient: { name: 'Maria Rodriguez', id: 'P001' },
    appointmentType: 'in-person',
    status: 'confirmed',
    location: 'Room 101',
    notes: 'Follow-up diabetes management'
  },
  {
    id: '2',
    time: '08:30',
    duration: 30,
    type: 'appointment',
    patient: { name: 'James Wilson', id: 'P002' },
    appointmentType: 'telehealth',
    status: 'confirmed',
    notes: 'Routine check-up'
  },
  {
    id: '3',
    time: '09:00',
    duration: 15,
    type: 'appointment',
    patient: { name: 'Lisa Chen', id: 'P003' },
    appointmentType: 'phone',
    status: 'pending',
    notes: 'Lab results discussion'
  },
  {
    id: '4',
    time: '09:30',
    duration: 60,
    type: 'blocked',
    notes: 'Medical records review'
  },
  {
    id: '5',
    time: '10:30',
    duration: 30,
    type: 'break',
    notes: 'Coffee break'
  },
  {
    id: '6',
    time: '11:00',
    duration: 45,
    type: 'appointment',
    patient: { name: 'Robert Johnson', id: 'P004' },
    appointmentType: 'in-person',
    status: 'confirmed',
    location: 'Room 103',
    notes: 'Hypertension consultation'
  },
  {
    id: '7',
    time: '12:00',
    duration: 60,
    type: 'break',
    notes: 'Lunch break'
  },
  {
    id: '8',
    time: '13:00',
    duration: 30,
    type: 'appointment',
    patient: { name: 'Sarah Davis', id: 'P005' },
    appointmentType: 'telehealth',
    status: 'confirmed',
    notes: 'Mental health follow-up'
  },
  {
    id: '9',
    time: '14:00',
    duration: 30,
    type: 'appointment',
    patient: { name: 'Michael Brown', id: 'P006' },
    appointmentType: 'in-person',
    status: 'confirmed',
    location: 'Room 102',
    notes: 'Physical therapy evaluation'
  }
];

export default function ProviderSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const getScheduleItem = (time: string) => {
    return mockSchedule.find(item => item.time === time);
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'telehealth':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-50 border-blue-200';
      case 'blocked':
        return 'bg-purple-50 border-purple-200';
      case 'break':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600">Manage appointments and availability</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Block Time
          </Button>
        </div>
      </div>

      {/* Date Navigation and View Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="cursor-pointer"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
                <p className="text-sm text-gray-600">Today</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="cursor-pointer"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex rounded-lg border bg-gray-50 p-1">
              {['day', 'week', 'month'].map((viewType) => (
                <Button
                  key={viewType}
                  variant={view === viewType ? 'default' : 'ghost'}
                  size="sm"
                  className={`cursor-pointer capitalize ${view === viewType ? '' : 'hover:bg-white'}`}
                  onClick={() => setView(viewType as 'day' | 'week' | 'month')}
                >
                  {viewType}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid - Day View */}
      {view === 'day' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {getTimeSlots().map((time) => {
                const scheduleItem = getScheduleItem(time);
                return (
                  <div key={time} className="flex border-b border-gray-100">
                    <div className="w-20 p-3 text-sm text-gray-600 border-r bg-gray-50">
                      {time}
                    </div>
                    <div className="flex-1 p-3 min-h-[60px]">
                      {scheduleItem && (
                        <div className={`p-3 rounded-lg border-2 ${getTypeColor(scheduleItem.type)}`}>
                          {scheduleItem.type === 'appointment' && scheduleItem.patient ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span className="font-medium">{scheduleItem.patient.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {scheduleItem.appointmentType && getAppointmentTypeIcon(scheduleItem.appointmentType)}
                                  {scheduleItem.status && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheduleItem.status)}`}>
                                      {scheduleItem.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {scheduleItem.duration} min
                                </div>
                                {scheduleItem.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {scheduleItem.location}
                                  </div>
                                )}
                              </div>
                              {scheduleItem.notes && (
                                <p className="text-sm text-gray-700">{scheduleItem.notes}</p>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium capitalize">{scheduleItem.type}</span>
                              {scheduleItem.notes && (
                                <span className="text-gray-600">- {scheduleItem.notes}</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Slots</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Telehealth</p>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
              <Video className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 cursor-pointer">
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Schedule Appointment</div>
                <div className="text-sm text-gray-600">Book new patient visit</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 cursor-pointer">
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Block Time</div>
                <div className="text-sm text-gray-600">Reserve time slots</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 cursor-pointer">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">View Availability</div>
                <div className="text-sm text-gray-600">Check open slots</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
