'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  FileText,
  TestTube,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Heart,
} from 'lucide-react';
import { DashboardStats, SystemAlert, AppointmentManagement, PatientOverview } from '@/types';

// Mock data
const mockStats: DashboardStats = {
  totalPatients: 1247,
  totalAppointments: 156,
  upcomingAppointments: 23,
  pendingLabResults: 8,
  activePrescriptions: 89,
  criticalAlerts: 3,
  revenue: 125000,
  patientSatisfaction: 4.8,
};

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Critical Lab Result',
    message: 'Patient John Smith has critically high blood pressure readings',
    timestamp: '2024-01-15T09:30:00Z',
    isRead: false,
    actionRequired: true,
    patientId: '1',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Appointment Cancellation',
    message: '3 appointments cancelled in the last hour',
    timestamp: '2024-01-15T09:15:00Z',
    isRead: false,
    actionRequired: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update',
    message: 'EHR system will be updated tonight at 11 PM',
    timestamp: '2024-01-15T08:00:00Z',
    isRead: true,
    actionRequired: false,
  },
];

const mockRecentAppointments: AppointmentManagement[] = [
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
    time: '10:00 AM',
    type: 'in-person',
    status: 'upcoming',
    duration: 30,
    visitReason: 'Routine checkup',
    room: 'Room 201',
  },
  {
    id: '2',
    doctorId: 'dr2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Internal Medicine',
    patientId: 'pt2',
    patientName: 'Emily Davis',
    patientPhone: '(555) 234-5678',
    patientEmail: 'emily.davis@email.com',
    providerId: 'pr2',
    providerName: 'Dr. Michael Chen',
    date: '2024-01-15',
    time: '11:30 AM',
    type: 'telehealth',
    status: 'upcoming',
    duration: 45,
    visitReason: 'Follow-up consultation',
  },
];

const mockRecentPatients: PatientOverview[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    lastVisit: '2024-01-10',
    nextAppointment: '2024-01-15',
    primaryProvider: 'Dr. Sarah Johnson',
    insuranceProvider: 'Blue Cross Blue Shield',
    status: 'active',
    totalAppointments: 12,
    totalPrescriptions: 3,
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1990-07-22',
    lastVisit: '2024-01-08',
    nextAppointment: '2024-01-15',
    primaryProvider: 'Dr. Michael Chen',
    insuranceProvider: 'Aetna',
    status: 'active',
    totalAppointments: 8,
    totalPrescriptions: 2,
  },
];

export default function AdminDashboard() {
  const handleMarkAlertRead = (alertId: string) => {
    // Mock function - would update alert status
    console.log('Marking alert as read:', alertId);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.totalPatients.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.upcomingAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TestTube className="h-8 w-8 text-purple-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending Labs</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.pendingLabResults}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-orange-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.activePrescriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.criticalAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-xl font-semibold text-gray-900">{formatCurrency(mockStats.revenue!)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-pink-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.patientSatisfaction}/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-indigo-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-xl font-semibold text-gray-900">{mockStats.totalAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* System Alerts */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border p-3 ${
                      alert.isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      {getAlertIcon(alert.type)}
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                        {!alert.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={() => handleMarkAlertRead(alert.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Today&apos;s Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{appointment.patientName}</h4>
                        <p className="text-sm text-gray-600">{appointment.visitReason}</p>
                        <p className="text-xs text-gray-500">
                          {appointment.time} • {appointment.doctorName}
                        </p>
                        {appointment.room && (
                          <p className="text-xs text-gray-500">{appointment.room}</p>
                        )}
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          appointment.type === 'telehealth'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {appointment.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View All Appointments
              </Button>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Recent Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentPatients.map((patient) => (
                  <div key={patient.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{patient.name}</h4>
                        <p className="text-sm text-gray-600">{patient.primaryProvider}</p>
                        <p className="text-xs text-gray-500">
                          Last visit: {new Date(patient.lastVisit!).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {patient.totalAppointments} appointments • {patient.totalPrescriptions} prescriptions
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : patient.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button className="h-20 flex-col">
              <Users className="mb-2 h-6 w-6" />
              Manage Patients
            </Button>
            <Button className="h-20 flex-col">
              <Calendar className="mb-2 h-6 w-6" />
              Schedule Appointment
            </Button>
            <Button className="h-20 flex-col">
              <FileText className="mb-2 h-6 w-6" />
              Prescriptions
            </Button>
            <Button className="h-20 flex-col">
              <TestTube className="mb-2 h-6 w-6" />
              Lab Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
