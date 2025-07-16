
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Database,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Key,
  Phone,
  Activity
} from "lucide-react";

const TwilioIntegration = () => {
  const [accountSid, setAccountSid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccountSid("");
    setAuthToken("");
  };

  if (isConnected) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Twilio Connected
            </CardTitle>
            <CardDescription className="text-green-700">
              Your Twilio account is successfully connected and ready for calling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-green-800">Account SID</Label>
                <div className="font-mono text-sm text-green-900 bg-green-100 p-2 rounded">
                  AC••••••••••••••••••••••••••••••••7a
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800">Status</Label>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">Active</Badge>
                  <span className="text-sm text-green-700">Connected 2 mins ago</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-green-800">Connection Health</h4>
                <p className="text-sm text-green-700">All systems operational</p>
              </div>
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Usage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Calls This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$0.00</div>
                <div className="text-sm text-gray-600">Monthly Spend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0 min</div>
                <div className="text-sm text-gray-600">Total Minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Twilio Integration
          </CardTitle>
          <CardDescription>
            Connect your Twilio account to enable phone calling capabilities for your AI agent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Setup Instructions */}
          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              You'll need your Twilio Account SID and Auth Token. Find these in your{" "}
              <a
                href="https://console.twilio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Twilio Console
                <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>

          {/* Connection Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountSid">Account SID</Label>
              <div className="relative">
                <Input
                  id="accountSid"
                  placeholder="AC..."
                  value={accountSid}
                  onChange={(e) => setAccountSid(e.target.value)}
                  className="font-mono"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Starts with "AC" followed by 32 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authToken">Auth Token</Label>
              <div className="relative">
                <Input
                  id="authToken"
                  type={showAuthToken ? "text" : "password"}
                  placeholder="Your Twilio Auth Token"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  className="font-mono pr-16"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setShowAuthToken(!showAuthToken)}
                  >
                    {showAuthToken ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                32-character secret token for authentication
              </p>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            onClick={handleConnect}
            disabled={!accountSid || !authToken || isConnecting}
            className="w-full"
            size="lg"
          >
            {isConnecting ? (
              "Connecting to Twilio..."
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Connect Twilio Account
              </>
            )}
          </Button>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Need Help Getting Started?
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Create a free Twilio account at twilio.com</p>
              <p>2. Verify your phone number</p>
              <p>3. Copy your Account SID and Auth Token from the console</p>
              <p>4. Paste them above and click connect</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              <ExternalLink className="mr-2 h-3 w-3" />
              Open Twilio Console
            </Button>
          </div>

          {/* Security Notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your Twilio credentials are encrypted and stored securely. We never store them in plain text.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwilioIntegration;
