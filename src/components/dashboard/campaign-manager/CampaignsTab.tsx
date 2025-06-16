
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause, Square, Plus, Calendar, Phone, Target, BarChart, Edit, Trash2 } from "lucide-react";

// Mock campaign data
const mockCampaigns = [
  {
    id: 1,
    name: "Dental Practice Outreach",
    status: "active",
    leadList: "Dentists - Bergen County",
    totalLeads: 238,
    contacted: 89,
    progress: 37,
    startDate: "2024-01-15",
    callsPerHour: 15,
    agent: "Dr. Sarah AI",
    outcomes: {
      interested: 12,
      notInterested: 45,
      callbacks: 8,
      noAnswer: 24
    }
  },
  {
    id: 2,
    name: "B2B Software Demo Campaign",
    status: "paused",
    leadList: "B2B Software Leads",
    totalLeads: 156,
    contacted: 23,
    progress: 15,
    startDate: "2024-01-14",
    callsPerHour: 12,
    agent: "Tech Expert AI",
    outcomes: {
      interested: 8,
      notInterested: 12,
      callbacks: 2,
      noAnswer: 1
    }
  },
  {
    id: 3,
    name: "Real Estate Investment",
    status: "completed",
    leadList: "Real Estate Investors",
    totalLeads: 89,
    contacted: 89,
    progress: 100,
    startDate: "2024-01-10",
    callsPerHour: 10,
    agent: "Property AI",
    outcomes: {
      interested: 15,
      notInterested: 58,
      callbacks: 12,
      noAnswer: 4
    }
  }
];

const CampaignsTab = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4" />;
      case "paused":
        return <Pause className="h-4 w-4" />;
      case "completed":
        return <Square className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const handleCampaignAction = (id: number, action: string) => {
    console.log(`Campaign ${id}: ${action}`);
    // Implementation would depend on the action
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          <p className="text-gray-600">Manage and monitor your calling campaigns</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Campaign Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Play className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">
                  {mockCampaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">
                  {mockCampaigns.reduce((sum, c) => sum + c.contacted, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Interested</p>
                <p className="text-2xl font-bold">
                  {mockCampaigns.reduce((sum, c) => sum + c.outcomes.interested, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Conversion</p>
                <p className="text-2xl font-bold">
                  {Math.round((mockCampaigns.reduce((sum, c) => sum + c.outcomes.interested, 0) / 
                    mockCampaigns.reduce((sum, c) => sum + c.contacted, 0)) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            Track the status and performance of your calling campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {campaign.leadList} • {campaign.totalLeads} leads
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(campaign.status)}
                        <span className="capitalize">{campaign.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{campaign.contacted} / {campaign.totalLeads}</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-600">Interested: {campaign.outcomes.interested}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Callbacks: {campaign.outcomes.callbacks}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{campaign.agent}</div>
                      <div className="text-gray-500">{campaign.callsPerHour}/hr</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {campaign.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCampaignAction(campaign.id, "pause")}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : campaign.status === "paused" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCampaignAction(campaign.id, "resume")}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, "edit")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, "delete")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsTab;
