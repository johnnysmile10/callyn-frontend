import { OnboardingData, UserAgent } from "@/context";
import { ApiAgent } from "@/context/types/apiTypes";

// export const getAgentFromOnboardingData = (data: OnboardingData): UserAgent => ({
//     id: `agent_${Date.now()}`,
//     name: data.businessName || 'My AI Agent',
//     status: 'active',
//     createdAt: new Date().toISOString(),
//     configuration: {
//         voice: data.selectedVoice || 'Aria',
//         personality: data.personality || 'professional',
//         script: data.customScript || 'Default sales script',
//         businessInfo: {
//             name: data.businessName || '',
//             industry: data.industry || '',
//             targetAudience: data.targetAudience || '',
//             mainGoal: data.mainGoal || ''
//         }
//     }
// })

export const mapApiAgentToOnboardingData = (data: ApiAgent): OnboardingData => ({
    businessName: data.name,
    industry: data.industry,
    targetAudience: data.target_audience,
    mainGoal: data.main_goal,
    scriptMethod: data.scriptMethod,
    websiteUrl: data.websiteUrl,
    uploadedFile: null,
    customScript: data.custom_script,

    selectedVoice: data.voice,
    personality: data.tone,
    speakingSpeed: data.speaking_speed,
    enthusiasm: data.enthusiasm,
    useSmallTalk: data.use_small_talk,
    handleObjections: data.handle_objections,
    languageConfig: {
        formality: data.formality as "balanced" | "formal" | "informal",
        tone: data.tone as "professional" | "casual" | "friendly" | "authoritative",
        primaryLanguage: 'en',
        secondaryLanguages: [],
        model: 'chatgpt-4o-latest',
        voiceId: data.voice,
        culturalAdaptation: false,
        localExpressions: false
    }
})

export const mapApiAgentToUserAgent = (data: ApiAgent): UserAgent => ({
    id: data.id,
    name: data.name || 'My AI Agent',
    status: 'active',
    createdAt: data.timestamp,
    other: {
        userId: data.user_id,
        assistantId: data.assistant_id,
    },
    configuration: {
        voice: data.voice || 'Aria',
        model: data.model || 'chatgpt-4o-latest',
        speakingSpeed: data.speaking_speed || 1,
        personality: data.tone || 'professional',
        script: data.custom_script || 'Default sales script',
        instructions: data.instructions || 'Default instruction',
        enthusiasm: data.enthusiasm || 0.5,
        useSmallTalk: data.use_small_talk || true,
        handleObjections: data.handle_objections || true,
        formality: data.formality || 'balanced',
        scriptMethod: data.scriptMethod || 'manual',
        websiteUrl: data.websiteUrl,
        uploadedFile: data.uploadedFile,
        businessInfo: {
            name: data.name || '',
            industry: data.industry || '',
            targetAudience: data.target_audience || '',
            mainGoal: data.main_goal || ''
        }
    }
})

export const mapUserAgentToApiAgent = (data: UserAgent): ApiAgent => ({
    id: data.id,
    user_id: data.other.userId,
    assistant_id: data.other.assistantId,
    name: data.name,
    voice: data.configuration.voice,
    model: data.configuration.model,
    instructions: data.configuration.instructions,
    industry: data.configuration.businessInfo.industry,
    target_audience: data.configuration.businessInfo.targetAudience,
    main_goal: data.configuration.businessInfo.mainGoal,
    custom_script: data.configuration.script,
    speaking_speed: data.configuration.speakingSpeed,
    enthusiasm: data.configuration.enthusiasm,
    use_small_talk: data.configuration.useSmallTalk,
    handle_objections: data.configuration.handleObjections,
    tone: data.configuration.personality,
    formality: data.configuration.formality,
    scriptMethod: data.configuration.scriptMethod,
    websiteUrl: data.configuration.websiteUrl || null,
    uploadedFile: data.configuration.uploadedFile || null,
    timestamp: data.createdAt
})