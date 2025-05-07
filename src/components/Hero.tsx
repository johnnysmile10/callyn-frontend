
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-callyn-darkBlue text-white py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI That Calls, Books, and Closes — While You Focus on Growth
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 mx-auto max-w-3xl">
          Callyn handles your calls, answers, follows up, and books — so you can focus on close and business growth
        </p>
        <div className="flex justify-center">
          <Button className="rounded-full bg-white text-callyn-darkBlue hover:bg-gray-200 text-lg py-6 px-8">
            Unlock your potential
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
    </section>
  );
};

export default Hero;
