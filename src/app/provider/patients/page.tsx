'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  Heart,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  insurance: string;
  memberNumber: string;
  lastVisit: string;
  nextAppointment?: string;
  conditions: string[];
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive';
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    dateOfBirth: '1985-03-15',
    age: 40,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'maria.rodriguez@email.com',
    insurance: 'IEHP Complete Care',
    memberNumber: 'ICP123456789',
    lastVisit: '2024-12-15',
    nextAppointment: '2025-01-10',
    conditions: ['Diabetes Type 2', 'Hypertension'],
    riskLevel: 'medium',
    status: 'active'
  },
  {
    id: '2',
    name: 'James Thompson',
    dateOfBirth: '1960-08-22',
    age: 64,
    gender: 'Male',
    phone: '(555) 234-5678',
    email: 'james.thompson@email.com',
    insurance: 'IEHP DualChoice',
    memberNumber: 'IDC987654321',
    lastVisit: '2024-12-20',
    nextAppointment: '2025-01-05',
    conditions: ['COPD', 'Hypertension', 'Arthritis'],
    riskLevel: 'high',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    dateOfBirth: '1992-11-08',
    age: 32,
    gender: 'Female',
    phone: '(555) 345-6789',
    email: 'sarah.chen@email.com',
    insurance: 'IEHP Complete Care',
    memberNumber: 'ICP456789123',
    lastVisit: '2024-11-28',
    conditions: ['Asthma'],
    riskLevel: 'low',
    status: 'active'
  },
  {
    id: '4',
    name: 'Robert Garcia',
    dateOfBirth: '1975-05-12',
    age: 49,
    gender: 'Male',
    phone: '(555) 456-7890',
    email: 'robert.garcia@email.com',
    insurance: 'IEHP Complete Care',
    memberNumber: 'ICP789123456',
    lastVisit: '2024-12-18',
    nextAppointment: '2025-01-15',
    conditions: ['Pre-diabetes', 'High Cholesterol'],
    riskLevel: 'medium',
    status: 'active'
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    dateOfBirth: '1988-09-25',
    age: 36,
    gender: 'Female',
    phone: '(555) 567-8901',
    email: 'jennifer.lee@email.com',
    insurance: 'IEHP DualChoice',
    memberNumber: 'IDC654321987',
    lastVisit: '2024-10-15',
    conditions: ['Migraine', 'Anxiety'],
    riskLevel: 'low',
    status: 'inactive'
  }
];

export default function MyPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.memberNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-600">Manage your assigned patient panel</p>
        </div>
        <Button className="w-full sm:w-auto">
          <User className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{mockPatients.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockPatients.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockPatients.filter(p => p.riskLevel === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Appts</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockPatients.filter(p => p.nextAppointment).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
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
                  placeholder="Search by name or member number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <Badge className={getRiskColor(patient.riskLevel)}>
                        {patient.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Age {patient.age} • {patient.gender}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      {patient.insurance}
                    </div>
                    <div className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {patient.conditions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {patient.nextAppointment && (
                    <div className="text-sm text-blue-600 font-medium">
                      Next appointment: {new Date(patient.nextAppointment).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto">
                  <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                    <FileText className="mr-2 h-4 w-4" />
                    Chart
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 lg:flex-none">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No patients match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
