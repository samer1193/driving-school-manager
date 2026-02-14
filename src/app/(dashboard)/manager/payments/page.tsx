'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { payments, getStudentsByCompany, getTeachersByCompany } from '@/data/mock';

export default function ManagerPaymentsPage() {
  const { company } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  
  if (!company) return null;

  const companyPayments = payments.filter(p => p.companyId === company.id);
  const companyStudents = getStudentsByCompany(company.id);
  const companyTeachers = getTeachersByCompany(company.id);
  
  const totalRevenue = companyPayments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonthPayments = companyPayments.filter(p => {
    const now = new Date();
    return p.paidAt.getMonth() === now.getMonth() && p.paidAt.getFullYear() === now.getFullYear();
  });
  const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Payments</h1>
          <p className="text-slate-500 mt-1">Track all payments for {company.name}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <p className="text-green-100 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <p className="text-blue-100 mb-1">This Month</p>
          <p className="text-3xl font-bold">${thisMonthRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
          <p className="text-purple-100 mb-1">Total Transactions</p>
          <p className="text-3xl font-bold">{companyPayments.length}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Student</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Recorded By</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-500">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companyPayments
                .sort((a, b) => b.paidAt.getTime() - a.paidAt.getTime())
                .map(payment => {
                  const student = companyStudents.find(s => s.id === payment.studentId);
                  const recorder = [...companyTeachers, ...companyStudents].find(u => u.id === payment.recordedBy);

                  return (
                    <tr key={payment.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-600">
                        {payment.paidAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{student?.name || '—'}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {payment.description}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {recorder?.name || '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-green-600">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Record Payment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select student...</option>
                  {companyStudents.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <div className="flex">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500">
                    $
                  </span>
                  <input 
                    type="number"
                    placeholder="0.00"
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input 
                  type="text"
                  placeholder="e.g., Session 1-4 payment"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
