'use client';

import { companies, teachers, students, payments } from '@/data/mock';

export default function OwnerDashboard() {
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeStudents = students.filter(s => s.progressStatus === 'in_progress').length;

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6 lg:mb-8">Owner Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon="🏢"
          label="Companies"
          value={companies.length}
          color="purple"
        />
        <StatCard
          icon="👨‍🏫"
          label="Total Teachers"
          value={teachers.length}
          color="blue"
        />
        <StatCard
          icon="🎓"
          label="Active Students"
          value={activeStudents}
          color="green"
        />
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          color="amber"
        />
      </div>

      {/* Companies Overview */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Companies Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Company</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Teachers</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Students</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {companies.map((company) => {
                const companyTeachers = teachers.filter(t => t.companyId === company.id);
                const companyStudents = students.filter(s => s.companyId === company.id);
                const companyRevenue = payments
                  .filter(p => p.companyId === company.id)
                  .reduce((sum, p) => sum + p.amount, 0);

                return (
                  <tr key={company.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: company.primaryColor }}
                        />
                        <div>
                          <p className="font-medium text-slate-800">{company.name}</p>
                          <p className="text-sm text-slate-500">{company.slug}.drivingschool.app</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{companyTeachers.length}</td>
                    <td className="px-6 py-4 text-slate-600">{companyStudents.length}</td>
                    <td className="px-6 py-4 text-slate-600">${companyRevenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        company.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {company.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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
    <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 p-4 lg:p-6">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-xl lg:text-2xl mb-3 lg:mb-4`}>
        {icon}
      </div>
      <p className="text-xs lg:text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-xl lg:text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
