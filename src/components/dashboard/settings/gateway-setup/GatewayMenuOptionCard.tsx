
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit3 } from "lucide-react";
import { GatewayMenuOption, GATEWAY_ACTION_TYPES } from "./types/gatewayTypes";

interface GatewayMenuOptionCardProps {
  option: GatewayMenuOption;
  onUpdate: (option: GatewayMenuOption) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onEditToggle: () => void;
}

const GatewayMenuOptionCard = ({ 
  option, 
  onUpdate, 
  onDelete, 
  isEditing, 
  onEditToggle 
}: GatewayMenuOptionCardProps) => {
  const handleFieldChange = (field: keyof GatewayMenuOption, value: any) => {
    onUpdate({
      ...option,
      [field]: value
    });
  };

  const handleActionChange = (field: keyof GatewayMenuOption['action'], value: any) => {
    onUpdate({
      ...option,
      action: {
        ...option.action,
        [field]: value
      }
    });
  };

  const getActionTypeLabel = (type: string) => {
    return GATEWAY_ACTION_TYPES.find(action => action.value === type)?.label || type;
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Menu Option</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{getActionTypeLabel(option.action.type)}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditToggle}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(option.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor={`prompt-${option.id}`}>Menu Prompt</Label>
              <Input
                id={`prompt-${option.id}`}
                placeholder="e.g., 'Press 1 for sales, Press 2 for support'"
                value={option.prompt}
                onChange={(e) => handleFieldChange('prompt', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`action-${option.id}`}>Action Type</Label>
                <Select
                  value={option.action.type}
                  onValueChange={(value) => handleActionChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GATEWAY_ACTION_TYPES.map((action) => (
                      <SelectItem key={action.value} value={action.value}>
                        <div>
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs text-gray-500">{action.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(option.action.type === 'press_key' || option.action.type === 'speak') && (
                <div className="space-y-2">
                  <Label htmlFor={`value-${option.id}`}>
                    {option.action.type === 'press_key' ? 'Key to Press' : 'Text to Speak'}
                  </Label>
                  <Input
                    id={`value-${option.id}`}
                    placeholder={option.action.type === 'press_key' ? "1, 2, *, #, etc." : "Text to speak"}
                    value={option.action.value || ''}
                    onChange={(e) => handleActionChange('value', e.target.value)}
                  />
                </div>
              )}

              {option.action.type === 'wait' && (
                <div className="space-y-2">
                  <Label htmlFor={`duration-${option.id}`}>Wait Duration (seconds)</Label>
                  <Input
                    id={`duration-${option.id}`}
                    type="number"
                    placeholder="5"
                    value={option.action.duration || ''}
                    onChange={(e) => handleActionChange('duration', parseInt(e.target.value))}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`instructions-${option.id}`}>Additional Instructions</Label>
              <Textarea
                id={`instructions-${option.id}`}
                placeholder="Any special instructions for handling this menu option..."
                value={option.instructions || ''}
                onChange={(e) => handleFieldChange('instructions', e.target.value)}
                rows={3}
              />
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Prompt:</p>
              <p className="text-sm text-gray-600">{option.prompt || 'No prompt specified'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Action:</p>
                <p className="text-sm text-gray-600">
                  {getActionTypeLabel(option.action.type)}
                  {option.action.value && ` (${option.action.value})`}
                  {option.action.duration && ` (${option.action.duration}s)`}
                </p>
              </div>
            </div>

            {option.instructions && (
              <div>
                <p className="text-sm font-medium text-gray-700">Instructions:</p>
                <p className="text-sm text-gray-600">{option.instructions}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GatewayMenuOptionCard;
