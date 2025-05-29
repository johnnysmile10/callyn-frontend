
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { History, Copy } from "lucide-react";
import { ScriptVersion } from "./types/scriptTypes";

interface ScriptVersionManagerProps {
  scriptVersions: ScriptVersion[];
}

const ScriptVersionManager = ({ scriptVersions }: ScriptVersionManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Script Version History
        </CardTitle>
        <CardDescription>
          Track and manage different versions of your scripts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {scriptVersions.length === 0 ? (
          <Alert>
            <AlertDescription>
              No saved versions yet. Save your current script to create the first version.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {scriptVersions.map((version) => (
              <div key={version.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{version.version}</Badge>
                    <span className="font-medium">{version.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(version.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {version.content.greeting.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScriptVersionManager;
