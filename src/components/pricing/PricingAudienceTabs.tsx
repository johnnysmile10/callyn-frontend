
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";

const PricingAudienceTabs: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center justify-center gap-2 text-callyn-blue">
        <Users className="w-5 h-5" />
        <h3 className="font-medium text-lg text-white">Sales Plans</h3>
      </div>
      <p className="text-gray-300 mt-2 text-center">
        Pricing options designed specifically for sales professionals
      </p>
    </div>
  );
};

export default PricingAudienceTabs;
