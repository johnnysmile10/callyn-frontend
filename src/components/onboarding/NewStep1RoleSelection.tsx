
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PhoneCall, Building, Target } from "lucide-react";

interface NewStep1RoleSelectionProps {
  handleNext: () => void;
  onDataUpdate: (data: any) => void;
  initialData?: any;
}

const NewStep1RoleSelection = ({ handleNext, onDataUpdate, initialData }: NewStep1RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState(initialData?.selectedRole || null);

  const roles = [
    {
      id: "sales-agent",
      title: "Sales Agent",
      description: "Individual sales rep looking to maximize outreach and close more deals",
      icon: Users,
      benefits: [
        "Automate follow-ups and lead qualification",
        "Never miss a potential opportunity",
        "Scale your outreach 10x",
        "Focus on high-value closing activities"
      ],
      color: "blue"
    },
    {
      id: "business-owner",
      title: "Business Owner",
      description: "Entrepreneur or business owner wanting to grow their customer base",
      icon: Building,
      benefits: [
        "Generate leads 24/7 while you sleep",
        "Reduce hiring and training costs",
        "Scale sales without scaling headcount",
        "Consistent brand messaging"
      ],
      color: "green"
    },
    {
      id: "sales-manager",
      title: "Sales Manager",
      description: "Team leader managing multiple reps and campaigns",
      icon: Target,
      benefits: [
        "Manage multiple AI agents for your team",
        "Real-time performance analytics",
        "Standardize best practices across reps",
        "Increase team productivity"
      ],
      color: "purple"
    },
    {
      id: "agency",
      title: "Marketing Agency",
      description: "Agency providing lead generation services to clients",
      icon: PhoneCall,
      benefits: [
        "White-label AI calling for clients",
        "Scale services without overhead",
        "Deliver consistent results",
        "Increase client retention"
      ],
      color: "orange"
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    onDataUpdate({ selectedRole: roleId });
  };

  const handleContinue = () => {
    if (selectedRole) {
      handleNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-callyn-darkBlue mb-4">
          Welcome to Callyn! What's Your Role?
        </h2>
        <p className="text-xl text-gray-600">
          Help us customize your experience by selecting what best describes you
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {roles.map((role) => {
          const IconComponent = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? `ring-2 ring-${role.color}-500 bg-${role.color}-50` : 'hover:bg-gray-50'
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 bg-${role.color}-500 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-base">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 bg-${role.color}-500 rounded-full mt-2 flex-shrink-0`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button 
          onClick={handleContinue}
          disabled={!selectedRole}
          className="bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-3 text-lg font-medium rounded-full"
        >
          Continue Setup
        </Button>
        {!selectedRole && (
          <p className="text-sm text-gray-500 mt-2">Please select your role to continue</p>
        )}
      </div>
    </div>
  );
};

export default NewStep1RoleSelection;
