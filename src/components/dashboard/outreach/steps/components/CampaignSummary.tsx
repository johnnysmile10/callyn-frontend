
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, Calendar, Rocket, Settings } from "lucide-react";

interface CampaignSummaryProps {
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

const CampaignSummary = ({ campaignSummary }: CampaignSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          Campaign Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Target Audience</h4>
                <p className="text-sm text-gray-600">{campaignSummary.targetAudience}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Lead Database</h4>
                <p className="text-sm text-gray-600">{campaignSummary.leadCount} qualified prospects</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Schedule</h4>
                <p className="text-sm text-gray-600">
                  {campaignSummary.callScheduling.hours}<br />
                  {campaignSummary.callScheduling.daysPerWeek}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Script & Language</h4>
                <p className="text-sm text-gray-600">
                  {campaignSummary.scriptType} approach in {campaignSummary.language}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignSummary;
