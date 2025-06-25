
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import SupportHeader from "./SupportHeader";

interface SupportSuccessProps {
  onSubmitAnother: () => void;
}

const SupportSuccess = ({ onSubmitAnother }: SupportSuccessProps) => {
  return (
    <div className="space-y-6">
      <SupportHeader />

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Request Submitted Successfully!</h3>
          </div>
          <p className="text-green-700 mb-4">
            Thank you for reaching out to our support team. We've received your request and will review it promptly.
          </p>
          <Button 
            onClick={onSubmitAnother}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSuccess;
