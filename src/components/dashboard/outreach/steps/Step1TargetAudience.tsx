
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TargetAudience } from "../types";

interface Step1TargetAudienceProps {
  data: TargetAudience;
  onUpdate: (data: TargetAudience) => void;
}

const Step1TargetAudience = ({ data, onUpdate }: Step1TargetAudienceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Define Your Target Audience</CardTitle>
        <CardDescription>
          Describe your ideal prospects to ensure your AI agent reaches the right people
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="targetDescription" className="text-base font-medium">
            Target Audience Description
          </Label>
          <Textarea
            id="targetDescription"
            placeholder="Describe your target audience, including industries, job titles, company sizes, and locations. For example: 'Small to medium-sized SaaS companies (10-200 employees) in the US, targeting CEOs, CTOs, and VP of Engineering who are looking to scale their development teams.'"
            value={data.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="mt-2 min-h-[120px]"
            rows={6}
          />
          <p className="text-sm text-gray-500 mt-2">
            Be as specific as possible about your ideal customer profile to help your AI agent target the right prospects.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1TargetAudience;
