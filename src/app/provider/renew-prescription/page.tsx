'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  User, 
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';

// Mock prescription data (from previous page)
const mockPrescriptionData = {
  '1': {
    id: '1',
    medicationName: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    strength: '500mg',
    dosageForm: 'Tablet',
    currentQuantity: 90,
    currentDirections: 'Take 1 tablet by mouth twice daily with meals',
    refillsRemaining: 0,
    totalRefills: 5,
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    patientAge: 58,
    indication: 'Type 2 Diabetes Mellitus',
    lastPrescribedDate: '2024-12-01',
    lastFilledDate: '2024-12-01'
  },
  '2': {
    id: '2',
    medicationName: 'Albuterol HFA',
    genericName: 'Albuterol Sulfate',
    strength: '90mcg/actuation',
    dosageForm: 'Inhaler',
    currentQuantity: 1,
    currentDirections: 'Inhale 2 puffs by mouth every 4-6 hours as needed for shortness of breath',
    refillsRemaining: 0,
    totalRefills: 3,
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    patientAge: 72,
    indication: 'COPD/Asthma',
    lastPrescribedDate: '2024-11-15',
    lastFilledDate: '2024-12-15'
  }
};

function RenewPrescriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prescriptionId = searchParams.get('prescriptionId') || '1';
  
  const originalPrescription = mockPrescriptionData[prescriptionId as keyof typeof mockPrescriptionData] || mockPrescriptionData['1'];
  
  const [formData, setFormData] = useState({
    medicationName: originalPrescription.medicationName,
    genericName: originalPrescription.genericName,
    strength: originalPrescription.strength,
    dosageForm: originalPrescription.dosageForm,
    quantity: originalPrescription.currentQuantity.toString(),
    directions: originalPrescription.currentDirections,
    refills: '5',
    daysSupply: '30',
    indication: originalPrescription.indication,
    notes: '',
    priorAuth: false,
    substitutionAllowed: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/provider/prescriptions');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Renewed Successfully</h2>
              <p className="text-gray-600 mb-4">
                The renewed prescription for {originalPrescription.patientName} has been sent to the pharmacy.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="text-left">
                  <p className="text-sm font-medium text-green-800">Prescription Details:</p>
                  <p className="text-sm text-green-700">{formData.medicationName} {formData.strength}</p>
                  <p className="text-sm text-green-700">Quantity: {formData.quantity}</p>
                  <p className="text-sm text-green-700">Refills: {formData.refills}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Redirecting to prescriptions list...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Renew Prescription</h1>
            <p className="mt-2 text-gray-600">Create a new prescription renewal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Patient Name</p>
                    <p className="text-lg text-gray-700">{originalPrescription.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Patient ID</p>
                    <p className="text-sm text-gray-600">{originalPrescription.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Age</p>
                    <p className="text-sm text-gray-600">{originalPrescription.patientAge} years old</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Prescribed</p>
                    <p className="text-sm text-gray-600">
                      {new Date(originalPrescription.lastPrescribedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Filled</p>
                    <p className="text-sm text-gray-600">
                      {new Date(originalPrescription.lastFilledDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Original Prescription */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Original Prescription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{originalPrescription.medicationName}</p>
                    <p className="text-sm text-gray-600">{originalPrescription.strength} {originalPrescription.dosageForm}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quantity</p>
                    <p className="text-sm text-gray-600">{originalPrescription.currentQuantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Directions</p>
                    <p className="text-sm text-gray-600">{originalPrescription.currentDirections}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {originalPrescription.refillsRemaining} refills remaining
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Prescription Renewal Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="mr-2 h-5 w-5" />
                    Prescription Renewal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Medication Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicationName">Medication Name *</Label>
                      <Input
                        id="medicationName"
                        value={formData.medicationName}
                        onChange={(e) => handleInputChange('medicationName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genericName">Generic Name</Label>
                      <Input
                        id="genericName"
                        value={formData.genericName}
                        onChange={(e) => handleInputChange('genericName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="strength">Strength *</Label>
                      <Input
                        id="strength"
                        value={formData.strength}
                        onChange={(e) => handleInputChange('strength', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosageForm">Dosage Form *</Label>
                      <select
                        id="dosageForm"
                        value={formData.dosageForm}
                        onChange={(e) => handleInputChange('dosageForm', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Tablet">Tablet</option>
                        <option value="Capsule">Capsule</option>
                        <option value="Liquid">Liquid</option>
                        <option value="Injection">Injection</option>
                        <option value="Inhaler">Inhaler</option>
                        <option value="Topical">Topical</option>
                        <option value="Eye Drops">Eye Drops</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="directions">Directions for Use *</Label>
                    <Textarea
                      id="directions"
                      value={formData.directions}
                      onChange={(e) => handleInputChange('directions', e.target.value)}
                      rows={3}
                      placeholder="e.g., Take 1 tablet by mouth twice daily with meals"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="refills">Number of Refills *</Label>
                      <select
                        id="refills"
                        value={formData.refills}
                        onChange={(e) => handleInputChange('refills', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="0">0 refills</option>
                        <option value="1">1 refill</option>
                        <option value="2">2 refills</option>
                        <option value="3">3 refills</option>
                        <option value="4">4 refills</option>
                        <option value="5">5 refills</option>
                        <option value="6">6 refills</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="daysSupply">Days Supply</Label>
                      <select
                        id="daysSupply"
                        value={formData.daysSupply}
                        onChange={(e) => handleInputChange('daysSupply', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="indication">Indication</Label>
                      <Input
                        id="indication"
                        value={formData.indication}
                        onChange={(e) => handleInputChange('indication', e.target.value)}
                        placeholder="Medical condition being treated"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      placeholder="Any special instructions or notes for the pharmacist"
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="priorAuth"
                          checked={formData.priorAuth}
                          onChange={(e) => handleInputChange('priorAuth', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="priorAuth" className="text-sm">Prior Authorization Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="substitutionAllowed"
                          checked={formData.substitutionAllowed}
                          onChange={(e) => handleInputChange('substitutionAllowed', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="substitutionAllowed" className="text-sm">Generic Substitution Allowed</Label>
                      </div>
                    </div>
                  </div>

                  {/* Warning Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Important Notice</p>
                        <p className="text-sm text-amber-700 mt-1">
                          This prescription renewal will create a new prescription that will be sent to the patient&apos;s pharmacy. 
                          Please verify all information is correct before submitting.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing Renewal...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Submit Prescription Renewal
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RenewPrescription() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenewPrescriptionContent />
    </Suspense>
  );
}
