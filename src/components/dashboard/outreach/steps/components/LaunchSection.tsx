
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Rocket, Play, AlertCircle } from "lucide-react";

interface LaunchSectionProps {
  allChecksPass: boolean;
  isLaunching: boolean;
  onLaunch: () => void;
}

const LaunchSection = ({ allChecksPass, isLaunching, onLaunch }: LaunchSectionProps) => {
  return (
    <Card className="border-2 border-dashed border-green-200 bg-green-50">
      <CardContent className="pt-6">
        {allChecksPass ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800">All Systems Ready!</h3>
              <p className="text-green-700 mt-1">
                Your campaign is configured and ready to start making calls
              </p>
            </div>
            <Button 
              onClick={onLaunch}
              disabled={isLaunching}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isLaunching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Launching Campaign...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Campaign
                </>
              )}
            </Button>
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please complete all required steps before launching your campaign.
              Go back to previous steps to finish the configuration.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default LaunchSection;
