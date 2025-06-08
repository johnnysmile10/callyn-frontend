
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building2 } from "lucide-react";

interface OutreachHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const OutreachHeader = ({ currentStep, totalSteps }: OutreachHeaderProps) => {
  const progressPercentage = ((currentStep - 1) / totalSteps) * 100;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-blue-900">Callyn Outreach System</CardTitle>
            <CardDescription className="text-blue-700">
              Complete setup to launch your AI-powered outreach campaigns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-blue-700 mb-2">
              <span>Setup Progress</span>
              <span>{currentStep - 1} of {totalSteps} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutreachHeader;
