'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  MapPin,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { AppointmentManagement } from '@/types';

const mockAppointments: AppointmentManagement[] = [
  {
    id: '1',
    doctorId: 'dr1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiology',
    patientId: 'pt1',
    patientName: 'John Smith',
    patientPhone: '(555) 123-4567',
    patientEmail: 'john.smith@email.com',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '9:00 AM',
    type: 'in-person',
    status: 'upcoming',
    duration: 30,
    visitReason: 'Routine checkup',
    room: 'Room 201',
    checkInTime: undefined,
    followUpRequired: false,
    visitSummary: undefined,
  },
  {
    id: '2',
    doctorId: 'dr1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiology',
    patientId: 'pt2',
    patientName: 'Emily Davis',
    patientPhone: '(555) 234-5678',
    patientEmail: 'emily.davis@email.com',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '10:30 AM',
    type: 'telehealth',
    status: 'upcoming',
    duration: 45,
    visitReason: 'Follow-up - High Blood Pressure',
    checkInTime: undefined,
    followUpRequired: true,
    visitSummary: undefined,
  },
  {
    id: '3',
    doctorId: 'dr2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Internal Medicine',
    patientId: 'pt3',
    patientName: 'Michael Brown',
    patientPhone: '(555) 345-6789',
    patientEmail: 'michael.brown@email.com',
    providerId: 'pr2',
    providerName: 'Dr. Michael Chen',
    date: '2024-01-15',
    time: '11:00 AM',
    type: 'in-person',
    status: 'completed',
    duration: 30,
    visitReason: 'Annual physical',
    room: 'Room 105',
    checkInTime: '10:45 AM',
    checkOutTime: '11:30 AM',
    followUpRequired: false,
    visitSummary: 'Patient in good health. Continue current medications.',
  },
  {
    id: '4',
    doctorId: 'dr3',
    doctorName: 'Dr. Lisa Rodriguez',
    doctorSpecialty: 'Dermatology',
    patientId: 'pt4',
    patientName: 'Sarah Wilson',
    patientPhone: '(555) 456-7890',
    patientEmail: 'sarah.wilson@email.com',
    providerId: 'pr3',
    providerName: 'Dr. Lisa Rodriguez',
    date: '2024-01-15',
    time: '2:00 PM',
    type: 'in-person',
    status: 'cancelled',
    duration: 30,
    visitReason: 'Skin consultation',
    room: 'Room 303',
    checkInTime: undefined,
    followUpRequired: false,
    visitSummary: undefined,
  },
  {
    id: '5',
    doctorId: 'dr1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiology',
    patientId: 'pt5',
    patientName: 'David Johnson',
    patientPhone: '(555) 567-8901',
    patientEmail: 'david.johnson@email.com',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '3:30 PM',
    type: 'telehealth',
    status: 'no-show',
    duration: 30,
    visitReason: 'Chest pain evaluation',
    checkInTime: undefined,
    followUpRequired: true,
    visitSummary: undefined,
  },
];

export default function AppointmentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);

  const handleFilter = () => {
    let filtered = mockAppointments;

    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.visitReason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((appointment) => appointment.status === filterStatus);
    }

    setFilteredAppointments(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAppointmentAction = (appointmentId: string, action: string) => {
    console.log(`Appointment ${appointmentId}: ${action}`);
  };

  const getAppointmentStats = () => {
    const today = filteredAppointments;
    return {
      total: today.length,
      upcoming: today.filter((a) => a.status === 'upcoming').length,
      completed: today.filter((a) => a.status === 'completed').length,
      cancelled: today.filter((a) => a.status === 'cancelled').length,
      noShow: today.filter((a) => a.status === 'no-show').length,
    };
  };

  const stats = getAppointmentStats();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointment Management</h1>
            <p className="mt-2 text-gray-600">Manage all appointments across the healthcare system</p>
          </div>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Today</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.upcoming}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">No-Show</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.noShow}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by patient, doctor, or reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No-Show</option>
                </select>
                <Button variant="outline" onClick={handleFilter}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Time</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Patient</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Provider</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Reason</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Location</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.time}</p>
                          <p className="text-sm text-gray-500">{appointment.duration} min</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-500">{appointment.patientPhone}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                          <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {appointment.type === 'telehealth' ? (
                            <Video className="mr-2 h-4 w-4 text-blue-500" />
                          ) : (
                            <User className="mr-2 h-4 w-4 text-green-500" />
                          )}
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">{appointment.visitReason}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          {appointment.type === 'telehealth' ? (
                            <>
                              <Video className="mr-1 h-4 w-4" />
                              Virtual
                            </>
                          ) : (
                            <>
                              <MapPin className="mr-1 h-4 w-4" />
                              {appointment.room}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {getStatusIcon(appointment.status)}
                          <span className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAppointmentAction(appointment.id, 'view')}
                          >
                            View
                          </Button>
                          {appointment.status === 'upcoming' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAppointmentAction(appointment.id, 'checkin')}
                              >
                                Check In
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAppointmentAction(appointment.id, 'reschedule')}
                              >
                                Reschedule
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
