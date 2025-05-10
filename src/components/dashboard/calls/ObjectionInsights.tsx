
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRebuttalSuggestion } from "./callUtils";

type ObjectionInsightsProps = {
  topObjection: string;
};

const ObjectionInsights = ({ topObjection }: ObjectionInsightsProps) => {
  const rebuttalSuggestion = getRebuttalSuggestion(topObjection);
  
  return (
    <Card className="bg-accent/30 border-accent">
      <CardHeader>
        <CardTitle className="text-lg">Objection Intelligence</CardTitle>
        <CardDescription>Insights to improve your close rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Most common objection:</h4>
            <div className="px-3 py-2 bg-background rounded-md">
              "{topObjection !== "None identified" ? topObjection : "No objections recorded yet"}"
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-1">Suggested rebuttal:</h4>
            <div className="px-3 py-2 bg-background rounded-md text-sm text-muted-foreground">
              {rebuttalSuggestion}
            </div>
          </div>
          
          <div className="pt-2">
            <Button className="w-full" variant="outline">
              View All Objection Analytics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObjectionInsights;
