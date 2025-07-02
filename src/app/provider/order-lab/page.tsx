'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  TestTube,
  Search,
  User,
  Calendar,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LabTest {
  code: string;
  name: string;
  category: string;
  description: string;
  fastingRequired: boolean;
  turnAroundTime: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  mrn: string;
  lastVisit: string;
}

const mockLabTests: LabTest[] = [
  {
    code: 'CBC',
    name: 'Complete Blood Count',
    category: 'Hematology',
    description: 'Comprehensive blood panel including WBC, RBC, platelets',
    fastingRequired: false,
    turnAroundTime: '1-2 days',
  },
  {
    code: 'CMP',
    name: 'Comprehensive Metabolic Panel',
    category: 'Chemistry',
    description: 'Blood glucose, electrolytes, kidney and liver function',
    fastingRequired: true,
    turnAroundTime: '1-2 days',
  },
  {
    code: 'LIPID',
    name: 'Lipid Panel',
    category: 'Chemistry',
    description: 'Total cholesterol, HDL, LDL, triglycerides',
    fastingRequired: true,
    turnAroundTime: '1-2 days',
  },
  {
    code: 'TSH',
    name: 'Thyroid Stimulating Hormone',
    category: 'Endocrinology',
    description: 'Thyroid function test',
    fastingRequired: false,
    turnAroundTime: '2-3 days',
  },
  {
    code: 'HBA1C',
    name: 'Hemoglobin A1C',
    category: 'Chemistry',
    description: '3-month average blood glucose levels',
    fastingRequired: false,
    turnAroundTime: '1-2 days',
  },
  {
    code: 'PSA',
    name: 'Prostate Specific Antigen',
    category: 'Tumor Markers',
    description: 'Prostate cancer screening',
    fastingRequired: false,
    turnAroundTime: '2-3 days',
  },
  {
    code: 'VITD',
    name: 'Vitamin D, 25-Hydroxy',
    category: 'Vitamins',
    description: 'Vitamin D levels',
    fastingRequired: false,
    turnAroundTime: '3-5 days',
  },
  {
    code: 'URINE',
    name: 'Urinalysis',
    category: 'Urinalysis',
    description: 'Complete urine analysis',
    fastingRequired: false,
    turnAroundTime: '1 day',
  },
];

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    dateOfBirth: '1985-03-15',
    mrn: 'MRN-001234',
    lastVisit: '2024-01-10',
  },
  {
    id: '2',
    name: 'Emily Davis',
    dateOfBirth: '1990-07-22',
    mrn: 'MRN-002345',
    lastVisit: '2024-01-08',
  },
  {
    id: '3',
    name: 'Michael Brown',
    dateOfBirth: '1978-11-03',
    mrn: 'MRN-003456',
    lastVisit: '2024-01-05',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    dateOfBirth: '1992-05-18',
    mrn: 'MRN-004567',
    lastVisit: '2024-01-12',
  },
];

export default function OrderLabPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [priority, setPriority] = useState('routine');
  const [clinicalInfo, setClinicalInfo] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTests = mockLabTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTest = (test: LabTest) => {
    if (!selectedTests.find(t => t.code === test.code)) {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleRemoveTest = (testCode: string) => {
    setSelectedTests(selectedTests.filter(t => t.code !== testCode));
  };

  const handleSubmit = () => {
    if (!selectedPatient || selectedTests.length === 0) {
      alert('Please select a patient and at least one lab test');
      return;
    }
    
    // In a real app, this would submit to an API
    alert(`Lab order submitted successfully for ${selectedPatient.name}`);
    router.push('/provider');
  };

  const fastingRequired = selectedTests.some(test => test.fastingRequired);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <TestTube className="mr-3 h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Lab Test</h1>
              <p className="mt-1 text-gray-600">Select patient and lab tests to order</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Select Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name or MRN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {selectedPatient ? (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedPatient.name}</h3>
                        <p className="text-sm text-gray-600">
                          DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">MRN: {selectedPatient.mrn}</p>
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
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <h3 className="font-medium text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lab Test Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="mr-2 h-5 w-5" />
                Available Lab Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search lab tests..."
                    className="pl-10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {filteredTests.map((test) => (
                    <div
                      key={test.code}
                      className="rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {test.name} ({test.code})
                          </h3>
                          <p className="text-sm text-gray-600">{test.description}</p>
                          <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                            <span>{test.category}</span>
                            <span>TAT: {test.turnAroundTime}</span>
                            {test.fastingRequired && (
                              <span className="text-orange-600">Fasting Required</span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddTest(test)}
                          disabled={selectedTests.some(t => t.code === test.code)}
                        >
                          {selectedTests.some(t => t.code === test.code) ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Tests */}
        {selectedTests.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Selected Lab Tests ({selectedTests.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedTests.map((test) => (
                  <div
                    key={test.code}
                    className="flex items-center justify-between rounded-lg border bg-green-50 p-3"
                  >
                    <div>
                      <span className="font-medium">{test.name} ({test.code})</span>
                      <span className="ml-2 text-sm text-gray-600">- {test.category}</span>
                      {test.fastingRequired && (
                        <span className="ml-2 text-xs text-orange-600">(Fasting Required)</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveTest(test.code)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              {fastingRequired && (
                <div className="mt-4 rounded-lg bg-orange-50 p-3">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                    <p className="text-sm text-orange-800">
                      <strong>Fasting Required:</strong> Patient should fast for 8-12 hours before collection
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="orderDate">Order Date</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="orderDate"
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="routine">Routine</option>
                  <option value="urgent">Urgent</option>
                  <option value="stat">STAT</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="clinicalInfo">Clinical Information</Label>
                <Textarea
                  id="clinicalInfo"
                  placeholder="Enter relevant clinical information, symptoms, or indication for testing..."
                  value={clinicalInfo}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setClinicalInfo(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedPatient || selectedTests.length === 0}
            className="flex-1"
          >
            Submit Lab Order
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
