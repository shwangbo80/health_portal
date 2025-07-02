'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Calendar, 
  User, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface LabResult {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  testDate: string;
  orderedDate: string;
  status: 'pending' | 'completed' | 'critical' | 'reviewed';
  results: {
    testName: string;
    value: string;
    referenceRange: string;
    unit: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }[];
  orderingProvider: string;
  lab: string;
  notes?: string;
}

const mockLabResults: LabResult[] = [
  {
    id: '1',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    testType: 'Comprehensive Metabolic Panel',
    testDate: '2024-12-20',
    orderedDate: '2024-12-18',
    status: 'critical',
    orderingProvider: 'Dr. Sarah Johnson',
    lab: 'LabCorp',
    results: [
      {
        testName: 'Glucose',
        value: '185',
        referenceRange: '70-100',
        unit: 'mg/dL',
        status: 'high'
      },
      {
        testName: 'Creatinine',
        value: '1.8',
        referenceRange: '0.6-1.2',
        unit: 'mg/dL',
        status: 'high'
      },
      {
        testName: 'Sodium',
        value: '138',
        referenceRange: '136-145',
        unit: 'mEq/L',
        status: 'normal'
      }
    ],
    notes: 'Patient shows elevated glucose and creatinine levels. Recommend follow-up.'
  },
  {
    id: '2',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    testType: 'Lipid Panel',
    testDate: '2024-12-19',
    orderedDate: '2024-12-17',
    status: 'completed',
    orderingProvider: 'Dr. Sarah Johnson',
    lab: 'Quest Diagnostics',
    results: [
      {
        testName: 'Total Cholesterol',
        value: '220',
        referenceRange: '<200',
        unit: 'mg/dL',
        status: 'high'
      },
      {
        testName: 'LDL Cholesterol',
        value: '145',
        referenceRange: '<100',
        unit: 'mg/dL',
        status: 'high'
      },
      {
        testName: 'HDL Cholesterol',
        value: '38',
        referenceRange: '>40',
        unit: 'mg/dL',
        status: 'low'
      },
      {
        testName: 'Triglycerides',
        value: '185',
        referenceRange: '<150',
        unit: 'mg/dL',
        status: 'high'
      }
    ]
  },
  {
    id: '3',
    patientName: 'Sarah Chen',
    patientId: 'ICP456789123',
    testType: 'Complete Blood Count',
    testDate: '2024-12-18',
    orderedDate: '2024-12-16',
    status: 'reviewed',
    orderingProvider: 'Dr. Sarah Johnson',
    lab: 'LabCorp',
    results: [
      {
        testName: 'White Blood Cells',
        value: '7.2',
        referenceRange: '4.0-11.0',
        unit: 'K/uL',
        status: 'normal'
      },
      {
        testName: 'Red Blood Cells',
        value: '4.5',
        referenceRange: '3.8-5.2',
        unit: 'M/uL',
        status: 'normal'
      },
      {
        testName: 'Hemoglobin',
        value: '13.8',
        referenceRange: '12.0-16.0',
        unit: 'g/dL',
        status: 'normal'
      },
      {
        testName: 'Platelets',
        value: '285',
        referenceRange: '150-450',
        unit: 'K/uL',
        status: 'normal'
      }
    ]
  },
  {
    id: '4',
    patientName: 'Robert Garcia',
    patientId: 'ICP789123456',
    testType: 'HbA1c',
    testDate: '2024-12-15',
    orderedDate: '2024-12-13',
    status: 'completed',
    orderingProvider: 'Dr. Sarah Johnson',
    lab: 'Quest Diagnostics',
    results: [
      {
        testName: 'Hemoglobin A1c',
        value: '7.2',
        referenceRange: '<7.0',
        unit: '%',
        status: 'high'
      }
    ],
    notes: 'Diabetes management needs adjustment. Schedule follow-up in 2 weeks.'
  },
  {
    id: '5',
    patientName: 'Jennifer Lee',
    patientId: 'IDC654321987',
    testType: 'Thyroid Function Panel',
    testDate: '2024-12-10',
    orderedDate: '2024-12-08',
    status: 'pending',
    orderingProvider: 'Dr. Sarah Johnson',
    lab: 'LabCorp',
    results: []
  }
];

export default function LabResults() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'critical' | 'reviewed'>('all');

  const filteredResults = mockLabResults.filter(result => {
    const matchesSearch = result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.patientId.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'reviewed': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getResultIcon = (status: string) => {
    switch (status) {
      case 'high': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'low': return <TrendingDown className="h-4 w-4 text-blue-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'normal': return <Minus className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getResultColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-600 font-semibold';
      case 'low': return 'text-blue-600 font-semibold';
      case 'critical': return 'text-red-700 font-bold';
      case 'normal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const criticalResults = mockLabResults.filter(r => r.status === 'critical').length;
  const pendingResults = mockLabResults.filter(r => r.status === 'pending').length;
  const completedToday = mockLabResults.filter(r => 
    new Date(r.testDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Results</h1>
          <p className="text-gray-600">Review and manage patient laboratory results</p>
        </div>
        <Button className="w-full sm:w-auto">
          <FileText className="mr-2 h-4 w-4" />
          Order New Lab
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Results</p>
                <p className="text-2xl font-bold text-gray-900">{mockLabResults.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Results</p>
                <p className="text-2xl font-bold text-red-600">{criticalResults}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingResults}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Results</p>
                <p className="text-2xl font-bold text-green-600">{completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
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
                  placeholder="Search by patient name, test type, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'completed' | 'critical' | 'reviewed')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="reviewed">Reviewed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{result.testType}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(result.status)}>
                          {getStatusIcon(result.status)}
                          <span className="ml-1">{result.status}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {result.patientName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {result.status === 'pending' ? 'Ordered' : 'Completed'}: {new Date(result.status === 'pending' ? result.orderedDate : result.testDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {result.lab}
                      </div>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {result.orderingProvider}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full lg:w-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => router.push(`/provider/lab-details?labId=${result.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {result.status !== 'pending' && (
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>

                {/* Results Preview */}
                {result.results.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Results Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {result.results.slice(0, 6).map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getResultIcon(test.status)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{test.testName}</p>
                              <p className="text-xs text-gray-500">{test.referenceRange} {test.unit}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${getResultColor(test.status)}`}>
                              {test.value} {test.unit}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {result.results.length > 6 && (
                      <p className="text-sm text-gray-500 mt-2">
                        +{result.results.length - 6} more results
                      </p>
                    )}
                  </div>
                )}

                {/* Notes */}
                {result.notes && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Provider Notes</h4>
                    <p className="text-sm text-gray-600">{result.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lab results found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No lab results match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
