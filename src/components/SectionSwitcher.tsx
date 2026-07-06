'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

interface SectionSwitcherProps {
  darkComponent: React.ReactNode;
  lightComponent: React.ReactNode;
}

export default function SectionSwitcher({ darkComponent, lightComponent }: SectionSwitcherProps) {
  const { theme } = useTheme();

  return <>{theme === 'light' ? lightComponent : darkComponent}</>;
}
