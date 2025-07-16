import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Bot,
  Calendar,
  ArrowRight,
  Plus,
  Play,
  Settings
} from "lucide-react";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context";

interface DashboardOverviewProps {
  onCampaignToggle: (active: boolean) => void;
  campaignActive: boolean;
}

const DashboardOverview = ({ onCampaignToggle, campaignActive }: DashboardOverviewProps) => {
  const { userAgent, hasCompletedSetup } = useAuth();
  const [hasLeads, setHasLeads] = useState(false);

  const hasAgent = !!userAgent;
  const setupComplete = hasCompletedSetup();

  const handleStartCampaign = () => {
    onCampaignToggle(!campaignActive);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Monitor your AI calling campaigns and agent performance
        </p>
      </div>

      {/* Agent Status Banner */}
      {hasAgent && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">
            🎉 {userAgent.name} is Active and Ready!
          </AlertTitle>
          <AlertDescription className="text-green-700">
            Your AI agent was created on {new Date(userAgent.createdAt).toLocaleDateString()} and is ready to handle calls.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Setup Cards - Only show if setup not complete */}
      {!setupComplete && (
        <div className="grid gap-6 md:grid-cols-2">
          {!hasAgent && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-900">Setup Your AI Agent</CardTitle>
                </div>
                <CardDescription className="text-blue-700">
                  Create and configure your personal AI calling agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-blue-800">
                    Complete the onboarding process to create your AI agent
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link to="/onboarding">
                      <Bot className="mr-2 h-4 w-4" />
                      Complete Setup
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!hasLeads && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-900">Upload Lead List</CardTitle>
                </div>
                <CardDescription className="text-green-700">
                  Add your leads to start making calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-green-800">
                    Upload a CSV file with your leads to begin your first campaign
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Leads
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {hasAgent ? "Ready to start calling" : "Agent setup required"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              No data available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Upload leads to get started
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No active campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              Agent Builder
            </CardTitle>
            <CardDescription>
              {hasAgent ? "Manage and customize your AI agent" : "Create and customize your AI calling agent"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className={`h-4 w-4 ${hasAgent ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={hasAgent ? 'text-green-600' : 'text-gray-600'}>
                  AI Agent {hasAgent ? 'Active' : 'Pending'}
                </span>
              </div>
              {hasAgent && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Script Configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Voice Settings</span>
                  </div>
                </>
              )}
              {!hasAgent && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Script Configuration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Voice Settings</span>
                  </div>
                </>
              )}
            </div>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              {hasAgent ? 'Manage Agent' : 'Create Agent'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Campaign Manager
            </CardTitle>
            <CardDescription>
              Manage leads and run calling campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Lead Lists (0)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Active Campaigns (0)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Call Analytics</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Manage Campaigns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-purple-600" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Start your first campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasAgent && hasLeads ? (
              <div className="space-y-3">
                <Badge variant="secondary" className="w-full justify-center">
                  Ready to Start
                </Badge>
                <Button
                  onClick={handleStartCampaign}
                  className={`w-full ${campaignActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {campaignActive ? 'Stop Campaign' : 'Start Campaign'}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground text-center">
                  Complete setup to start calling
                </div>
                <div className="space-y-2">
                  {!hasAgent && (
                    <div className="text-xs text-red-600">• Create your AI agent first</div>
                  )}
                  {!hasLeads && (
                    <div className="text-xs text-red-600">• Upload your lead list</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Alert */}
      {hasAgent && hasLeads && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Ready to Launch!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your AI agent is configured and you have leads ready. Start your first campaign now.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DashboardOverview;
