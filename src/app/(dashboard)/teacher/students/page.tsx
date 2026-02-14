'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getStudentsByTeacher, getClassesByStudent, payments } from '@/data/mock';

const statusColors = {
  not_started: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-blue-100 text-blue-700',
  ready_for_test: 'bg-green-100 text-green-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

const statusLabels = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  ready_for_test: 'Ready for Test',
  completed: 'Completed',
};

export default function TeacherStudentsPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const myStudents = getStudentsByTeacher(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Students</h1>
          <p className="text-slate-500 mt-1">{myStudents.length} students assigned to you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myStudents.map(student => {
          const studentClasses = getClassesByStudent(student.id);
          const studentPayments = payments.filter(p => p.studentId === student.id);
          const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
          const progressPercent = student.totalClassesScheduled > 0
            ? Math.round((student.totalClassesCompleted / student.totalClassesScheduled) * 100)
            : 0;
          
          const upcomingClasses = studentClasses.filter(c => 
            c.scheduledAt > new Date() && c.status === 'scheduled'
          ).length;

          return (
            <Link 
              key={student.id}
              href={`/teacher/students/${student.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xl font-medium">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{student.name}</h3>
                  <p className="text-sm text-slate-500">{student.phone}</p>
                  <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[student.progressStatus]}`}>
                    {statusLabels[student.progressStatus]}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-500">Progress</span>
                  <span className="text-sm font-medium text-slate-700">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {student.totalClassesCompleted} of {student.totalClassesScheduled} classes completed
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">{upcomingClasses}</p>
                  <p className="text-xs text-slate-500">Upcoming</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">
                    {student.averageRating > 0 ? `⭐ ${student.averageRating.toFixed(1)}` : '—'}
                  </p>
                  <p className="text-xs text-slate-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">${totalPaid}</p>
                  <p className="text-xs text-slate-500">Paid</p>
                </div>
              </div>

              {/* Notes Preview */}
              {student.notes && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Notes</p>
                  <p className="text-sm text-slate-700 line-clamp-2">{student.notes}</p>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {myStudents.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-4xl mb-3">🎓</p>
          <p className="text-slate-500">No students assigned to you yet</p>
        </div>
      )}
    </div>
  );
}
