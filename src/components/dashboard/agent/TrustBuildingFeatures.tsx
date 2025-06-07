
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, BarChart } from "lucide-react";

const TrustBuildingFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance ready",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times for natural conversations",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Users,
      title: "10,000+ Users",
      description: "Trusted by sales teams worldwide",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: BarChart,
      title: "40% Higher Conversion",
      description: "Average improvement in lead qualification rates",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-3`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrustBuildingFeatures;
