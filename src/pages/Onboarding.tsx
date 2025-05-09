
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Step1RoleSelection from "@/components/onboarding/Step1RoleSelection";
import Step2ScenarioSelection from "@/components/onboarding/Step2ScenarioSelection";
import Step3TrainingMethod from "@/components/onboarding/Step3TrainingMethod";
import Step4FinalCTA from "@/components/onboarding/Step4FinalCTA";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import { salesScenarios, businessScenarios } from "@/components/onboarding/scenarioData";
import { ScenarioProps } from "@/components/onboarding/types";
import { Pause } from "lucide-react";

const Onboarding = () => {
  const [selectedTab, setSelectedTab] = useState("sales");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioProps | null>(null);
  const [trainingMethod, setTrainingMethod] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
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

  // Total number of steps in the onboarding process
  const totalSteps = 3;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
              Hear Callyn in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your role and choose an industry example to hear how Callyn can help your business.
            </p>
            
            {/* Progress indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          {/* Step 1: Choose Your Role */}
          {currentStep === 1 && (
            <Step1RoleSelection 
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              handleNext={handleNext}
            />
          )}
          
          {/* Step 2: Pick Industry Scenario */}
          {currentStep === 2 && (
            <Step2ScenarioSelection
              selectedTab={selectedTab}
              salesScenarios={salesScenarios}
              businessScenarios={businessScenarios}
              handleScenarioSelect={handleScenarioSelect}
              handleBack={handleBack}
              handleNext={handleNext}
              selectedScenario={selectedScenario}
            />
          )}
          
          {/* Step 3: Train Callyn with Your Business Info */}
          {currentStep === 3 && (
            <Step3TrainingMethod
              trainingMethod={trainingMethod}
              setTrainingMethod={setTrainingMethod}
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
              file={file}
              setFile={setFile}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          
          {/* Final CTA */}
          {currentStep === 4 && <Step4FinalCTA />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
