
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FieldMapping } from './types';
import { REQUIRED_FIELDS } from './constants';

interface MappingStepProps {
  csvHeaders: string[];
  csvDataLength: number;
  fieldMappings: FieldMapping[];
  onMappingUpdate: (callynField: string, csvField: string) => void;
  onProceed: () => void;
  onReset: () => void;
}

const MappingStep = ({ 
  csvHeaders, 
  csvDataLength, 
  fieldMappings, 
  onMappingUpdate, 
  onProceed, 
  onReset 
}: MappingStepProps) => {
  const validateMappings = (): boolean => {
    const requiredFields = REQUIRED_FIELDS.filter(f => f.required);
    const mappedRequired = requiredFields.filter(field => 
      fieldMappings.some(mapping => mapping.callynField === field.id)
    );
    
    if (mappedRequired.length !== requiredFields.length) {
      toast({
        title: "Missing Required Fields",
        description: "Please map all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleProceed = () => {
    if (validateMappings()) {
      onProceed();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Map Your Fields</h3>
        <Badge variant="outline">{csvDataLength} records found</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REQUIRED_FIELDS.map(field => (
          <div key={field.id} className="space-y-2">
            <Label className="flex items-center gap-2">
              {field.label}
              {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
            </Label>
            <Select 
              value={fieldMappings.find(m => m.callynField === field.id)?.csvField || ''}
              onValueChange={(value) => value && onMappingUpdate(field.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select CSV column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">-- No mapping --</SelectItem>
                {csvHeaders.map(header => (
                  <SelectItem key={header} value={header}>{header}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
        <Button onClick={handleProceed} className="bg-blue-600 hover:bg-blue-700">
          Preview Import
        </Button>
      </div>
    </div>
  );
};

export default MappingStep;
