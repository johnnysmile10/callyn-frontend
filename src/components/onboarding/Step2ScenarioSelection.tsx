
import { Button } from "@/components/ui/button";
import ScenarioCard from "./ScenarioCard";
import { ScenarioProps } from "./types";

interface Step2Props {
  selectedTab: string;
  salesScenarios: ScenarioProps[];
  businessScenarios: ScenarioProps[];
  handleScenarioSelect: (scenario: ScenarioProps) => void;
  handleBack: () => void;
}

const Step2ScenarioSelection = ({
  selectedTab,
  salesScenarios,
  businessScenarios,
  handleScenarioSelect,
  handleBack,
}: Step2Props) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 2: Pick Industry Scenario + Hear Voice
      </h2>
      
      <div className="mt-6">
        {selectedTab === "sales" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesScenarios.map((scenario, index) => (
              <ScenarioCard 
                key={index} 
                scenario={scenario} 
                onSelect={() => handleScenarioSelect(scenario)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessScenarios.map((scenario, index) => (
              <ScenarioCard 
                key={index} 
                scenario={scenario} 
                onSelect={() => handleScenarioSelect(scenario)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          onClick={handleBack}
          variant="outline"
          className="rounded-full px-8 py-2 text-lg font-medium mr-4"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Step2ScenarioSelection;
