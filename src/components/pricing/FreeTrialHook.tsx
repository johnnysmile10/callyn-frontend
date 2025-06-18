
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const FreeTrialHook = () => {
  return (
    <Card className="bg-gradient-to-r from-callyn-blue to-blue-700 border-0 text-white mb-12">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <Zap className="w-12 h-12 text-yellow-300" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Free Trial Today
        </h2>
        
        <p className="text-xl mb-6 text-blue-100">
          45 minutes of free calling time. No credit card required.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-300" />
            <span className="text-lg">45 free minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-yellow-300" />
            <span className="text-lg">No credit card needed</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-300" />
            <span className="text-lg">Setup in 6 minutes</span>
          </div>
        </div>
        
        <Button 
          size="lg" 
          className="bg-white text-callyn-blue hover:bg-gray-100 text-xl py-6 px-12 rounded-full font-bold shadow-lg"
          asChild
        >
          <Link to="/onboarding">
            Start Free Trial →
          </Link>
        </Button>
        
        <p className="text-sm text-blue-200 mt-4">
          Join 500+ sales professionals already using Callyn
        </p>
      </CardContent>
    </Card>
  );
};

export default FreeTrialHook;
