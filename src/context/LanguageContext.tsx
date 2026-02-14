'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'Driving School Manager',
    'app.tagline': 'White-label multi-company driving school management system',
    'app.demo': 'Demo Mode — Select a role to explore',
    'common.dashboard': 'Dashboard',
    'common.teachers': 'Teachers',
    'common.students': 'Students',
    'common.schedule': 'Schedule',
    'common.payments': 'Payments',
    'common.companies': 'Companies',
    'common.progress': 'Progress',
    'common.myStudents': 'My Students',
    'common.mySchedule': 'My Schedule',
    'common.view': 'View',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.today': 'Today',
    'common.upcoming': 'Upcoming',
    'common.completed': 'Completed',
    'common.switchRole': '← Switch Role / Logout',
    'common.selectCompany': 'Select Company',
    
    // Roles
    'role.owner': 'Owner',
    'role.manager': 'Manager', 
    'role.teacher': 'Teacher',
    'role.student': 'Student',
    'role.ownerPortal': 'Owner Portal',
    'role.managerPortal': 'Manager Portal',
    'role.teacherPortal': 'Teacher Portal',
    'role.studentPortal': 'Student Portal',
    
    // Owner
    'owner.dashboard': 'Owner Dashboard',
    'owner.totalCompanies': 'Companies',
    'owner.totalTeachers': 'Total Teachers',
    'owner.activeStudents': 'Active Students',
    'owner.totalRevenue': 'Total Revenue',
    'owner.companiesOverview': 'Companies Overview',
    'owner.addCompany': '+ Add Company',
    
    // Manager
    'manager.dashboard': 'Manager Dashboard',
    'manager.addTeacher': '+ Teacher',
    'manager.addStudent': '+ Student',
    'manager.classesToday': 'Classes Today',
    'manager.licenseExpiry': 'License Expiring Soon',
    'manager.licenseExpiryWarning': 'License Expiry Warnings',
    'manager.todaysSchedule': "Today's Schedule",
    'manager.viewAll': 'View All →',
    'manager.manage': 'Manage →',
    'manager.noClasses': 'No classes scheduled for today',
    'manager.license': 'License',
    'manager.expiresIn': 'expires in',
    'manager.days': 'days',
    'manager.markRenewed': 'Mark as Renewed',
    
    // Teacher
    'teacher.welcome': 'Welcome',
    'teacher.myStudents': 'My Students',
    'teacher.classesToday': 'Classes Today',
    'teacher.myRating': 'My Rating',
    'teacher.pendingRatings': 'Pending Ratings',
    'teacher.startClass': 'Start Class',
    'teacher.endClass': 'End Class',
    'teacher.licenseExpires': 'Your license expires in',
    'teacher.contactManager': 'Please contact your manager to renew license',
    'teacher.noClasses': 'No classes scheduled for today 🎉',
    
    // Student
    'student.yourProgress': 'Your Progress',
    'student.classes': 'Classes',
    'student.upcomingClasses': 'Upcoming Classes',
    'student.totalPaid': 'Total Paid',
    'student.yourRating': 'Your Rating',
    'student.myInstructor': 'My Instructor',
    'student.contactInstructor': '📞 Contact Instructor',
    'student.specializations': 'Specializations',
    'student.certificateReady': 'Your Certificate is Ready!',
    'student.downloadCertificate': 'Download Certificate',
    'student.congratulations': 'Congratulations on completing your training',
    'student.started': 'Started',
    'student.expected': 'Expected',
    
    // Status
    'status.notStarted': 'Not Started',
    'status.inProgress': 'In Progress',
    'status.readyForTest': 'Ready for Test',
    'status.completed': 'Completed',
    'status.scheduled': 'Scheduled',
    'status.cancelled': 'Cancelled',
    
    // Progress messages
    'progress.notStarted': 'Your lessons start soon!',
    'progress.inProgress': 'Keep up the great work!',
    'progress.readyForTest': "You're ready for your test!",
    'progress.completed': 'Congratulations!',
  },
  ar: {
    // Common
    'app.name': 'نظام إدارة مدارس القيادة',
    'app.tagline': 'نظام إدارة متعدد الشركات لمدارس تعليم القيادة',
    'app.demo': 'الوضع التجريبي — اختر دوراً للاستكشاف',
    'common.dashboard': 'لوحة التحكم',
    'common.teachers': 'المدربين',
    'common.students': 'الطلاب',
    'common.schedule': 'الجدول',
    'common.payments': 'المدفوعات',
    'common.companies': 'الشركات',
    'common.progress': 'التقدم',
    'common.myStudents': 'طلابي',
    'common.mySchedule': 'جدولي',
    'common.view': 'عرض',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.active': 'نشط',
    'common.inactive': 'غير نشط',
    'common.today': 'اليوم',
    'common.upcoming': 'القادم',
    'common.completed': 'مكتمل',
    'common.switchRole': 'تبديل الدور / تسجيل الخروج ←',
    'common.selectCompany': 'اختر الشركة',
    
    // Roles
    'role.owner': 'المالك',
    'role.manager': 'المدير',
    'role.teacher': 'المدرب',
    'role.student': 'الطالب',
    'role.ownerPortal': 'بوابة المالك',
    'role.managerPortal': 'بوابة المدير',
    'role.teacherPortal': 'بوابة المدرب',
    'role.studentPortal': 'بوابة الطالب',
    
    // Owner
    'owner.dashboard': 'لوحة تحكم المالك',
    'owner.totalCompanies': 'الشركات',
    'owner.totalTeachers': 'إجمالي المدربين',
    'owner.activeStudents': 'الطلاب النشطين',
    'owner.totalRevenue': 'إجمالي الإيرادات',
    'owner.companiesOverview': 'نظرة عامة على الشركات',
    'owner.addCompany': '+ إضافة شركة',
    
    // Manager
    'manager.dashboard': 'لوحة تحكم المدير',
    'manager.addTeacher': '+ مدرب',
    'manager.addStudent': '+ طالب',
    'manager.classesToday': 'حصص اليوم',
    'manager.licenseExpiry': 'الرخصة تنتهي قريباً',
    'manager.licenseExpiryWarning': 'تحذيرات انتهاء الرخصة',
    'manager.todaysSchedule': 'جدول اليوم',
    'manager.viewAll': '← عرض الكل',
    'manager.manage': '← إدارة',
    'manager.noClasses': 'لا توجد حصص مجدولة لهذا اليوم',
    'manager.license': 'الرخصة',
    'manager.expiresIn': 'تنتهي خلال',
    'manager.days': 'أيام',
    'manager.markRenewed': 'تحديد كمجددة',
    
    // Teacher
    'teacher.welcome': 'مرحباً',
    'teacher.myStudents': 'طلابي',
    'teacher.classesToday': 'حصص اليوم',
    'teacher.myRating': 'تقييمي',
    'teacher.pendingRatings': 'تقييمات معلقة',
    'teacher.startClass': 'بدء الحصة',
    'teacher.endClass': 'إنهاء الحصة',
    'teacher.licenseExpires': 'رخصتك تنتهي خلال',
    'teacher.contactManager': 'يرجى التواصل مع مديرك لتجديد الرخصة',
    'teacher.noClasses': 'لا توجد حصص مجدولة لهذا اليوم 🎉',
    
    // Student
    'student.yourProgress': 'تقدمك',
    'student.classes': 'الحصص',
    'student.upcomingClasses': 'الحصص القادمة',
    'student.totalPaid': 'إجمالي المدفوع',
    'student.yourRating': 'تقييمك',
    'student.myInstructor': 'مدربي',
    'student.contactInstructor': '📞 تواصل مع المدرب',
    'student.specializations': 'التخصصات',
    'student.certificateReady': 'شهادتك جاهزة!',
    'student.downloadCertificate': 'تحميل الشهادة',
    'student.congratulations': 'تهانينا على إكمال تدريبك',
    'student.started': 'بدأ',
    'student.expected': 'المتوقع',
    
    // Status
    'status.notStarted': 'لم يبدأ',
    'status.inProgress': 'قيد التنفيذ',
    'status.readyForTest': 'جاهز للاختبار',
    'status.completed': 'مكتمل',
    'status.scheduled': 'مجدول',
    'status.cancelled': 'ملغي',
    
    // Progress messages
    'progress.notStarted': 'دروسك تبدأ قريباً!',
    'progress.inProgress': 'استمر في العمل الرائع!',
    'progress.readyForTest': 'أنت جاهز للاختبار!',
    'progress.completed': 'تهانينا!',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
