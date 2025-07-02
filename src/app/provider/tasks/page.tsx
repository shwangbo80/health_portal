'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Search, 
  Calendar, 
  User, 
  AlertTriangle, 
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Stethoscope,
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AddNoteModal from '@/components/AddNoteModal';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'patient-follow-up' | 'lab-review' | 'prescription-refill' | 'appointment-reminder' | 'documentation' | 'administrative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: string;
  assignedTo?: string;
  patientName?: string;
  patientId?: string;
  createdDate: string;
  completedDate?: string;
  notes?: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Critical Lab Results',
    description: 'Review and follow up on Maria Rodriguez critical glucose and creatinine levels',
    type: 'lab-review',
    priority: 'urgent',
    status: 'pending',
    dueDate: '2024-12-25',
    patientName: 'Maria Rodriguez',
    patientId: 'ICP123456789',
    createdDate: '2024-12-20',
    notes: 'Patient called about symptoms. Results show elevated glucose (185) and creatinine (1.8).'
  },
  {
    id: '2',
    title: 'Follow-up Call - Diabetes Management',
    description: 'Call Robert Garcia to discuss HbA1c results and medication adjustment',
    type: 'patient-follow-up',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-12-26',
    patientName: 'Robert Garcia',
    patientId: 'ICP789123456',
    createdDate: '2024-12-18',
    notes: 'HbA1c at 7.2%. Need to discuss medication titration and lifestyle modifications.'
  },
  {
    id: '3',
    title: 'Prescription Refill Authorization',
    description: 'Authorize refill for James Thompson - Albuterol inhaler',
    type: 'prescription-refill',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-12-27',
    patientName: 'James Thompson',
    patientId: 'IDC987654321',
    createdDate: '2024-12-19'
  },
  {
    id: '4',
    title: 'Complete Annual Physical Documentation',
    description: 'Finalize documentation for Sarah Chen annual physical exam',
    type: 'documentation',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-12-28',
    patientName: 'Sarah Chen',
    patientId: 'ICP456789123',
    createdDate: '2024-12-20'
  },
  {
    id: '5',
    title: 'Insurance Prior Authorization',
    description: 'Submit prior authorization for MRI scan',
    type: 'administrative',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-12-24',
    patientName: 'Jennifer Lee',
    patientId: 'IDC654321987',
    createdDate: '2024-12-17'
  },
  {
    id: '6',
    title: 'Appointment Reminder Call',
    description: 'Remind patient about upcoming cardiology consultation',
    type: 'appointment-reminder',
    priority: 'low',
    status: 'completed',
    dueDate: '2024-12-23',
    patientName: 'Michael Brown',
    patientId: 'ICP111222333',
    createdDate: '2024-12-20',
    completedDate: '2024-12-23'
  },
  {
    id: '7',
    title: 'Overdue Lab Results Review',
    description: 'Review thyroid function tests ordered 2 weeks ago',
    type: 'lab-review',
    priority: 'medium',
    status: 'overdue',
    dueDate: '2024-12-20',
    patientName: 'Lisa Davis',
    patientId: 'ICP444555666',
    createdDate: '2024-12-10'
  }
];

export default function MyTasks() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | Task['type']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Task['priority']>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | Task['status']>('all');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCompleteTask = (task: Task) => {
    if (task.type === 'lab-review') {
      router.push(`/provider/lab-review?taskId=${task.id}`);
    } else if (task.type === 'prescription-refill') {
      router.push(`/provider/prescription-approval?taskId=${task.id}`);
    } else if (task.type === 'patient-follow-up') {
      router.push(`/provider/patients/${task.patientId}`);
    } else if (task.type === 'appointment-reminder') {
      router.push(`/provider/schedule-appointment`);
    } else {
      // Generic task completion - could create a task completion page
      alert('Task marked as complete');
    }
  };

  const handleAddNote = (task: Task) => {
    setSelectedTask(task);
    setNoteModalOpen(true);
  };

  const handleSaveNote = (note: { content: string; type: string; followUp?: string }) => {
    console.log('Note saved:', note, 'for task:', selectedTask?.id);
    // Here you would typically save the note to your backend
    alert(`Note saved for task: ${selectedTask?.title}`);
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.patientName && task.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'patient-follow-up': return <Phone className="h-4 w-4" />;
      case 'lab-review': return <FileText className="h-4 w-4" />;
      case 'prescription-refill': return <Stethoscope className="h-4 w-4" />;
      case 'appointment-reminder': return <Calendar className="h-4 w-4" />;
      case 'documentation': return <FileText className="h-4 w-4" />;
      case 'administrative': return <CheckSquare className="h-4 w-4" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'patient-follow-up': return 'Patient Follow-up';
      case 'lab-review': return 'Lab Review';
      case 'prescription-refill': return 'Prescription Refill';
      case 'appointment-reminder': return 'Appointment Reminder';
      case 'documentation': return 'Documentation';
      case 'administrative': return 'Administrative';
      default: return type;
    }
  };

  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const overdueTasks = mockTasks.filter(t => t.status === 'overdue').length;
  const urgentTasks = mockTasks.filter(t => t.priority === 'urgent').length;
  const completedToday = mockTasks.filter(t => 
    t.completedDate && new Date(t.completedDate).toDateString() === new Date().toDateString()
  ).length;

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'completed' && new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your daily tasks and follow-ups</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-orange-600">{urgentTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">{completedToday}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
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
                  placeholder="Search tasks, patients, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | Task['status'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as 'all' | Task['priority'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | Task['type'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="patient-follow-up">Patient Follow-up</option>
                <option value="lab-review">Lab Review</option>
                <option value="prescription-refill">Prescription Refill</option>
                <option value="appointment-reminder">Appointment Reminder</option>
                <option value="documentation">Documentation</option>
                <option value="administrative">Administrative</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`hover:shadow-md transition-shadow ${isOverdue(task.dueDate, task.status) ? 'border-red-200' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getTypeIcon(task.type)}
                        <span className="ml-1">{getTypeLabel(task.type)}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">{task.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    {task.patientName && (
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {task.patientName}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Created: {new Date(task.createdDate).toLocaleDateString()}
                    </div>
                    {task.completedDate && (
                      <div className="flex items-center">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Completed: {new Date(task.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {task.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{task.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto">
                  {task.status !== 'completed' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 lg:flex-none"
                        onClick={() => handleAddNote(task)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Add Note
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 lg:flex-none"
                        onClick={() => handleCompleteTask(task)}
                      >
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Complete
                      </Button>
                    </>
                  )}
                  {task.status === 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => task.patientId ? router.push(`/provider/patients/${task.patientId}`) : null}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No tasks match the selected filters.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Note Modal */}
      {selectedTask && (
        <AddNoteModal
          isOpen={noteModalOpen}
          onClose={() => {
            setNoteModalOpen(false);
            setSelectedTask(null);
          }}
          taskId={selectedTask.id}
          taskTitle={selectedTask.title}
          patientName={selectedTask.patientName || 'Unknown Patient'}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}
