'use client';

import { useAuth } from '@/context/AuthContext';
import { students, teachers, getClassesByStudent } from '@/data/mock';
import { Student } from '@/types';

export default function StudentProgressPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const student = students.find(s => s.id === user.id) as Student;
  const teacher = teachers.find(t => t.id === student.teacherId);
  const myClasses = getClassesByStudent(user.id);
  
  const completedClasses = myClasses.filter(c => c.status === 'completed');
  const progressPercent = student.totalClassesScheduled > 0
    ? Math.round((student.totalClassesCompleted / student.totalClassesScheduled) * 100)
    : 0;

  const milestones = [
    { name: 'First Class', completed: completedClasses.length >= 1, icon: '🚗' },
    { name: '5 Classes', completed: completedClasses.length >= 5, icon: '🎯' },
    { name: 'Halfway There', completed: progressPercent >= 50, icon: '⚡' },
    { name: 'Almost Done', completed: progressPercent >= 90, icon: '🏁' },
    { name: 'Ready for Test', completed: student.progressStatus === 'ready_for_test' || student.progressStatus === 'completed', icon: '🎓' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Progress</h1>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 mb-1">Overall Progress</p>
            <p className="text-5xl font-bold">{progressPercent}%</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 mb-1">Classes Completed</p>
            <p className="text-3xl font-bold">{student.totalClassesCompleted} / {student.totalClassesScheduled}</p>
          </div>
        </div>
        <div className="h-4 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Milestones</h2>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  milestone.completed ? 'bg-green-50' : 'bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  milestone.completed ? 'bg-green-100' : 'bg-slate-200'
                }`}>
                  {milestone.completed ? '✓' : milestone.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${milestone.completed ? 'text-green-700' : 'text-slate-600'}`}>
                    {milestone.name}
                  </p>
                </div>
                {milestone.completed && (
                  <span className="text-green-600 text-sm font-medium">Completed!</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Statistics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="text-slate-700">Started Training</span>
              </div>
              <span className="font-medium text-slate-800">
                {student.startDate.toLocaleDateString()}
              </span>
            </div>

            {student.expectedEndDate && (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-slate-700">Expected Completion</span>
                </div>
                <span className="font-medium text-slate-800">
                  {student.expectedEndDate.toLocaleDateString()}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-slate-700">Your Rating</span>
              </div>
              <span className="font-medium text-slate-800">
                {student.averageRating > 0 ? `${student.averageRating.toFixed(1)} / 5` : 'Not rated yet'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍🏫</span>
                <span className="text-slate-700">Instructor</span>
              </div>
              <span className="font-medium text-slate-800">{teacher?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate */}
      {student.certificateUrl && (
        <div className="mt-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎓</span>
              <div>
                <h3 className="text-xl font-bold">Certificate Available!</h3>
                <p className="text-green-100">Your training certificate is ready for download</p>
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
