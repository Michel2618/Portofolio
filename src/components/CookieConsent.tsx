'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from './UserProvider';
import { Alert, AlertContent, AlertTitle, AlertDescription } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { X } from "lucide-react"

export default function CookieConsent() {
  const { hasConsented, acceptCookies } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add a slight delay for the entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || hasConsented) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      transform: isVisible ? 'translateY(0)' : 'translateY(150%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <Alert
        layout="complex"
        isNotification
        size="lg"
        action={
          <Button
            variant="ghost"
            size="icon"
            onClick={acceptCookies}
            aria-label="Close notification"
            style={{ width: '28px', height: '28px', padding: 0, marginTop: '-0.375rem', marginRight: '-0.5rem' }}
          >
            <X size={16} strokeWidth={2} style={{ opacity: 0.6 }} />
          </Button>
        }
      >
        <AlertContent>
          <AlertTitle>We Value Your Privacy 🍪</AlertTitle>
          <AlertDescription style={{ maxWidth: '320px', lineHeight: 1.5 }}>
            We use functional cookies to save your theme preferences and provide personalized features.
          </AlertDescription>
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem' }}>
            <Button size="sm" onClick={acceptCookies}>Accept</Button>
            <Button size="sm" variant="outline" onClick={acceptCookies}>Dismiss</Button>
          </div>
        </AlertContent>
      </Alert>
    </div>
  );
}
