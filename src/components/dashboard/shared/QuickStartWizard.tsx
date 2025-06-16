
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Rocket, Users, MessageSquare, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ExpandedVoiceLibrary from "./ExpandedVoiceLibrary";

interface QuickStartData {
  businessName: string;
  industry: string;
  targetAudience: string;
  mainGoal: string;
  selectedVoice: string;
  script: string;
}

interface QuickStartWizardProps {
  onComplete: (data: QuickStartData) => void;
  onSkip: () => void;
}

const QUICK_START_STEPS = [
  {
    id: 'business',
    title: 'Business Setup',
    description: 'Tell us about your business',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'audience',
    title: 'Target Audience',
    description: 'Who will you be calling?',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'voice',
    title: 'Choose Voice',
    description: 'Select your AI agent voice',
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    id: 'script',
    title: 'Quick Script',
    description: 'Create your call script',
    icon: <Phone className="h-5 w-5" />
  },
  {
    id: 'launch',
    title: 'Ready to Launch',
    description: 'Your agent is ready!',
    icon: <Rocket className="h-5 w-5" />
  }
];

const INDUSTRY_OPTIONS = [
  'Technology', 'Healthcare', 'Real Estate', 'Insurance', 'Financial Services',
  'Education', 'Retail', 'Manufacturing', 'Construction', 'Professional Services',
  'Non-profit', 'Government', 'Other'
];

const GOAL_OPTIONS = [
  'Book appointments/demos',
  'Generate qualified leads',
  'Follow up with existing leads',
  'Customer service/support',
  'Market research/surveys',
  'Event promotion',
  'Other'
];

const QuickStartWizard = ({ onComplete, onSkip }: QuickStartWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuickStartData>({
    businessName: '',
    industry: '',
    targetAudience: '',
    mainGoal: '',
    selectedVoice: '',
    script: ''
  });

  const updateFormData = (field: keyof QuickStartData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < QUICK_START_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.businessName && formData.industry;
      case 1:
        return formData.targetAudience && formData.mainGoal;
      case 2:
        return formData.selectedVoice;
      case 3:
        return formData.script.length > 50;
      default:
        return true;
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    toast({
      title: "Quick Start Complete!",
      description: "Your AI agent is ready to start making calls.",
    });
  };

  const generateScript = () => {
    const script = `Hello! This is [Agent Name] calling from ${formData.businessName}. 

I hope I'm not catching you at a bad time. I'm reaching out to ${formData.targetAudience} because we specialize in helping businesses like yours with ${formData.industry.toLowerCase()} solutions.

Our goal is to ${formData.mainGoal.toLowerCase()}, and I'd love to learn more about your current needs and see if there might be a good fit for us to work together.

Would you have just a few minutes to chat, or would there be a better time for me to call back?`;
    
    updateFormData('script', script);
    toast({
      title: "Script Generated",
      description: "A personalized script has been created based on your business info.",
    });
  };

  const progress = ((currentStep + 1) / QUICK_START_STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-600" />
            Quick Start Wizard
          </CardTitle>
          <CardDescription>
            Get your AI calling agent set up in just a few minutes
          </CardDescription>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Step {currentStep + 1} of {QUICK_START_STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {QUICK_START_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < QUICK_START_STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Tell us about your business</h3>
                  <p className="text-gray-600">This helps us personalize your AI agent</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {INDUSTRY_OPTIONS.map(industry => (
                        <Button
                          key={industry}
                          variant={formData.industry === industry ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateFormData('industry', industry)}
                          className="text-left justify-start"
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Define your target audience</h3>
                  <p className="text-gray-600">Who will your AI agent be calling?</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Textarea
                      id="target-audience"
                      placeholder="e.g., Small business owners, IT directors, homeowners, etc."
                      value={formData.targetAudience}
                      onChange={(e) => updateFormData('targetAudience', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Main Goal</Label>
                    <div className="space-y-2">
                      {GOAL_OPTIONS.map(goal => (
                        <Button
                          key={goal}
                          variant={formData.mainGoal === goal ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateFormData('mainGoal', goal)}
                          className="w-full text-left justify-start"
                        >
                          {goal}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Choose your AI voice</h3>
                  <p className="text-gray-600">Select a voice that matches your brand</p>
                </div>

                <ExpandedVoiceLibrary
                  selectedVoice={formData.selectedVoice}
                  onVoiceSelect={(voiceId) => updateFormData('selectedVoice', voiceId)}
                  showTestingFeatures={true}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
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
                      <Rocket className="h-4 w-4" />
                      Generate Script from Business Info
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="script">Call Script</Label>
                    <Textarea
                      id="script"
                      placeholder="Enter your call script here..."
                      value={formData.script}
                      onChange={(e) => updateFormData('script', e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Use placeholders like [Agent Name], [Company], [Contact Name] that will be replaced during calls
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-semibold mb-2">You're all set!</h3>
                  <p className="text-gray-600 mb-6">Your AI calling agent is ready to start making calls</p>
                </div>

                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Setup Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Business:</span>
                        <p className="text-gray-600">{formData.businessName}</p>
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span>
                        <p className="text-gray-600">{formData.industry}</p>
                      </div>
                      <div>
                        <span className="font-medium">Target:</span>
                        <p className="text-gray-600">{formData.targetAudience}</p>
                      </div>
                      <div>
                        <span className="font-medium">Goal:</span>
                        <p className="text-gray-600">{formData.mainGoal}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Voice:</span>
                      <Badge className="ml-2">{formData.selectedVoice}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Script:</span>
                      <p className="text-gray-600 text-sm mt-1">{formData.script.substring(0, 150)}...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
              <Button variant="ghost" onClick={onSkip} className="text-gray-500">
                Skip Setup
              </Button>
            </div>

            <div>
              {currentStep < QUICK_START_STEPS.length - 1 ? (
                <Button 
                  onClick={nextStep} 
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Launch Agent
                  <Rocket className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStartWizard;
