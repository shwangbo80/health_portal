'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  FileText,
  Pill,
  Activity,
  Heart,
  AlertTriangle,
  Clock,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock patient data - in real app, this would come from API
const mockPatient = {
  id: '1',
  name: 'Maria Rodriguez',
  dateOfBirth: '1985-03-15',
  age: 40,
  gender: 'Female',
  phone: '(555) 123-4567',
  email: 'maria.rodriguez@email.com',
  address: '123 Main St, Riverside, CA 92501',
  insurance: 'IEHP Complete Care',
  memberNumber: 'ICP123456789',
  primaryProvider: 'Dr. Sarah Johnson',
  emergencyContact: {
    name: 'Carlos Rodriguez',
    relationship: 'Spouse',
    phone: '(555) 123-4568'
  },
  riskLevel: 'medium',
  status: 'active',
  lastVisit: '2024-12-15',
  nextAppointment: '2025-01-10',
  conditions: [
    { name: 'Diabetes Type 2', diagnosedDate: '2020-03-15', status: 'active' },
    { name: 'Hypertension', diagnosedDate: '2021-08-22', status: 'active' },
    { name: 'Obesity', diagnosedDate: '2020-03-15', status: 'active' }
  ],
  allergies: [
    { allergen: 'Penicillin', reaction: 'Rash', severity: 'moderate' },
    { allergen: 'Shellfish', reaction: 'Anaphylaxis', severity: 'severe' }
  ],
  medications: [
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedDate: '2024-11-15',
      status: 'active'
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedDate: '2024-10-01',
      status: 'active'
    }
  ],
  recentLabResults: [
    {
      date: '2024-12-20',
      test: 'Comprehensive Metabolic Panel',
      results: [
        { name: 'Glucose', value: '185', unit: 'mg/dL', status: 'high', normal: '70-100' },
        { name: 'Creatinine', value: '1.8', unit: 'mg/dL', status: 'high', normal: '0.6-1.2' }
      ]
    },
    {
      date: '2024-11-15',
      test: 'HbA1c',
      results: [
        { name: 'Hemoglobin A1c', value: '7.8', unit: '%', status: 'high', normal: '<7.0' }
      ]
    }
  ],
  recentAppointments: [
    {
      date: '2024-12-15',
      type: 'Follow-up',
      provider: 'Dr. Sarah Johnson',
      status: 'completed',
      notes: 'Discussed glucose management, adjusted medication'
    },
    {
      date: '2024-11-15',
      type: 'Lab Review',
      provider: 'Dr. Sarah Johnson',
      status: 'completed',
      notes: 'Reviewed HbA1c results, patient education provided'
    }
  ],
  vitals: {
    height: '5\'4\"',
    weight: '165 lbs',
    bmi: '28.3',
    bloodPressure: '140/90',
    heartRate: '78',
    temperature: '98.6°F',
    lastUpdated: '2024-12-15'
  }
};

export default function PatientDetail() {
  const [activeTab, setActiveTab] = useState('overview');

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

  const getLabResultColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-600 font-semibold';
      case 'low': return 'text-blue-600 font-semibold';
      case 'normal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
    { id: 'medical-history', label: 'Medical History', icon: <FileText className="h-4 w-4" /> },
    { id: 'medications', label: 'Medications', icon: <Pill className="h-4 w-4" /> },
    { id: 'lab-results', label: 'Lab Results', icon: <Activity className="h-4 w-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="h-4 w-4" /> }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/provider/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{mockPatient.name}</h1>
            <p className="text-gray-600">Patient ID: {mockPatient.memberNumber}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button className="flex-1 sm:flex-none">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Patient Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{mockPatient.name}</h2>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(mockPatient.status)}>
                      {mockPatient.status}
                    </Badge>
                    <Badge className={getRiskColor(mockPatient.riskLevel)}>
                      {mockPatient.riskLevel} risk
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>Age {mockPatient.age} • {mockPatient.gender}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{mockPatient.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{mockPatient.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{mockPatient.address}</span>
                </div>
              </div>
            </div>

            {/* Insurance & Emergency Contact */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Insurance</h3>
                <p className="text-sm text-gray-600">{mockPatient.insurance}</p>
                <p className="text-sm text-gray-500">{mockPatient.memberNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Emergency Contact</h3>
                <p className="text-sm text-gray-600">{mockPatient.emergencyContact.name}</p>
                <p className="text-sm text-gray-500">{mockPatient.emergencyContact.relationship}</p>
                <p className="text-sm text-gray-500">{mockPatient.emergencyContact.phone}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Recent Activity</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    Last visit: {new Date(mockPatient.lastVisit).toLocaleDateString()}
                  </div>
                  {mockPatient.nextAppointment && (
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      Next: {new Date(mockPatient.nextAppointment).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Current Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPatient.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{condition.name}</p>
                      <p className="text-sm text-gray-500">
                        Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(condition.status)}>
                      {condition.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPatient.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{allergy.allergen}</p>
                      <p className="text-sm text-gray-600">Reaction: {allergy.reaction}</p>
                    </div>
                    <Badge className={`${allergy.severity === 'severe' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                      {allergy.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Vitals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Current Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Height</p>
                  <p className="font-semibold">{mockPatient.vitals.height}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="font-semibold">{mockPatient.vitals.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">BMI</p>
                  <p className="font-semibold">{mockPatient.vitals.bmi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="font-semibold">{mockPatient.vitals.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="font-semibold">{mockPatient.vitals.heartRate} bpm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-semibold">{mockPatient.vitals.temperature}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last updated: {new Date(mockPatient.vitals.lastUpdated).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Recent Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Recent Lab Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPatient.recentLabResults.slice(0, 2).map((lab, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{lab.test}</p>
                      <p className="text-sm text-gray-500">{new Date(lab.date).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      {lab.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center justify-between text-sm">
                          <span>{result.name}</span>
                          <div className="text-right">
                            <span className={getLabResultColor(result.status)}>
                              {result.value} {result.unit}
                            </span>
                            <br />
                            <span className="text-gray-500 text-xs">Normal: {result.normal}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tab contents would be implemented similarly */}
      {activeTab !== 'overview' && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.label} Content</h3>
            <p className="text-gray-600">This section would contain detailed {activeTab} information.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
