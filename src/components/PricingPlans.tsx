
import { Button } from "@/components/ui/button";

const PricingPlans = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-callyn-blue mb-6">
              Sales Plan = Perfect for sales, closer, appointment setter, and more
            </h3>
            <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-7 text-lg">
              Check it out
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-callyn-blue mb-6">
              Business Plan = Perfect for inbound and outbound call system
            </h3>
            <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-7 text-lg">
              Check it out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
