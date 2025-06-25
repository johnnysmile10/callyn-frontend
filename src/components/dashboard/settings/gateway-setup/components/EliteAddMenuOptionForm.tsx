
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Crown, Brain, Globe, Zap } from "lucide-react";
import { EliteGatewayMenuOption, LanguageMatch, VoiceTag } from "../types/eliteGatewayTypes";

interface EliteAddMenuOptionFormProps {
  onAdd: (option: EliteGatewayMenuOption) => void;
  onCancel: () => void;
}

const EliteAddMenuOptionForm = ({ onAdd, onCancel }: EliteAddMenuOptionFormProps) => {
  const [formData, setFormData] = useState({
    prompt: "",
    actionType: "press_key" as const,
    actionValue: "",
    confidenceThreshold: 0.7,
    enableMultiLanguage: false,
    enableVoiceTags: false,
    enableAILearning: true
  });

  const [languages, setLanguages] = useState<LanguageMatch[]>([]);
  const [voiceTags, setVoiceTags] = useState<VoiceTag[]>([]);

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

  const handleSubmit = () => {
    const newOption: EliteGatewayMenuOption = {
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

    onAdd(newOption);
  };

  const isFormValid = formData.prompt.trim() !== "" && formData.actionValue.trim() !== "";

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-purple-600" />
          Add Elite Menu Option
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Setup</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="voice">Voice Tags</TabsTrigger>
            <TabsTrigger value="ai">AI Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prompt Detection</Label>
                <Textarea
                  value={formData.prompt}
                  onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Enter keywords or phrases to detect..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Action Type</Label>
                <Select
                  value={formData.actionType}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, actionType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="press_key">Press Key</SelectItem>
                    <SelectItem value="speak">Speak</SelectItem>
                    <SelectItem value="wait">Wait</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Action Value</Label>
                <Input
                  value={formData.actionValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, actionValue: e.target.value }))}
                  placeholder="Enter action value..."
                />
              </div>

              <div className="space-y-2">
                <Label>Confidence Threshold</Label>
                <Input
                  type="number"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={formData.confidenceThreshold}
                  onChange={(e) => setFormData(prev => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Multi-Language Support</h4>
              </div>
              <Switch
                checked={formData.enableMultiLanguage}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableMultiLanguage: checked }))}
              />
            </div>

            {formData.enableMultiLanguage && (
              <div className="space-y-4">
                <Button onClick={addLanguage} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Language
                </Button>

                {languages.map((lang, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">Language {index + 1}</h5>
                      <Button onClick={() => removeLanguage(index)} variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={lang.language}
                          onValueChange={(value) => updateLanguage(index, "language", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Input
                          value={lang.prompt}
                          onChange={(e) => updateLanguage(index, "prompt", e.target.value)}
                          placeholder="Language-specific prompt..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Voice Tag Detection</h4>
              </div>
              <Switch
                checked={formData.enableVoiceTags}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableVoiceTags: checked }))}
              />
            </div>

            {formData.enableVoiceTags && (
              <div className="space-y-4">
                <Button onClick={addVoiceTag} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Voice Tag
                </Button>

                {voiceTags.map((tag, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">Voice Tag {index + 1}</h5>
                      <Button onClick={() => removeVoiceTag(index)} variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tag Name</Label>
                        <Input
                          value={tag.tag}
                          onChange={(e) => updateVoiceTag(index, "tag", e.target.value)}
                          placeholder="Tag name..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pattern</Label>
                        <Input
                          value={tag.pattern}
                          onChange={(e) => updateVoiceTag(index, "pattern", e.target.value)}
                          placeholder="Voice pattern..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium">AI Learning</h4>
              </div>
              <Switch
                checked={formData.enableAILearning}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableAILearning: checked }))}
              />
            </div>

            {formData.enableAILearning && (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-medium text-yellow-900 mb-2">AI Learning Features</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Adaptive response timing based on success patterns</li>
                    <li>• Automatic fallback strategy optimization</li>
                    <li>• Real-time confidence scoring adjustments</li>
                    <li>• Pattern recognition for improved navigation</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button onClick={onCancel} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Elite Option
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EliteAddMenuOptionForm;
