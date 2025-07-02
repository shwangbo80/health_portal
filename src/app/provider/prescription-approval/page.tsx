'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  FileText,
  User,
  Pill,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Medication {
  name: string;
  genericName: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: string;
  refills: number;
  indication: string;
}

interface PrescriptionRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientDOB: string;
  patientAllergies: string[];
  requestDate: string;
  requestedBy: string;
  medication: Medication;
  reason: string;
  priority: 'routine' | 'urgent';
  status: 'pending' | 'approved' | 'denied';
  interactions: string[];
  warnings: string[];
}

const mockPrescriptionRequest: PrescriptionRequest = {
  id: 'RX001',
  patientId: '2',
  patientName: 'Emily Davis',
  patientDOB: '1990-07-22',
  patientAllergies: ['Penicillin', 'Sulfa drugs'],
  requestDate: '2024-06-30',
  requestedBy: 'Patient Portal',
  medication: {
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    strength: '10mg',
    dosage: '1 tablet',
    frequency: 'Once daily',
    duration: '30 days',
    quantity: '30',
    refills: 5,
    indication: 'Hypertension',
  },
  reason: 'Prescription refill requested. Patient reports good blood pressure control with current medication.',
  priority: 'routine',
  status: 'pending',
  interactions: [],
  warnings: [
    'Monitor kidney function periodically',
    'Check for dry cough (common side effect)',
    'Avoid potassium supplements without physician approval',
  ],
};

export default function PrescriptionApprovalPage() {
  const router = useRouter();
  const [decision, setDecision] = useState<'approve' | 'deny' | ''>('');
  const [notes, setNotes] = useState('');
  const [modifications, setModifications] = useState('');
  const [approved, setApproved] = useState(false);

  const handleSubmitDecision = () => {
    if (!decision) {
      alert('Please select approve or deny');
      return;
    }
    
    if (!notes.trim()) {
      alert('Please add clinical notes');
      return;
    }
    
    setApproved(true);
    setTimeout(() => {
      router.push('/provider');
    }, 2000);
  };

  if (approved) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">
                Prescription {decision === 'approve' ? 'Approved' : 'Denied'}!
              </h1>
              <p className="text-green-700 mb-4">
                Prescription request for {mockPrescriptionRequest.patientName} has been {decision}d.
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
            <Pill className="mr-3 h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Prescription Approval</h1>
              <p className="mt-1 text-gray-600">Review and approve prescription refill request</p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-gray-600">Patient</p>
                <p className="font-medium">{mockPrescriptionRequest.patientName}</p>
                <p className="text-xs text-gray-500">
                  DOB: {new Date(mockPrescriptionRequest.patientDOB).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Request Date</p>
                <p className="font-medium">{new Date(mockPrescriptionRequest.requestDate).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Via: {mockPrescriptionRequest.requestedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  mockPrescriptionRequest.priority === 'urgent' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {mockPrescriptionRequest.priority}
                </span>
              </div>
            </div>

            {/* Allergies */}
            {mockPrescriptionRequest.patientAllergies.length > 0 && (
              <div className="mt-4 rounded-lg bg-yellow-50 p-3">
                <div className="flex items-center">
                  <ShieldAlert className="mr-2 h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Known Allergies</p>
                    <p className="text-sm text-yellow-700">
                      {mockPrescriptionRequest.patientAllergies.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Prescription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Prescription Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {mockPrescriptionRequest.medication.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Generic Name</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.genericName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Strength</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.strength}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dosage</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.dosage}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Frequency</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Refills</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.refills}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Indication</p>
                      <p className="font-medium">{mockPrescriptionRequest.medication.indication}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Request Reason</p>
                  <p className="text-sm bg-gray-50 rounded-lg p-3">{mockPrescriptionRequest.reason}</p>
                </div>

                {/* Warnings */}
                {mockPrescriptionRequest.warnings.length > 0 && (
                  <div className="rounded-lg bg-orange-50 p-3">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-800 mb-2">Clinical Considerations</p>
                        <ul className="space-y-1">
                          {mockPrescriptionRequest.warnings.map((warning, index) => (
                            <li key={index} className="text-sm text-orange-700">
                              • {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Drug Interactions */}
                {mockPrescriptionRequest.interactions.length > 0 && (
                  <div className="rounded-lg bg-red-50 p-3">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800 mb-2">Drug Interactions</p>
                        <ul className="space-y-1">
                          {mockPrescriptionRequest.interactions.map((interaction, index) => (
                            <li key={index} className="text-sm text-red-700">
                              • {interaction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Decision & Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Provider Decision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Decision */}
                <div>
                  <Label>Decision *</Label>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <Button
                      variant={decision === 'approve' ? 'default' : 'outline'}
                      onClick={() => setDecision('approve')}
                      className="justify-center"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant={decision === 'deny' ? 'destructive' : 'outline'}
                      onClick={() => setDecision('deny')}
                      className="justify-center"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Deny
                    </Button>
                  </div>
                </div>

                {/* Modifications (if needed) */}
                {decision === 'approve' && (
                  <div>
                    <Label htmlFor="modifications">Prescription Modifications</Label>
                    <Textarea
                      id="modifications"
                      placeholder="Enter any changes to dosage, frequency, quantity, or duration..."
                      value={modifications}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setModifications(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                )}

                {/* Clinical Notes */}
                <div>
                  <Label htmlFor="notes">Clinical Notes *</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter your clinical rationale for this decision..."
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                    className="mt-1"
                    rows={5}
                  />
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/provider/patients/${mockPrescriptionRequest.patientId}`)}
                    >
                      View Patient Chart
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/provider/write-prescription')}
                    >
                      New Prescription
                    </Button>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center">
                    <Info className="mr-2 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-800">Next Steps</p>
                      <p className="text-sm text-blue-700">
                        {decision === 'approve' 
                          ? 'Patient will be notified and prescription will be sent to pharmacy.' 
                          : decision === 'deny'
                          ? 'Patient will be notified with explanation and alternative options.'
                          : 'Please make a decision to proceed.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleSubmitDecision}
            disabled={!decision || !notes.trim()}
            className="flex-1"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Submit Decision
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
