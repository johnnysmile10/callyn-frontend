
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Phone, Clock, Volume2, ArrowRight } from "lucide-react";
import { LiteGatewayMenuOption } from "../types/liteGatewayTypes";

interface LiteMenuOptionCardProps {
  option: LiteGatewayMenuOption;
  onEdit: (option: LiteGatewayMenuOption) => void;
  onDelete: (optionId: string) => void;
}

const LiteMenuOptionCard = ({ option, onEdit, onDelete }: LiteMenuOptionCardProps) => {
  const getActionIcon = () => {
    switch (option.action.type) {
      case 'press_key': return <Phone className="h-4 w-4" />;
      case 'wait': return <Clock className="h-4 w-4" />;
      case 'speak': return <Volume2 className="h-4 w-4" />;
      case 'transfer': return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getActionLabel = () => {
    switch (option.action.type) {
      case 'press_key': return `Press ${option.action.value}`;
      case 'wait': return `Wait ${option.action.duration}s`;
      case 'speak': return `Say "${option.action.value}"`;
      case 'transfer': return `Transfer to ${option.action.value}`;
    }
  };

  const getActionColor = () => {
    switch (option.action.type) {
      case 'press_key': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'wait': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'speak': return 'bg-green-100 text-green-700 border-green-300';
      case 'transfer': return 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">When you hear:</h4>
              <p className="text-sm text-gray-600 mt-1">"{option.prompt}"</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Action:</span>
              <Badge className={getActionColor()}>
                {getActionIcon()}
                <span className="ml-1">{getActionLabel()}</span>
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button 
              onClick={() => onEdit(option)} 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              onClick={() => onDelete(option.id)} 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiteMenuOptionCard;
