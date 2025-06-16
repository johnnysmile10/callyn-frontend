
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ScenarioProps } from '@/components/onboarding/types';
import { OutreachData, LanguageConfig } from '@/components/dashboard/outreach/types';

interface User {
  id?: string;
  email: string;
  name?: string;
  photoURL?: string;
}

interface OnboardingData {
  // Step 1 data
  timeframe?: string;
  
  // Step 2 data  
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  
  // Step 3 data
  scriptMethod?: string;
  websiteUrl?: string;
  uploadedFile?: File | null;
  customScript?: string;
  
  // Step 4 data
  selectedVoice?: string;
  personality?: string;
  speakingSpeed?: number;
  enthusiasm?: number;
  useSmallTalk?: boolean;
  handleObjections?: boolean;
  
  // Language configuration
  languageConfig?: LanguageConfig;
  
  // Legacy data for backward compatibility
  selectedScenario?: ScenarioProps | null;
  trainingMethod?: string | null;
  voicePreview?: {
    greeting: string;
    message: string;
  };
}

interface UserAgent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training';
  createdAt: string;
  configuration: {
    voice: string;
    personality: string;
    script: string;
    businessInfo: {
      name: string;
      industry: string;
      targetAudience: string;
      mainGoal: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  onboardingData: OnboardingData | null;
  userAgent: UserAgent | null;
  outreachData: OutreachData | null;
  setupCompleted: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setOnboardingData: (data: OnboardingData) => void;
  setUserAgent: (agent: UserAgent) => void;
  setOutreachData: (data: OutreachData) => void;
  createUserAgent: (onboardingData: OnboardingData) => Promise<UserAgent>;
  hasCompletedSetup: () => boolean;
  markSetupCompleted: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [userAgent, setUserAgent] = useState<UserAgent | null>(null);
  const [outreachData, setOutreachData] = useState<OutreachData | null>(null);
  const [setupCompleted, setSetupCompleted] = useState(false);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const googleLogin = async () => {
    const mockGoogleUser = { 
      email: 'demo@gmail.com', 
      name: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
    };
    setUser(mockGoogleUser);
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
  };

  const signup = async (email: string, password: string, name: string) => {
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
    setUserAgent(null);
    setOnboardingData(null);
    setOutreachData(null);
    setSetupCompleted(false);
    localStorage.removeItem('user');
    localStorage.removeItem('user_agent');
    localStorage.removeItem('onboarding_data');
    localStorage.removeItem('outreach_data');
    localStorage.removeItem('setup_completed');
  };

  const handleSetUserAgent = (agent: UserAgent) => {
    setUserAgent(agent);
    localStorage.setItem('user_agent', JSON.stringify(agent));
  };

  const createUserAgent = async (data: OnboardingData): Promise<UserAgent> => {
    const newAgent: UserAgent = {
      id: `agent_${Date.now()}`,
      name: data.businessName || 'My AI Agent',
      status: 'active',
      createdAt: new Date().toISOString(),
      configuration: {
        voice: data.selectedVoice || 'Aria',
        personality: data.personality || 'professional',
        script: data.customScript || 'Default sales script',
        businessInfo: {
          name: data.businessName || '',
          industry: data.industry || '',
          targetAudience: data.targetAudience || '',
          mainGoal: data.mainGoal || ''
        }
      }
    };

    setUserAgent(newAgent);
    localStorage.setItem('user_agent', JSON.stringify(newAgent));
    setSetupCompleted(true);
    localStorage.setItem('setup_completed', 'true');
    
    console.log('Agent created successfully:', newAgent);
    return newAgent;
  };

  const hasCompletedSetup = (): boolean => {
    return setupCompleted && !!userAgent;
  };

  const markSetupCompleted = () => {
    setSetupCompleted(true);
    localStorage.setItem('setup_completed', 'true');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAgent = localStorage.getItem('user_agent');
    const storedOnboardingData = localStorage.getItem('onboarding_data');
    const storedOutreachData = localStorage.getItem('outreach_data');
    const storedSetupCompleted = localStorage.getItem('setup_completed');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }

    if (storedAgent) {
      try {
        setUserAgent(JSON.parse(storedAgent));
      } catch (error) {
        console.error('Error parsing stored agent:', error);
        localStorage.removeItem('user_agent');
      }
    }

    if (storedOnboardingData) {
      try {
        setOnboardingData(JSON.parse(storedOnboardingData));
      } catch (error) {
        console.error('Error parsing stored onboarding data:', error);
        localStorage.removeItem('onboarding_data');
      }
    }

    if (storedOutreachData) {
      try {
        setOutreachData(JSON.parse(storedOutreachData));
      } catch (error) {
        console.error('Error parsing stored outreach data:', error);
        localStorage.removeItem('outreach_data');
      }
    }

    if (storedSetupCompleted === 'true') {
      setSetupCompleted(true);
    }
  }, []);

  const handleSetOnboardingData = (data: OnboardingData) => {
    setOnboardingData(data);
    localStorage.setItem('onboarding_data', JSON.stringify(data));
  };

  const handleSetOutreachData = (data: OutreachData) => {
    setOutreachData(data);
    localStorage.setItem('outreach_data', JSON.stringify(data));
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
        setOnboardingData: handleSetOnboardingData,
        setUserAgent: handleSetUserAgent,
        setOutreachData: handleSetOutreachData,
        createUserAgent,
        hasCompletedSetup,
        markSetupCompleted,
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

export default AuthProvider;
