'use client';

import { useAuth } from '@/context/AuthContext';
import { getPaymentsByStudent } from '@/data/mock';

export default function StudentPaymentsPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const myPayments = getPaymentsByStudent(user.id);
  const totalPaid = myPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Payments</h1>

      {/* Summary */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 mb-1">Total Paid</p>
            <p className="text-4xl font-bold">${totalPaid.toLocaleString()}</p>
          </div>
          <div className="text-6xl opacity-20">💰</div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Payment History</h2>
        </div>
        
        {myPayments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">💳</p>
            <p className="text-slate-500">No payments recorded yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myPayments
              .sort((a, b) => b.paidAt.getTime() - a.paidAt.getTime())
              .map(payment => (
                <div key={payment.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-xl">
                        ✓
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{payment.description}</p>
                        <p className="text-sm text-slate-500">
                          {payment.paidAt.toLocaleDateString([], { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-800">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-500">{payment.currency}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <p className="text-sm text-blue-700">
            Payments are recorded by your instructor or manager. If you believe there&apos;s an error,
            please contact your driving school directly.
          </p>
        </div>
      </div>
    </div>
  );
}
