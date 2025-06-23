
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

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
  if (numbers.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No numbers available for the selected criteria. Try adjusting your search or area code selection.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Numbers</h3>
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {numbers.map((number) => (
          <Card 
            key={number.number} 
            className={`cursor-pointer transition-colors ${
              selectedNumber === number.number 
                ? "border-blue-500 bg-blue-50" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => onNumberSelect(number.number)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-mono text-lg font-semibold">
                    {number.number}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    {number.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{number.price}/month</Badge>
                  {selectedNumber === number.number && (
                    <Button size="sm">Selected</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableNumbersList;
