
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { AgentData } from "@/pages/CreateAgent";

interface Step5Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const objectiveOptions = [
  "Qualify leads",
  "Book appointments",
  "Gather contact information", 
  "Assess budget and timeline",
  "Identify decision makers",
  "Generate interest",
  "Follow up on previous conversations",
  "Conduct surveys"
];

const Step5CallBehavior = ({ data, updateData, onNext }: Step5Props) => {
  const [objectives, setObjectives] = useState<string[]>(data.callObjectives);
  const [objectionHandling, setObjectionHandling] = useState(data.objectionHandling);
  const [transferRules, setTransferRules] = useState(data.transferRules);
  const [maxDuration, setMaxDuration] = useState([data.maxCallDuration]);

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    if (checked) {
      setObjectives([...objectives, objective]);
    } else {
      setObjectives(objectives.filter(obj => obj !== objective));
    }
  };

  const handleNext = () => {
    updateData({
      callObjectives: objectives,
      objectionHandling,
      transferRules,
      maxCallDuration: maxDuration[0]
    });
    onNext();
  };

  const canProceed = objectives.length > 0 && objectionHandling.trim();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Configure Call Behavior</h2>
        <p className="text-gray-600">Define how your agent should behave during calls</p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Call Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Call Objectives</CardTitle>
            <p className="text-sm text-gray-600">What should your agent try to accomplish on each call?</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {objectiveOptions.map((objective) => (
                <div key={objective} className="flex items-center space-x-2">
                  <Checkbox
                    id={objective}
                    checked={objectives.includes(objective)}
                    onCheckedChange={(checked) => handleObjectiveChange(objective, checked as boolean)}
                  />
                  <Label htmlFor={objective} className="text-sm">
                    {objective}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objection Handling */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Objection Handling</CardTitle>
            <p className="text-sm text-gray-600">How should your agent respond to common objections?</p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={objectionHandling}
              onChange={(e) => setObjectionHandling(e.target.value)}
              placeholder="Describe how to handle common objections like 'not interested', 'too expensive', 'call back later', etc..."
              className="min-h-32"
            />
          </CardContent>
        </Card>

        {/* Transfer Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">When to Transfer Calls</CardTitle>
            <p className="text-sm text-gray-600">Define scenarios when the agent should transfer to a human</p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={transferRules}
              onChange={(e) => setTransferRules(e.target.value)}
              placeholder="e.g., Transfer when prospect is ready to buy, has technical questions, or requests to speak with a manager..."
              className="min-h-24"
            />
          </CardContent>
        </Card>

        {/* Call Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Maximum Call Duration</CardTitle>
            <p className="text-sm text-gray-600">How long should calls last before wrapping up?</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="px-3">
                <Slider
                  value={maxDuration}
                  onValueChange={setMaxDuration}
                  max={30}
                  min={3}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">{maxDuration[0]} minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-callyn-blue hover:bg-callyn-darkBlue"
        >
          Continue to Integration
        </Button>
      </div>
    </div>
  );
};

export default Step5CallBehavior;
