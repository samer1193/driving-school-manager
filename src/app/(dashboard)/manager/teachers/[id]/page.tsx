'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { teachers, getStudentsByTeacher, getClassesByTeacher, payments } from '@/data/mock';

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

export default function TeacherDetailPage() {
  const params = useParams();
  const teacherId = params.id as string;
  
  const teacher = teachers.find(t => t.id === teacherId);
  const teacherStudents = getStudentsByTeacher(teacherId);
  const teacherClasses = getClassesByTeacher(teacherId);

  if (!teacher) {
    return <div className="p-8">Teacher not found</div>;
  }

  const daysUntilExpiry = Math.ceil((teacher.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const completedClasses = teacherClasses.filter(c => c.status === 'completed').length;

  return (
    <div>
      {/* Back Link */}
      <Link href="/manager/teachers" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
        ← Back to Teachers
      </Link>

      {/* Teacher Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-medium">
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">{teacher.name}</h1>
            <p className="text-slate-500">{teacher.email}</p>
            <p className="text-slate-500">{teacher.phone}</p>
            
            {/* Specializations */}
            <div className="mt-3 flex flex-wrap gap-2">
              {teacher.specializations?.map(spec => (
                <span key={spec} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">{teacherStudents.length}</p>
              <p className="text-sm text-slate-500">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">{completedClasses}</p>
              <p className="text-sm text-slate-500">Classes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">⭐ {teacher.averageRating.toFixed(1)}</p>
              <p className="text-sm text-slate-500">Rating</p>
            </div>
          </div>
        </div>

        {/* License Warning */}
        {daysUntilExpiry <= 60 && (
          <div className={`mt-6 p-4 rounded-xl ${daysUntilExpiry <= 30 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className={`font-medium ${daysUntilExpiry <= 30 ? 'text-red-800' : 'text-amber-800'}`}>
                  License Expiring {daysUntilExpiry <= 30 ? 'Soon!' : 'in ' + daysUntilExpiry + ' days'}
                </p>
                <p className={`text-sm ${daysUntilExpiry <= 30 ? 'text-red-600' : 'text-amber-600'}`}>
                  License #{teacher.licenseNumber} expires on {teacher.licenseExpiration.toLocaleDateString()}
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                Mark as Renewed
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Students List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Students ({teacherStudents.length})</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            + Assign Student
          </button>
        </div>
        
        {teacherStudents.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No students assigned to this teacher</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Payments</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherStudents.map(student => {
                  const studentPayments = payments.filter(p => p.studentId === student.id);
                  const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
                  const progressPercent = student.totalClassesScheduled > 0
                    ? Math.round((student.totalClassesCompleted / student.totalClassesScheduled) * 100)
                    : 0;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-medium text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[student.progressStatus]}`}>
                          {statusLabels[student.progressStatus]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">
                            {student.totalClassesCompleted}/{student.totalClassesScheduled}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {student.averageRating > 0 ? (
                          <span className="text-slate-700">⭐ {student.averageRating.toFixed(1)}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-700 font-medium">${totalPaid}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link 
                          href={`/manager/students/${student.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
