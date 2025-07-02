'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Calendar, 
  User, 
  AlertTriangle,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

interface DeferOption {
  id: string;
  label: string;
  description: string;
  hours: number;
}

const deferOptions: DeferOption[] = [
  {
    id: '2h',
    label: '2 Hours',
    description: 'Defer for 2 hours',
    hours: 2
  },
  {
    id: '4h',
    label: '4 Hours', 
    description: 'Defer for 4 hours',
    hours: 4
  },
  {
    id: '8h',
    label: '8 Hours',
    description: 'Defer for 8 hours',
    hours: 8
  },
  {
    id: '24h',
    label: '1 Day',
    description: 'Defer until tomorrow',
    hours: 24
  },
  {
    id: '48h',
    label: '2 Days',
    description: 'Defer for 2 days',
    hours: 48
  },
  {
    id: '72h',
    label: '3 Days',
    description: 'Defer for 3 days',
    hours: 72
  }
];

// Mock task data based on task ID
const mockTaskData = {
  '1': {
    title: 'Review Critical Lab Results',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    priority: 'urgent',
    dueDate: '2024-12-25',
    type: 'lab-review'
  },
  '2': {
    title: 'Follow-up Call - Diabetes Management',
    patientName: 'Robert Garcia', 
    patientId: 'ICP789123456',
    priority: 'high',
    dueDate: '2024-12-26',
    type: 'patient-follow-up'
  },
  '3': {
    title: 'Prescription Refill Authorization',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    priority: 'medium',
    dueDate: '2024-12-27',
    type: 'prescription-refill'
  }
};

function DeferTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId') || '1';
  
  const [selectedDeferOption, setSelectedDeferOption] = useState<string>('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get task data based on ID
  const task = mockTaskData[taskId as keyof typeof mockTaskData] || mockTaskData['1'];

  const handleSubmit = async () => {
    if (!selectedDeferOption) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/provider/tasks');
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNewDueDate = (hours: number) => {
    const now = new Date();
    const newDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
    return newDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Deferred Successfully</h2>
              <p className="text-gray-600 mb-4">
                The task has been deferred and will reappear in your task list at the scheduled time.
              </p>
              <div className="text-sm text-gray-500">
                Redirecting to tasks list...
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Defer Task</h1>
            <p className="mt-2 text-gray-600">Schedule this task to be completed later</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Task Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mt-2 ${getPriorityColor(task.priority)}`}>
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    {task.priority}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-2 h-4 w-4" />
                    {task.patientName}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Defer Options */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Defer Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deferOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDeferOption(option.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedDeferOption === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                      {selectedDeferOption === option.id && (
                        <div className="text-xs text-blue-600 mt-2">
                          New due: {getNewDueDate(option.hours)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Deferring (Optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Enter reason for deferring this task..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedDeferOption || isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Deferring Task...
                      </>
                    ) : (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Defer Task
                      </>
                    )}
                  </Button>
                  <Button
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
      </div>
    </div>
  );
}

export default function DeferTask() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeferTaskContent />
    </Suspense>
  );
}
