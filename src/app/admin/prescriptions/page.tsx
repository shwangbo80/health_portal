'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Pill,
  Calendar,
} from 'lucide-react';
import { PrescriptionManagement } from '@/types';

const mockPrescriptions: PrescriptionManagement[] = [
  {
    id: '1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Sarah Johnson',
    prescribedDate: '2024-01-10',
    refillsRemaining: 2,
    patientId: 'pt1',
    patientName: 'John Smith',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    instructions: 'Take with food in the morning',
    pharmacyId: 'ph1',
    pharmacyName: 'IEHP Pharmacy - Riverside',
    filledDate: '2024-01-10',
    quantity: 30,
    daysSupply: 30,
    priorAuthRequired: false,
    costEstimate: 15.50,
    status: 'active',
  },
  {
    id: '2',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    prescribedBy: 'Dr. Michael Chen',
    prescribedDate: '2024-01-08',
    refillsRemaining: 0,
    patientId: 'pt2',
    patientName: 'Emily Davis',
    providerId: 'pr2',
    providerName: 'Dr. Michael Chen',
    instructions: 'Take with meals',
    pharmacyId: 'ph2',
    pharmacyName: 'CVS Pharmacy #1234',
    filledDate: '2024-01-08',
    quantity: 60,
    daysSupply: 30,
    priorAuthRequired: false,
    costEstimate: 8.25,
    status: 'pending_refill',
  },
  {
    id: '3',
    medicationName: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Sarah Johnson',
    prescribedDate: '2024-01-05',
    refillsRemaining: 3,
    patientId: 'pt3',
    patientName: 'Michael Brown',
    providerId: 'pr1',
    providerName: 'Dr. Sarah Johnson',
    instructions: 'Take at bedtime',
    pharmacyId: 'ph1',
    pharmacyName: 'IEHP Pharmacy - Riverside',
    filledDate: '2024-01-05',
    quantity: 30,
    daysSupply: 30,
    priorAuthRequired: true,
    costEstimate: 25.75,
    status: 'active',
  },
  {
    id: '4',
    medicationName: 'Amlodipine',
    dosage: '5mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Lisa Rodriguez',
    prescribedDate: '2023-12-20',
    refillsRemaining: 1,
    patientId: 'pt4',
    patientName: 'Sarah Wilson',
    providerId: 'pr3',
    providerName: 'Dr. Lisa Rodriguez',
    instructions: 'Take in the morning',
    pharmacyId: 'ph3',
    pharmacyName: 'Walgreens #5678',
    filledDate: undefined,
    quantity: 30,
    daysSupply: 30,
    priorAuthRequired: false,
    costEstimate: 12.00,
    status: 'expired',
  },
];

export default function PrescriptionsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState(mockPrescriptions);

  const handleFilter = () => {
    let filtered = mockPrescriptions;

    if (searchTerm) {
      filtered = filtered.filter(
        (prescription) =>
          prescription.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prescription.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((prescription) => prescription.status === filterStatus);
    }

    setFilteredPrescriptions(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending_refill':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Pill className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_refill':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrescriptionAction = (prescriptionId: string, action: string) => {
    console.log(`Prescription ${prescriptionId}: ${action}`);
  };

  const getPrescriptionStats = () => {
    return {
      total: mockPrescriptions.length,
      active: mockPrescriptions.filter((p) => p.status === 'active').length,
      pendingRefill: mockPrescriptions.filter((p) => p.status === 'pending_refill').length,
      expired: mockPrescriptions.filter((p) => p.status === 'expired').length,
      needingAuth: mockPrescriptions.filter((p) => p.priorAuthRequired).length,
    };
  };

  const stats = getPrescriptionStats();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Prescription Management</h1>
            <p className="mt-2 text-gray-600">Monitor and manage all prescriptions in the system</p>
          </div>
          <Button className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Pill className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending Refill</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.pendingRefill}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Prior Auth Required</p>
                  <p className="text-xl font-semibold text-gray-900">{stats.needingAuth}</p>
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
                    placeholder="Search by medication, patient, or provider..."
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
                  <option value="pending_refill">Pending Refill</option>
                  <option value="expired">Expired</option>
                  <option value="canceled">Canceled</option>
                </select>
                <Button variant="outline" onClick={handleFilter}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Prescriptions ({filteredPrescriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Medication</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Patient</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Provider</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Prescribed</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Pharmacy</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Refills</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{prescription.medicationName}</p>
                          <p className="text-sm text-gray-500">
                            {prescription.dosage} • {prescription.frequency}
                          </p>
                          {prescription.priorAuthRequired && (
                            <div className="mt-1">
                              <span className="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Prior Auth Required
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-gray-900">{prescription.patientName}</p>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-gray-900">{prescription.providerName}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(prescription.prescribedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">{prescription.pharmacyName}</p>
                        {prescription.filledDate && (
                          <p className="text-xs text-gray-500">
                            Filled: {new Date(prescription.filledDate).toLocaleDateString()}
                          </p>
                        )}
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-900">{prescription.refillsRemaining} remaining</p>
                        <p className="text-xs text-gray-500">{prescription.daysSupply} day supply</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {getStatusIcon(prescription.status)}
                          <span className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(prescription.status)}`}>
                            {prescription.status.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePrescriptionAction(prescription.id, 'view')}
                          >
                            View
                          </Button>
                          {prescription.status === 'pending_refill' && (
                            <Button
                              size="sm"
                              onClick={() => handlePrescriptionAction(prescription.id, 'approve')}
                            >
                              Approve
                            </Button>
                          )}
                          {prescription.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePrescriptionAction(prescription.id, 'modify')}
                            >
                              Modify
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPrescriptions.length === 0 && (
              <div className="py-8 text-center">
                <Pill className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
