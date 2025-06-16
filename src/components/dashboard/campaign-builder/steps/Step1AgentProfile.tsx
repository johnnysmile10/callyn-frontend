
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Briefcase, Building } from "lucide-react";

interface AgentProfileData {
  name: string;
  role: string;
  businessContext: string;
  personality: string;
}

interface Step1AgentProfileProps {
  data: AgentProfileData;
  onUpdate: (data: AgentProfileData) => void;
}

const Step1AgentProfile = ({ data, onUpdate }: Step1AgentProfileProps) => {
  const [profileData, setProfileData] = useState<AgentProfileData>(data);

  const handleUpdate = (field: keyof AgentProfileData, value: string) => {
    const updatedData = { ...profileData, [field]: value };
    setProfileData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <CardTitle>Agent Identity</CardTitle>
          </div>
          <CardDescription>
            Define your AI agent's basic profile and personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                placeholder="e.g., Sarah, Alex, Morgan"
                value={profileData.name}
                onChange={(e) => handleUpdate('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agent-role">Agent Role</Label>
              <Input
                id="agent-role"
                placeholder="e.g., Sales Representative, Account Executive"
                value={profileData.role}
                onChange={(e) => handleUpdate('role', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-context">Business Context</Label>
            <Textarea
              id="business-context"
              placeholder="Describe your business, what you sell, and your value proposition..."
              value={profileData.businessContext}
              onChange={(e) => handleUpdate('businessContext', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality">Agent Personality</Label>
            <Select
              value={profileData.personality}
              onValueChange={(value) => handleUpdate('personality', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select personality style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional & Direct</SelectItem>
                <SelectItem value="friendly">Friendly & Conversational</SelectItem>
                <SelectItem value="consultative">Consultative & Advisory</SelectItem>
                <SelectItem value="energetic">Energetic & Enthusiastic</SelectItem>
                <SelectItem value="expert">Expert & Authoritative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step1AgentProfile;
