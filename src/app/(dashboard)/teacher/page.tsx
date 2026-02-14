'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { teachers, getStudentsByTeacher, getClassesByTeacher } from '@/data/mock';
import { Teacher } from '@/types';

export default function TeacherDashboard() {
  const { user, company } = useAuth();
  
  if (!user || !company) return null;

  const teacher = teachers.find(t => t.id === user.id) as Teacher;
  const myStudents = getStudentsByTeacher(user.id);
  const myClasses = getClassesByTeacher(user.id);

  // Today's classes
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todaysClasses = myClasses.filter(c => 
    c.scheduledAt >= today && c.scheduledAt < tomorrow
  ).sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  const activeStudents = myStudents.filter(s => s.progressStatus === 'in_progress');
  const pendingRatings = myClasses.filter(c => c.status === 'completed' && !c.teacherRating).length;

  // License info
  const daysUntilExpiry = Math.ceil((teacher.licenseExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Welcome, {teacher.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 mt-1">{company.name}</p>
      </div>

      {/* License Warning */}
      {daysUntilExpiry <= 60 && (
        <div className={`p-4 rounded-xl mb-6 ${daysUntilExpiry <= 30 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className={`font-medium ${daysUntilExpiry <= 30 ? 'text-red-800' : 'text-amber-800'}`}>
                Your license expires in {daysUntilExpiry} days
              </p>
              <p className={`text-sm ${daysUntilExpiry <= 30 ? 'text-red-600' : 'text-amber-600'}`}>
                Please contact your manager to renew license #{teacher.licenseNumber}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon="🎓"
          label="My Students"
          value={myStudents.length}
          subtext={`${activeStudents.length} active`}
          color="blue"
        />
        <StatCard
          icon="📅"
          label="Classes Today"
          value={todaysClasses.length}
          color="green"
        />
        <StatCard
          icon="⭐"
          label="My Rating"
          value={teacher.averageRating.toFixed(1)}
          color="amber"
        />
        <StatCard
          icon="📝"
          label="Pending Ratings"
          value={pendingRatings}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Today&apos;s Schedule</h2>
            <Link href="/teacher/schedule" className="text-sm text-blue-600 hover:text-blue-700">
              Full Schedule →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {todaysClasses.length === 0 ? (
              <p className="p-6 text-slate-500 text-center">No classes scheduled for today 🎉</p>
            ) : (
              todaysClasses.map(session => {
                const student = myStudents.find(s => s.id === session.studentId);
                const isPast = session.scheduledAt < new Date();
                
                return (
                  <div key={session.id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-800">
                            {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-xs text-slate-500">{session.duration} min</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{student?.name}</p>
                          <p className="text-sm text-slate-500">{session.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.status === 'scheduled' && !isPast && (
                          <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                            Start Class
                          </button>
                        )}
                        {session.status === 'in_progress' && (
                          <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                            End Class
                          </button>
                        )}
                        {session.status === 'completed' && (
                          <span className="text-green-600 text-sm">✓ Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* My Students */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">My Students</h2>
            <Link href="/teacher/students" className="text-sm text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {myStudents.slice(0, 5).map(student => {
              const progressPercent = student.totalClassesScheduled > 0
                ? Math.round((student.totalClassesCompleted / student.totalClassesScheduled) * 100)
                : 0;

              return (
                <Link 
                  key={student.id}
                  href={`/teacher/students/${student.id}`}
                  className="p-4 flex items-center gap-4 hover:bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-medium text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{student.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{progressPercent}%</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.progressStatus === 'ready_for_test' ? 'bg-green-100 text-green-700' :
                    student.progressStatus === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {student.progressStatus.replace(/_/g, ' ')}
                  </span>
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
