'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  Search, 
  User, 
  Calendar, 
  AlertTriangle,
  FileText,
  Plus,
  ChevronRight,
  RefreshCw,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  quantity: number;
  refillsRemaining: number;
  totalRefills: number;
  prescribedDate: string;
  lastFilled?: string;
  expirationDate: string;
  status: 'active' | 'pending' | 'discontinued' | 'expired' | 'refill-requested';
  pharmacy: string;
  indication: string;
  instructions: string;
  isControlled?: boolean;
  isPriority?: boolean;
  notes?: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    quantity: 60,
    refillsRemaining: 3,
    totalRefills: 5,
    prescribedDate: '2024-11-15',
    lastFilled: '2024-12-15',
    expirationDate: '2025-11-15',
    status: 'active',
    pharmacy: 'CVS Pharmacy #1234',
    indication: 'Type 2 Diabetes',
    instructions: 'Take with meals to reduce stomach upset',
    notes: 'Patient tolerating well, good glucose control'
  },
  {
    id: '2',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    medicationName: 'Albuterol Inhaler',
    dosage: '90mcg',
    frequency: 'As needed',
    quantity: 1,
    refillsRemaining: 0,
    totalRefills: 2,
    prescribedDate: '2024-10-20',
    lastFilled: '2024-11-20',
    expirationDate: '2025-10-20',
    status: 'refill-requested',
    pharmacy: 'Walgreens #5678',
    indication: 'COPD/Asthma',
    instructions: '2 puffs every 4-6 hours as needed for shortness of breath',
    isPriority: true
  },
  {
    id: '3',
    patientName: 'Sarah Chen',
    patientId: 'ICP456789123',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    quantity: 30,
    refillsRemaining: 4,
    totalRefills: 5,
    prescribedDate: '2024-12-01',
    lastFilled: '2024-12-01',
    expirationDate: '2025-12-01',
    status: 'active',
    pharmacy: 'Rite Aid #9012',
    indication: 'Hypertension',
    instructions: 'Take in the morning with or without food'
  },
  {
    id: '4',
    patientName: 'Robert Garcia',
    patientId: 'ICP789123456',
    medicationName: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    quantity: 30,
    refillsRemaining: 2,
    totalRefills: 5,
    prescribedDate: '2024-09-15',
    lastFilled: '2024-12-10',
    expirationDate: '2025-09-15',
    status: 'active',
    pharmacy: 'CVS Pharmacy #1234',
    indication: 'High Cholesterol',
    instructions: 'Take at bedtime. Avoid grapefruit juice',
    notes: 'Monitor liver function tests every 6 months'
  },
  {
    id: '5',
    patientName: 'Jennifer Lee',
    patientId: 'IDC654321987',
    medicationName: 'Oxycodone',
    dosage: '5mg',
    frequency: 'Every 6 hours as needed',
    quantity: 20,
    refillsRemaining: 0,
    totalRefills: 0,
    prescribedDate: '2024-12-10',
    lastFilled: '2024-12-10',
    expirationDate: '2025-01-10',
    status: 'active',
    pharmacy: 'Walgreens #5678',
    indication: 'Post-surgical pain',
    instructions: 'Take with food. Do not exceed 4 tablets per day',
    isControlled: true,
    isPriority: true,
    notes: 'Short-term use only. Schedule follow-up in 1 week'
  },
  {
    id: '6',
    patientName: 'Michael Brown',
    patientId: 'ICP111222333',
    medicationName: 'Levothyroxine',
    dosage: '75mcg',
    frequency: 'Once daily',
    quantity: 30,
    refillsRemaining: 0,
    totalRefills: 3,
    prescribedDate: '2024-08-15',
    lastFilled: '2024-11-15',
    expirationDate: '2024-12-25',
    status: 'expired',
    pharmacy: 'CVS Pharmacy #1234',
    indication: 'Hypothyroidism',
    instructions: 'Take on empty stomach, 1 hour before breakfast'
  },
  {
    id: '7',
    patientName: 'Lisa Davis',
    patientId: 'ICP444555666',
    medicationName: 'Sertraline',
    dosage: '50mg',
    frequency: 'Once daily',
    quantity: 30,
    refillsRemaining: 1,
    totalRefills: 5,
    prescribedDate: '2024-11-01',
    lastFilled: '2024-12-01',
    expirationDate: '2025-11-01',
    status: 'pending',
    pharmacy: 'Rite Aid #9012',
    indication: 'Depression/Anxiety',
    instructions: 'Take with or without food. May cause drowsiness',
    notes: 'Patient reports improved mood. Continue current dose'
  }
];

export default function ProviderPrescriptions() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Prescription['status']>('all');
  const [filterPatient, setFilterPatient] = useState('');

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = prescription.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.indication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || prescription.status === filterStatus;
    const matchesPatient = !filterPatient || prescription.patientName.toLowerCase().includes(filterPatient.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPatient;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'discontinued': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'refill-requested': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'discontinued': return <AlertTriangle className="h-4 w-4" />;
      case 'expired': return <AlertTriangle className="h-4 w-4" />;
      case 'refill-requested': return <RefreshCw className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  const activePrescriptions = mockPrescriptions.filter(p => p.status === 'active').length;
  const refillRequests = mockPrescriptions.filter(p => p.status === 'refill-requested').length;
  const expiringPrescriptions = mockPrescriptions.filter(p => {
    const expDate = new Date(p.expirationDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expDate <= thirtyDaysFromNow && p.status === 'active';
  }).length;
  const controlledMedications = mockPrescriptions.filter(p => p.isControlled && p.status === 'active').length;

  const needsAttention = mockPrescriptions.filter(p => 
    p.status === 'refill-requested' || 
    p.status === 'expired' || 
    (p.refillsRemaining === 0 && p.status === 'active') ||
    p.isPriority
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600">Manage patient prescriptions and refills</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activePrescriptions}</p>
              </div>
              <Pill className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refill Requests</p>
                <p className="text-2xl font-bold text-blue-600">{refillRequests}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{expiringPrescriptions}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Controlled</p>
                <p className="text-2xl font-bold text-red-600">{controlledMedications}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                <p className="text-2xl font-bold text-purple-600">{needsAttention}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search by medication, patient, or indication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Filter by patient..."
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
                className="w-48"
              />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | Prescription['status'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="refill-requested">Refill Requested</option>
                <option value="discontinued">Discontinued</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className={`hover:shadow-md transition-shadow ${prescription.isPriority ? 'border-red-200' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {prescription.medicationName} {prescription.dosage}
                      {prescription.isControlled && (
                        <Badge className="bg-red-100 text-red-800">Controlled</Badge>
                      )}
                      {prescription.isPriority && (
                        <Badge className="bg-orange-100 text-orange-800">Priority</Badge>
                      )}
                    </h3>
                    <Badge className={getStatusColor(prescription.status)}>
                      {getStatusIcon(prescription.status)}
                      <span className="ml-1">{prescription.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {prescription.patientName}
                    </div>
                    <div className="flex items-center">
                      <Pill className="mr-2 h-4 w-4" />
                      {prescription.frequency}
                    </div>
                    <div className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {prescription.refillsRemaining}/{prescription.totalRefills} refills left
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Expires: {new Date(prescription.expirationDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Indication:</strong> {prescription.indication}</p>
                    <p><strong>Instructions:</strong> {prescription.instructions}</p>
                    <p><strong>Pharmacy:</strong> {prescription.pharmacy}</p>
                  </div>
                  
                  {prescription.lastFilled && (
                    <div className="text-sm text-gray-500">
                      Last filled: {new Date(prescription.lastFilled).toLocaleDateString()}
                    </div>
                  )}
                  
                  {prescription.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{prescription.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto">
                  {prescription.status === 'refill-requested' && (
                    <Button 
                      size="sm" 
                      className="flex-1 lg:flex-none"
                      onClick={() => router.push(`/provider/prescription-approval?prescriptionId=${prescription.id}`)}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Approve Refill
                    </Button>
                  )}
                  {prescription.refillsRemaining === 0 && prescription.status === 'active' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => router.push(`/provider/renew-prescription?prescriptionId=${prescription.id}`)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Renew
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 lg:flex-none"
                    onClick={() => router.push(`/provider/edit-prescription?prescriptionId=${prescription.id}`)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 lg:flex-none"
                    onClick={() => router.push(`/provider/prescription-details?prescriptionId=${prescription.id}`)}
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

      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Pill className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No prescriptions match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
