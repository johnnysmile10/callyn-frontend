
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { LanguageMatch } from "../types/eliteGatewayTypes";

interface LanguageCardProps {
  language: LanguageMatch;
  index: number;
  onUpdate: (index: number, field: keyof LanguageMatch, value: any) => void;
  onRemove: (index: number) => void;
}

const LanguageCard = ({ language, index, onUpdate, onRemove }: LanguageCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium">Language {index + 1}</h5>
        <Button onClick={() => onRemove(index)} variant="outline" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={language.language}
            onValueChange={(value) => onUpdate(index, "language", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Input
            value={language.prompt}
            onChange={(e) => onUpdate(index, "prompt", e.target.value)}
            placeholder="Language-specific prompt..."
          />
        </div>
      </div>
    </Card>
  );
};

export default LanguageCard;
