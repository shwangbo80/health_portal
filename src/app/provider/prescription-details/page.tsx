'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  User, 
  Calendar,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Edit,
  RefreshCw,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

// Mock prescription data
const mockPrescriptionDetails = {
  '1': {
    id: '1',
    medicationName: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    strength: '500mg',
    dosageForm: 'Tablet',
    quantity: 90,
    directions: 'Take 1 tablet by mouth twice daily with meals',
    prescribedDate: '2024-12-01',
    startDate: '2024-12-01',
    endDate: '2025-03-01',
    refillsRemaining: 2,
    totalRefills: 5,
    status: 'active',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    patientPhone: '(555) 123-4567',
    patientEmail: 'maria.rodriguez@email.com',
    patientAge: 58,
    prescribedBy: 'Dr. Sarah Johnson',
    indication: 'Type 2 Diabetes Mellitus',
    pharmacyName: 'CVS Pharmacy #2847',
    pharmacyPhone: '(555) 987-6543',
    pharmacyAddress: '123 Main St, Riverside, CA 92501',
    lastFilled: '2024-12-01',
    nextFillDate: '2024-12-31',
    ndc: '00093-0132-01',
    lotNumber: 'ABC123',
    manufacturer: 'Teva Pharmaceuticals',
    warnings: [
      'Take with food to reduce stomach upset',
      'Monitor blood glucose levels regularly',
      'May cause lactic acidosis (rare but serious)'
    ],
    interactions: [
      'Alcohol - May increase risk of lactic acidosis',
      'Iodinated contrast - May increase risk of kidney problems'
    ],
    sideEffects: [
      'Nausea, vomiting, diarrhea',
      'Metallic taste',
      'Loss of appetite'
    ],
    priorAuth: false,
    insurance: 'IEHP Complete Care',
    copay: '$10.00',
    cost: '$25.99',
    dosageHistory: [
      { date: '2024-12-01', change: 'Initial prescription - 500mg twice daily' },
      { date: '2024-10-15', change: 'Increased from 250mg twice daily' }
    ]
  },
  '2': {
    id: '2',
    medicationName: 'Albuterol HFA',
    genericName: 'Albuterol Sulfate',
    strength: '90mcg/actuation',
    dosageForm: 'Inhaler',
    quantity: 1,
    directions: 'Inhale 2 puffs by mouth every 4-6 hours as needed for shortness of breath',
    prescribedDate: '2024-11-15',
    startDate: '2024-11-15',
    endDate: '2025-02-15',
    refillsRemaining: 0,
    totalRefills: 3,
    status: 'refill-requested',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    patientPhone: '(555) 234-5678',
    patientEmail: 'james.thompson@email.com',
    patientAge: 72,
    prescribedBy: 'Dr. Sarah Johnson',
    indication: 'COPD/Asthma',
    pharmacyName: 'Walgreens #8294',
    pharmacyPhone: '(555) 456-7890',
    pharmacyAddress: '456 Oak Ave, San Bernardino, CA 92401',
    lastFilled: '2024-12-15',
    nextFillDate: '2025-01-15',
    ndc: '00074-3688-17',
    lotNumber: 'XYZ789',
    manufacturer: 'GlaxoSmithKline',
    warnings: [
      'Do not exceed recommended dose',
      'Rinse mouth after use to prevent thrush',
      'Seek immediate medical attention if breathing worsens'
    ],
    interactions: [
      'Beta-blockers - May reduce effectiveness',
      'MAO inhibitors - May increase cardiovascular side effects'
    ],
    sideEffects: [
      'Tremor, nervousness',
      'Rapid heartbeat',
      'Headache'
    ],
    priorAuth: false,
    insurance: 'IEHP DualChoice',
    copay: '$15.00',
    cost: '$65.99',
    dosageHistory: [
      { date: '2024-11-15', change: 'Initial prescription - 2 puffs every 4-6 hours PRN' }
    ]
  }
};

function PrescriptionDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prescriptionId = searchParams.get('prescriptionId') || '1';
  
  const prescription = mockPrescriptionDetails[prescriptionId as keyof typeof mockPrescriptionDetails] || mockPrescriptionDetails['1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'refill-requested': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = () => {
    const endDate = new Date(prescription.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Prescription Details</h1>
              <p className="mt-2 text-gray-600">View and manage prescription information</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            {prescription.refillsRemaining === 0 && (
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew
              </Button>
            )}
            {prescription.status === 'refill-requested' && (
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Approve Refill
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Prescription Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Medication Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="mr-2 h-5 w-5" />
                  Medication Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{prescription.medicationName}</h3>
                    <p className="text-gray-600">{prescription.genericName}</p>
                    <p className="text-gray-600">{prescription.strength} {prescription.dosageForm}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status.replace('-', ' ')}
                      </Badge>
                      {prescription.priorAuth && (
                        <Badge variant="outline">
                          Prior Auth Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Directions</p>
                      <p className="text-sm text-gray-600">{prescription.directions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Indication</p>
                      <p className="text-sm text-gray-600">{prescription.indication}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Quantity</p>
                      <p className="text-sm text-gray-600">{prescription.quantity}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Prescribed Date</p>
                      <p className="text-sm text-gray-600">
                        {new Date(prescription.prescribedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Expires</p>
                      <p className="text-sm text-gray-600">
                        {new Date(prescription.endDate).toLocaleDateString()}
                        <span className="ml-2 text-xs text-gray-500">
                          ({getDaysRemaining()} days remaining)
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Refills</p>
                      <p className="text-sm text-gray-600">
                        {prescription.refillsRemaining} of {prescription.totalRefills} remaining
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pharmacy Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{prescription.pharmacyName}</p>
                  <p className="text-sm text-gray-600">{prescription.pharmacyAddress}</p>
                  <p className="text-sm text-gray-600">{prescription.pharmacyPhone}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Filled</p>
                    <p className="text-sm text-gray-600">
                      {new Date(prescription.lastFilled).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Next Fill Date</p>
                    <p className="text-sm text-gray-600">
                      {new Date(prescription.nextFillDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cost</p>
                    <p className="text-sm text-gray-600">
                      {prescription.copay} (Copay) / {prescription.cost} (Total)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warnings & Interactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prescription.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2 text-orange-500">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Drug Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prescription.interactions.map((interaction, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2 text-red-500">•</span>
                        {interaction}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Side Effects */}
            <Card>
              <CardHeader>
                <CardTitle>Common Side Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {prescription.sideEffects.map((effect, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2 text-gray-400">•</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Dosage History */}
            <Card>
              <CardHeader>
                <CardTitle>Dosage History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prescription.dosageHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{entry.change}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Info Sidebar */}
          <div className="space-y-6">
            {/* Patient Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{prescription.patientName}</p>
                  <p className="text-sm text-gray-600">ID: {prescription.patientId}</p>
                  <p className="text-sm text-gray-600">Age: {prescription.patientAge} years old</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{prescription.patientPhone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{prescription.patientEmail}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push(`/provider/patients/${prescription.patientId}`)}
                >
                  View Patient Chart
                </Button>
              </CardContent>
            </Card>

            {/* Prescription Details */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">NDC Number</p>
                  <p className="text-sm text-gray-600">{prescription.ndc}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Lot Number</p>
                  <p className="text-sm text-gray-600">{prescription.lotNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Manufacturer</p>
                  <p className="text-sm text-gray-600">{prescription.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Insurance</p>
                  <p className="text-sm text-gray-600">{prescription.insurance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Prescribed By</p>
                  <p className="text-sm text-gray-600">{prescription.prescribedBy}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Prescription
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Set Refill Reminder
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Pharmacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrescriptionDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrescriptionDetailsContent />
    </Suspense>
  );
}
