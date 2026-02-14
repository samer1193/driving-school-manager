// Core Types for Driving School Management System

export type UserRole = 'owner' | 'manager' | 'teacher' | 'student';

export type ProgressStatus = 'not_started' | 'in_progress' | 'ready_for_test' | 'completed';

export type ClassStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Company {
  id: string;
  name: string;
  slug: string; // for white-label URLs
  logo?: string;
  primaryColor: string;
  createdAt: Date;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  companyId?: string; // null for owner
  avatar?: string;
  createdAt: Date;
}

export interface Teacher extends User {
  role: 'teacher';
  licenseNumber: string;
  licenseExpiration: Date;
  specializations?: string[];
  averageRating: number;
  totalStudents: number;
}

export interface Student extends User {
  role: 'student';
  teacherId: string;
  progressStatus: ProgressStatus;
  startDate: Date;
  expectedEndDate?: Date;
  totalClassesCompleted: number;
  totalClassesScheduled: number;
  certificateUrl?: string;
  averageRating: number; // rated by teacher
  notes?: string;
}

export interface ClassSession {
  id: string;
  companyId: string;
  teacherId: string;
  studentId: string;
  scheduledAt: Date;
  duration: number; // minutes
  status: ClassStatus;
  startedAt?: Date;
  endedAt?: Date;
  teacherRating?: number; // 1-5
  studentRating?: number; // 1-5
  teacherNotes?: string;
  studentFeedback?: string;
  location?: string;
}

export interface Payment {
  id: string;
  companyId: string;
  studentId: string;
  amount: number;
  currency: string;
  paidAt: Date;
  recordedBy: string; // teacher or manager id
  description: string;
  sessionId?: string; // optional link to class
}

export interface Notification {
  id: string;
  userId: string;
  type: 'class_reminder' | 'class_start' | 'class_end' | 'license_expiry' | 'payment' | 'rating_request';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Dashboard Stats
export interface ManagerStats {
  totalTeachers: number;
  totalStudents: number;
  activeStudents: number;
  classesToday: number;
  upcomingLicenseExpiries: number;
  totalRevenue: number;
}

export interface TeacherStats {
  totalStudents: number;
  classesToday: number;
  classesThisWeek: number;
  averageRating: number;
  pendingRatings: number;
}

export interface StudentStats {
  totalClasses: number;
  completedClasses: number;
  upcomingClasses: number;
  totalPaid: number;
  progressPercentage: number;
}
