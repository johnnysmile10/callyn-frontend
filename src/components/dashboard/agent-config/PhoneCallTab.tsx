
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Phone, Clock, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PhoneNumberSetup from "../settings/PhoneNumberSetup";
import TwilioIntegration from "../settings/TwilioIntegration";
import GatewaySetupCard from "../settings/gateway-setup/GatewaySetupCard";

const PhoneCallTab = () => {
  const { toast } = useToast();
  
  // Call timing settings
  const [callDuration, setCallDuration] = useState([3]); // minutes
  const [retryAttempts, setRetryAttempts] = useState("3");
  const [retryInterval, setRetryInterval] = useState("30"); // minutes
  const [enableVoicemail, setEnableVoicemail] = useState(true);
  const [voicemailAction, setVoicemailAction] = useState("leave-message");

  // Call quality settings
  const [enableCallRecording, setEnableCallRecording] = useState(true);
  const [callTimeouts, setCallTimeouts] = useState([30]); // seconds

  // Mock setup status - in real app this would come from backend
  const [phoneNumberSetup, setPhoneNumberSetup] = useState(false);
  const [twilioSetup, setTwilioSetup] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Phone and call settings have been updated successfully.",
    });
  };

  const getSetupProgress = () => {
    const requirements = [phoneNumberSetup, twilioSetup];
    const completed = requirements.filter(Boolean).length;
    return Math.round((completed / requirements.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Setup Status Overview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Setup Status
          </CardTitle>
          <CardDescription>
            Complete these requirements to enable calling functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Setup Progress</span>
            <Badge variant={getSetupProgress() === 100 ? "default" : "secondary"}>
              {getSetupProgress()}% Complete
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {phoneNumberSetup ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-500" />
              )}
              <span className="text-sm">Phone Number Setup</span>
              <Badge variant={phoneNumberSetup ? "default" : "outline"}>
                {phoneNumberSetup ? "Complete" : "Required"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {twilioSetup ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-500" />
              )}
              <span className="text-sm">Twilio Integration</span>
              <Badge variant={twilioSetup ? "default" : "outline"}>
                {twilioSetup ? "Complete" : "Required"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone Number Setup */}
      <PhoneNumberSetup />

      {/* Twilio Integration */}
      <TwilioIntegration />

      {/* Gateway Setup - NEW */}
      <GatewaySetupCard />

      {/* Call Timing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Call Timing & Retry Settings
          </CardTitle>
          <CardDescription>
            Configure how long calls should last and retry behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="call-duration">
              Maximum Call Duration: {callDuration[0]} minutes
            </Label>
            <Slider
              id="call-duration"
              min={1}
              max={10}
              step={1}
              value={callDuration}
              onValueChange={setCallDuration}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 min</span>
              <span>5 min</span>
              <span>10 min</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retry-attempts">Retry Attempts</Label>
              <Select value={retryAttempts} onValueChange={setRetryAttempts}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="2">2 attempts</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retry-interval">Retry Interval</Label>
              <Select value={retryInterval} onValueChange={setRetryInterval}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                  <SelectItem value="1440">1 day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voicemail Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Voicemail & Call Quality
          </CardTitle>
          <CardDescription>
            Configure voicemail behavior and call quality settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="enable-voicemail">Enable Voicemail Detection</Label>
              <p className="text-sm text-gray-600">
                Automatically detect when calls go to voicemail
              </p>
            </div>
            <Switch
              id="enable-voicemail"
              checked={enableVoicemail}
              onCheckedChange={setEnableVoicemail}
            />
          </div>

          {enableVoicemail && (
            <div className="space-y-2">
              <Label htmlFor="voicemail-action">Voicemail Action</Label>
              <Select value={voicemailAction} onValueChange={setVoicemailAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leave-message">Leave a message</SelectItem>
                  <SelectItem value="hang-up">Hang up immediately</SelectItem>
                  <SelectItem value="schedule-callback">Schedule callback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="call-timeout">
              Call Connection Timeout: {callTimeouts[0]} seconds
            </Label>
            <Slider
              id="call-timeout"
              min={15}
              max={60}
              step={5}
              value={callTimeouts}
              onValueChange={setCallTimeouts}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>15s</span>
              <span>30s</span>
              <span>60s</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="call-recording">Enable Call Recording</Label>
              <p className="text-sm text-gray-600">
                Record calls for quality assurance and training
              </p>
            </div>
            <Switch
              id="call-recording"
              checked={enableCallRecording}
              onCheckedChange={setEnableCallRecording}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Phone & Call Settings
        </Button>
      </div>
    </div>
  );
};

export default PhoneCallTab;
