'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const { isRTL, language } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  return <>{children}</>;
}
