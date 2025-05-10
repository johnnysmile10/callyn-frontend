
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface Step1Props {
  handleNext: () => void;
}

const Step1RoleSelection = ({ handleNext }: Step1Props) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
        STEP 1: Let's Get Your Sales Agent Set Up
      </h2>
      
      <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-callyn-blue/10 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-callyn-blue" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Sales Agent</h3>
        <p className="text-gray-600 mb-8">
          Perfect for closers, appointment setters, and commission-based reps who want to maximize their outreach and never miss a lead.
        </p>
        
        <div className="mt-8">
          <Button 
            onClick={handleNext}
            className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1RoleSelection;
