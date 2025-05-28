
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AgentData } from "@/pages/CreateAgent";

interface Step6Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const crmOptions = [
  { value: "none", label: "No CRM Integration" },
  { value: "salesforce", label: "Salesforce" },
  { value: "hubspot", label: "HubSpot" },
  { value: "pipedrive", label: "Pipedrive" },
  { value: "zoho", label: "Zoho CRM" },
  { value: "custom", label: "Custom/Other" }
];

const leadSourceOptions = [
  "Website forms",
  "Social media ads",
  "Google Ads",
  "Email campaigns", 
  "Referrals",
  "Trade shows",
  "Cold outreach",
  "Content marketing"
];

const calendarOptions = [
  { value: "none", label: "No Calendar Integration" },
  { value: "calendly", label: "Calendly" },
  { value: "google", label: "Google Calendar" },
  { value: "outlook", label: "Microsoft Outlook" },
  { value: "acuity", label: "Acuity Scheduling" }
];

const Step6Integration = ({ data, updateData, onNext }: Step6Props) => {
  const [crmIntegration, setCrmIntegration] = useState(data.crmIntegration || "none");
  const [leadSources, setLeadSources] = useState<string[]>(data.leadSources);
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || "");
  const [calendarIntegration, setCalendarIntegration] = useState(data.calendarIntegration || "none");

  const handleLeadSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setLeadSources([...leadSources, source]);
    } else {
      setLeadSources(leadSources.filter(s => s !== source));
    }
  };

  const handleCreateAgent = () => {
    updateData({
      crmIntegration,
      leadSources,
      webhookUrl: webhookUrl || undefined,
      calendarIntegration: calendarIntegration !== "none" ? calendarIntegration : undefined
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Integration Settings</h2>
        <p className="text-gray-600">Connect your agent with your existing tools and workflows</p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {/* CRM Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CRM Integration</CardTitle>
            <CardDescription>Connect with your CRM to sync leads and call data</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={crmIntegration} onValueChange={setCrmIntegration}>
              <SelectTrigger>
                <SelectValue placeholder="Select your CRM" />
              </SelectTrigger>
              <SelectContent>
                {crmOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Sources</CardTitle>
            <CardDescription>Which channels will provide leads for this agent?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {leadSourceOptions.map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={source}
                    checked={leadSources.includes(source)}
                    onCheckedChange={(checked) => handleLeadSourceChange(source, checked as boolean)}
                  />
                  <Label htmlFor={source} className="text-sm">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Calendar Integration</CardTitle>
            <CardDescription>Allow your agent to book appointments automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={calendarIntegration} onValueChange={setCalendarIntegration}>
              <SelectTrigger>
                <SelectValue placeholder="Select calendar system" />
              </SelectTrigger>
              <SelectContent>
                {calendarOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Webhook URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Webhook URL (Optional)</CardTitle>
            <CardDescription>Receive real-time notifications about call events</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-domain.com/webhook"
              type="url"
            />
            <p className="text-sm text-gray-500 mt-2">
              We'll send POST requests with call data to this URL
            </p>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Ready to Create Your Agent</CardTitle>
            <CardDescription className="text-blue-700">
              Review your settings and create your AI agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Agent Type:</span>
                <Badge variant="secondary" className="capitalize">{data.agentType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Voice:</span>
                <span className="font-medium">{data.voiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Language:</span>
                <span className="font-medium">{data.primaryLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Method:</span>
                <Badge variant="outline" className="capitalize">{data.trainingMethod}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleCreateAgent}
          className="px-8 py-3 bg-callyn-blue hover:bg-callyn-darkBlue text-lg"
          size="lg"
        >
          Create Agent
        </Button>
      </div>
    </div>
  );
};

export default Step6Integration;
