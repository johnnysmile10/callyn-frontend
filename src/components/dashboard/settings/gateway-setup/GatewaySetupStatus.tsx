
import { CheckCircle, AlertCircle } from "lucide-react";
import { GatewaySetupData } from "./types/gatewayTypes";

interface GatewaySetupStatusProps {
  gatewaySetup: GatewaySetupData;
  isSetupComplete: boolean;
}

const GatewaySetupStatus = ({ gatewaySetup, isSetupComplete }: GatewaySetupStatusProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      {isSetupComplete ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <AlertCircle className="h-5 w-5 text-orange-500" />
      )}
      <div>
        <p className="text-sm font-medium">
          {isSetupComplete ? "Setup Complete" : "Setup Required"}
        </p>
        <p className="text-sm text-gray-600">
          {isSetupComplete 
            ? `${gatewaySetup.menuOptions.length} menu option(s) configured`
            : "Add at least one menu option to complete setup"
          }
        </p>
      </div>
    </div>
  );
};

export default GatewaySetupStatus;
