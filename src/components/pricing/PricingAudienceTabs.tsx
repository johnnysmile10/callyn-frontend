
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase } from "lucide-react";

interface PricingAudienceTabsProps {
  audience: "sales" | "business";
  setAudience: (audience: "sales" | "business") => void;
}

const PricingAudienceTabs: React.FC<PricingAudienceTabsProps> = ({
  audience,
  setAudience,
}) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <Tabs
        value={audience}
        onValueChange={(value) => setAudience(value as "sales" | "business")}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-lg p-1">
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-callyn-blue data-[state=active]:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            For Salespeople
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="data-[state=active]:bg-callyn-blue data-[state=active]:text-white"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            For Businesses
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PricingAudienceTabs;
