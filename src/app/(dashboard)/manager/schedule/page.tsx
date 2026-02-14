'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { classSessions, getTeachersByCompany, getStudentsByCompany } from '@/data/mock';

export default function ManagerSchedulePage() {
  const { company } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  if (!company) return null;

  const companyTeachers = getTeachersByCompany(company.id);
  const companyStudents = getStudentsByCompany(company.id);
  
  const companySessions = classSessions.filter(c => c.companyId === company.id);

  // Get sessions for selected date
  const selectedDateStart = new Date(selectedDate);
  selectedDateStart.setHours(0, 0, 0, 0);
  const selectedDateEnd = new Date(selectedDate);
  selectedDateEnd.setHours(23, 59, 59, 999);

  const daysSessions = companySessions
    .filter(c => c.scheduledAt >= selectedDateStart && c.scheduledAt <= selectedDateEnd)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  // Generate week days
  const weekDays = [];
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    weekDays.push(day);
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Schedule</h1>
          <p className="text-slate-500 mt-1">Manage class schedules for {company.name}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Schedule Class
        </button>
      </div>

      {/* Week Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() - 7);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            ← Previous Week
          </button>
          <h2 className="text-lg font-semibold text-slate-800">
            {weekDays[0].toLocaleDateString([], { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() + 7);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            Next Week →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const daySessions = companySessions.filter(c => 
              c.scheduledAt.toDateString() === day.toDateString()
            );

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`p-3 rounded-xl text-center transition-all ${
                  isSelected(day)
                    ? 'bg-blue-600 text-white'
                    : isToday(day)
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                    : 'hover:bg-slate-50'
                }`}
              >
                <p className="text-xs font-medium mb-1">
                  {day.toLocaleDateString([], { weekday: 'short' })}
                </p>
                <p className="text-lg font-bold">{day.getDate()}</p>
                {daySessions.length > 0 && (
                  <div className={`mt-1 text-xs ${isSelected(day) ? 'text-blue-100' : 'text-slate-500'}`}>
                    {daySessions.length} class{daySessions.length !== 1 ? 'es' : ''}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Schedule */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            {selectedDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <p className="text-slate-500 text-sm">
            {daysSessions.length} class{daysSessions.length !== 1 ? 'es' : ''} scheduled
          </p>
        </div>

        {daysSessions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-slate-500">No classes scheduled for this day</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Schedule a Class
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {daysSessions.map(session => {
              const teacher = companyTeachers.find(t => t.id === session.teacherId);
              const student = companyStudents.find(s => s.id === session.studentId);

              return (
                <div key={session.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-center">
                      <p className="text-lg font-bold text-slate-800">
                        {session.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-slate-500">{session.duration} min</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">
                        {student?.name || 'Unknown Student'}
                      </p>
                      <p className="text-sm text-slate-500">
                        with {teacher?.name || 'Unknown Teacher'} • {session.location || 'Location TBD'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === 'completed' ? 'bg-green-100 text-green-700' :
                      session.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      session.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {session.status.replace('_', ' ')}
                    </span>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                      •••
                    </button>
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
