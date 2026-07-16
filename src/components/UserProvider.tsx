'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserContextType {
  isNewUser: boolean;
  hasConsented: boolean;
  markAsVisited: () => void;
  acceptCookies: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [hasConsented, setHasConsented] = useState<boolean>(true); // Default to true if you want to assume consent, or false if strictly checking
  
  useEffect(() => {
    // Check if the user has visited before
    const visited = Cookies.get('hasVisited');
    if (!visited) {
      setIsNewUser(true);
    }

    // Check for cookie consent
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setHasConsented(false);
    }
  }, []);

  const markAsVisited = () => {
    Cookies.set('hasVisited', 'true', { expires: 365 }); // Expires in 1 year
    setIsNewUser(false);
  };

  const acceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setHasConsented(true);
  };

  return (
    <UserContext.Provider value={{ isNewUser, hasConsented, markAsVisited, acceptCookies }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
