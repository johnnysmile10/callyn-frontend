
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, BarChart } from "lucide-react";
import DashboardSalesTools from "./DashboardSalesTools";
import DashboardCallsAndActivity from "./DashboardCallsAndActivity";
import DashboardInsights from "./DashboardInsights";

const DashboardCampaignManager = () => {
  const [activeTab, setActiveTab] = useState("leads");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calendar className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Manager</h1>
          <p className="text-gray-600">
            Manage your lead lists, campaigns, and track performance
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lead Lists
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          <DashboardSalesTools />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <DashboardCallsAndActivity />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <DashboardInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCampaignManager;
