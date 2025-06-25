
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Brain } from "lucide-react";

const GatewayElitePreviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* AI Learning Card */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Brain className="h-5 w-5" />
            AI Learning (Elite)
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Crown className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Advanced AI that learns from successful calls and automatically adapts to new menu systems.
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Auto-detection of new menu options</li>
            <li>• Call success rate optimization</li>
            <li>• Intelligent fallback strategies</li>
          </ul>
        </CardContent>
      </Card>

      {/* Real-time Adaptation Card */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Zap className="h-5 w-5" />
            Real-time Adaptation (Elite)
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Crown className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Dynamic menu navigation that adapts to call context and customer responses in real-time.
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Context-aware menu selection</li>
            <li>• Dynamic response timing</li>
            <li>• Intelligent retry mechanisms</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GatewayElitePreviewCards;
