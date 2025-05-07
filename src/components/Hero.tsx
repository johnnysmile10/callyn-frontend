
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-blue-900 text-white py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI That Calls, Books, and Closes — While You Focus on Growth
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 mx-auto max-w-3xl">
          Callyn handles your calls, books appointments, and helps you close deals so you don't have to. Perfect for small teams who can't call everyone.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="rounded-full bg-white text-blue-900 hover:bg-gray-200 text-lg py-6 px-8">
            Unlock your potential
          </Button>
          <Button variant="outline" className="rounded-full border-white text-white hover:bg-blue-800 text-lg py-6 px-8">
            <Phone size={18} className="mr-2" />
            Contact sales
          </Button>
        </div>
        <p className="mt-6 text-gray-300">
          Built for closers, solopreneurs, commission-based pros, and fast-moving teams.
        </p>
      </div>
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      
      {/* Removed the image section that was here previously */}
    </section>
  );
};

export default Hero;
