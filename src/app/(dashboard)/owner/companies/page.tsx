'use client';

import { useState } from 'react';
import { companies, teachers, students, payments } from '@/data/mock';

export default function OwnerCompaniesPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Companies</h1>
          <p className="text-slate-500 mt-1">Manage all driving schools in the platform</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => {
          const companyTeachers = teachers.filter(t => t.companyId === company.id);
          const companyStudents = students.filter(s => s.companyId === company.id);
          const companyRevenue = payments
            .filter(p => p.companyId === company.id)
            .reduce((sum, p) => sum + p.amount, 0);
          const activeStudents = companyStudents.filter(s => s.progressStatus === 'in_progress');

          return (
            <div 
              key={company.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header with brand color */}
              <div 
                className="h-24 flex items-end p-4"
                style={{ backgroundColor: company.primaryColor }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    🚗
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{company.name}</h3>
                    <p className="text-white/80 text-sm">{company.slug}.drivingschool.app</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">{companyTeachers.length}</p>
                    <p className="text-xs text-slate-500">Teachers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">{companyStudents.length}</p>
                    <p className="text-xs text-slate-500">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">${companyRevenue}</p>
                    <p className="text-xs text-slate-500">Revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${company.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <span className="text-sm text-slate-600">
                      {company.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Company Card */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-purple-400 hover:text-purple-600 transition-colors min-h-[280px]"
        >
          <span className="text-4xl mb-2">+</span>
          <span className="font-medium">Add New Company</span>
        </button>
      </div>

      {/* Add Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Company</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input 
                  type="text"
                  placeholder="e.g., Express Driving Academy"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
                <div className="flex items-center">
                  <input 
                    type="text"
                    placeholder="express-driving"
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="px-3 py-2 bg-slate-100 border border-l-0 border-slate-200 rounded-r-lg text-slate-500 text-sm">
                    .drivingschool.app
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Brand Color</label>
                <input 
                  type="color"
                  defaultValue="#3B82F6"
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Create Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
