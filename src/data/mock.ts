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
    name: 'مركز الرحمة لتعليم قيادة السيارات',
    slug: 'alrahma',
    primaryColor: '#3B82F6',
    createdAt: daysAgo(365),
    isActive: true,
  },
  {
    id: 'company-2',
    name: 'مركز العصرية لتعليم قيادة السيارات',
    slug: 'alasriya',
    primaryColor: '#10B981',
    createdAt: daysAgo(180),
    isActive: true,
  },
  {
    id: 'company-3',
    name: 'مركز الكلية لتعليم قيادة السيارات',
    slug: 'alkulliya',
    primaryColor: '#8B5CF6',
    createdAt: daysAgo(90),
    isActive: true,
  },
  {
    id: 'company-4',
    name: 'مركز مكة لتعليم قيادة السيارات',
    slug: 'makkah',
    primaryColor: '#F59E0B',
    createdAt: daysAgo(60),
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
    email: 'ahmed@alrahma.com',
    name: 'أحمد الرحمة',
    phone: '+966 55-0101',
    role: 'manager',
    companyId: 'company-1',
    createdAt: daysAgo(360),
  },
  {
    id: 'manager-2',
    email: 'khalid@alasriya.com',
    name: 'خالد العصري',
    phone: '+966 55-0102',
    role: 'manager',
    companyId: 'company-2',
    createdAt: daysAgo(175),
  },
  {
    id: 'manager-3',
    email: 'omar@alkulliya.com',
    name: 'عمر الكلية',
    phone: '+966 55-0103',
    role: 'manager',
    companyId: 'company-3',
    createdAt: daysAgo(85),
  },
  {
    id: 'manager-4',
    email: 'yusuf@makkah.com',
    name: 'يوسف المكي',
    phone: '+966 55-0104',
    role: 'manager',
    companyId: 'company-4',
    createdAt: daysAgo(55),
  },
];

// Teachers
export const teachers: Teacher[] = [
  // مركز الرحمة Teachers
  {
    id: 'teacher-1',
    email: 'mohammed@alrahma.com',
    name: 'محمد السالم',
    phone: '+966 55-0201',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2020-0042',
    licenseExpiration: daysFromNow(45), // Expiring soon!
    specializations: ['عادي', 'أوتوماتيك', 'طرق سريعة'],
    averageRating: 4.8,
    totalStudents: 24,
    createdAt: daysAgo(350),
  },
  {
    id: 'teacher-2',
    email: 'fatima@alrahma.com',
    name: 'فاطمة الزهراء',
    phone: '+966 55-0202',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2021-0156',
    licenseExpiration: daysFromNow(200),
    specializations: ['أوتوماتيك', 'مبتدئين'],
    averageRating: 4.9,
    totalStudents: 18,
    createdAt: daysAgo(300),
  },
  {
    id: 'teacher-3',
    email: 'ali@alrahma.com',
    name: 'علي الحسن',
    phone: '+966 55-0203',
    role: 'teacher',
    companyId: 'company-1',
    licenseNumber: 'DL-2019-0089',
    licenseExpiration: daysFromNow(15), // Expiring very soon!
    specializations: ['عادي', 'تجاري'],
    averageRating: 4.6,
    totalStudents: 31,
    createdAt: daysAgo(400),
  },
  // مركز العصرية Teachers
  {
    id: 'teacher-4',
    email: 'nora@alasriya.com',
    name: 'نورة العتيبي',
    phone: '+966 55-0204',
    role: 'teacher',
    companyId: 'company-2',
    licenseNumber: 'DL-2022-0211',
    licenseExpiration: daysFromNow(365),
    specializations: ['أوتوماتيك', 'شباب'],
    averageRating: 4.7,
    totalStudents: 15,
    createdAt: daysAgo(170),
  },
  {
    id: 'teacher-5',
    email: 'saad@alasriya.com',
    name: 'سعد القحطاني',
    phone: '+966 55-0205',
    role: 'teacher',
    companyId: 'company-2',
    licenseNumber: 'DL-2020-0178',
    licenseExpiration: daysFromNow(90),
    specializations: ['عادي', 'أوتوماتيك', 'قيادة دفاعية'],
    averageRating: 4.5,
    totalStudents: 22,
    createdAt: daysAgo(165),
  },
  // مركز الكلية Teacher
  {
    id: 'teacher-6',
    email: 'hassan@alkulliya.com',
    name: 'حسن الدوسري',
    phone: '+966 55-0206',
    role: 'teacher',
    companyId: 'company-3',
    licenseNumber: 'DL-2021-0312',
    licenseExpiration: daysFromNow(180),
    specializations: ['أوتوماتيك', 'عادي'],
    averageRating: 4.4,
    totalStudents: 12,
    createdAt: daysAgo(80),
  },
  // مركز مكة Teachers
  {
    id: 'teacher-7',
    email: 'abdullah@makkah.com',
    name: 'عبدالله الشريف',
    phone: '+966 55-0207',
    role: 'teacher',
    companyId: 'company-4',
    licenseNumber: 'DL-2022-0445',
    licenseExpiration: daysFromNow(300),
    specializations: ['أوتوماتيك', 'طرق جبلية'],
    averageRating: 4.8,
    totalStudents: 10,
    createdAt: daysAgo(50),
  },
];

// Students
export const students: Student[] = [
  // مركز الرحمة - محمد السالم's students
  {
    id: 'student-1',
    email: 'sara@email.com',
    name: 'سارة الأحمد',
    phone: '+966 55-0301',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    progressStatus: 'in_progress',
    startDate: daysAgo(30),
    expectedEndDate: daysFromNow(30),
    totalClassesCompleted: 8,
    totalClassesScheduled: 15,
    averageRating: 4.2,
    notes: 'تقدم جيد، تحتاج المزيد من التدريب على الطرق السريعة',
    createdAt: daysAgo(30),
  },
  {
    id: 'student-2',
    email: 'layla@email.com',
    name: 'ليلى العمري',
    phone: '+966 55-0302',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    progressStatus: 'ready_for_test',
    startDate: daysAgo(60),
    expectedEndDate: daysFromNow(7),
    totalClassesCompleted: 14,
    totalClassesScheduled: 15,
    averageRating: 4.8,
    certificateUrl: '/certificates/layla-alomari.pdf',
    createdAt: daysAgo(60),
  },
  {
    id: 'student-3',
    email: 'reem@email.com',
    name: 'ريم السعيد',
    phone: '+966 55-0303',
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
  // مركز الرحمة - فاطمة الزهراء's students
  {
    id: 'student-4',
    email: 'huda@email.com',
    name: 'هدى الفيصل',
    phone: '+966 55-0304',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    progressStatus: 'in_progress',
    startDate: daysAgo(20),
    totalClassesCompleted: 5,
    totalClassesScheduled: 12,
    averageRating: 3.8,
    notes: 'سائقة مبتدئة، تتقدم بثبات',
    createdAt: daysAgo(20),
  },
  {
    id: 'student-5',
    email: 'mona@email.com',
    name: 'منى الراشد',
    phone: '+966 55-0305',
    role: 'student',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    progressStatus: 'completed',
    startDate: daysAgo(90),
    totalClassesCompleted: 15,
    totalClassesScheduled: 15,
    averageRating: 4.5,
    certificateUrl: '/certificates/mona-alrashid.pdf',
    createdAt: daysAgo(90),
  },
  // مركز العصرية students
  {
    id: 'student-6',
    email: 'amal@email.com',
    name: 'أمل الحربي',
    phone: '+966 55-0306',
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
    email: 'nouf@email.com',
    name: 'نوف الغامدي',
    phone: '+966 55-0307',
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
  // مركز الكلية student
  {
    id: 'student-8',
    email: 'fahad@email.com',
    name: 'فهد المالكي',
    phone: '+966 55-0308',
    role: 'student',
    companyId: 'company-3',
    teacherId: 'teacher-6',
    progressStatus: 'in_progress',
    startDate: daysAgo(25),
    totalClassesCompleted: 6,
    totalClassesScheduled: 12,
    averageRating: 4.3,
    createdAt: daysAgo(25),
  },
  // مركز مكة students
  {
    id: 'student-9',
    email: 'majed@email.com',
    name: 'ماجد الشهري',
    phone: '+966 55-0309',
    role: 'student',
    companyId: 'company-4',
    teacherId: 'teacher-7',
    progressStatus: 'in_progress',
    startDate: daysAgo(20),
    totalClassesCompleted: 5,
    totalClassesScheduled: 10,
    averageRating: 4.5,
    createdAt: daysAgo(20),
  },
  {
    id: 'student-10',
    email: 'sultan@email.com',
    name: 'سلطان العنزي',
    phone: '+966 55-0310',
    role: 'student',
    companyId: 'company-4',
    teacherId: 'teacher-7',
    progressStatus: 'not_started',
    startDate: daysFromNow(5),
    totalClassesCompleted: 0,
    totalClassesScheduled: 10,
    averageRating: 0,
    createdAt: daysAgo(3),
  },
];

// Class Sessions
export const classSessions: ClassSession[] = [
  // Today's classes - مركز الرحمة
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
    teacherNotes: 'تدريب جيد على الركن الموازي',
    location: 'وسط المدينة',
  },
  {
    id: 'class-2',
    companyId: 'company-1',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    scheduledAt: new Date(new Date().setHours(11, 0, 0, 0)),
    duration: 90,
    status: 'scheduled',
    location: 'الطريق السريع',
  },
  {
    id: 'class-3',
    companyId: 'company-1',
    teacherId: 'teacher-2',
    studentId: 'student-4',
    scheduledAt: new Date(new Date().setHours(14, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'الحي السكني',
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
    location: 'مركز المدينة',
  },
  {
    id: 'class-5',
    companyId: 'company-1',
    teacherId: 'teacher-3',
    studentId: 'student-3',
    scheduledAt: new Date(daysFromNow(3).setHours(9, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'ساحة التدريب',
  },
  // مركز العصرية classes
  {
    id: 'class-6',
    companyId: 'company-2',
    teacherId: 'teacher-4',
    studentId: 'student-6',
    scheduledAt: new Date(new Date().setHours(15, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'طريق الضاحية',
  },
  // مركز الكلية class
  {
    id: 'class-7',
    companyId: 'company-3',
    teacherId: 'teacher-6',
    studentId: 'student-8',
    scheduledAt: new Date(new Date().setHours(16, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'الطريق الدائري',
  },
  // مركز مكة classes
  {
    id: 'class-8',
    companyId: 'company-4',
    teacherId: 'teacher-7',
    studentId: 'student-9',
    scheduledAt: new Date(new Date().setHours(10, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'طريق مكة - جدة',
  },
  {
    id: 'class-9',
    companyId: 'company-4',
    teacherId: 'teacher-7',
    studentId: 'student-10',
    scheduledAt: new Date(daysFromNow(5).setHours(9, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
    location: 'ساحة التدريب',
  },
];

// Payments
export const payments: Payment[] = [
  {
    id: 'payment-1',
    companyId: 'company-1',
    studentId: 'student-1',
    amount: 500,
    currency: 'SAR',
    paidAt: daysAgo(25),
    recordedBy: 'teacher-1',
    description: 'دفعة الحصص 1-4',
  },
  {
    id: 'payment-2',
    companyId: 'company-1',
    studentId: 'student-1',
    amount: 500,
    currency: 'SAR',
    paidAt: daysAgo(10),
    recordedBy: 'teacher-1',
    description: 'دفعة الحصص 5-8',
  },
  {
    id: 'payment-3',
    companyId: 'company-1',
    studentId: 'student-2',
    amount: 2000,
    currency: 'SAR',
    paidAt: daysAgo(55),
    recordedBy: 'manager-1',
    description: 'دفعة الدورة الكاملة',
  },
  {
    id: 'payment-4',
    companyId: 'company-1',
    studentId: 'student-4',
    amount: 800,
    currency: 'SAR',
    paidAt: daysAgo(18),
    recordedBy: 'teacher-2',
    description: 'دفعة أولى',
  },
  {
    id: 'payment-5',
    companyId: 'company-2',
    studentId: 'student-6',
    amount: 1200,
    currency: 'SAR',
    paidAt: daysAgo(14),
    recordedBy: 'teacher-4',
    description: 'رسوم التسجيل',
  },
  {
    id: 'payment-6',
    companyId: 'company-3',
    studentId: 'student-8',
    amount: 1500,
    currency: 'SAR',
    paidAt: daysAgo(20),
    recordedBy: 'teacher-6',
    description: 'دفعة الدورة',
  },
  {
    id: 'payment-7',
    companyId: 'company-4',
    studentId: 'student-9',
    amount: 1000,
    currency: 'SAR',
    paidAt: daysAgo(18),
    recordedBy: 'teacher-7',
    description: 'دفعة أولى',
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'manager-1',
    type: 'license_expiry',
    title: 'رخصة تنتهي قريباً',
    message: 'رخصة المدرب علي الحسن تنتهي خلال 15 يوم',
    read: false,
    createdAt: daysAgo(0),
    actionUrl: '/manager/teachers/teacher-3',
  },
  {
    id: 'notif-2',
    userId: 'manager-1',
    type: 'license_expiry',
    title: 'رخصة تنتهي',
    message: 'رخصة المدرب محمد السالم تنتهي خلال 45 يوم',
    read: true,
    createdAt: daysAgo(5),
    actionUrl: '/manager/teachers/teacher-1',
  },
  {
    id: 'notif-3',
    userId: 'teacher-1',
    type: 'class_reminder',
    title: 'حصة قادمة',
    message: 'حصة مع ليلى العمري خلال 30 دقيقة',
    read: false,
    createdAt: daysAgo(0),
  },
  {
    id: 'notif-4',
    userId: 'student-1',
    type: 'class_reminder',
    title: 'حصة غداً',
    message: 'لديك حصة قيادة مجدولة غداً الساعة 10:00 صباحاً',
    read: false,
    createdAt: daysAgo(0),
  },
  {
    id: 'notif-5',
    userId: 'student-2',
    type: 'rating_request',
    title: 'قيّم حصتك',
    message: 'كيف كانت حصتك مع المدرب محمد السالم؟',
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
