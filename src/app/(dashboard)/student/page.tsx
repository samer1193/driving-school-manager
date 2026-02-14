'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { students, teachers, getClassesByStudent, getPaymentsByStudent } from '@/data/mock';
import { Student } from '@/types';

export default function StudentDashboard() {
  const { user, company } = useAuth();
  
  if (!user || !company) return null;

  const student = students.find(s => s.id === user.id) as Student;
  const teacher = teachers.find(t => t.id === student.teacherId);
  const myClasses = getClassesByStudent(user.id);
  const myPayments = getPaymentsByStudent(user.id);

  // Upcoming classes
  const now = new Date();
  const upcomingClasses = myClasses
    .filter(c => c.scheduledAt > now && c.status === 'scheduled')
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
    .slice(0, 3);

  const completedClasses = myClasses.filter(c => c.status === 'completed');
  const totalPaid = myPayments.reduce((sum, p) => sum + p.amount, 0);
  const progressPercent = student.totalClassesScheduled > 0
    ? Math.round((student.totalClassesCompleted / student.totalClassesScheduled) * 100)
    : 0;

  const statusMessages = {
    not_started: { text: 'Your lessons start soon!', emoji: '🚀' },
    in_progress: { text: 'Keep up the great work!', emoji: '💪' },
    ready_for_test: { text: 'You\'re ready for your test!', emoji: '🎉' },
    completed: { text: 'Congratulations!', emoji: '🏆' },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {statusMessages[student.progressStatus].emoji} {statusMessages[student.progressStatus].text}
          </h1>
          <p className="text-slate-500 mt-1">Welcome back, {student.name.split(' ')[0]}</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Your Progress</p>
            <p className="text-4xl font-bold">{progressPercent}%</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Classes</p>
            <p className="text-2xl font-bold">{student.totalClassesCompleted} / {student.totalClassesScheduled}</p>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-blue-100">Started: {student.startDate.toLocaleDateString()}</span>
          {student.expectedEndDate && (
            <span className="text-blue-100">Expected: {student.expectedEndDate.toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="📅"
          label="Upcoming Classes"
          value={upcomingClasses.length}
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Completed"
          value={completedClasses.length}
          color="green"
        />
        <StatCard
          icon="⭐"
          label="Your Rating"
          value={student.averageRating > 0 ? student.averageRating.toFixed(1) : '—'}
          color="amber"
        />
        <StatCard
          icon="💰"
          label="Total Paid"
          value={`$${totalPaid}`}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Upcoming Classes</h2>
            <Link href="/student/schedule" className="text-sm text-blue-600 hover:text-blue-700">
              Full Schedule →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {upcomingClasses.length === 0 ? (
              <p className="p-6 text-slate-500 text-center">No upcoming classes scheduled</p>
            ) : (
              upcomingClasses.map(session => {
                const isToday = session.scheduledAt.toDateString() === new Date().toDateString();
                const isTomorrow = session.scheduledAt.toDateString() === new Date(Date.now() + 86400000).toDateString();
                
                return (
                  <div key={session.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                        isToday ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <span className="text-xs font-medium">
                          {isToday ? 'TODAY' : isTomorrow ? 'TMR' : session.scheduledAt.toLocaleDateString([], { weekday: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-lg font-bold">
                          {session.scheduledAt.getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-slate-500">
                          {session.duration} min • {session.location || 'Location TBD'}
                        </p>
                      </div>
                      {isToday && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Today
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* My Instructor */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">My Instructor</h2>
          </div>
          {teacher && (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl font-medium">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{teacher.name}</h3>
                  <p className="text-slate-500">{teacher.phone}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-amber-500">⭐</span>
                    <span className="font-medium text-slate-700">{teacher.averageRating.toFixed(1)}</span>
                    <span className="text-slate-400">rating</span>
                  </div>
                </div>
              </div>
              
              {teacher.specializations && (
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specializations.map(spec => (
                      <span key={spec} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full mt-4 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors">
                📞 Contact Instructor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certificate (if ready) */}
      {student.certificateUrl && (
        <div className="mt-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎓</span>
              <div>
                <h3 className="text-xl font-bold">Your Certificate is Ready!</h3>
                <p className="text-green-100">Congratulations on completing your training</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-green-700 rounded-xl font-medium hover:bg-green-50 transition-colors">
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { 
  icon: string; 
  label: string; 
  value: string | number;
  color: 'purple' | 'blue' | 'green' | 'amber';
}) {
  const colors = {
    purple: 'from-purple-500 to-indigo-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
