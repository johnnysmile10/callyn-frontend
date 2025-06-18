
import { CheckCircle, Download, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context";
import { useEffect } from "react";

interface CompleteStepProps {
  importedCount: number;
  onStartOver: () => void;
}

const CompleteStep = ({ importedCount, onStartOver }: CompleteStepProps) => {
  const { updateProgressState } = useAuth();

  // Mark leads as imported when this step is reached
  useEffect(() => {
    if (importedCount > 0) {
      updateProgressState({ hasLeads: true });
    }
  }, [importedCount, updateProgressState]);

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Import Complete!</h3>
        <p className="text-gray-600">
          Successfully imported <span className="font-semibold text-green-600">{importedCount}</span> leads to your database
        </p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Users className="h-5 w-5" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            Now that you have leads imported, you can:
          </p>
          <ul className="text-left space-y-2 text-blue-600">
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Create targeted campaigns
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Configure voice settings
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Launch your first outreach
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-center">
        <Button onClick={onStartOver} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Import More Leads
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ArrowRight className="mr-2 h-4 w-4" />
          Continue Setup
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;
