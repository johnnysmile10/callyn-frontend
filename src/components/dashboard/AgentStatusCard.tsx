
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Clock, AlertCircle, Edit, Save, X, Zap, Trash2, Play } from "lucide-react";
import { format } from "date-fns";

interface UserAgent {
  id: string;
  name: string;
  status: "ready" | "training" | "not_created" | "error";
  script?: string;
  createdAt?: string;
  lastUpdated?: string;
}

interface AgentStatusCardProps {
  agent: UserAgent;
  onScriptUpdate: (script: string) => void;
  onDeleteAgent: () => void;
}

const AgentStatusCard = ({ agent, onScriptUpdate, onDeleteAgent }: AgentStatusCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(agent.script || "");

  const getStatusIcon = () => {
    switch (agent.status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "training":
        return <Clock className="h-4 w-4 text-yellow-600 animate-pulse" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (agent.status) {
      case "ready":
        return "Ready to Call";
      case "training":
        return "Training in Progress";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "training":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSaveScript = () => {
    onScriptUpdate(editedScript);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedScript(agent.script || "");
    setIsEditing(false);
  };

  const handleDeleteAgent = () => {
    if (confirm("Are you sure you want to delete this agent? This action cannot be undone.")) {
      onDeleteAgent();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                {agent.name}
                <Badge variant="outline" className={getStatusColor()}>
                  {getStatusIcon()}
                  {getStatusText()}
                </Badge>
              </CardTitle>
              <CardDescription>
                Agent ID: {agent.id.slice(-8)}
                {agent.lastUpdated && (
                  <span className="ml-2">
                    • Updated {format(new Date(agent.lastUpdated), "MMM d, h:mm a")}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Script
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleDeleteAgent}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {agent.status === "ready" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              🎉 Your AI agent is ready! Upload your leads and start your first campaign.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Current Script</h4>
            {isEditing && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveScript}>
                  <Save className="mr-1 h-3 w-3" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="mr-1 h-3 w-3" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <Textarea
              value={editedScript}
              onChange={(e) => setEditedScript(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Enter your sales script..."
            />
          ) : (
            <div className="bg-muted/50 p-4 rounded-md">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {agent.script || "No script available"}
              </pre>
            </div>
          )}
        </div>

        {agent.status === "ready" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <Card className="p-4">
              <h5 className="font-medium mb-2">Quick Actions</h5>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  Test Agent (Coming Soon)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Play className="mr-2 h-4 w-4" />
                  Start Campaign
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h5 className="font-medium mb-2">Agent Stats</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Calls Made:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Call Time:</span>
                  <span className="font-medium">-</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentStatusCard;
