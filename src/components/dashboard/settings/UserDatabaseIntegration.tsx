
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { 
  Database, 
  FileSpreadsheet, 
  Globe, 
  Table, 
  Upload,
  CheckCircle,
  AlertCircle,
  Settings,
  ExternalLink,
  Plus,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CSVLeadImporter from "../shared/CSVLeadImporter";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: "connected" | "not_connected" | "syncing";
  color: string;
  lastSync?: string;
  recordCount?: number;
}

const UserDatabaseIntegration = () => {
  const [activeDataSource, setActiveDataSource] = useState<"internal" | "external">("internal");
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [showCSVImporter, setShowCSVImporter] = useState(false);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [airtableToken, setAirtableToken] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const integrations: Integration[] = [
    {
      id: "google-sheets",
      name: "Google Sheets",
      description: "Sync leads directly from your Google Sheets",
      icon: FileSpreadsheet,
      status: connectedIntegrations.includes("google-sheets") ? "connected" : "not_connected",
      color: "green",
      lastSync: connectedIntegrations.includes("google-sheets") ? "2 hours ago" : undefined,
      recordCount: connectedIntegrations.includes("google-sheets") ? 1234 : undefined
    },
    {
      id: "notion",
      name: "Notion Database",
      description: "Connect to your Notion database for lead management",
      icon: Database,
      status: connectedIntegrations.includes("notion") ? "connected" : "not_connected",
      color: "gray",
      lastSync: connectedIntegrations.includes("notion") ? "1 hour ago" : undefined,
      recordCount: connectedIntegrations.includes("notion") ? 856 : undefined
    },
    {
      id: "airtable",
      name: "Airtable",
      description: "Sync with your Airtable base",
      icon: Table,
      status: connectedIntegrations.includes("airtable") ? "connected" : "not_connected",
      color: "blue",
      lastSync: connectedIntegrations.includes("airtable") ? "30 minutes ago" : undefined,
      recordCount: connectedIntegrations.includes("airtable") ? 567 : undefined
    },
    {
      id: "api",
      name: "Custom API",
      description: "Connect to your own API endpoint",
      icon: Globe,
      status: connectedIntegrations.includes("api") ? "connected" : "not_connected",
      color: "purple",
      lastSync: connectedIntegrations.includes("api") ? "5 minutes ago" : undefined,
      recordCount: connectedIntegrations.includes("api") ? 2341 : undefined
    }
  ];

  const handleConnect = (integrationId: string) => {
    let canConnect = false;
    
    switch (integrationId) {
      case "google-sheets":
        canConnect = !!googleSheetsUrl;
        break;
      case "notion":
        canConnect = !!notionToken;
        break;
      case "airtable":
        canConnect = !!airtableToken;
        break;
      case "api":
        canConnect = !!apiEndpoint && !!apiKey;
        break;
    }

    if (canConnect) {
      setConnectedIntegrations([...connectedIntegrations, integrationId]);
      toast({
        title: "Integration Connected",
        description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before connecting.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(connectedIntegrations.filter(id => id !== integrationId));
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const handleSync = (integrationId: string) => {
    toast({
      title: "Syncing Data",
      description: "Starting sync process...",
    });
    // Simulate sync process
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: "Your data has been synchronized successfully.",
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  if (showCSVImporter) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowCSVImporter(false)}
            className="gap-2"
          >
            ← Back to Database Settings
          </Button>
        </div>
        <CSVLeadImporter />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Database</h2>
        <p className="text-gray-600">
          Manage your lead data sources and choose how Callyn accesses your contacts
        </p>
      </div>

      {/* Data Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Data Source Configuration
          </CardTitle>
          <CardDescription>
            Choose where Callyn should get your lead data from
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={activeDataSource} onValueChange={(value: "internal" | "external") => setActiveDataSource(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="internal" id="internal" />
              <Label htmlFor="internal" className="font-medium">
                Use Callyn's Internal Database
              </Label>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              Upload CSV files and manage leads directly within Callyn
            </p>
            
            <div className="flex items-center space-x-2 mt-4">
              <RadioGroupItem value="external" id="external" />
              <Label htmlFor="external" className="font-medium">
                Connect External Database
              </Label>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              Sync with Google Sheets, Notion, Airtable, or your own API
            </p>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Internal Database Options */}
      {activeDataSource === "internal" && (
        <Card>
          <CardHeader>
            <CardTitle>Internal Lead Management</CardTitle>
            <CardDescription>
              Upload and manage your leads directly in Callyn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => setShowCSVImporter(true)}
                className="h-24 bg-blue-600 hover:bg-blue-700"
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6" />
                  <span>Upload CSV File</span>
                </div>
              </Button>
              
              <Button variant="outline" className="h-24">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Add Leads Manually</span>
                </div>
              </Button>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Current Status</h4>
              <p className="text-sm text-gray-600">
                You have <strong>1,247 leads</strong> in your internal database
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* External Database Integrations */}
      {activeDataSource === "external" && (
        <Tabs defaultValue="google-sheets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="google-sheets">Google Sheets</TabsTrigger>
            <TabsTrigger value="notion">Notion</TabsTrigger>
            <TabsTrigger value="airtable">Airtable</TabsTrigger>
            <TabsTrigger value="api">Custom API</TabsTrigger>
          </TabsList>

          <TabsContent value="google-sheets">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    Google Sheets Integration
                  </div>
                  <Badge variant={connectedIntegrations.includes("google-sheets") ? "default" : "secondary"}>
                    {getStatusIcon(integrations[0].status)}
                    {connectedIntegrations.includes("google-sheets") ? "Connected" : "Not Connected"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to your Google Sheets to automatically sync lead data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!connectedIntegrations.includes("google-sheets") ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="sheets-url">Google Sheets URL</Label>
                      <Input
                        id="sheets-url"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        value={googleSheetsUrl}
                        onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleConnect("google-sheets")}
                      disabled={!googleSheetsUrl}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Connect Google Sheets
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Connection Active</h4>
                      <p className="text-sm text-green-700">
                        Last sync: {integrations[0].lastSync} • {integrations[0].recordCount} records
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSync("google-sheets")} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button onClick={() => handleDisconnect("google-sheets")} variant="destructive">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notion">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-gray-600" />
                    Notion Database Integration
                  </div>
                  <Badge variant={connectedIntegrations.includes("notion") ? "default" : "secondary"}>
                    {getStatusIcon(integrations[1].status)}
                    {connectedIntegrations.includes("notion") ? "Connected" : "Not Connected"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to your Notion database for seamless lead management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!connectedIntegrations.includes("notion") ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="notion-token">Notion Integration Token</Label>
                      <Input
                        id="notion-token"
                        type="password"
                        placeholder="secret_..."
                        value={notionToken}
                        onChange={(e) => setNotionToken(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleConnect("notion")}
                      disabled={!notionToken}
                    >
                      Connect Notion
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Connection Active</h4>
                      <p className="text-sm text-gray-700">
                        Last sync: {integrations[1].lastSync} • {integrations[1].recordCount} records
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSync("notion")} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button onClick={() => handleDisconnect("notion")} variant="destructive">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="airtable">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Table className="h-5 w-5 text-blue-600" />
                    Airtable Integration
                  </div>
                  <Badge variant={connectedIntegrations.includes("airtable") ? "default" : "secondary"}>
                    {getStatusIcon(integrations[2].status)}
                    {connectedIntegrations.includes("airtable") ? "Connected" : "Not Connected"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Sync with your Airtable base for advanced lead organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!connectedIntegrations.includes("airtable") ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="airtable-token">Airtable Personal Access Token</Label>
                      <Input
                        id="airtable-token"
                        type="password"
                        placeholder="pat..."
                        value={airtableToken}
                        onChange={(e) => setAirtableToken(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleConnect("airtable")}
                      disabled={!airtableToken}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Connect Airtable
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Connection Active</h4>
                      <p className="text-sm text-blue-700">
                        Last sync: {integrations[2].lastSync} • {integrations[2].recordCount} records
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSync("airtable")} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button onClick={() => handleDisconnect("airtable")} variant="destructive">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Custom API Integration
                  </div>
                  <Badge variant={connectedIntegrations.includes("api") ? "default" : "secondary"}>
                    {getStatusIcon(integrations[3].status)}
                    {connectedIntegrations.includes("api") ? "Connected" : "Not Connected"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to your own API endpoint for custom data sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!connectedIntegrations.includes("api") ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint URL</Label>
                      <Input
                        id="api-endpoint"
                        placeholder="https://api.yourcompany.com/leads"
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleConnect("api")}
                      disabled={!apiEndpoint || !apiKey}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Connect API
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Connection Active</h4>
                      <p className="text-sm text-purple-700">
                        Last sync: {integrations[3].lastSync} • {integrations[3].recordCount} records
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSync("api")} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button onClick={() => handleDisconnect("api")} variant="destructive">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Sync Settings
          </CardTitle>
          <CardDescription>
            Configure how your data is synchronized
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-sync">Automatic Sync</Label>
              <p className="text-sm text-gray-600">Automatically sync data every hour</p>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="bidirectional">Bidirectional Sync</Label>
              <p className="text-sm text-gray-600">Sync call results back to your database</p>
            </div>
            <Switch id="bidirectional" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDatabaseIntegration;
