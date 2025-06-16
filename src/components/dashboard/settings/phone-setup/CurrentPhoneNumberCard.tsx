
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";

const CurrentPhoneNumberCard = () => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          Your Phone Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-mono font-bold text-green-900">
              +1 (555) 123-4567
            </div>
            <div className="text-sm text-green-700">
              Active since Dec 15, 2024 • $1.00/month
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPhoneNumberCard;
