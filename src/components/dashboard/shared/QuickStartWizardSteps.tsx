
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import ExpandedVoiceLibrary from "./ExpandedVoiceLibrary";

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
  data: any;
  updateData: (field: string, value: any) => void;
}

export const BusinessSetupStep = ({ onNext, data, updateData }: StepProps) => {
  const canProceed = data.businessName && data.industry;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Tell us about your business</h3>
        <p className="text-gray-600">This helps us personalize your AI agent</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input
            id="business-name"
            placeholder="Enter your business name"
            value={data.businessName || ''}
            onChange={(e) => updateData('businessName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="e.g., Technology, Healthcare, Real Estate"
            value={data.industry || ''}
            onChange={(e) => updateData('industry', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const VoiceSelectionStep = ({ onNext, onPrev, data, updateData }: StepProps) => {
  const canProceed = data.selectedVoice;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose your AI voice</h3>
        <p className="text-gray-600">Select a voice that matches your brand</p>
      </div>

      <ExpandedVoiceLibrary
        selectedVoice={data.selectedVoice || ''}
        onVoiceSelect={(voiceId) => updateData('selectedVoice', voiceId)}
        showTestingFeatures={true}
      />

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const ScriptCreationStep = ({ onNext, onPrev, data, updateData }: StepProps) => {
  const canProceed = data.script && data.script.length > 50;

  const generateScript = () => {
    const script = `Hello! This is [Agent Name] calling from ${data.businessName || '[Company]'}. 

I hope I'm not catching you at a bad time. I'm reaching out because we specialize in helping businesses in the ${data.industry || 'your'} industry.

Would you have just a few minutes to chat about how we might be able to help your business grow?`;
    
    updateData('script', script);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Create your call script</h3>
        <p className="text-gray-600">What should your AI agent say?</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={generateScript}
            variant="outline"
            className="flex items-center gap-2"
          >
            Generate Script from Business Info
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="script">Call Script</Label>
          <Textarea
            id="script"
            placeholder="Enter your call script here..."
            value={data.script || ''}
            onChange={(e) => updateData('script', e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700"
        >
          Complete Setup
          <CheckCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
