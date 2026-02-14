'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  teachers, 
  students, 
  payments, 
  getTodaysClasses,
  getTeachersByCompany,
  getStudentsByCompany 
} from '@/data/mock';

export default function ManagerDashboard() {
  const { company } = useAuth();
  
  if (!company) return null;

  const companyTeachers = getTeachersByCompany(company.id);
  const companyStudents = getStudentsByCompany(company.id);
  const todaysClasses = getTodaysClasses(company.id);
  const companyRevenue = payments
    .filter(p => p.companyId === company.id)
    .reduce((sum, p) => sum + p.amount, 0);

  // License expiry warnings
  const expiringLicenses = companyTeachers.filter(t => {
    const daysUntilExpiry = Math.ceil((t.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60;
  });

  const activeStudents = companyStudents.filter(s => s.progressStatus === 'in_progress');
  const readyForTest = companyStudents.filter(s => s.progressStatus === 'ready_for_test');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Manager Dashboard</h1>
          <p className="text-slate-500 mt-1">{company.name}</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Link 
            href="/manager/teachers"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base text-center"
          >
            + Teacher
          </Link>
          <Link 
            href="/manager/students"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base text-center"
          >
            + Student
          </Link>
        </div>
      </div>
      
      {/* License Expiry Alert */}
      {expiringLicenses.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-medium text-amber-800">License Expiry Warnings</h3>
              <ul className="mt-2 space-y-1">
                {expiringLicenses.map(teacher => {
                  const daysUntil = Math.ceil((teacher.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <li key={teacher.id} className="text-sm text-amber-700">
                      <strong>{teacher.name}</strong> - License expires in {daysUntil} days
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon="👨‍🏫"
          label="Teachers"
          value={companyTeachers.length}
          color="blue"
        />
        <StatCard
          icon="🎓"
          label="Active Students"
          value={activeStudents.length}
          subtext={`${readyForTest.length} ready for test`}
          color="green"
        />
        <StatCard
          icon="📅"
          label="Classes Today"
          value={todaysClasses.length}
          color="purple"
        />
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={`$${companyRevenue.toLocaleString()}`}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Today&apos;s Schedule</h2>
            <Link href="/manager/schedule" className="text-sm text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {todaysClasses.length === 0 ? (
              <p className="p-6 text-slate-500 text-center">No classes scheduled for today</p>
            ) : (
              todaysClasses.map(session => {
                const teacher = companyTeachers.find(t => t.id === session.teacherId);
                const student = companyStudents.find(s => s.id === session.studentId);
                return (
                  <div key={session.id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-800">
                          {student?.name} with {teacher?.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {session.duration} min
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        session.status === 'completed' ? 'bg-green-100 text-green-800' :
                        session.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {session.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Teachers Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Teachers</h2>
            <Link href="/manager/teachers" className="text-sm text-blue-600 hover:text-blue-700">
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {companyTeachers.map(teacher => {
              const teacherStudents = students.filter(s => s.teacherId === teacher.id);
              return (
                <Link 
                  key={teacher.id} 
                  href={`/manager/teachers/${teacher.id}`}
                  className="p-4 flex items-center gap-4 hover:bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-medium">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{teacher.name}</p>
                    <p className="text-sm text-slate-500">
                      {teacherStudents.length} students • ⭐ {teacher.averageRating.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">License</p>
                    <p className={`text-sm font-medium ${
                      Math.ceil((teacher.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 30
                        ? 'text-red-600'
                        : 'text-slate-600'
                    }`}>
                      {teacher.licenseExpiration.toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, color }: { 
  icon: string; 
  label: string; 
  value: string | number;
  subtext?: string;
  color: 'purple' | 'blue' | 'green' | 'amber';
}) {
  const colors = {
    purple: 'from-purple-500 to-indigo-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 p-4 lg:p-6">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-xl lg:text-2xl mb-3 lg:mb-4`}>
        {icon}
      </div>
      <p className="text-xs lg:text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-xl lg:text-2xl font-bold text-slate-800">{value}</p>
      {subtext && <p className="text-xs text-slate-400 mt-1 hidden sm:block">{subtext}</p>}
    </div>
  );
}
