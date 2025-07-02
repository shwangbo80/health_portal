'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TestTube, 
  User, 
  Calendar,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Phone,
  Mail
} from 'lucide-react';

// Mock lab result data
const mockLabDetails = {
  '1': {
    id: '1',
    testName: 'Comprehensive Metabolic Panel (CMP)',
    testCode: 'CMP-14',
    orderedDate: '2024-12-15',
    collectedDate: '2024-12-18',
    resultDate: '2024-12-20',
    status: 'completed',
    priority: 'routine',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    patientAge: 58,
    patientPhone: '(555) 123-4567',
    patientEmail: 'maria.rodriguez@email.com',
    orderingProvider: 'Dr. Sarah Johnson',
    performingLab: 'Quest Diagnostics',
    labAddress: '123 Lab Drive, Riverside, CA 92501',
    labPhone: '(555) LAB-TEST',
    specimenType: 'Serum',
    fastingRequired: true,
    clinicalInfo: 'Diabetes monitoring, routine follow-up',
    results: [
      {
        name: 'Glucose',
        value: '185',
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'high',
        critical: true,
        trend: 'up'
      },
      {
        name: 'Creatinine',
        value: '1.8',
        unit: 'mg/dL',
        referenceRange: '0.7-1.3',
        status: 'high',
        critical: true,
        trend: 'up'
      },
      {
        name: 'BUN',
        value: '28',
        unit: 'mg/dL',
        referenceRange: '7-20',
        status: 'high',
        critical: false,
        trend: 'up'
      },
      {
        name: 'Sodium',
        value: '142',
        unit: 'mEq/L',
        referenceRange: '136-145',
        status: 'normal',
        critical: false,
        trend: 'stable'
      },
      {
        name: 'Potassium',
        value: '4.2',
        unit: 'mEq/L',
        referenceRange: '3.5-5.1',
        status: 'normal',
        critical: false,
        trend: 'stable'
      },
      {
        name: 'Chloride',
        value: '105',
        unit: 'mEq/L',
        referenceRange: '98-107',
        status: 'normal',
        critical: false,
        trend: 'stable'
      }
    ],
    previousResults: [
      {
        date: '2024-11-20',
        glucose: '165',
        creatinine: '1.6',
        bun: '24'
      },
      {
        date: '2024-10-15',
        glucose: '145',
        creatinine: '1.4',
        bun: '22'
      }
    ],
    notes: 'Critical values noted for glucose and creatinine. Patient called and advised to contact physician immediately.',
    interpretation: 'Elevated glucose suggests poor glycemic control. Rising creatinine indicates possible kidney function decline. Recommend immediate follow-up and medication adjustment.'
  },
  '2': {
    id: '2',
    testName: 'Lipid Panel',
    testCode: 'LIPID-4',
    orderedDate: '2024-12-10',
    collectedDate: '2024-12-12',
    resultDate: '2024-12-14',
    status: 'completed',
    priority: 'routine',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    patientAge: 72,
    patientPhone: '(555) 234-5678',
    patientEmail: 'james.thompson@email.com',
    orderingProvider: 'Dr. Sarah Johnson',
    performingLab: 'LabCorp',
    labAddress: '456 Medical Blvd, San Bernardino, CA 92401',
    labPhone: '(555) LAB-CORP',
    specimenType: 'Serum',
    fastingRequired: true,
    clinicalInfo: 'Cardiovascular risk assessment, COPD monitoring',
    results: [
      {
        name: 'Total Cholesterol',
        value: '198',
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'normal',
        critical: false,
        trend: 'down'
      },
      {
        name: 'LDL Cholesterol',
        value: '125',
        unit: 'mg/dL',
        referenceRange: '<100',
        status: 'high',
        critical: false,
        trend: 'stable'
      },
      {
        name: 'HDL Cholesterol',
        value: '38',
        unit: 'mg/dL',
        referenceRange: '>40',
        status: 'low',
        critical: false,
        trend: 'stable'
      },
      {
        name: 'Triglycerides',
        value: '175',
        unit: 'mg/dL',
        referenceRange: '<150',
        status: 'high',
        critical: false,
        trend: 'up'
      }
    ],
    previousResults: [
      {
        date: '2024-09-15',
        totalCholesterol: '210',
        ldl: '128',
        hdl: '39',
        triglycerides: '168'
      }
    ],
    notes: 'Lipid panel shows improvement in total cholesterol but LDL and triglycerides remain elevated.',
    interpretation: 'Continue current statin therapy. Consider lifestyle modifications and possible medication adjustment for optimal lipid control.'
  }
};

function LabDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const labId = searchParams.get('labId') || '1';
  
  const lab = mockLabDetails[labId as keyof typeof mockLabDetails] || mockLabDetails['1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-200 text-red-900 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultIcon = (status: string, trend: string) => {
    if (status === 'high' || status === 'critical') {
      return trend === 'up' ? <TrendingUp className="h-4 w-4 text-red-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />;
    } else if (status === 'low') {
      return trend === 'down' ? <TrendingDown className="h-4 w-4 text-orange-500" /> : <TrendingUp className="h-4 w-4 text-orange-500" />;
    } else {
      return <Minus className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'routine': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lab Results Details</h1>
              <p className="mt-2 text-gray-600">View comprehensive lab result information</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Add to Chart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Lab Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lab Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TestTube className="mr-2 h-5 w-5" />
                  {lab.testName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">
                        Test Code: {lab.testCode}
                      </Badge>
                      <Badge className={getPriorityColor(lab.priority)}>
                        {lab.priority}
                      </Badge>
                      <Badge variant="outline">
                        {lab.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ordered</p>
                    <p className="text-sm text-gray-600">
                      {new Date(lab.orderedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Collected</p>
                    <p className="text-sm text-gray-600">
                      {new Date(lab.collectedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Resulted</p>
                    <p className="text-sm text-gray-600">
                      {new Date(lab.resultDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">Clinical Information</p>
                  <p className="text-sm text-gray-700">{lab.clinicalInfo}</p>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lab.results.map((result, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      result.critical ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900">{result.name}</h4>
                            {result.critical && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Critical
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 flex items-center space-x-4">
                            <span className="text-lg font-semibold">
                              {result.value} {result.unit}
                            </span>
                            <span className="text-sm text-gray-600">
                              Reference: {result.referenceRange} {result.unit}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getResultIcon(result.status, result.trend)}
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interpretation & Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Interpretation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">{lab.interpretation}</p>
                </div>
                
                {lab.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Lab Notes</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{lab.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previous Results Comparison */}
            {lab.previousResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Previous Results Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Date</th>
                          {Object.keys(lab.previousResults[0]).filter(key => key !== 'date').map(key => (
                            <th key={key} className="text-left py-2 px-4 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {lab.previousResults.map((result, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 font-medium">
                              {new Date(result.date).toLocaleDateString()}
                            </td>
                            {Object.entries(result).filter(([key]) => key !== 'date').map(([key, value]) => (
                              <td key={key} className="py-2 px-4">{value}</td>
                            ))}
                          </tr>
                        ))}
                        {/* Current results row */}
                        <tr className="bg-blue-50 border-b font-medium">
                          <td className="py-2">
                            {new Date(lab.resultDate).toLocaleDateString()} (Current)
                          </td>
                          {lab.results.slice(0, Object.keys(lab.previousResults[0]).length - 1).map((result, index) => (
                            <td key={index} className="py-2 px-4">{result.value}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Patient & Lab Info Sidebar */}
          <div className="space-y-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lab.patientName}</p>
                  <p className="text-sm text-gray-600">ID: {lab.patientId}</p>
                  <p className="text-sm text-gray-600">Age: {lab.patientAge} years old</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{lab.patientPhone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{lab.patientEmail}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push(`/provider/patients/${lab.patientId}`)}
                >
                  View Patient Chart
                </Button>
              </CardContent>
            </Card>

            {/* Lab Information */}
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Performing Lab</p>
                  <p className="text-sm text-gray-600">{lab.performingLab}</p>
                  <p className="text-sm text-gray-600">{lab.labAddress}</p>
                  <p className="text-sm text-gray-600">{lab.labPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Ordering Provider</p>
                  <p className="text-sm text-gray-600">{lab.orderingProvider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Specimen Type</p>
                  <p className="text-sm text-gray-600">{lab.specimenType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Fasting Required</p>
                  <p className="text-sm text-gray-600">{lab.fastingRequired ? 'Yes' : 'No'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Critical Values Alert */}
            {lab.results.some(result => result.critical) && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Critical Values Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lab.results.filter(result => result.critical).map((result, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-red-800">{result.name}: </span>
                        <span className="text-red-700">{result.value} {result.unit}</span>
                      </div>
                    ))}
                    <p className="text-xs text-red-600 mt-3">
                      These values require immediate clinical attention.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full">
                  <TestTube className="mr-2 h-4 w-4" />
                  Order Repeat Test
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Patient
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LabDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LabDetailsContent />
    </Suspense>
  );
}
