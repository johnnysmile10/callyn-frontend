
import { mapApiAgentToUserAgent } from '@/utils/agent';
import { ApiAgent } from '../types/apiTypes';
import { User, UserAgent, OnboardingData } from '../types/authTypes';
import ApiService from './apiService';
import { toast } from 'sonner';

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    const { status, message, token } = await ApiService.post('/auth/login', { email, password });
    if (status === 200) {
      const user = { email }
      localStorage.setItem('token', token)
      ApiService.setToken(token)
      toast.success(message)
      return user;
    }
    toast.error(message)
    return null
  },

  googleLogin: async (): Promise<User> => {
    const mockGoogleUser = {
      email: 'demo@gmail.com',
      name: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
    };
    // localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    return mockGoogleUser;
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
    const user = await ApiService.post('/register', { name, email, password });
    return user as User;
  },

  createUserAgent: async (data: OnboardingData): Promise<UserAgent | null> => {
    const payload: Omit<ApiAgent, 'id'> = {
      name: data.businessName,
      custom_script: data.customScript,
      enthusiasm: data.enthusiasm,
      formality: data.languageConfig.formality,
      tone: data.languageConfig.tone,
      handle_objections: data.handleObjections,
      industry: data.industry,
      main_goal: data.mainGoal,
      model: data.languageConfig.model,
      scriptMethod: data.scriptMethod,
      speaking_speed: data.speakingSpeed,
      target_audience: data.targetAudience,
      use_small_talk: data.useSmallTalk,
      voice: data.selectedVoice,
      websiteUrl: data.websiteUrl,
      uploadedFile: null,
    };

    const { assistant } = await ApiService.post('/assistant/first-agent', payload);
    return mapApiAgentToUserAgent(assistant);
  },

  updateUserAgent: async (data: OnboardingData): Promise<UserAgent | null> => {
    const payload: Omit<ApiAgent, 'id'> = {
      name: data.businessName,
      custom_script: data.customScript,
      enthusiasm: data.enthusiasm,
      formality: data.languageConfig.formality,
      tone: data.languageConfig.tone,
      handle_objections: data.handleObjections,
      industry: data.industry,
      main_goal: data.mainGoal,
      model: data.languageConfig.model,
      scriptMethod: data.scriptMethod,
      speaking_speed: data.speakingSpeed,
      target_audience: data.targetAudience,
      use_small_talk: data.useSmallTalk,
      voice: data.selectedVoice,
      websiteUrl: data.websiteUrl,
      uploadedFile: null,
    };

    const { data: assistant } = await ApiService.put('/update-assistant', payload);
    return mapApiAgentToUserAgent(assistant);
  },

  logout: () => {
    ApiService.setToken(null)
    localStorage.removeItem('token');
  }
};
