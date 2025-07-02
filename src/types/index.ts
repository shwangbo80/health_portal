export interface MedicalCondition {
  id: string;
  name: string;
  selected: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'upcoming' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  name: string;
  specialty: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
  result?: string;
  doctorNotes?: string;
  doctorName: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: string;
  refillsRemaining: number;
}

// Signup form types
export interface SignupFormData {
  // Step 1: Account Creation
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  
  // Step 2: Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Step 3: Insurance Information
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDateOfBirth: string;
  relationshipToSubscriber: string;
  
  // Step 4: Medical History
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyMedicalInfo: string;
  primaryCarePhysician: string;
  
  // Step 5: Verification
  verificationCode: string;
  verificationMethod: 'email' | 'sms';
}

// Role-based access types
export type UserRole = 'patient' | 'provider' | 'admin' | 'nurse' | 'staff';

export interface PatientOverview {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  lastVisit?: string;
  nextAppointment?: string;
  primaryProvider?: string;
  insuranceProvider?: string;
  status: 'active' | 'inactive' | 'pending';
  totalAppointments: number;
  totalPrescriptions: number;
}

export interface AppointmentManagement extends Appointment {
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  providerId: string;
  providerName: string;
  room?: string;
  duration: number;
  checkInTime?: string;
  checkOutTime?: string;
  followUpRequired?: boolean;
  visitReason: string;
  visitSummary?: string;
}

export interface PrescriptionManagement extends Prescription {
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  instructions: string;
  pharmacyId?: string;
  pharmacyName?: string;
  filledDate?: string;
  quantity: number;
  daysSupply: number;
  priorAuthRequired?: boolean;
  costEstimate?: number;
  status: 'active' | 'pending_refill' | 'expired' | 'canceled';
}

export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  upcomingAppointments: number;
  pendingLabResults: number;
  activePrescriptions: number;
  criticalAlerts: number;
  revenue?: number;
  patientSatisfaction?: number;
}

export interface SystemAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  patientId?: string;
  providerId?: string;
}
