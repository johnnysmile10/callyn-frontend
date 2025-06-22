
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Phone, 
  Clock,
  Download,
  AlertTriangle,
  Settings
} from "lucide-react";

interface PhoneNumber {
  id: string;
  number: string;
  status: "active" | "porting" | "pending" | "failed";
  type: "provisioned" | "ported";
  activatedAt?: string;
  monthlyRate: string;
  portingProgress?: {
    step: number;
    totalSteps: number;
    currentStatus: string;
    estimatedCompletion?: string;
  };
}

const PhoneNumberManagement = () => {
  // Mock data - in real app this would come from backend
  const [phoneNumbers] = useState<PhoneNumber[]>([
    {
      id: "1",
      number: "+1 (555) 123-4567",
      status: "active",
      type: "provisioned",
      activatedAt: "Dec 15, 2024",
      monthlyRate: "$1.00"
    },
    {
      id: "2", 
      number: "+1 (555) 987-6543",
      status: "porting",
      type: "ported",
      monthlyRate: "$1.00",
      portingProgress: {
        step: 2,
        totalSteps: 4,
        currentStatus: "Awaiting carrier approval",
        estimatedCompletion: "Dec 22, 2024"
      }
    }
  ]);

  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "porting":
        return <Badge className="bg-blue-100 text-blue-800">Porting</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "ported" ? <Download className="h-4 w-4" /> : <Phone className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {phoneNumbers.map((phoneNumber) => (
        <Card key={phoneNumber.id} className={phoneNumber.status === "active" ? "border-green-200 bg-green-50" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              {phoneNumber.status === "active" ? (
                <CheckCircle className="h-5 w-5" />
              ) : phoneNumber.status === "porting" ? (
                <Clock className="h-5 w-5 text-blue-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              Your Phone Number
              <div className="flex items-center gap-2 ml-auto">
                {getTypeIcon(phoneNumber.type)}
                {getStatusBadge(phoneNumber.status)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-mono font-bold text-green-900">
                    {phoneNumber.number}
                  </div>
                  <div className="text-sm text-green-700">
                    {phoneNumber.status === "active" && phoneNumber.activatedAt && (
                      <>Active since {phoneNumber.activatedAt} • {phoneNumber.monthlyRate}/month</>
                    )}
                    {phoneNumber.status === "porting" && (
                      <>Porting in progress • {phoneNumber.monthlyRate}/month when active</>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(phoneNumber.number)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage
                  </Button>
                </div>
              </div>

              {/* Porting Progress */}
              {phoneNumber.status === "porting" && phoneNumber.portingProgress && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Porting Progress</span>
                        <span className="text-sm">
                          Step {phoneNumber.portingProgress.step} of {phoneNumber.portingProgress.totalSteps}
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(phoneNumber.portingProgress.step / phoneNumber.portingProgress.totalSteps) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm">
                        <div><strong>Current Status:</strong> {phoneNumber.portingProgress.currentStatus}</div>
                        {phoneNumber.portingProgress.estimatedCompletion && (
                          <div><strong>Estimated Completion:</strong> {phoneNumber.portingProgress.estimatedCompletion}</div>
                        )}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PhoneNumberManagement;
