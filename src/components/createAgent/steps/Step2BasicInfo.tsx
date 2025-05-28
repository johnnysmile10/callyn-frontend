
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AgentData } from "@/pages/CreateAgent";

interface Step2Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const Step2BasicInfo = ({ data, updateData, onNext }: Step2Props) => {
  const [formData, setFormData] = useState({
    agentName: data.agentName,
    agentRole: data.agentRole,
    businessContext: data.businessContext
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateData(formData);
    onNext();
  };

  const isValid = formData.agentName.trim() && formData.agentRole.trim() && formData.businessContext.trim();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Tell us about your agent</h2>
        <p className="text-gray-600">Provide basic information to personalize your AI agent</p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="agentName" className="text-base font-medium">
            Agent Name *
          </Label>
          <Input
            id="agentName"
            value={formData.agentName}
            onChange={(e) => handleInputChange("agentName", e.target.value)}
            placeholder="e.g., Sarah - Sales Assistant"
            className="mt-2 h-12"
          />
          <p className="text-sm text-gray-500 mt-1">
            This name will be used when the agent introduces itself
          </p>
        </div>

        <div>
          <Label htmlFor="agentRole" className="text-base font-medium">
            Agent Role *
          </Label>
          <Input
            id="agentRole"
            value={formData.agentRole}
            onChange={(e) => handleInputChange("agentRole", e.target.value)}
            placeholder="e.g., Sales Representative, Customer Support Agent"
            className="mt-2 h-12"
          />
          <p className="text-sm text-gray-500 mt-1">
            What role does this agent play in your business?
          </p>
        </div>

        <div>
          <Label htmlFor="businessContext" className="text-base font-medium">
            Business Context *
          </Label>
          <Textarea
            id="businessContext"
            value={formData.businessContext}
            onChange={(e) => handleInputChange("businessContext", e.target.value)}
            placeholder="Describe your business, products/services, target audience, and what makes you unique..."
            className="mt-2 min-h-32"
          />
          <p className="text-sm text-gray-500 mt-1">
            Help the agent understand your business to have more natural conversations
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="px-8 py-3 bg-callyn-blue hover:bg-callyn-darkBlue"
        >
          Continue to Voice & Language
        </Button>
      </div>
    </div>
  );
};

export default Step2BasicInfo;
