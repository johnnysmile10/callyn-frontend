
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-callyn-darkBlue text-white py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI That Calls, Qualifies, and Closes — While You Focus on Deals
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 mx-auto max-w-3xl">
          Callyn speaks your exact pitch, handles objections, and books appointments — in 20+ languages — so you can focus on closing more deals.
        </p>
        <div className="flex flex-col items-center">
          <Button className="rounded-full bg-white text-callyn-darkBlue hover:bg-gray-200 text-lg py-6 px-8" asChild>
            <Link to="/onboarding">Get Started for Free</Link>
          </Button>
          <p className="mt-4 text-gray-300 text-sm">
            First 45 minutes completely free. No credit card required.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
    </section>
  );
};

export default Hero;
