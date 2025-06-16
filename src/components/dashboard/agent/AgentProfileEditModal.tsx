
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AgentProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessInfo: {
    name: string;
    industry: string;
    targetAudience: string;
    mainGoal: string;
  };
  onSave: (businessInfo: {
    name: string;
    industry: string;
    targetAudience: string;
    mainGoal: string;
  }) => void;
}

const INDUSTRIES = [
  "Technology",
  "Healthcare", 
  "Finance",
  "Real Estate",
  "Education",
  "Retail",
  "Manufacturing",
  "Marketing",
  "Consulting",
  "Other"
];

const AgentProfileEditModal = ({ 
  isOpen, 
  onClose, 
  businessInfo, 
  onSave 
}: AgentProfileEditModalProps) => {
  const [formData, setFormData] = useState(businessInfo);

  const handleSave = () => {
    onSave(formData);
    toast({
      title: "Profile Updated",
      description: "Your agent profile has been updated successfully.",
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Edit Agent Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleChange('industry', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="target-audience">Target Audience</Label>
            <Input
              id="target-audience"
              value={formData.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              placeholder="Describe your target audience"
            />
          </div>

          <div>
            <Label htmlFor="main-goal">Main Goal</Label>
            <Textarea
              id="main-goal"
              value={formData.mainGoal}
              onChange={(e) => handleChange('mainGoal', e.target.value)}
              placeholder="What is the main goal for your agent?"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentProfileEditModal;
