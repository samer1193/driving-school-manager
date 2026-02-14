'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Company } from '@/types';
import { owner, managers, teachers, students, companies } from '@/data/mock';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (role: UserRole, companyId?: string, userId?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  const login = (role: UserRole, companyId?: string, userId?: string) => {
    let selectedUser: User | null = null;
    let selectedCompany: Company | null = null;

    switch (role) {
      case 'owner':
        selectedUser = owner;
        break;
      case 'manager':
        selectedUser = userId 
          ? managers.find(m => m.id === userId) || managers.find(m => m.companyId === companyId) || managers[0]
          : managers.find(m => m.companyId === companyId) || managers[0];
        break;
      case 'teacher':
        selectedUser = userId
          ? teachers.find(t => t.id === userId) || teachers.find(t => t.companyId === companyId) || teachers[0]
          : teachers.find(t => t.companyId === companyId) || teachers[0];
        break;
      case 'student':
        selectedUser = userId
          ? students.find(s => s.id === userId) || students.find(s => s.companyId === companyId) || students[0]
          : students.find(s => s.companyId === companyId) || students[0];
        break;
    }

    if (selectedUser?.companyId) {
      selectedCompany = companies.find(c => c.id === selectedUser!.companyId) || null;
    }

    setUser(selectedUser);
    setCompany(selectedCompany);
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
