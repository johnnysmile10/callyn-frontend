
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Step1RoleSelection from "@/components/onboarding/Step1RoleSelection";
import Step2ScenarioSelection from "@/components/onboarding/Step2ScenarioSelection";
import Step3TrainingMethod from "@/components/onboarding/Step3TrainingMethod";
import Step4VoicePreview from "@/components/onboarding/Step4VoicePreview";
import Step5FinalCTA from "@/components/onboarding/Step5FinalCTA";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import { salesScenarios } from "@/components/onboarding/scenarioData";
import { ScenarioProps } from "@/components/onboarding/types";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioProps | null>(null);
  const [trainingMethod, setTrainingMethod] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState("");
  const [voicePreviews, setVoicePreviews] = useState<{greeting: string, message: string}>({
    greeting: "Hello, I'm Callyn, your AI sales agent.",
    message: "I can help qualify leads, handle calls, and book meetings on your calendar."
  });
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleScenarioSelect = (scenario: ScenarioProps) => {
    setSelectedScenario(scenario);
    // No longer automatically advancing to Step 3
  };

  // Simulate processing data and generating voice samples
  const processTrainingData = () => {
    setIsProcessing(true);
    
    // Different messages based on training method
    const processingMessages = {
      'google-business': [
        "Analyzing your company info",
        "Processing sales data",
        "Optimizing for AI"
      ],
      'website-url': [
        "Crawling site",
        "Extracting sales content",
        "Training voice"
      ],
      'upload-pdf': [
        "Parsing PDF",
        "Extracting value points",
        "Generating AI voice"
      ]
    };
    
    const messages = trainingMethod ? processingMessages[trainingMethod as keyof typeof processingMessages] : [];
    
    // Simulate API processing with delays
    let messageIndex = 0;
    const processInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setProcessingState(messages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(processInterval);
        setIsProcessing(false);
        
        // Generate custom voice samples based on input data
        let customGreeting = "Hello, I'm Callyn, your AI sales agent.";
        let customMessage = "";
        
        if (trainingMethod === 'google-business' && businessName) {
          customMessage = `I represent ${businessName} and I'm here to qualify leads and book appointments for your sales team.`;
        } else if (trainingMethod === 'website-url' && websiteUrl) {
          const domain = new URL(websiteUrl).hostname.replace('www.', '');
          customMessage = `I'm the virtual sales representative for ${domain}, ready to handle calls and qualify leads.`;
        } else if (trainingMethod === 'upload-pdf' && file) {
          customMessage = `I've been trained on your sales materials and can help convert prospects into customers.`;
        }
        
        setVoicePreviews({
          greeting: customGreeting,
          message: customMessage || "I can help qualify leads, handle calls, and book meetings on your calendar."
        });
        
        // Move to voice preview step
        handleNext();
      }
    }, 1500);
  };

  // Total number of steps in the onboarding process
  const totalSteps = 5;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
              Create Your AI Sales Agent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Set up Callyn to qualify leads, handle objections, and book appointments exactly like you would.
            </p>
            
            {/* Progress indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          {/* Step 1: Welcome and Introduction */}
          {currentStep === 1 && (
            <Step1RoleSelection 
              handleNext={handleNext}
            />
          )}
          
          {/* Step 2: Pick Industry Scenario */}
          {currentStep === 2 && (
            <Step2ScenarioSelection
              salesScenarios={salesScenarios}
              handleScenarioSelect={handleScenarioSelect}
              handleBack={handleBack}
              handleNext={handleNext}
              selectedScenario={selectedScenario}
            />
          )}
          
          {/* Step 3: Train Callyn with Your Sales Info */}
          {currentStep === 3 && (
            <Step3TrainingMethod
              trainingMethod={trainingMethod}
              setTrainingMethod={setTrainingMethod}
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
              businessName={businessName}
              setBusinessName={setBusinessName}
              file={file}
              setFile={setFile}
              handleBack={handleBack}
              handleNext={processTrainingData}
              isProcessing={isProcessing}
              processingState={processingState}
            />
          )}
          
          {/* Step 4: Voice Preview */}
          {currentStep === 4 && (
            <Step4VoicePreview 
              voicePreviews={voicePreviews}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          
          {/* Final CTA */}
          {currentStep === 5 && <Step5FinalCTA />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
