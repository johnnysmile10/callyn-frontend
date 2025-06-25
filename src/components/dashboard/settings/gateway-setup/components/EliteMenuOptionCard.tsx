
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Save, X, Crown, Brain, Globe } from "lucide-react";
import { EliteGatewayMenuOption } from "../types/eliteGatewayTypes";

interface EliteMenuOptionCardProps {
  option: EliteGatewayMenuOption;
  onUpdate: (option: EliteGatewayMenuOption) => void;
  onDelete: (optionId: string) => void;
  isEditing: boolean;
  onEditToggle: () => void;
}

const EliteMenuOptionCard = ({ 
  option, 
  onUpdate, 
  onDelete, 
  isEditing, 
  onEditToggle 
}: EliteMenuOptionCardProps) => {
  const [editedOption, setEditedOption] = useState<EliteGatewayMenuOption>(option);

  const handleSave = () => {
    onUpdate(editedOption);
    onEditToggle();
  };

  const handleCancel = () => {
    setEditedOption(option);
    onEditToggle();
  };

  if (isEditing) {
    return (
      <Card className="border-purple-200">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-purple-700">Edit Elite Menu Option</h4>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prompt Detection</Label>
              <Textarea
                value={editedOption.prompt}
                onChange={(e) => setEditedOption(prev => ({ ...prev, prompt: e.target.value }))}
                placeholder="Enter keywords or phrases to detect..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select
                value={editedOption.action.type}
                onValueChange={(value) => setEditedOption(prev => ({
                  ...prev,
                  action: { ...prev.action, type: value as any }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="press_key">Press Key</SelectItem>
                  <SelectItem value="speak">Speak</SelectItem>
                  <SelectItem value="wait">Wait</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Action Value</Label>
              <Input
                value={editedOption.action.value}
                onChange={(e) => setEditedOption(prev => ({
                  ...prev,
                  action: { ...prev.action, value: e.target.value }
                }))}
                placeholder="Enter action value..."
              />
            </div>

            <div className="space-y-2">
              <Label>Confidence Threshold</Label>
              <Input
                type="number"
                min="0.1"
                max="1"
                step="0.1"
                value={editedOption.confidenceThreshold || 0.7}
                onChange={(e) => setEditedOption(prev => ({
                  ...prev,
                  confidenceThreshold: parseFloat(e.target.value)
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Elite Menu Option</h4>
              <Badge variant="outline" className="border-purple-200 text-purple-700">
                ID: {option.id}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Prompt Detection:</span>
                <p className="text-sm text-gray-600 mt-1">{option.prompt}</p>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Action:</span>
                  <p className="text-sm text-gray-600">
                    {option.action.type}: {option.action.value}
                  </p>
                </div>
                {option.confidenceThreshold && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Confidence:</span>
                    <p className="text-sm text-gray-600">
                      {Math.round(option.confidenceThreshold * 100)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Elite Features Indicators */}
              <div className="flex gap-2 flex-wrap">
                {option.languages && option.languages.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    {option.languages.length} Language(s)
                  </Badge>
                )}
                {option.voiceTags && option.voiceTags.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    Voice Tags
                  </Badge>
                )}
                {option.learningData && (
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                    AI Learning: {Math.round(option.learningData.successRate)}% Success
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={onEditToggle} variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button onClick={() => onDelete(option.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EliteMenuOptionCard;
