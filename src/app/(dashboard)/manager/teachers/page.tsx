'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getTeachersByCompany, students } from '@/data/mock';

export default function ManagerTeachersPage() {
  const { company } = useAuth();
  
  if (!company) return null;

  const companyTeachers = getTeachersByCompany(company.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Teachers</h1>
          <p className="text-slate-500 mt-1">{companyTeachers.length} instructors at {company.name}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyTeachers.map(teacher => {
          const teacherStudents = students.filter(s => s.teacherId === teacher.id);
          const daysUntilExpiry = Math.ceil((teacher.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          const isExpiringSoon = daysUntilExpiry <= 30;

          return (
            <Link 
              key={teacher.id}
              href={`/manager/teachers/${teacher.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl font-medium">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{teacher.name}</h3>
                  <p className="text-sm text-slate-500">{teacher.email}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-slate-800">{teacherStudents.length}</p>
                  <p className="text-xs text-slate-500">Students</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-slate-800">⭐ {teacher.averageRating.toFixed(1)}</p>
                  <p className="text-xs text-slate-500">Rating</p>
                </div>
              </div>

              {/* License Info */}
              <div className={`rounded-lg p-3 ${isExpiringSoon ? 'bg-red-50 border border-red-200' : 'bg-slate-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">License #{teacher.licenseNumber}</p>
                    <p className={`text-sm font-medium ${isExpiringSoon ? 'text-red-600' : 'text-slate-700'}`}>
                      Expires: {teacher.licenseExpiration.toLocaleDateString()}
                    </p>
                  </div>
                  {isExpiringSoon && (
                    <span className="text-xl">⚠️</span>
                  )}
                </div>
              </div>

              {/* Specializations */}
              {teacher.specializations && teacher.specializations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {teacher.specializations.map(spec => (
                    <span 
                      key={spec}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
