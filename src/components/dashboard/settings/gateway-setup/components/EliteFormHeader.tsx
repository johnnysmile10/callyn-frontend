
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

const EliteFormHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Crown className="h-5 w-5 text-purple-600" />
        Add Elite Menu Option
        <Badge className="bg-purple-100 text-purple-700 border-purple-300">
          AI-Powered
        </Badge>
      </CardTitle>
    </CardHeader>
  );
};

export default EliteFormHeader;
