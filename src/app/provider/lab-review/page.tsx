'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  TestTube,
  User,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LabResult {
  id: string;
  testName: string;
  testCode: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'high' | 'low' | 'critical';
  category: string;
}

interface PatientLabReport {
  id: string;
  patientId: string;
  patientName: string;
  patientDOB: string;
  orderDate: string;
  collectionDate: string;
  reportDate: string;
  orderingProvider: string;
  status: 'pending-review' | 'reviewed' | 'critical';
  results: LabResult[];
  clinicalNotes?: string;
}

const mockLabReport: PatientLabReport = {
  id: 'LAB001',
  patientId: '1',
  patientName: 'John Smith',
  patientDOB: '1985-03-15',
  orderDate: '2024-06-28',
  collectionDate: '2024-06-29',
  reportDate: '2024-06-30',
  orderingProvider: 'Dr. Sarah Johnson',
  status: 'pending-review',
  clinicalNotes: 'Routine annual checkup. Patient reports feeling well.',
  results: [
    {
      id: '1',
      testName: 'White Blood Cell Count',
      testCode: 'WBC',
      value: '7.2',
      unit: 'K/uL',
      referenceRange: '4.0-11.0',
      flag: 'normal',
      category: 'Complete Blood Count',
    },
    {
      id: '2',
      testName: 'Red Blood Cell Count',
      testCode: 'RBC',
      value: '4.8',
      unit: 'M/uL',
      referenceRange: '4.2-5.4',
      flag: 'normal',
      category: 'Complete Blood Count',
    },
    {
      id: '3',
      testName: 'Hemoglobin',
      testCode: 'HGB',
      value: '14.2',
      unit: 'g/dL',
      referenceRange: '13.5-17.5',
      flag: 'normal',
      category: 'Complete Blood Count',
    },
    {
      id: '4',
      testName: 'Total Cholesterol',
      testCode: 'CHOL',
      value: '245',
      unit: 'mg/dL',
      referenceRange: '<200',
      flag: 'high',
      category: 'Lipid Panel',
    },
    {
      id: '5',
      testName: 'LDL Cholesterol',
      testCode: 'LDL',
      value: '165',
      unit: 'mg/dL',
      referenceRange: '<100',
      flag: 'high',
      category: 'Lipid Panel',
    },
    {
      id: '6',
      testName: 'HDL Cholesterol',
      testCode: 'HDL',
      value: '38',
      unit: 'mg/dL',
      referenceRange: '>40',
      flag: 'low',
      category: 'Lipid Panel',
    },
    {
      id: '7',
      testName: 'Triglycerides',
      testCode: 'TRIG',
      value: '210',
      unit: 'mg/dL',
      referenceRange: '<150',
      flag: 'high',
      category: 'Lipid Panel',
    },
    {
      id: '8',
      testName: 'Glucose',
      testCode: 'GLUC',
      value: '105',
      unit: 'mg/dL',
      referenceRange: '70-99',
      flag: 'high',
      category: 'Chemistry',
    },
  ],
};

export default function LabReviewPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const taskId = searchParams.get('taskId') || '1';
  
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [reviewed, setReviewed] = useState(false);

  const getResultIcon = (flag: string) => {
    switch (flag) {
      case 'high':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'low':
        return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-green-500" />;
    }
  };

  const getResultColor = (flag: string) => {
    switch (flag) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'low':
        return 'text-orange-600 bg-orange-50';
      case 'critical':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const criticalResults = mockLabReport.results.filter(r => r.flag === 'critical');
  const abnormalResults = mockLabReport.results.filter(r => r.flag === 'high' || r.flag === 'low');
  const normalResults = mockLabReport.results.filter(r => r.flag === 'normal');

  const handleCompleteReview = () => {
    if (!reviewNotes.trim()) {
      alert('Please add review notes before completing.');
      return;
    }
    
    setReviewed(true);
    setTimeout(() => {
      router.push('/provider');
    }, 2000);
  };

  if (reviewed) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">Lab Review Complete!</h1>
              <p className="text-green-700 mb-4">
                Lab results for {mockLabReport.patientName} have been reviewed and documented.
              </p>
              <div className="text-sm text-green-600">
                Redirecting to dashboard...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <TestTube className="mr-3 h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lab Results Review</h1>
              <p className="mt-1 text-gray-600">Review and complete lab result analysis</p>
            </div>
          </div>
        </div>

        {/* Patient & Report Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient & Report Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">Patient</p>
                <p className="font-medium">{mockLabReport.patientName}</p>
                <p className="text-xs text-gray-500">DOB: {new Date(mockLabReport.patientDOB).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium">{new Date(mockLabReport.orderDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Collection Date</p>
                <p className="font-medium">{new Date(mockLabReport.collectionDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Report Date</p>
                <p className="font-medium">{new Date(mockLabReport.reportDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            {mockLabReport.clinicalNotes && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Clinical Notes</p>
                <p className="font-medium">{mockLabReport.clinicalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Critical Results Alert */}
        {criticalResults.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Critical Results Requiring Immediate Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {criticalResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between rounded-lg bg-red-100 p-3">
                    <div>
                      <span className="font-medium text-red-900">{result.testName}</span>
                      <span className="ml-2 text-red-700">
                        {result.value} {result.unit}
                      </span>
                    </div>
                    <span className="text-sm text-red-600">
                      Ref: {result.referenceRange}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Lab Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group results by category */}
                {Array.from(new Set(mockLabReport.results.map(r => r.category))).map((category) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                    <div className="space-y-2">
                      {mockLabReport.results
                        .filter(r => r.category === category)
                        .map((result) => (
                          <div
                            key={result.id}
                            className={`flex items-center justify-between rounded-lg border p-3 ${getResultColor(result.flag)}`}
                          >
                            <div className="flex items-center">
                              {getResultIcon(result.flag)}
                              <div className="ml-3">
                                <p className="font-medium">{result.testName}</p>
                                <p className="text-sm opacity-75">({result.testCode})</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {result.value} {result.unit}
                              </p>
                              <p className="text-xs opacity-75">
                                Ref: {result.referenceRange}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Provider Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Results Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{normalResults.length}</p>
                      <p className="text-sm text-gray-600">Normal</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{abnormalResults.length}</p>
                      <p className="text-sm text-gray-600">Abnormal</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{criticalResults.length}</p>
                      <p className="text-sm text-gray-600">Critical</p>
                    </div>
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <Label htmlFor="reviewNotes">Review Notes *</Label>
                  <Textarea
                    id="reviewNotes"
                    placeholder="Enter your clinical interpretation, recommendations, and follow-up plans..."
                    value={reviewNotes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewNotes(e.target.value)}
                    className="mt-1"
                    rows={6}
                  />
                </div>

                {/* Action Required */}
                <div>
                  <Label htmlFor="actionRequired">Follow-up Actions</Label>
                  <Textarea
                    id="actionRequired"
                    placeholder="Specify any follow-up actions, referrals, or patient communication needed..."
                    value={actionRequired}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setActionRequired(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/provider/patients/${mockLabReport.patientId}`)}
                    >
                      View Patient Chart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/write-prescription')}
                    >
                      Write Prescription
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/schedule-appointment')}
                    >
                      Schedule Follow-up
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/send-message')}
                    >
                      Message Patient
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleCompleteReview}
            disabled={!reviewNotes.trim()}
            className="flex-1"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Review
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
