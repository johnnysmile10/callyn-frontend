
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ScenarioProps } from '@/components/onboarding/types';

interface User {
  id?: string;
  email: string;
  name?: string;
  photoURL?: string;
}

interface OnboardingData {
  selectedScenario: ScenarioProps | null;
  trainingMethod: string | null;
  businessName?: string;
  websiteUrl?: string;
  uploadedFile?: File | null;
  voicePreview?: {
    greeting: string;
    message: string;
  };
}

interface AuthContextType {
  user: User | null;
  onboardingData: OnboardingData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setOnboardingData: (data: OnboardingData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, simulate successful login
    setUser({ email });
    // Store user info in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const googleLogin = async () => {
    // In a real app, you would implement Google OAuth
    // For demo purposes, simulate successful login with a Google account
    const mockGoogleUser = { 
      email: 'demo@gmail.com', 
      name: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
    };
    setUser(mockGoogleUser);
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
  };

  const signup = async (email: string, password: string, name: string) => {
    // In a real app, you would create a new user in your backend
    // For demo purposes, simulate successful signup
    const newUser = { 
      email, 
      name,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        onboardingData,
        isAuthenticated,
        login,
        googleLogin,
        signup,
        logout,
        setOnboardingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
