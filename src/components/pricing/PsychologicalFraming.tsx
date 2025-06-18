
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Clock, Target } from "lucide-react";

const PsychologicalFraming = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="bg-white border-green-200 border-2">
        <CardContent className="p-6 text-center">
          <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-600">3.2x</div>
          <div className="text-gray-700 font-medium">More Qualified Leads</div>
          <div className="text-sm text-gray-500 mt-1">vs. cold calling alone</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-blue-200 border-2">
        <CardContent className="p-6 text-center">
          <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-600">500+</div>
          <div className="text-gray-700 font-medium">Sales Professionals</div>
          <div className="text-sm text-gray-500 mt-1">trust Callyn daily</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-purple-200 border-2">
        <CardContent className="p-6 text-center">
          <Clock className="w-10 h-10 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-600">24/7</div>
          <div className="text-gray-700 font-medium">Lead Follow-up</div>
          <div className="text-sm text-gray-500 mt-1">Never miss an opportunity</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-orange-200 border-2">
        <CardContent className="p-6 text-center">
          <Target className="w-10 h-10 text-orange-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-orange-600">85%</div>
          <div className="text-gray-700 font-medium">Contact Rate</div>
          <div className="text-sm text-gray-500 mt-1">vs. 23% industry average</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychologicalFraming;
