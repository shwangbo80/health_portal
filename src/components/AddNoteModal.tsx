'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  X, 
  Save,
  Clock
} from 'lucide-react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  patientName: string;
  onSave: (note: { content: string; type: string; followUp?: string }) => void;
}

export default function AddNoteModal({ 
  isOpen, 
  onClose, 
  taskId, 
  taskTitle, 
  patientName, 
  onSave 
}: AddNoteModalProps) {
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState('progress');
  const [followUpRequired, setFollowUpRequired] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave({
      content: noteContent,
      type: noteType,
      followUp: followUpRequired || undefined
    });
    
    setIsSubmitting(false);
    
    // Reset form
    setNoteContent('');
    setNoteType('progress');
    setFollowUpRequired('');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Add Note
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Task Information</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Task:</span> {taskTitle}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Patient:</span> {patientName}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Task ID:</span> {taskId}
                </p>
              </div>
            </div>

            {/* Note Type */}
            <div className="space-y-2">
              <Label htmlFor="noteType">Note Type *</Label>
              <Select value={noteType} onValueChange={setNoteType} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progress Note</SelectItem>
                  <SelectItem value="clinical">Clinical Note</SelectItem>
                  <SelectItem value="follow-up">Follow-up Note</SelectItem>
                  <SelectItem value="administrative">Administrative Note</SelectItem>
                  <SelectItem value="patient-communication">Patient Communication</SelectItem>
                  <SelectItem value="consultation">Consultation Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Note Content */}
            <div className="space-y-2">
              <Label htmlFor="noteContent">Note Content *</Label>
              <Textarea
                id="noteContent"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={8}
                placeholder="Enter your note here... Include relevant observations, actions taken, patient responses, and any other pertinent information."
                required
                className="min-h-[200px]"
              />
              <div className="text-right text-xs text-gray-500">
                {noteContent.length} characters
              </div>
            </div>

            {/* Follow-up Required */}
            <div className="space-y-2">
              <Label htmlFor="followUp">Follow-up Required</Label>
              <Select value={followUpRequired} onValueChange={setFollowUpRequired}>
                <SelectTrigger>
                  <SelectValue placeholder="Select if follow-up is needed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No follow-up required</SelectItem>
                  <SelectItem value="24-hours">Follow-up in 24 hours</SelectItem>
                  <SelectItem value="48-hours">Follow-up in 48 hours</SelectItem>
                  <SelectItem value="1-week">Follow-up in 1 week</SelectItem>
                  <SelectItem value="2-weeks">Follow-up in 2 weeks</SelectItem>
                  <SelectItem value="1-month">Follow-up in 1 month</SelectItem>
                  <SelectItem value="3-months">Follow-up in 3 months</SelectItem>
                  <SelectItem value="as-needed">Follow-up as needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timestamp */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center text-sm text-blue-800">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  Note will be timestamped: {new Date().toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                disabled={!noteContent.trim() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Saving Note...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Note
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
