
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, OnboardingData, UserAgent, AuthContextType } from './types/authTypes';
import { OutreachData } from '@/components/dashboard/outreach/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { authService } from './services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>('user');
  const [userAgent, setUserAgent] = useLocalStorage<UserAgent>('user_agent');
  const [onboardingData, setOnboardingData] = useLocalStorage<OnboardingData>('onboarding_data');
  const [outreachData, setOutreachData] = useLocalStorage<OutreachData>('outreach_data');
  const [setupCompleted, setSetupCompleted] = useState(false);

  const isAuthenticated = !!user;

  // Load setup completion status
  useEffect(() => {
    const storedSetupCompleted = localStorage.getItem('setup_completed');
    if (storedSetupCompleted === 'true') {
      setSetupCompleted(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const googleLogin = async () => {
    const loggedInUser = await authService.googleLogin();
    setUser(loggedInUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    const newUser = await authService.signup(email, password, name);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserAgent(null);
    setOnboardingData(null);
    setOutreachData(null);
    setSetupCompleted(false);
  };

  const createUserAgent = async (data: OnboardingData): Promise<UserAgent> => {
    const newAgent = await authService.createUserAgent(data);
    setUserAgent(newAgent);
    setSetupCompleted(true);
    return newAgent;
  };

  const hasCompletedSetup = (): boolean => {
    return setupCompleted && !!userAgent;
  };

  const markSetupCompleted = () => {
    setSetupCompleted(true);
    localStorage.setItem('setup_completed', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onboardingData,
        userAgent,
        outreachData,
        setupCompleted,
        isAuthenticated,
        login,
        googleLogin,
        signup,
        logout,
        setOnboardingData,
        setUserAgent,
        setOutreachData,
        createUserAgent,
        hasCompletedSetup,
        markSetupCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
