'use client';

import { useAuth } from '@/context/AuthContext';
import { getClassesByStudent, teachers } from '@/data/mock';

export default function StudentSchedulePage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const myClasses = getClassesByStudent(user.id);

  const upcomingClasses = myClasses
    .filter(c => c.status === 'scheduled')
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  const pastClasses = myClasses
    .filter(c => c.status === 'completed')
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Schedule</h1>

      {/* Upcoming */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Classes</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {upcomingClasses.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No upcoming classes</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcomingClasses.map(session => {
                const teacher = teachers.find(t => t.id === session.teacherId);
                const isToday = session.scheduledAt.toDateString() === new Date().toDateString();

                return (
                  <div key={session.id} className={`p-4 ${isToday ? 'bg-green-50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                        isToday ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <span className="text-xs font-medium">
                          {isToday ? 'TODAY' : session.scheduledAt.toLocaleDateString([], { weekday: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-xl font-bold">{session.scheduledAt.getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-slate-500">
                          {session.duration} min with {teacher?.name}
                        </p>
                        <p className="text-sm text-slate-500">{session.location}</p>
                      </div>
                      {isToday && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Today
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Past Classes */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Past Classes</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {pastClasses.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No past classes yet</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pastClasses.map(session => {
                const teacher = teachers.find(t => t.id === session.teacherId);

                return (
                  <div key={session.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-500">
                        <span className="text-xs font-medium">
                          {session.scheduledAt.toLocaleDateString([], { weekday: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-xl font-bold">{session.scheduledAt.getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-slate-500">with {teacher?.name}</p>
                      </div>
                      <div className="text-right">
                        {session.studentRating ? (
                          <span className="text-amber-500">{'⭐'.repeat(session.studentRating)}</span>
                        ) : (
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Rate Class
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
