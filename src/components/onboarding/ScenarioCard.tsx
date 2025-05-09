
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { ScenarioProps } from "./types";

interface ScenarioCardProps {
  scenario: ScenarioProps;
  isSelected: boolean;
  onSelect: (scenario: ScenarioProps) => void;
  onPlayAudio: (scenario: ScenarioProps) => void;
}

const ScenarioCard = ({ scenario, isSelected, onSelect, onPlayAudio }: ScenarioCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    onPlayAudio(scenario);
  };

  return (
    <Card className={`h-full flex flex-col transition-all ${isSelected ? 'border-callyn-blue ring-2 ring-callyn-blue' : 'hover:border-callyn-blue'}`}>
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 italic">"{scenario.script}"</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={togglePlay}
          variant="outline"
          className="gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Hear Callyn"}
        </Button>
        <Button 
          variant={isSelected ? "default" : "secondary"}
          onClick={() => onSelect(scenario)}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
