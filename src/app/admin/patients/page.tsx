'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MoreHorizontal,
} from 'lucide-react';
import { PatientOverview } from '@/types';

// Extended mock data for patients
const mockPatients: PatientOverview[] = [
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
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1975-12-03',
    lastVisit: '2024-01-05',
    nextAppointment: '2024-01-18',
    primaryProvider: 'Dr. Sarah Johnson',
    insuranceProvider: 'United Healthcare',
    status: 'active',
    totalAppointments: 15,
    totalPrescriptions: 5,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1988-09-14',
    lastVisit: '2023-12-20',
    nextAppointment: undefined,
    primaryProvider: 'Dr. Lisa Rodriguez',
    insuranceProvider: 'Cigna',
    status: 'inactive',
    totalAppointments: 3,
    totalPrescriptions: 1,
  },
  {
    id: '5',
    name: 'David Johnson',
    email: 'david.johnson@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1992-11-28',
    lastVisit: undefined,
    nextAppointment: '2024-01-20',
    primaryProvider: 'Dr. Michael Chen',
    insuranceProvider: 'Blue Cross Blue Shield',
    status: 'pending',
    totalAppointments: 0,
    totalPrescriptions: 0,
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '(555) 678-9012',
    dateOfBirth: '1983-06-07',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-01-22',
    primaryProvider: 'Dr. Sarah Johnson',
    insuranceProvider: 'Aetna',
    status: 'active',
    totalAppointments: 18,
    totalPrescriptions: 4,
  },
];

export default function PatientsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  // Filter patients based on search and status
  const handleFilter = () => {
    let filtered = mockPatients;

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((patient) => patient.status === filterStatus);
    }

    setFilteredPatients(filtered);
  };

  // Effect to filter patients when search or filter changes
  useState(() => {
    handleFilter();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  };

  const handlePatientAction = (patientId: string, action: string) => {
    console.log(`Patient ${patientId}: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="mt-2 text-gray-600">Manage and monitor all patients in the system</p>
          </div>
          <Button className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-xl font-semibold text-gray-900">{mockPatients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {mockPatients.filter((p) => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {mockPatients.filter((p) => p.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {mockPatients.filter((p) => p.status === 'inactive').length}
                  </p>
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
                    placeholder="Search patients by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button variant="outline" onClick={handleFilter}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patients ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Patient</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Contact</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Age</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Provider</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Last Visit</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Next Appointment</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.insuranceProvider}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="mr-2 h-4 w-4" />
                            {patient.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="mr-2 h-4 w-4" />
                            {patient.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">{calculateAge(patient.dateOfBirth)}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">{patient.primaryProvider}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">
                          {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">
                          {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString() : 'None'}
                        </p>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePatientAction(patient.id, 'view')}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePatientAction(patient.id, 'edit')}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePatientAction(patient.id, 'more')}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
