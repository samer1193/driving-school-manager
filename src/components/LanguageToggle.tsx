'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors"
      >
        {language === 'en' ? 'عربي' : 'EN'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-white text-slate-900'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'ar'
            ? 'bg-white text-slate-900'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        عربي
      </button>
    </div>
  );
}
