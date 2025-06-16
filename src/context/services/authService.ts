
import { User, UserAgent, OnboardingData } from '../types/authTypes';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  googleLogin: async (): Promise<User> => {
    const mockGoogleUser = { 
      email: 'demo@gmail.com', 
      name: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
    };
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    return mockGoogleUser;
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
    const newUser = { 
      email, 
      name,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  },

  createUserAgent: async (data: OnboardingData): Promise<UserAgent> => {
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

    localStorage.setItem('user_agent', JSON.stringify(newAgent));
    localStorage.setItem('setup_completed', 'true');
    
    console.log('Agent created successfully:', newAgent);
    return newAgent;
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_agent');
    localStorage.removeItem('onboarding_data');
    localStorage.removeItem('outreach_data');
    localStorage.removeItem('setup_completed');
  }
};
