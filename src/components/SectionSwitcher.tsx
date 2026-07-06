'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface SectionSwitcherProps {
  darkComponent: React.ReactNode;
  lightComponent: React.ReactNode;
}

export default function SectionSwitcher({ darkComponent, lightComponent }: SectionSwitcherProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{theme === 'light' ? lightComponent : darkComponent}</>;
}
