
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Phone, 
  Globe, 
  Calendar, 
  Database,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PhoneNumberSetup from "./PhoneNumberSetup";
import TwilioIntegration from "./TwilioIntegration";
import LanguageVoiceSettings from "./LanguageVoiceSettings";
import CRMCalendarIntegrations from "./CRMCalendarIntegrations";

const SettingsIntegrationsSection = () => {
  const { userAgent, onboardingData } = useAuth();
  const [activeTab, setActiveTab] = useState("phone");

  // Mock setup status - in real app this would come from your backend
  const setupStatus = {
    phoneNumber: false,
    twilioIntegration: false,
    languageSettings: true, // Already configured from onboarding
    crmIntegration: false,
    calendarIntegration: false
  };

  const getOverallProgress = () => {
    const total = Object.keys(setupStatus).length;
    const completed = Object.values(setupStatus).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const integrationCategories = [
    {
      id: "phone",
      title: "Phone Number",
      description: "Get your dedicated phone number",
      icon: Phone,
      status: setupStatus.phoneNumber,
      required: true
    },
    {
      id: "twilio",
      title: "Twilio Integration",
      description: "Connect your Twilio account for calling",
      icon: Database,
      status: setupStatus.twilioIntegration,
      required: true
    },
    {
      id: "language",
      title: "Language & Voice",
      description: "Configure voice and language settings",
      icon: Globe,
      status: setupStatus.languageSettings,
      required: false
    },
    {
      id: "integrations",
      title: "CRM & Calendar",
      description: "Connect your business tools",
      icon: Calendar,
      status: setupStatus.crmIntegration || setupStatus.calendarIntegration,
      required: false
    }
  ];

  if (!userAgent && !onboardingData) {
    return (
      <div className="text-center py-12">
        <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings Not Available</h2>
        <p className="text-gray-600 mb-6">Complete your agent setup first to access settings.</p>
        <Button onClick={() => window.location.href = '/onboarding'}>
          Complete Setup
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings & Integrations</h1>
          <p className="text-gray-600 mt-1">
            Complete your setup to fully activate your AI agent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Setup Progress</div>
            <div className="text-lg font-bold text-blue-600">{getOverallProgress()}%</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Setup Overview
          </CardTitle>
          <CardDescription>
            Complete these integrations to unlock your AI agent's full potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrationCategories.map((category) => (
              <div 
                key={category.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  activeTab === category.id 
                    ? 'border-blue-500 bg-blue-100' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <category.icon className="h-5 w-5 text-gray-600" />
                  {category.status ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {category.title}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {category.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={category.status ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {category.status ? "Complete" : "Pending"}
                  </Badge>
                  {category.required && (
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone
          </TabsTrigger>
          <TabsTrigger value="twilio" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Twilio
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phone" className="mt-6">
          <PhoneNumberSetup />
        </TabsContent>

        <TabsContent value="twilio" className="mt-6">
          <TwilioIntegration />
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <LanguageVoiceSettings />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <CRMCalendarIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsIntegrationsSection;
