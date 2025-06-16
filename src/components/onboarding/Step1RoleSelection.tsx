
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, Target, PhoneCall } from "lucide-react";

interface Step1Props {
  handleNext: () => void;
}

const Step1RoleSelection = ({ handleNext }: Step1Props) => {
  const roles = [
    {
      id: "sales-agent",
      title: "Sales Agent",
      description: "Individual sales rep looking to maximize outreach",
      icon: Users,
      color: "blue"
    },
    {
      id: "business-owner", 
      title: "Business Owner",
      description: "Entrepreneur wanting to grow customer base",
      icon: Building,
      color: "green"
    },
    {
      id: "sales-manager",
      title: "Sales Manager", 
      description: "Team leader managing multiple campaigns",
      icon: Target,
      color: "purple"
    },
    {
      id: "agency",
      title: "Marketing Agency",
      description: "Agency providing lead generation services",
      icon: PhoneCall,
      color: "orange"
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 1: Choose Your Role
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Card 
              key={role.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:bg-gray-50"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 bg-${role.color}-500 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center">
        <Button 
          onClick={handleNext}
          className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
        >
          Continue with Sales Agent Setup
        </Button>
        <p className="text-sm text-gray-500 mt-2">We'll customize the experience for sales agents</p>
      </div>
    </div>
  );
};

export default Step1RoleSelection;
