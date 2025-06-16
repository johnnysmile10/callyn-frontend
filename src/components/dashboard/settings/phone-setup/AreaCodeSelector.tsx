
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AreaCode {
  code: string;
  location: string;
}

interface AreaCodeSelectorProps {
  selectedAreaCode: string;
  onAreaCodeChange: (code: string) => void;
  areaCodes: AreaCode[];
}

const AreaCodeSelector = ({ selectedAreaCode, onAreaCodeChange, areaCodes }: AreaCodeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Area Code (Optional)</Label>
      <Select value={selectedAreaCode} onValueChange={onAreaCodeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Any area code" />
        </SelectTrigger>
        <SelectContent>
          {areaCodes.map((area) => (
            <SelectItem key={area.code} value={area.code}>
              <div className="flex items-center gap-2">
                <span>{area.code}</span>
                <span className="text-sm text-gray-500">- {area.location}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AreaCodeSelector;
