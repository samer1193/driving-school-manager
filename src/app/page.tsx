'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { companies, managers, teachers, students } from '@/data/mock';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);

  const handleLogin = (role: 'owner' | 'manager' | 'teacher' | 'student') => {
    login(role, selectedCompany);
    router.push(`/${role}`);
  };

  const companyTeachers = teachers.filter(t => t.companyId === selectedCompany);
  const companyStudents = students.filter(s => s.companyId === selectedCompany);
  const companyManager = managers.find(m => m.companyId === selectedCompany);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            🚗 Driving School Manager
          </h1>
          <p className="text-slate-400 text-base lg:text-lg">
            White-label multi-company driving school management system
          </p>
          <p className="text-slate-500 mt-2 text-sm lg:text-base">
            Demo Mode — Select a role to explore
          </p>
        </div>

        {/* Company Selector */}
        <div className="bg-slate-800/50 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 backdrop-blur">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Select Company
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(company.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedCompany === company.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full mb-2"
                  style={{ backgroundColor: company.primaryColor }}
                />
                <h3 className="text-white font-medium">{company.name}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {teachers.filter(t => t.companyId === company.id).length} teachers •{' '}
                  {students.filter(s => s.companyId === company.id).length} students
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {/* Owner */}
          <button
            onClick={() => handleLogin('owner')}
            className="group bg-gradient-to-br from-purple-600 to-indigo-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left hover:scale-105 transition-transform"
          >
            <div className="text-3xl lg:text-4xl mb-2 lg:mb-4">👑</div>
            <h2 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">Owner</h2>
            <p className="text-purple-100 text-xs lg:text-sm hidden sm:block">
              Manage all companies
            </p>
            <div className="mt-2 lg:mt-4 text-purple-200 text-xs">
              {companies.length} companies
            </div>
          </button>

          {/* Manager */}
          <button
            onClick={() => handleLogin('manager')}
            className="group bg-gradient-to-br from-blue-600 to-cyan-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left hover:scale-105 transition-transform"
          >
            <div className="text-3xl lg:text-4xl mb-2 lg:mb-4">💼</div>
            <h2 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">Manager</h2>
            <p className="text-blue-100 text-xs lg:text-sm hidden sm:block">
              {companyManager?.name || 'Company manager'}
            </p>
            <div className="mt-2 lg:mt-4 text-blue-200 text-xs">
              {companyTeachers.length} teachers
            </div>
          </button>

          {/* Teacher */}
          <button
            onClick={() => handleLogin('teacher')}
            className="group bg-gradient-to-br from-green-600 to-emerald-600 p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left hover:scale-105 transition-transform"
          >
            <div className="text-3xl lg:text-4xl mb-2 lg:mb-4">👨‍🏫</div>
            <h2 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">Teacher</h2>
            <p className="text-green-100 text-xs lg:text-sm hidden sm:block">
              {companyTeachers[0]?.name || 'Instructor'}
            </p>
            <div className="mt-2 lg:mt-4 text-green-200 text-xs">
              {students.filter(s => s.teacherId === companyTeachers[0]?.id).length} students
            </div>
          </button>

          {/* Student */}
          <button
            onClick={() => handleLogin('student')}
            className="group bg-gradient-to-br from-orange-500 to-amber-500 p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left hover:scale-105 transition-transform"
          >
            <div className="text-3xl lg:text-4xl mb-2 lg:mb-4">🎓</div>
            <h2 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">Student</h2>
            <p className="text-orange-100 text-xs lg:text-sm hidden sm:block">
              {companyStudents[0]?.name || 'Learner'}
            </p>
            <div className="mt-2 lg:mt-4 text-orange-200 text-xs">
              View progress
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 lg:mt-12 hidden sm:grid grid-cols-4 gap-4 text-center">
          {[
            { icon: '🏢', label: 'Multi-Company' },
            { icon: '👥', label: 'Role-Based Access' },
            { icon: '📅', label: 'Scheduling' },
            { icon: '💰', label: 'Payments' },
          ].map((feature) => (
            <div key={feature.label} className="text-slate-400">
              <span className="text-2xl">{feature.icon}</span>
              <p className="text-sm mt-1">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
