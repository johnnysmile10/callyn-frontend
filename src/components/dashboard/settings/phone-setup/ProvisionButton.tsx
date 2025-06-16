
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Clock, AlertTriangle } from "lucide-react";

interface ProvisionButtonProps {
  selectedNumber: string;
  isProvisioning: boolean;
  onProvision: () => void;
}

const ProvisionButton = ({ selectedNumber, isProvisioning, onProvision }: ProvisionButtonProps) => {
  if (!selectedNumber) return null;

  return (
    <div className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          You'll be charged $1.00/month for this phone number. You can cancel anytime.
        </AlertDescription>
      </Alert>
      
      <Button 
        onClick={onProvision}
        disabled={isProvisioning}
        className="w-full"
        size="lg"
      >
        {isProvisioning ? (
          <>
            <Clock className="mr-2 h-4 w-4 animate-spin" />
            Provisioning Number...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-4 w-4" />
            Provision {selectedNumber}
          </>
        )}
      </Button>
    </div>
  );
};

export default ProvisionButton;
