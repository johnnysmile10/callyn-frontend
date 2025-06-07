
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building, Target, ArrowRight } from "lucide-react";

interface AgentProfileStepProps {
  onComplete: (data: any) => void;
  initialData: any;
  isCompleted: boolean;
}

const AgentProfileStep = ({ onComplete, initialData, isCompleted }: AgentProfileStepProps) => {
  const [formData, setFormData] = useState({
    agentName: initialData.profile?.agentName || "",
    role: initialData.profile?.role || "",
    company: initialData.profile?.company || "",
    industry: initialData.profile?.industry || "",
    experience: initialData.profile?.experience || "",
    personality: initialData.profile?.personality || "",
    ...initialData.profile
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.agentName.trim()) newErrors.agentName = "Agent name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.personality.trim()) newErrors.personality = "Personality description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Step 1: Agent Profile
        </CardTitle>
        <CardDescription>
          Define your AI agent's identity and professional background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="agentName">Agent Name *</Label>
            <Input
              id="agentName"
              value={formData.agentName}
              onChange={(e) => handleInputChange("agentName", e.target.value)}
              placeholder="e.g., Sarah Johnson"
              className={errors.agentName ? "border-red-500" : ""}
            />
            {errors.agentName && <p className="text-sm text-red-500">{errors.agentName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role/Title *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="e.g., Sales Representative"
              className={errors.role ? "border-red-500" : ""}
            />
            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="e.g., TechSolutions Inc."
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="personality">Agent Personality & Communication Style *</Label>
          <Textarea
            id="personality"
            value={formData.personality}
            onChange={(e) => handleInputChange("personality", e.target.value)}
            placeholder="Describe how your agent should communicate (e.g., friendly and professional, direct and results-focused, consultative and empathetic...)"
            className={`min-h-24 ${errors.personality ? "border-red-500" : ""}`}
          />
          {errors.personality && <p className="text-sm text-red-500">{errors.personality}</p>}
          <p className="text-sm text-muted-foreground">
            This helps shape your agent's conversation style and approach to prospects.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} size="lg">
            Continue to Script Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentProfileStep;
