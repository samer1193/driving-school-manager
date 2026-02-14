'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, company, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const ownerLinks = [
    { href: '/owner', label: t('common.dashboard'), icon: '📊' },
    { href: '/owner/companies', label: t('common.companies'), icon: '🏢' },
  ];

  const managerLinks = [
    { href: '/manager', label: t('common.dashboard'), icon: '📊' },
    { href: '/manager/teachers', label: t('common.teachers'), icon: '👨‍🏫' },
    { href: '/manager/students', label: t('common.students'), icon: '🎓' },
    { href: '/manager/schedule', label: t('common.schedule'), icon: '📅' },
    { href: '/manager/payments', label: t('common.payments'), icon: '💰' },
  ];

  const teacherLinks = [
    { href: '/teacher', label: t('common.dashboard'), icon: '📊' },
    { href: '/teacher/students', label: t('common.myStudents'), icon: '🎓' },
    { href: '/teacher/schedule', label: t('common.schedule'), icon: '📅' },
  ];

  const studentLinks = [
    { href: '/student', label: t('common.dashboard'), icon: '📊' },
    { href: '/student/schedule', label: t('common.mySchedule'), icon: '📅' },
    { href: '/student/progress', label: t('common.progress'), icon: '📈' },
    { href: '/student/payments', label: t('common.payments'), icon: '💰' },
  ];

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

  const portalNames = {
    owner: t('role.ownerPortal'),
    manager: t('role.managerPortal'),
    teacher: t('role.teacherPortal'),
    student: t('role.studentPortal'),
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-white hover:bg-slate-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-white font-semibold text-sm">
              {company?.name || t('app.name')}
            </h1>
            <p className="text-slate-400 text-xs">{portalNames[user.role]}</p>
          </div>
          <LanguageToggle variant="compact" />
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 z-50
        w-64 bg-slate-900 min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isRTL ? 'right-0' : 'left-0'}
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className={`lg:hidden absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 text-slate-400 hover:text-white`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Company/App Header */}
        <div className={`p-6 bg-gradient-to-r ${roleColors[user.role]}`}>
          <h1 className="text-xl font-bold text-white">
            {company?.name || t('app.name')}
          </h1>
          <p className="text-sm text-white/80 mt-1">
            {portalNames[user.role]}
          </p>
        </div>

        {/* Language Toggle (Desktop) */}
        <div className="hidden lg:block p-4 border-b border-slate-700">
          <LanguageToggle />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
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
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {t('common.switchRole')}
          </button>
        </div>
      </aside>
    </>
  );
}
