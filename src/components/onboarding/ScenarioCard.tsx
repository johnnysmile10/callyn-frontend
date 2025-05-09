
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { ScenarioProps } from "./types";

const ScenarioCard = ({ scenario, onSelect }: { scenario: ScenarioProps; onSelect: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    // In a real implementation, this would actually play/pause audio
    setIsPlaying(!isPlaying);
    console.log(`${isPlaying ? "Paused" : "Playing"} scenario: ${scenario.title}`);
  };

  return (
    <Card className="h-full flex flex-col cursor-pointer transition-all hover:border-callyn-blue" onClick={onSelect}>
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 italic">"{scenario.script}"</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            togglePlay();
          }}
          variant="outline"
          className="gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Hear Callyn"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
