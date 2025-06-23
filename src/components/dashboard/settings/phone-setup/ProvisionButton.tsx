
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

interface ProvisionButtonProps {
  selectedNumber: string;
  isProvisioning: boolean;
  onProvision: () => void;
}

const ProvisionButton = ({ selectedNumber, isProvisioning, onProvision }: ProvisionButtonProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t">
      <div className="text-sm text-gray-600">
        {selectedNumber ? (
          <>Selected: <span className="font-mono font-semibold">{selectedNumber}</span></>
        ) : (
          "Please select a phone number to provision"
        )}
      </div>
      <Button
        onClick={onProvision}
        disabled={!selectedNumber || isProvisioning}
        className="bg-blue-600 hover:bg-blue-700 min-w-fit"
      >
        {isProvisioning ? (
          <>
            <Clock className="mr-2 h-4 w-4 animate-spin" />
            Provisioning...
          </>
        ) : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Provision Number
          </>
        )}
      </Button>
    </div>
  );
};

export default ProvisionButton;
