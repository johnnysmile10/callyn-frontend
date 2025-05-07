
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-rosie-background py-16 md:py-24 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-rosie-darkPurple mb-6">
          AI answering service for your business calls.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 mx-auto max-w-2xl">
          10x better than voicemail. 10x cheaper than an answering service. 
          Grow your business while Rosie answers your calls, helps set appointments, 
          and sends you the messages.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="rounded-full bg-rosie-purple hover:bg-rosie-darkPurple text-lg py-6 px-8">
            Get Started for Free
          </Button>
        </div>
        <p className="mt-4 text-gray-500">
          First 25 minutes completely free. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Hero;
