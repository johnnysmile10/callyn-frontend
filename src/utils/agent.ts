import { OnboardingData, UserAgent } from "@/context";

export const getAgentFromOnboardingData = (data: OnboardingData): UserAgent => ({
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
})