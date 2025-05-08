
import { Button } from "@/components/ui/button";

const ProcessSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Set up your business profile",
      description: "Tell us about your business, services, and availability. We'll create a custom profile that helps Callyn understand your specific needs.",
      image: "/lovable-uploads/8e4741bc-292a-4295-ac6e-2d99371c88e2.png", 
      buttonText: "Get Started"
    },
    {
      number: "2",
      title: "Customize your call handling",
      description: "Choose how Callyn answers calls, what information to collect, and how you want to be notified. Everything is tailored to your business requirements.",
      image: "/lovable-uploads/7e66c6f0-d34d-4009-9f7a-253cc160f22a.png",
      buttonText: "Learn More"
    },
    {
      number: "3",
      title: "Review call summaries instantly",
      description: "After each call, receive detailed summaries with caller information, questions asked, and next steps. All conversations are recorded and transcribed for your review.",
      image: "/lovable-uploads/7ef44233-156c-4bad-a3b0-c950117e25ba.png",
      buttonText: "See Demo"
    },
    {
      number: "4",
      title: "Launch your campaign",
      description: "Hit \"Start Calling.\" Callyn begins dialing, speaking, logging outcomes, and sending you summaries in real-time.",
      image: "/lovable-uploads/c1bf6c33-6c5c-4279-a6b1-53004666eb3c.png",
      buttonText: "Start Free Trial",
      exampleText: "It runs while you sleep or close deals."
    },
    {
      number: "5",
      title: "Review & Follow Up",
      description: "You'll get call logs, summaries, and SMS follow-ups sent to each lead. You can jump in anytime to close.",
      image: "/lovable-uploads/7ef44233-156c-4bad-a3b0-c950117e25ba.png",
      buttonText: "See Examples",
      exampleText: "Only talk to people who want to talk to you."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-callyn-darkBlue text-center mb-4">
          How Callyn Helps Your Business Grow
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Never miss another opportunity with our AI-powered call answering service
        </p>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-callyn-lightBlue text-callyn-blue py-2 px-6 rounded-full inline-block mb-6 font-medium">
                  STEP {step.number}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-callyn-darkBlue mb-6">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 max-w-lg mb-4">
                  {step.description}
                </p>
                {step.exampleText && (
                  <p className="text-lg text-gray-600 italic max-w-lg mb-8">
                    {step.exampleText}
                  </p>
                )}
                {!step.exampleText && <div className="mb-8"></div>}
                <div className="flex flex-col items-start">
                  <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2">
                    {step.buttonText}
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    First 45 minutes completely free.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src={step.image}
                  alt={`Step ${step.number}: ${step.title}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Get Started For Free button at the end */}
        <div className="mt-20 text-center">
          <div className="flex flex-col items-center">
            <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-6 text-lg font-medium">
              Get Started for Free
            </Button>
            <p className="mt-4 text-gray-500">
              First 45 minutes completely free. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
