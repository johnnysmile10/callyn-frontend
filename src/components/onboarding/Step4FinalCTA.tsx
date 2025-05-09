
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Step4FinalCTA = () => {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6">
        Ready to get started with Callyn?
      </h2>
      <div className="flex flex-col items-center">
        <Button 
          className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-6 text-lg font-medium"
          asChild
        >
          <Link to="/signup">Get Started For Free</Link>
        </Button>
        <p className="mt-4 text-gray-500">
          First 45 minutes completely free. No credit card required.
        </p>
      </div>
    </div>
  );
};

export default Step4FinalCTA;
