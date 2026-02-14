'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ownerLinks = [
  { href: '/owner', label: 'Dashboard', icon: '📊' },
  { href: '/owner/companies', label: 'Companies', icon: '🏢' },
];

const managerLinks = [
  { href: '/manager', label: 'Dashboard', icon: '📊' },
  { href: '/manager/teachers', label: 'Teachers', icon: '👨‍🏫' },
  { href: '/manager/students', label: 'Students', icon: '🎓' },
  { href: '/manager/schedule', label: 'Schedule', icon: '📅' },
  { href: '/manager/payments', label: 'Payments', icon: '💰' },
];

const teacherLinks = [
  { href: '/teacher', label: 'Dashboard', icon: '📊' },
  { href: '/teacher/students', label: 'My Students', icon: '🎓' },
  { href: '/teacher/schedule', label: 'Schedule', icon: '📅' },
  { href: '/teacher/classes', label: 'Classes', icon: '🚗' },
];

const studentLinks = [
  { href: '/student', label: 'Dashboard', icon: '📊' },
  { href: '/student/schedule', label: 'My Schedule', icon: '📅' },
  { href: '/student/progress', label: 'Progress', icon: '📈' },
  { href: '/student/payments', label: 'Payments', icon: '💰' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, company, logout } = useAuth();

  if (!user) return null;

  const links = {
    owner: ownerLinks,
    manager: managerLinks,
    teacher: teacherLinks,
    student: studentLinks,
  }[user.role];

  const roleColors = {
    owner: 'from-purple-600 to-indigo-600',
    manager: 'from-blue-600 to-cyan-600',
    teacher: 'from-green-600 to-emerald-600',
    student: 'from-orange-500 to-amber-500',
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col">
      {/* Company/App Header */}
      <div className={`p-6 bg-gradient-to-r ${roleColors[user.role]}`}>
        <h1 className="text-xl font-bold text-white">
          {company?.name || 'Driving Schools'}
        </h1>
        <p className="text-sm text-white/80 capitalize mt-1">
          {user.role} Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          ← Switch Role / Logout
        </button>
      </div>
    </aside>
  );
}
