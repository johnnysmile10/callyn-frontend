
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PhoneCall } from "lucide-react";
import { AgentData } from "@/pages/CreateAgent";

interface Step1Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const Step1AgentType = ({ data, updateData, onNext }: Step1Props) => {
  const handleTypeSelect = (type: "inbound" | "outbound") => {
    updateData({ agentType: type });
    // Auto-advance to next step after selection
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">What type of agent do you want to create?</h2>
        <p className="text-gray-600">Choose the primary function for your AI agent</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            data.agentType === "outbound" ? "ring-2 ring-callyn-blue" : ""
          }`}
          onClick={() => handleTypeSelect("outbound")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-callyn-blue rounded-full flex items-center justify-center mb-4">
              <PhoneCall className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Outbound Agent</CardTitle>
            <CardDescription>
              Makes calls to prospects and leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Lead qualification and scoring</li>
              <li>• Appointment booking</li>
              <li>• Follow-up campaigns</li>
              <li>• Customer surveys</li>
              <li>• Event invitations</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            data.agentType === "inbound" ? "ring-2 ring-callyn-blue" : ""
          }`}
          onClick={() => handleTypeSelect("inbound")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Inbound Agent</CardTitle>
            <CardDescription>
              Answers incoming customer calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Customer support</li>
              <li>• Order taking and processing</li>
              <li>• Information requests</li>
              <li>• Technical support</li>
              <li>• General inquiries</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Don't worry, you can always create more agents later
        </p>
      </div>
    </div>
  );
};

export default Step1AgentType;
