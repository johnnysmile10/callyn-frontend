
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, LogIn } from "lucide-react";

const Step5FinalCTA = () => {
  return (
    <div className="mt-8 text-center max-w-md mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border mb-8">
        <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6">
          Your AI Sales Agent Is Ready!
        </h2>
        <p className="text-gray-600 mb-8">
          Sign up to create your Callyn agent and start handling calls, qualifying leads, and booking meetings automatically so you can focus on closing deals.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-full py-6 text-base font-medium flex items-center justify-center gap-3"
            asChild
          >
            <Link to="/signup">
              <LogIn className="h-5 w-5" />
              Sign up with Google
            </Link>
          </Button>
          
          <Button 
            className="w-full bg-callyn-blue hover:bg-callyn-darkBlue text-white rounded-full py-6 text-base font-medium flex items-center justify-center gap-3"
            asChild
          >
            <Link to="/signup">
              <Mail className="h-5 w-5" />
              Sign up with Email
            </Link>
          </Button>
        </div>
      </div>
      
      <p className="text-gray-500">
        First 45 minutes completely free. No credit card required.
      </p>
    </div>
  );
};

export default Step5FinalCTA;
