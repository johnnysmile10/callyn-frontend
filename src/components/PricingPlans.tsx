
import { Button } from "@/components/ui/button";

const PricingPlans = () => {
  return (
    <section className="py-16 bg-callyn-darkBlue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            CALLYN WILL HELP YOU WITH...
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6">
              Sales Plan = Perfect for sales, closer, appointment setter, and more
            </h3>
            <Button className="rounded-full bg-white text-callyn-darkBlue hover:bg-gray-200 px-10 py-6 text-lg">
              Check it out
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6">
              Business Plan = Perfect for inbound and outbound call system and more
            </h3>
            <Button className="rounded-full bg-white text-callyn-darkBlue hover:bg-gray-200 px-10 py-6 text-lg">
              Check it out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
