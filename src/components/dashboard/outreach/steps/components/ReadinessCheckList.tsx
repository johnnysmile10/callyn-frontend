
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { OutreachData } from "../../types";
import { useMemo } from "react";

interface ReadinessCheckListProps {
  outreachData: OutreachData | null;
  campaignSummary: {
    targetAudience: string;
    leadCount: number;
    scriptType: string;
    language: string;
    callScheduling: {
      timezone: string;
      hours: string;
      daysPerWeek: string;
    };
  };
}

const ReadinessCheckList = ({ outreachData, campaignSummary }: ReadinessCheckListProps) => {
  const readinessChecks = useMemo(() => [
    {
      item: "Target Audience Defined",
      status: !!outreachData?.targetAudience,
      description: campaignSummary.targetAudience
    },
    {
      item: "Lead List Imported",
      status: !!outreachData?.leadManagement?.leadList && outreachData.leadManagement.leadList.length > 0,
      description: `${campaignSummary.leadCount} qualified leads`
    },
    {
      item: "Script & Language",
      status: !!outreachData?.script,
      description: `${campaignSummary.scriptType} script in ${campaignSummary.language}`
    },
    {
      item: "Call Scheduling",
      status: !!outreachData?.callScheduling,
      description: `${campaignSummary.callScheduling.hours}, ${campaignSummary.callScheduling.daysPerWeek}`
    },
  ], [outreachData, campaignSummary]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Campaign Readiness Check
        </CardTitle>
        <CardDescription>
          Verify all components are configured correctly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {readinessChecks.map((check, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${check.status ? 'bg-green-100' : 'bg-gray-100'
              }`}>
              {check.status ? (
                <CheckCircle className="h-3 w-3 text-green-600" />
              ) : (
                <AlertCircle className="h-3 w-3 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${check.status ? 'text-gray-900' : 'text-gray-500'}`}>
                  {check.item}
                </span>
                <Badge variant={check.status ? "default" : "secondary"}>
                  {check.status ? "Ready" : "Pending"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{check.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReadinessCheckList;
