
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewStep1Welcome from "@/components/onboarding/NewStep1Welcome";
import NewStep2BusinessSetup from "@/components/onboarding/NewStep2BusinessSetup";
import NewStep3QuickScript from "@/components/onboarding/NewStep3QuickScript";
import NewStep4VoicePersonality from "@/components/onboarding/NewStep4VoicePersonality";
import NewStep5LaunchReady from "@/components/onboarding/NewStep5LaunchReady";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import { useAuth } from "@/context/AuthContext";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState("");
  
  const { setOnboardingData: setAuthOnboardingData } = useAuth();
  const navigate = useNavigate();
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDataUpdate = (stepData: any) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  // Handle script processing
  const handleScriptProcessing = async () => {
    setIsProcessing(true);
    
    // Simulate processing based on script method
    const processingMessages = {
      'website': [
        "Scanning your website...",
        "Extracting key selling points...",
        "Creating personalized scripts..."
      ],
      'upload': [
        "Processing your document...",
        "Analyzing sales content...",
        "Generating talking points..."
      ],
      'manual': [
        "Processing your input...",
        "Optimizing script structure...",
        "Preparing voice training..."
      ]
    };
    
    const messages = processingMessages[onboardingData.scriptMethod as keyof typeof processingMessages] || [];
    
    let messageIndex = 0;
    const processInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setProcessingState(messages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(processInterval);
        setIsProcessing(false);
        handleNext();
      }
    }, 1200);
  };

  // Save onboarding data when reaching the final step
  useEffect(() => {
    if (currentStep === 5) {
      setAuthOnboardingData(onboardingData);
    }
  }, [currentStep, onboardingData, setAuthOnboardingData]);

  const totalSteps = 5;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
              Your AI Sales Agent in 5 Simple Steps
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Callyn learns your business and starts working in minutes. No technical skills required.
            </p>
            
            {/* Progress indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          {/* Step 1: Welcome & Motivation */}
          {currentStep === 1 && (
            <NewStep1Welcome handleNext={handleNext} />
          )}
          
          {/* Step 2: Business Setup */}
          {currentStep === 2 && (
            <NewStep2BusinessSetup
              handleNext={handleNext}
              handleBack={handleBack}
              onDataUpdate={handleDataUpdate}
              initialData={onboardingData}
            />
          )}
          
          {/* Step 3: Quick Script Setup */}
          {currentStep === 3 && (
            <NewStep3QuickScript
              handleNext={handleScriptProcessing}
              handleBack={handleBack}
              onDataUpdate={handleDataUpdate}
              initialData={onboardingData}
              isProcessing={isProcessing}
              processingState={processingState}
            />
          )}
          
          {/* Step 4: Voice & Personality */}
          {currentStep === 4 && (
            <NewStep4VoicePersonality
              handleNext={handleNext}
              handleBack={handleBack}
              onDataUpdate={handleDataUpdate}
              initialData={onboardingData}
            />
          )}
          
          {/* Step 5: Launch Ready */}
          {currentStep === 5 && (
            <NewStep5LaunchReady onboardingData={onboardingData} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
