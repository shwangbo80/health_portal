'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Stethoscope,
  FileText,
  Heart,
  Activity,
  Thermometer,
  CheckCircle,
  Save,
  Pill,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VitalSigns {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  weight: string;
  height: string;
  bmi: string;
}

interface PatientAppointment {
  id: string;
  patientName: string;
  patientAge: number;
  appointmentTime: string;
  visitReason: string;
  allergies: string[];
  currentMedications: string[];
}

const mockAppointment: PatientAppointment = {
  id: '1',
  patientName: 'John Smith',
  patientAge: 45,
  appointmentTime: '10:30 AM',
  visitReason: 'Annual checkup and blood pressure follow-up',
  allergies: ['Penicillin', 'Shellfish'],
  currentMedications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
};

export default function StartVisitPage() {
  const router = useRouter();
  // Note: appointmentId could be retrieved from searchParams if needed for API calls
  
  const [activeTab, setActiveTab] = useState('assessment');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    bmi: '',
  });
  
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState('');
  const [physicalExam, setPhysicalExam] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [visitCompleted, setVisitCompleted] = useState(false);

  const handleVitalChange = (vital: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => {
      const updated = { ...prev, [vital]: value };
      
      // Auto-calculate BMI if weight and height are provided
      if (vital === 'weight' || vital === 'height') {
        const weight = parseFloat(vital === 'weight' ? value : updated.weight);
        const heightFeet = parseFloat(vital === 'height' ? value : updated.height);
        
        if (weight && heightFeet) {
          const heightInches = heightFeet * 12; // Convert feet to inches
          const heightMeters = heightInches * 0.0254; // Convert inches to meters
          const weightKg = weight * 0.453592; // Convert lbs to kg
          const bmi = (weightKg / (heightMeters * heightMeters)).toFixed(1);
          updated.bmi = bmi;
        }
      }
      
      return updated;
    });
  };

  const handleCompleteVisit = () => {
    if (!chiefComplaint.trim() || !assessment.trim() || !plan.trim()) {
      alert('Please complete required fields: Chief Complaint, Assessment, and Plan');
      return;
    }
    
    setVisitCompleted(true);
    setTimeout(() => {
      router.push('/provider');
    }, 2000);
  };

  const tabs = [
    { id: 'assessment', label: 'Assessment', icon: Stethoscope },
    { id: 'vitals', label: 'Vital Signs', icon: Activity },
    { id: 'exam', label: 'Physical Exam', icon: Heart },
    { id: 'plan', label: 'Plan', icon: FileText },
  ];

  if (visitCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">Visit Complete!</h1>
              <p className="text-green-700 mb-4">
                Visit documentation for {mockAppointment.patientName} has been saved successfully.
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
            <Stethoscope className="mr-3 h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Visit</h1>
              <p className="mt-1 text-gray-600">Document clinical encounter for {mockAppointment.patientName}</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">Patient</p>
                <p className="font-medium">{mockAppointment.patientName}</p>
                <p className="text-xs text-gray-500">Age: {mockAppointment.patientAge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Appointment Time</p>
                <p className="font-medium">{mockAppointment.appointmentTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Visit Reason</p>
                <p className="font-medium">{mockAppointment.visitReason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Allergies</p>
                <p className="font-medium text-red-600">{mockAppointment.allergies.join(', ')}</p>
              </div>
            </div>
            
            {mockAppointment.currentMedications.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Current Medications</p>
                <div className="flex flex-wrap gap-2">
                  {mockAppointment.currentMedications.map((med, index) => (
                    <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      <Pill className="mr-1 h-3 w-3" />
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'assessment' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Clinical Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                    <Textarea
                      id="chiefComplaint"
                      placeholder="Patient's primary concern or reason for visit..."
                      value={chiefComplaint}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChiefComplaint(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hpi">History of Present Illness</Label>
                    <Textarea
                      id="hpi"
                      placeholder="Detailed history of the current complaint..."
                      value={historyOfPresentIllness}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHistoryOfPresentIllness(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="assessment">Assessment & Diagnosis *</Label>
                    <Textarea
                      id="assessment"
                      placeholder="Clinical assessment and diagnostic impressions..."
                      value={assessment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAssessment(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'vitals' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <div className="relative mt-1">
                    <Thermometer className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="temperature"
                      placeholder="98.6"
                      value={vitalSigns.temperature}
                      onChange={(e) => handleVitalChange('temperature', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={vitalSigns.bloodPressure}
                    onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <div className="relative mt-1">
                    <Heart className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="heartRate"
                      placeholder="72"
                      value={vitalSigns.heartRate}
                      onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                  <Input
                    id="respiratoryRate"
                    placeholder="16"
                    value={vitalSigns.respiratoryRate}
                    onChange={(e) => handleVitalChange('respiratoryRate', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="oxygenSaturation">O2 Saturation (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    placeholder="98"
                    value={vitalSigns.oxygenSaturation}
                    onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="150"
                    value={vitalSigns.weight}
                    onChange={(e) => handleVitalChange('weight', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="height">Height (ft)</Label>
                  <Input
                    id="height"
                    placeholder="5.8"
                    value={vitalSigns.height}
                    onChange={(e) => handleVitalChange('height', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bmi">BMI</Label>
                  <Input
                    id="bmi"
                    placeholder="Calculated"
                    value={vitalSigns.bmi}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'exam' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Physical Examination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="physicalExam">Physical Exam Findings</Label>
                <Textarea
                  id="physicalExam"
                  placeholder="Document physical examination findings by system..."
                  value={physicalExam}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPhysicalExam(e.target.value)}
                  className="mt-1"
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'plan' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Treatment Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="plan">Treatment Plan & Instructions *</Label>
                <Textarea
                  id="plan"
                  placeholder="Treatment plan, medications, follow-up instructions, patient education..."
                  value={plan}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlan(e.target.value)}
                  className="mt-1"
                  rows={8}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/provider/write-prescription')}
                >
                  <Pill className="mr-2 h-4 w-4" />
                  Write Prescription
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/provider/order-lab')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Order Lab Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleCompleteVisit}
            disabled={!chiefComplaint.trim() || !assessment.trim() || !plan.trim()}
            className="flex-1"
          >
            <Save className="mr-2 h-4 w-4" />
            Complete Visit
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
