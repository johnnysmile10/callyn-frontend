
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, AlertCircle } from "lucide-react";
import ScenarioCard from "./ScenarioCard";
import { ScenarioProps } from "./types";

interface Step2Props {
  selectedTab: string;
  salesScenarios: ScenarioProps[];
  businessScenarios: ScenarioProps[];
  handleScenarioSelect: (scenario: ScenarioProps) => void;
  handleBack: () => void;
  handleNext: () => void;
  selectedScenario: ScenarioProps | null;
}

const Step2ScenarioSelection = ({
  selectedTab,
  salesScenarios,
  businessScenarios,
  handleScenarioSelect,
  handleBack,
  handleNext,
  selectedScenario,
}: Step2Props) => {
  const [customScript, setCustomScript] = useState("");
  const [isCustomPlaying, setIsCustomPlaying] = useState(false);
  const [wordCountError, setWordCountError] = useState(false);

  const handlePlayAudio = (scenario: ScenarioProps) => {
    // In a real implementation, this would actually play audio
    console.log(`Playing scenario: ${scenario.title}`);
  };

  const handleCustomPlayClick = () => {
    const wordCount = customScript.trim().split(/\s+/).length;
    if (wordCount > 50) {
      setWordCountError(true);
      return;
    }
    setWordCountError(false);
    setIsCustomPlaying(!isCustomPlaying);
    console.log(`Playing custom script: ${customScript}`);
  };

  const scenariosToDisplay = selectedTab === "sales" ? salesScenarios : businessScenarios;
  const wordCount = customScript.trim().split(/\s+/).length;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 2: Pick Industry Scenario + Hear Voice
      </h2>
      
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenariosToDisplay.map((scenario, index) => (
            <ScenarioCard 
              key={index} 
              scenario={scenario}
              isSelected={selectedScenario?.title === scenario.title}
              onSelect={handleScenarioSelect}
              onPlayAudio={handlePlayAudio}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Want to try your own script? Paste it here (max 50 words):
          </label>
          <div className="flex items-start gap-2">
            <Textarea 
              value={customScript} 
              onChange={(e) => setCustomScript(e.target.value)}
              className={`flex-1 ${wordCountError ? 'border-red-500' : ''}`}
              placeholder="Enter your custom script here..."
            />
            <Button
              onClick={handleCustomPlayClick}
              variant="outline"
              className="gap-2 mt-1"
              disabled={!customScript.trim()}
            >
              {isCustomPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isCustomPlaying ? "Pause" : "Try"}
            </Button>
          </div>
          <div className="flex justify-between mt-1">
            <p className={`text-sm ${wordCount > 50 ? 'text-red-500' : 'text-gray-500'}`}>
              {wordCount} / 50 words
            </p>
            {wordCountError && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Please limit your script to 50 words
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          onClick={handleBack}
          variant="outline"
          className="rounded-full px-8 py-2 text-lg font-medium mr-4"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          variant="default"
          className="rounded-full px-8 py-2 text-lg font-medium"
          disabled={!selectedScenario}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step2ScenarioSelection;
