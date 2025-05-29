
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, MessageSquare, Calendar, Phone } from "lucide-react";
import PostCallActions from "./actions/PostCallActions";
import RealtimeActions from "./actions/RealtimeActions";
import CustomAPIActions from "./actions/CustomAPIActions";

const DashboardActions = () => {
  const [activeTab, setActiveTab] = useState("post-call");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Zap className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Actions</h1>
          <p className="text-gray-600">
            Configure automated actions that trigger during or after calls
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="post-call" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Post-Call Actions
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Realtime Actions
          </TabsTrigger>
          <TabsTrigger value="custom-api" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Custom API/Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post-call" className="space-y-6">
          <PostCallActions />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealtimeActions />
        </TabsContent>

        <TabsContent value="custom-api" className="space-y-6">
          <CustomAPIActions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardActions;
