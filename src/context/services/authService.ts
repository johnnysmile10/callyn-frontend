
import { User, UserAgent, OnboardingData } from '../types/authTypes';
import ApiService from './apiSErvice';

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

  createUserAgent: async (data: OnboardingData, user_id: string): Promise<UserAgent | null> => {
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

    const payload = {
      user_id: user_id,
      name: data.businessName || 'My AI Agent',
      customScript: data.customScript || null,
      model_provider: "openai",
      model_id: "chatgpt-4o-latest",
      voice_provider: "11labs",
      voice_id: data.selectedVoice || "IKne3meq5aSn9XLyUdCD",
      industry: data.industry || null,
      targetAudience: data.targetAudience || null,
      mainGoal: data.mainGoal || null,
      scriptMethod: data.scriptMethod || null,
      websiteUrl: data.websiteUrl || null,
      uploadedFile: data.uploadedFile || null,
      speakingSpeed: data.speakingSpeed || 1.0,
      enthusiasm: data.enthusiasm || 5.0,
      useSmallTalk: data.useSmallTalk || true,
      handleObjections: data.handleObjections || true,
      languageConfig: data.languageConfig || null,
      selectedScenario: data.selectedScenario || null,
      trainingMethod: data.trainingMethod || null,
      voicePreview: data.voicePreview || null,
    };

    await ApiService.post('/create-assistant', payload);

    // localStorage.setItem('user_agent', JSON.stringify(newAgent));
    localStorage.setItem('setup_completed', 'true');
    
    // console.log('Agent created successfully:', newAgent);
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
