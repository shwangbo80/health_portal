'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CheckCircle,
  Clock,
  User,
  Calendar,
  MapPin,
  Thermometer,
  Heart,
  Activity,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  visitReason: string;
  room?: string;
}

const mockAppointment: Appointment = {
  id: '1',
  patientName: 'John Smith',
  time: '9:00 AM',
  visitReason: 'Routine checkup',
  room: 'Room 201',
};

export default function CheckInPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const appointmentId = searchParams.get('appointmentId') || '1';
  
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    weight: '',
    height: '',
  });
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [insuranceVerified, setInsuranceVerified] = useState(false);
  const [consentSigned, setConsentSigned] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleVitalChange = (vital: string, value: string) => {
    setVitalSigns(prev => ({ ...prev, [vital]: value }));
  };

  const handleCheckIn = () => {
    if (!insuranceVerified || !consentSigned) {
      alert('Please complete all required steps before checking in.');
      return;
    }
    
    setCheckedIn(true);
    setTimeout(() => {
      router.push('/provider');
    }, 2000);
  };

  if (checkedIn) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">Check-In Complete!</h1>
              <p className="text-green-700 mb-4">
                {mockAppointment.patientName} has been successfully checked in.
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
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <CheckCircle className="mr-3 h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Check-In</h1>
              <p className="mt-1 text-gray-600">Complete check-in process for {mockAppointment.patientName}</p>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Appointment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-medium">{mockAppointment.patientName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{mockAppointment.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Room</p>
                  <p className="font-medium">{mockAppointment.room}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Visit Reason</p>
              <p className="font-medium">{mockAppointment.visitReason}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Vital Signs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="height">Height (ft/in)</Label>
                    <Input
                      id="height"
                      placeholder="5'8&quot;"
                      value={vitalSigns.height}
                      onChange={(e) => handleVitalChange('height', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Check-In Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Check-In Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                  <Input
                    id="chiefComplaint"
                    placeholder="Brief description of primary concern..."
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={insuranceVerified}
                      onChange={(e) => setInsuranceVerified(e.target.checked)}
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Insurance verified and copay collected</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consentSigned}
                      onChange={(e) => setConsentSigned(e.target.checked)}
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Consent forms signed</span>
                  </label>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <h4 className="font-medium text-blue-900">Patient Status</h4>
                  <p className="mt-1 text-sm text-blue-700">
                    {insuranceVerified && consentSigned 
                      ? "Ready for check-in" 
                      : "Pending required items"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleCheckIn}
            disabled={!insuranceVerified || !consentSigned}
            className="flex-1"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Check-In
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
