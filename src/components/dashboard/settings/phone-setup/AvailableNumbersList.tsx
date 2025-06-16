
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MapPin, CheckCircle } from "lucide-react";

interface PhoneNumber {
  number: string;
  location: string;
  price: string;
}

interface AvailableNumbersListProps {
  numbers: PhoneNumber[];
  selectedNumber: string;
  onNumberSelect: (number: string) => void;
}

const AvailableNumbersList = ({ numbers, selectedNumber, onNumberSelect }: AvailableNumbersListProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Available Numbers</Label>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {numbers.map((number, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedNumber === number.number 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onNumberSelect(number.number)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-lg font-mono font-medium">
                  {number.number}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {number.location}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{number.price}</Badge>
                {selectedNumber === number.number && (
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableNumbersList;
