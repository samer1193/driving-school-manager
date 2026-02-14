'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getStudentsByCompany, getTeachersByCompany, payments } from '@/data/mock';

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

export default function ManagerStudentsPage() {
  const { company } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTeacher, setFilterTeacher] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!company) return null;

  const companyStudents = getStudentsByCompany(company.id);
  const companyTeachers = getTeachersByCompany(company.id);

  const filteredStudents = companyStudents.filter(student => {
    const matchesStatus = filterStatus === 'all' || student.progressStatus === filterStatus;
    const matchesTeacher = filterTeacher === 'all' || student.teacherId === filterTeacher;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesTeacher && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500 mt-1">{companyStudents.length} students at {company.name}</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="ready_for_test">Ready for Test</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Teachers</option>
            {companyTeachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Student</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Teacher</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Paid</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No students found matching your filters
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const teacher = companyTeachers.find(t => t.id === student.teacherId);
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
                            <p className="text-sm text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700">{teacher?.name || '—'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[student.progressStatus]}`}>
                          {statusLabels[student.progressStatus]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-20">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 w-16">
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
