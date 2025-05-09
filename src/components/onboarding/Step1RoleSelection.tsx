
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Briefcase } from "lucide-react";

interface Step1Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  handleNext: () => void;
}

const Step1RoleSelection = ({ selectedTab, setSelectedTab, handleNext }: Step1Props) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 1: Choose Your Role
      </h2>
      <Tabs 
        defaultValue="sales" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full max-w-2xl mx-auto"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="sales" className="flex gap-2 py-4">
            <Users className="h-5 w-5" />
            <span>Sales Plan</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex gap-2 py-4">
            <Briefcase className="h-5 w-5" />
            <span>Business Plan</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 text-center">
          {selectedTab === "sales" ? (
            <p className="text-gray-600">For Salespeople, Closers & Appointment Setters</p>
          ) : (
            <p className="text-gray-600">For Business Owners & Managers</p>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            onClick={handleNext}
            className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
          >
            Next Step
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default Step1RoleSelection;
