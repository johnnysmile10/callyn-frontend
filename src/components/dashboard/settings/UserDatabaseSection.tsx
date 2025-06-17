
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Upload, Users, Settings, FileText, Download } from "lucide-react";
import CSVLeadImporter from "../shared/CSVLeadImporter";
import UserDatabaseIntegration from "./UserDatabaseIntegration";

const UserDatabaseSection = () => {
  const [activeTab, setActiveTab] = useState("import");
  const [leadCount, setLeadCount] = useState(0);

  const handleLeadsImported = (count: number) => {
    setLeadCount(prev => prev + count);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Database</h1>
          <p className="text-gray-600 mt-1">
            Import, manage, and organize your contact lists and lead databases
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Database className="h-3 w-3 mr-1" />
            {leadCount} Contacts
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Data
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage Lists
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Import Contact Lists
              </CardTitle>
              <CardDescription>
                Upload CSV files containing your leads and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CSVLeadImporter onLeadsImported={handleLeadsImported} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Contact List Management
              </CardTitle>
              <CardDescription>
                Organize and segment your contact databases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Contact Lists Yet</h3>
                <p className="text-gray-600 mb-4">
                  Import your first contact list to start organizing your leads
                </p>
                <Button onClick={() => setActiveTab("import")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <UserDatabaseIntegration />
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Export Data
              </CardTitle>
              <CardDescription>
                Download your contact lists and call results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Export Options</h3>
                <p className="text-gray-600 mb-4">
                  Export your data in various formats (CSV, Excel, JSON)
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Contacts (CSV)
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Export Call Results (Excel)
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Import contacts first to enable export functionality
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDatabaseSection;
