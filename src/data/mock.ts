import { Company, User, Teacher, Student, ClassSession, Payment, Notification } from '@/types';

// Helper to create dates
const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const daysAgo = (days: number) => daysFromNow(-days);

// Companies
export const companies: Company[] = [
  {
    id: 'company-1',
    name: 'SafeDrive Academy',
    slug: 'safedrive',
    primaryColor: '#3B82F6',
    createdAt: daysAgo(365),
    isActive: true,
  },
  {
    id: 'company-2',
    name: 'QuickLane Driving School',
    slug: 'quicklane',
    primaryColor: '#10B981',
    createdAt: daysAgo(180),
    isActive: true,
  },
  {
    id: 'company-3',
    name: 'City Motors Training',
    slug: 'citymotors',
    primaryColor: '#8B5CF6',
    createdAt: daysAgo(90),
    isActive: true,
  },
];

// Owner
export const owner: User = {
  id: 'owner-1',
  email: 'admin@drivingschools.com',
  name: 'System Administrator',
  role: 'owner',
  createdAt: daysAgo(400),
};

// Managers
export const managers: User[] = [
  {
    id: 'manager-1',
    email: 'john@safedrive.com',
    name: 'John Smith',
    phone: '+1 555-0101',
    role: 'manager',
    companyId: 'company-1',
    createdAt: daysAgo(360),
  },
  {
    id: 'manager-2',
    email: 'sarah@quicklane.com',
    name: 'Sarah Johnson',
    phone: '+1 555-0102',
    role: 'manager',
    companyId: 'company-2',
    createdAt: daysAgo(175),
  },
  {
    id: 'manager-3',
    email: 'mike@citymotors.com',
    name: 'Mike Wilson',
    phone: '+1 555-0103',
    role: 'manager',
    companyId: 'company-3',
    createdAt: daysAgo(85),
  },
];

// Teachers
export const teachers: Teacher[] = [
  // SafeDrive Academy Teachers
  {
    id: 'teacher-1',
    email: 'david@safedrive.com',
    name: 'David Brown',
    phone: '+1 555-0201',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2020-0042',
    licenseExpiration: daysFromNow(45), // Expiring soon!
    specializations: ['Manual', 'Automatic', 'Highway'],
    averageRating: 4.8,
    totalStudents: 24,
    createdAt: daysAgo(350),
  },
  {
    id: 'teacher-2',
    email: 'lisa@safedrive.com',
    name: 'Lisa Martinez',
    phone: '+1 555-0202',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2021-0156',
    licenseExpiration: daysFromNow(200),
    specializations: ['Automatic', 'Nervous Drivers'],
    averageRating: 4.9,
    totalStudents: 18,
    createdAt: daysAgo(300),
  },
  {
    id: 'teacher-3',
    email: 'james@safedrive.com',
    name: 'James Wilson',
    phone: '+1 555-0203',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2019-0089',
    licenseExpiration: daysFromNow(15), // Expiring very soon!
    specializations: ['Manual', 'Commercial'],
    averageRating: 4.6,
    totalStudents: 31,
    createdAt: daysAgo(400),
  },
  // QuickLane Teachers
  {
    id: 'teacher-4',
    email: 'emma@quicklane.com',
    name: 'Emma Davis',
    phone: '+1 555-0204',
    role: 'teacher',
    companyId: 'company-2',
    licenseNumber: 'DL-2022-0211',
    licenseExpiration: daysFromNow(365),
    specializations: ['Automatic', 'Teen Drivers'],
    averageRating: 4.7,
    totalStudents: 15,
    createdAt: daysAgo(170),
  },
  {
    id: 'teacher-5',
    email: 'robert@quicklane.com',
    name: 'Robert Taylor',
    phone: '+1 555-0205',
    role: 'teacher',
    companyId: 'company-2',
    licenseNumber: 'DL-2020-0178',
    licenseExpiration: daysFromNow(90),
    specializations: ['Manual', 'Automatic', 'Defensive Driving'],
    averageRating: 4.5,
    totalStudents: 22,
    createdAt: daysAgo(165),
  },
];

// Students
export const students: Student[] = [
  // David Brown's students (SafeDrive)
  {
    id: 'student-1',
    email: 'alex@email.com',
    name: 'Alex Thompson',
    phone: '+1 555-0301',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    progressStatus: 'in_progress',
    startDate: daysAgo(30),
    expectedEndDate: daysFromNow(30),
    totalClassesCompleted: 8,
    totalClassesScheduled: 15,
    averageRating: 4.2,
    notes: 'Good progress, needs more highway practice',
    createdAt: daysAgo(30),
  },
  {
    id: 'student-2',
    email: 'maria@email.com',
    name: 'Maria Garcia',
    phone: '+1 555-0302',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    progressStatus: 'ready_for_test',
    startDate: daysAgo(60),
    expectedEndDate: daysFromNow(7),
    totalClassesCompleted: 14,
    totalClassesScheduled: 15,
    averageRating: 4.8,
    certificateUrl: '/certificates/maria-garcia.pdf',
    createdAt: daysAgo(60),
  },
  {
    id: 'student-3',
    email: 'kevin@email.com',
    name: 'Kevin Lee',
    phone: '+1 555-0303',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    progressStatus: 'not_started',
    startDate: daysFromNow(3),
    totalClassesCompleted: 0,
    totalClassesScheduled: 12,
    averageRating: 0,
    createdAt: daysAgo(5),
  },
  // Lisa Martinez's students
  {
    id: 'student-4',
    email: 'jennifer@email.com',
    name: 'Jennifer White',
    phone: '+1 555-0304',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    progressStatus: 'in_progress',
    startDate: daysAgo(20),
    totalClassesCompleted: 5,
    totalClassesScheduled: 12,
    averageRating: 3.8,
    notes: 'Nervous driver, making steady progress',
    createdAt: daysAgo(20),
  },
  {
    id: 'student-5',
    email: 'ryan@email.com',
    name: 'Ryan Miller',
    phone: '+1 555-0305',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    progressStatus: 'completed',
    startDate: daysAgo(90),
    totalClassesCompleted: 15,
    totalClassesScheduled: 15,
    averageRating: 4.5,
    certificateUrl: '/certificates/ryan-miller.pdf',
    createdAt: daysAgo(90),
  },
  // QuickLane students
  {
    id: 'student-6',
    email: 'sophie@email.com',
    name: 'Sophie Anderson',
    phone: '+1 555-0306',
    role: 'student',
    companyId: 'company-2',
    teacherId: 'teacher-4',
    progressStatus: 'in_progress',
    startDate: daysAgo(15),
    totalClassesCompleted: 4,
    totalClassesScheduled: 10,
    averageRating: 4.0,
    createdAt: daysAgo(15),
  },
  {
    id: 'student-7',
    email: 'daniel@email.com',
    name: 'Daniel Kim',
    phone: '+1 555-0307',
    role: 'student',
    companyId: 'company-2',
    teacherId: 'teacher-5',
    progressStatus: 'ready_for_test',
    startDate: daysAgo(45),
    totalClassesCompleted: 11,
    totalClassesScheduled: 12,
    averageRating: 4.6,
    createdAt: daysAgo(45),
  },
];

// Class Sessions
export const classSessions: ClassSession[] = [
  // Today's classes
  {
    id: 'class-1',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    scheduledAt: new Date(new Date().setHours(9, 0, 0, 0)),
    duration: 60,
    status: 'completed',
    startedAt: new Date(new Date().setHours(9, 0, 0, 0)),
    endedAt: new Date(new Date().setHours(10, 0, 0, 0)),
    teacherRating: 4,
    studentRating: 5,
    teacherNotes: 'Good parallel parking practice',
    location: 'Downtown Area',
  },
  {
    id: 'class-2',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    scheduledAt: new Date(new Date().setHours(11, 0, 0, 0)),
    duration: 90,
    status: 'scheduled',
    location: 'Highway Route A',
  },
  {
    id: 'class-3',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    studentId: 'student-4',
    scheduledAt: new Date(new Date().setHours(14, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'Residential Area',
  },
  // Tomorrow's classes
  {
    id: 'class-4',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    scheduledAt: new Date(daysFromNow(1).setHours(10, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'City Center',
  },
  {
    id: 'class-5',
    companyId: 'company-1',
    teacherId: 'teacher-3',
    studentId: 'student-3',
    scheduledAt: new Date(daysFromNow(3).setHours(9, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'Training Lot',
  },
  // QuickLane classes
  {
    id: 'class-6',
    companyId: 'company-2',
    teacherId: 'teacher-4',
    studentId: 'student-6',
    scheduledAt: new Date(new Date().setHours(15, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'Suburb Route',
  },
];

// Payments
export const payments: Payment[] = [
  {
    id: 'payment-1',
    companyId: 'company-1',
    studentId: 'student-1',
    amount: 75,
    currency: 'USD',
    paidAt: daysAgo(25),
    recordedBy: 'teacher-1',
    description: 'Session 1-4 payment',
  },
  {
    id: 'payment-2',
    companyId: 'company-1',
    studentId: 'student-1',
    amount: 75,
    currency: 'USD',
    paidAt: daysAgo(10),
    recordedBy: 'teacher-1',
    description: 'Session 5-8 payment',
  },
  {
    id: 'payment-3',
    companyId: 'company-1',
    studentId: 'student-2',
    amount: 200,
    currency: 'USD',
    paidAt: daysAgo(55),
    recordedBy: 'manager-1',
    description: 'Full course payment',
  },
  {
    id: 'payment-4',
    companyId: 'company-1',
    studentId: 'student-4',
    amount: 100,
    currency: 'USD',
    paidAt: daysAgo(18),
    recordedBy: 'teacher-2',
    description: 'Initial deposit',
  },
  {
    id: 'payment-5',
    companyId: 'company-2',
    studentId: 'student-6',
    amount: 150,
    currency: 'USD',
    paidAt: daysAgo(14),
    recordedBy: 'teacher-4',
    description: 'Course enrollment',
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'manager-1',
    type: 'license_expiry',
    title: 'License Expiring Soon',
    message: "James Wilson's instructor license expires in 15 days",
    read: false,
    createdAt: daysAgo(0),
    actionUrl: '/manager/teachers/teacher-3',
  },
  {
    id: 'notif-2',
    userId: 'manager-1',
    type: 'license_expiry',
    title: 'License Expiring',
    message: "David Brown's instructor license expires in 45 days",
    read: true,
    createdAt: daysAgo(5),
    actionUrl: '/manager/teachers/teacher-1',
  },
  {
    id: 'notif-3',
    userId: 'teacher-1',
    type: 'class_reminder',
    title: 'Upcoming Class',
    message: 'Class with Maria Garcia in 30 minutes',
    read: false,
    createdAt: daysAgo(0),
  },
  {
    id: 'notif-4',
    userId: 'student-1',
    type: 'class_reminder',
    title: 'Class Tomorrow',
    message: 'You have a driving class scheduled for tomorrow at 10:00 AM',
    read: false,
    createdAt: daysAgo(0),
  },
  {
    id: 'notif-5',
    userId: 'student-2',
    type: 'rating_request',
    title: 'Rate Your Class',
    message: 'How was your class with David Brown?',
    read: false,
    createdAt: daysAgo(0),
  },
];

// Helper functions to get data
export const getCompanyById = (id: string) => companies.find(c => c.id === id);
export const getTeachersByCompany = (companyId: string) => teachers.filter(t => t.companyId === companyId);
export const getStudentsByCompany = (companyId: string) => students.filter(s => s.companyId === companyId);
export const getStudentsByTeacher = (teacherId: string) => students.filter(s => s.teacherId === teacherId);
export const getClassesByTeacher = (teacherId: string) => classSessions.filter(c => c.teacherId === teacherId);
export const getClassesByStudent = (studentId: string) => classSessions.filter(c => c.studentId === studentId);
export const getPaymentsByStudent = (studentId: string) => payments.filter(p => p.studentId === studentId);
export const getNotificationsByUser = (userId: string) => notifications.filter(n => n.userId === userId);
export const getTodaysClasses = (companyId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return classSessions.filter(c => 
    c.companyId === companyId && 
    c.scheduledAt >= today && 
    c.scheduledAt < tomorrow
  );
};
