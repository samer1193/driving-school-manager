'use client';

import { useAuth } from '@/context/AuthContext';
import { getClassesByTeacher, getStudentsByTeacher } from '@/data/mock';

export default function TeacherSchedulePage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const myClasses = getClassesByTeacher(user.id);
  const myStudents = getStudentsByTeacher(user.id);

  // Group by date
  const upcomingClasses = myClasses
    .filter(c => c.scheduledAt > new Date() || c.status === 'scheduled')
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Schedule</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {upcomingClasses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-slate-500">No upcoming classes scheduled</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcomingClasses.map(session => {
              const student = myStudents.find(s => s.id === session.studentId);
              const isToday = session.scheduledAt.toDateString() === new Date().toDateString();

              return (
                <div key={session.id} className={`p-4 ${isToday ? 'bg-green-50' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                      isToday ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <span className="text-xs font-medium">
                        {session.scheduledAt.toLocaleDateString([], { weekday: 'short' }).toUpperCase()}
                      </span>
                      <span className="text-xl font-bold">{session.scheduledAt.getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{student?.name}</p>
                      <p className="text-sm text-slate-500">
                        {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {session.duration} min
                      </p>
                      <p className="text-sm text-slate-500">{session.location}</p>
                    </div>
                    {isToday && session.status === 'scheduled' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Start Class
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
