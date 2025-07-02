'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Clock,
  Calendar,
  X,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlockTimePage() {
  const router = useRouter();
  const [blockType, setBlockType] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [recurring, setRecurring] = useState('none');

  const handleSubmit = () => {
    if (!blockType || !reason.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    alert('Time blocked successfully');
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="mr-3 h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Block Time</h1>
                <p className="mt-1 text-gray-600">Block time slots in your schedule</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.back()}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Block Details */}
          <Card>
            <CardHeader>
              <CardTitle>Block Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="blockType">Block Type *</Label>
                  <select
                    id="blockType"
                    value={blockType}
                    onChange={(e) => setBlockType(e.target.value)}
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select block type</option>
                    <option value="personal">Personal Time</option>
                    <option value="admin">Administrative Tasks</option>
                    <option value="lunch">Lunch Break</option>
                    <option value="meeting">Meeting</option>
                    <option value="education">Continuing Education</option>
                    <option value="emergency">Emergency Block</option>
                    <option value="maintenance">System Maintenance</option>
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="reason">Reason *</Label>
                  <Input
                    id="reason"
                    placeholder="Brief description of the block..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details or instructions..."
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="recurring">Recurring</Label>
                  <select
                    id="recurring"
                    value={recurring}
                    onChange={(e) => setRecurring(e.target.value)}
                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="none">No Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* Preview */}
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Block Preview</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Type:</strong> {blockType || 'Not selected'}</p>
                    <p><strong>Date:</strong> {startDate === endDate ? startDate : `${startDate} to ${endDate}`}</p>
                    <p><strong>Time:</strong> {startTime} - {endTime}</p>
                    <p><strong>Duration:</strong> {
                      (() => {
                        const start = new Date(`2000-01-01T${startTime}`);
                        const end = new Date(`2000-01-01T${endTime}`);
                        const diffMs = end.getTime() - start.getTime();
                        const hours = Math.floor(diffMs / (1000 * 60 * 60));
                        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                        return `${hours}h ${minutes}m`;
                      })()
                    }</p>
                    {recurring !== 'none' && <p><strong>Recurring:</strong> {recurring}</p>}
                  </div>
                </div>

                {(blockType === 'vacation' || blockType === 'sick') && (
                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900">Important Note</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          This will block your schedule and may require approval from administration. 
                          Please ensure proper coverage is arranged for patient care.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={!blockType || !reason.trim()}
            className="flex-1"
          >
            <Save className="mr-2 h-4 w-4" />
            Block Time
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
