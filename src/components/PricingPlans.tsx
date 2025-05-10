
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
            BUILT FOR SALES PROFESSIONALS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Callyn handles your calls, qualifies leads, and books appointments — so you can focus on closing more deals.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Perfect for sales reps, closers, appointment setters, and commission-based professionals
          </h3>
          <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg" asChild>
            <Link to="/onboarding">
              Start Your Free Trial
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
