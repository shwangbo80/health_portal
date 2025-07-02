'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  FileText,
  TestTube,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { DashboardStats, AppointmentManagement, PatientOverview } from '@/types';
import { useRouter } from 'next/navigation';

// Mock data for provider
const mockProviderStats: DashboardStats = {
  totalPatients: 127,
  totalAppointments: 23,
  upcomingAppointments: 8,
  pendingLabResults: 5,
  activePrescriptions: 34,
  criticalAlerts: 1,
  patientSatisfaction: 4.9,
};

const mockTodayAppointments: AppointmentManagement[] = [
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
  },
  {
    id: '3',
    doctorId: 'dr1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiology',
    patientId: 'pt3',
    patientName: 'Michael Brown',
    patientPhone: '(555) 345-6789',
    patientEmail: 'michael.brown@email.com',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '2:00 PM',
    type: 'in-person',
    status: 'upcoming',
    duration: 60,
    visitReason: 'Chest pain evaluation',
    room: 'Room 203',
  },
];

const mockPendingTasks = [
  {
    id: '1',
    type: 'lab-review',
    title: 'Review Lab Results',
    patientName: 'John Smith',
    priority: 'high',
    dueTime: '30 mins ago',
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Approve Prescription Refill',
    patientName: 'Emily Davis',
    priority: 'medium',
    dueTime: '1 hour ago',
  },
  {
    id: '3',
    type: 'message',
    title: 'Patient Message',
    patientName: 'Michael Brown',
    priority: 'low',
    dueTime: '2 hours ago',
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
    primaryProvider: 'Dr. Sarah Johnson',
    insuranceProvider: 'Aetna',
    status: 'active',
    totalAppointments: 8,
    totalPrescriptions: 2,
  },
];

export default function ProviderDashboard() {
  const router = useRouter();
  
  const handleTaskAction = (taskId: string, action: string, taskType?: string) => {
    if (action === 'complete') {
      if (taskType === 'lab-review') {
        router.push(`/provider/lab-review?taskId=${taskId}`);
      } else if (taskType === 'prescription') {
        router.push(`/provider/prescription-approval?taskId=${taskId}`);
      } else if (taskType === 'message') {
        router.push(`/provider/message-response?taskId=${taskId}`);
      }
    } else if (action === 'defer') {
      router.push(`/provider/defer-task?taskId=${taskId}`);
    } else {
      console.log(`Task ${taskId}: ${action}`);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'lab-review':
        return <TestTube className="h-5 w-5 text-purple-500" />;
      case 'prescription':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="mt-2 text-gray-600">Good morning, Dr. Johnson! You have 8 appointments today.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <Card 
            className="cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => router.push('/provider/patients')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">My Patients</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => router.push('/provider/schedule')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.upcomingAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => router.push('/provider/lab-results')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <TestTube className="h-8 w-8 text-purple-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending Labs</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.pendingLabResults}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => router.push('/provider/prescriptions')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-orange-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.activePrescriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-colors hover:bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.criticalAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-colors hover:bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
                  <p className="text-xl font-semibold text-gray-900">{mockProviderStats.patientSatisfaction}/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => router.push('/provider/tasks')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-indigo-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-xl font-semibold text-gray-900">{mockPendingTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Today's Schedule */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTodayAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{appointment.patientName}</h4>
                        <p className="text-sm text-gray-600">{appointment.visitReason}</p>
                        <p className="text-xs text-gray-500">
                          {appointment.time} • {appointment.duration} min
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
                    <div className="mt-2 flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => router.push(`/provider/patients/${appointment.patientId}`)}
                      >
                        View Chart
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => router.push(`/provider/check-in?appointmentId=${appointment.id}`)}
                      >
                        Check In
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => router.push('/provider/schedule')}
              >
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        {getTaskIcon(task.type)}
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.patientName}</p>
                          <p className="text-xs text-gray-500">Due: {task.dueTime}</p>
                        </div>
                      </div>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleTaskAction(task.id, 'complete', task.type)}
                      >
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTaskAction(task.id, 'defer')}
                      >
                        Defer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => router.push('/provider/tasks')}
              >
                View All Tasks
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
                        <p className="text-sm text-gray-600">
                          {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years old
                        </p>
                        <p className="text-xs text-gray-500">
                          Last visit: {new Date(patient.lastVisit!).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Next: {new Date(patient.nextAppointment!).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 w-full"
                      onClick={() => router.push(`/provider/patients/${patient.id}`)}
                    >
                      View Chart
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => router.push('/provider/patients')}
              >
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button 
              className="h-20 flex-col"
              onClick={() => router.push('/provider/schedule-appointment')}
            >
              <Calendar className="mb-2 h-6 w-6" />
              Schedule Appointment
            </Button>
            <Button 
              className="h-20 flex-col"
              onClick={() => router.push('/provider/write-prescription')}
            >
              <FileText className="mb-2 h-6 w-6" />
              Write Prescription
            </Button>
            <Button 
              className="h-20 flex-col"
              onClick={() => router.push('/provider/order-lab')}
            >
              <TestTube className="mb-2 h-6 w-6" />
              Order Lab Test
            </Button>
            <Button 
              className="h-20 flex-col"
              onClick={() => router.push('/provider/send-message')}
            >
              <MessageSquare className="mb-2 h-6 w-6" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
