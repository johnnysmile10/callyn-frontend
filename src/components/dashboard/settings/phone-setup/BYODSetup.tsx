
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Phone
} from "lucide-react";
import CountrySelector from "../CountrySelector";

const BYODSetup = () => {
  const [currentNumber, setCurrentNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [currentProvider, setCurrentProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePortRequest = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const isFormValid = currentNumber && currentProvider && accountNumber;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Bring Your Own Phone Number
          </CardTitle>
          <CardDescription>
            Port your existing phone number to use with your AI agent. The process typically takes 1-3 business days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              1-3 business days
            </Badge>
            <Badge variant="outline">
              No service interruption
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Number Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Current Number Information
          </CardTitle>
          <CardDescription>
            Provide details about the phone number you want to port
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-number">Phone Number</Label>
            <Input
              id="current-number"
              placeholder="+1 (555) 123-4567"
              value={currentNumber}
              onChange={(e) => setCurrentNumber(e.target.value)}
            />
          </div>

          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />

          <div className="space-y-2">
            <Label htmlFor="current-provider">Current Service Provider</Label>
            <Input
              id="current-provider"
              placeholder="e.g., Verizon, AT&T, T-Mobile"
              value={currentProvider}
              onChange={(e) => setCurrentProvider(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Account Information
          </CardTitle>
          <CardDescription>
            Information needed to authorize the port request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              placeholder="Your account number with current provider"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin-code">PIN/Password (if applicable)</Label>
            <Input
              id="pin-code"
              type="password"
              placeholder="Account PIN or password"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional Information</Label>
            <Textarea
              id="additional-info"
              placeholder="Any additional details about your account or special requirements..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Make sure your current account is in good standing and that you are the authorized account holder.
          The name on your current account must match the name on file for this service.
        </AlertDescription>
      </Alert>

      {/* Submit Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-gray-600">
              By submitting this request, you authorize us to port your number and understand that the process may take 1-3 business days.
            </div>
            <Button
              onClick={handlePortRequest}
              disabled={!isFormValid || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 min-w-fit"
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Port Request
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BYODSetup;
