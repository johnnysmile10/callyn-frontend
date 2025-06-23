
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Label htmlFor="area-code">Area Code</Label>
      <Select value={selectedAreaCode} onValueChange={onAreaCodeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select area code" />
        </SelectTrigger>
        <SelectContent>
          {areaCodes.map((areaCode) => (
            <SelectItem key={areaCode.code} value={areaCode.code}>
              {areaCode.code} - {areaCode.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AreaCodeSelector;
