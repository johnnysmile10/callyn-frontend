
import { mapApiAgentToUserAgent } from '@/utils/agent';
import { ApiAgent } from '../types/apiTypes';
import { User, UserAgent, OnboardingData } from '../types/authTypes';
import ApiService from './apiService';

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, token } = await ApiService.post('/auth/login', { email, password });
        if (status === 200) {
          const user = { email }
          localStorage.setItem('token', token)
          ApiService.setToken(token)
          resolve(user);
        }
      } catch (err) {
        reject(err)
      }
    })
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
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await ApiService.post('/auth/register', { name, email, password });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    })
  },

  createUserAgent: async (data: OnboardingData): Promise<UserAgent | null> => {
    const payload: Omit<ApiAgent, 'id' | 'name'> = {
      custom_script: data.customScript,
      enthusiasm: data.enthusiasm,
      formality: data.languageConfig.formality,
      tone: data.languageConfig.tone,
      handle_objections: data.handleObjections,
      business_name: data.businessName,
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
    const payload: Omit<ApiAgent, 'id' | 'name'> = {
      business_name: data.businessName,
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

    const { data: assistant } = await ApiService.put('/assistant', payload);
    return mapApiAgentToUserAgent(assistant);
  },

  updateUserAgentWithAgent: async (data: UserAgent): Promise<UserAgent | null> => {
    const payload: Omit<ApiAgent, 'id' | 'name'> = {
      business_name: data.configuration.businessInfo.name,
      custom_script: data.configuration.script,
      enthusiasm: data.configuration.enthusiasm,
      formality: data.configuration.formality,
      tone: data.configuration.personality,
      handle_objections: data.configuration.handleObjections,
      industry: data.configuration.businessInfo.industry,
      main_goal: data.configuration.businessInfo.mainGoal,
      model: data.configuration.model,
      scriptMethod: data.configuration.scriptMethod,
      speaking_speed: data.configuration.speakingSpeed,
      target_audience: data.configuration.businessInfo.targetAudience,
      use_small_talk: data.configuration.useSmallTalk,
      voice: data.configuration.voice,
      websiteUrl: data.configuration.websiteUrl,
      uploadedFile: data.configuration.uploadedFile,
    };

    const { data: assistant } = await ApiService.put('/assistant', payload);
    return mapApiAgentToUserAgent(assistant);
  },

  logout: () => {
    ApiService.setToken(null)
    localStorage.removeItem('token');
  }
};
