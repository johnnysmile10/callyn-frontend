
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, BarChart } from "lucide-react";
import LeadListsTab from "./campaign-manager/LeadListsTab";
import CampaignsTab from "./campaign-manager/CampaignsTab";
import ResultsTab from "./campaign-manager/ResultsTab";

import ApiService from "@/context/services/apiService";
import { mapApiCampaignToCampaign } from "@/utils/campaign";

const DashboardCampaignManager = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState("lead-lists");

  useEffect(() => {
    (async () => {
      const data = await ApiService.get('/campaign');
      setCampaigns(data.map(mapApiCampaignToCampaign))
    })()
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calendar className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Manager</h1>
          <p className="text-gray-600">
            Manage lead lists, run campaigns, and analyze results
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lead-lists" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lead Lists
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lead-lists" className="space-y-6">
          <LeadListsTab campaigns={campaigns} />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <CampaignsTab campaigns={campaigns} />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <ResultsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCampaignManager;
