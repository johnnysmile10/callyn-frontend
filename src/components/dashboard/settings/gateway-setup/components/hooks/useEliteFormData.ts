
import { useState } from "react";
import { EliteGatewayMenuOption, LanguageMatch, VoiceTag } from "../../types/eliteGatewayTypes";

export interface EliteFormData {
  prompt: string;
  actionType: 'press_key' | 'wait' | 'speak' | 'transfer';
  actionValue: string;
  confidenceThreshold: number;
  enableMultiLanguage: boolean;
  enableVoiceTags: boolean;
  enableAILearning: boolean;
}

export const useEliteFormData = () => {
  const [formData, setFormData] = useState<EliteFormData>({
    prompt: "",
    actionType: "press_key",
    actionValue: "",
    confidenceThreshold: 0.7,
    enableMultiLanguage: false,
    enableVoiceTags: false,
    enableAILearning: true
  });

  const [languages, setLanguages] = useState<LanguageMatch[]>([]);
  const [voiceTags, setVoiceTags] = useState<VoiceTag[]>([]);

  const updateFormField = (field: keyof EliteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLanguage = () => {
    setLanguages(prev => [...prev, {
      language: "en",
      prompt: "",
      confidence: 0.8,
      dialect: ""
    }]);
  };

  const updateLanguage = (index: number, field: keyof LanguageMatch, value: any) => {
    setLanguages(prev => prev.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (index: number) => {
    setLanguages(prev => prev.filter((_, i) => i !== index));
  };

  const addVoiceTag = () => {
    setVoiceTags(prev => [...prev, {
      tag: "",
      pattern: "",
      confidence: 0.8,
      description: ""
    }]);
  };

  const updateVoiceTag = (index: number, field: keyof VoiceTag, value: any) => {
    setVoiceTags(prev => prev.map((tag, i) => 
      i === index ? { ...tag, [field]: value } : tag
    ));
  };

  const removeVoiceTag = (index: number) => {
    setVoiceTags(prev => prev.filter((_, i) => i !== index));
  };

  const createMenuOption = (): EliteGatewayMenuOption => {
    return {
      id: `elite_option_${Date.now()}`,
      prompt: formData.prompt,
      action: {
        type: formData.actionType,
        value: formData.actionValue
      },
      confidenceThreshold: formData.confidenceThreshold,
      languages: formData.enableMultiLanguage ? languages : undefined,
      voiceTags: formData.enableVoiceTags ? voiceTags : undefined,
      learningData: formData.enableAILearning ? {
        successRate: 0,
        lastUpdated: new Date(),
        adaptations: [],
        callPatterns: []
      } : undefined,
      advancedTiming: {
        preActionDelay: 1000,
        postActionDelay: 500,
        retryDelay: 2000,
        maxRetries: 3,
        adaptiveDelay: true
      },
      fallbackPlan: [{
        id: "fallback_1",
        condition: "confidence < 0.5",
        action: { type: "transfer", value: "operator" },
        priority: 1,
        description: "Transfer to operator if confidence is low"
      }],
      successMetrics: {
        totalAttempts: 0,
        successfulAttempts: 0,
        averageTime: 0,
        commonFailures: []
      },
      createdAt: new Date()
    };
  };

  const isFormValid = formData.prompt.trim() !== "" && formData.actionValue.trim() !== "";

  return {
    formData,
    languages,
    voiceTags,
    updateFormField,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addVoiceTag,
    updateVoiceTag,
    removeVoiceTag,
    createMenuOption,
    isFormValid
  };
};
