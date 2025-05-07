
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
      title: "Scale your business effortlessly",
      description: "As your business grows, Callyn grows with you. Handle increasing call volumes without hiring additional staff or missing important opportunities.",
      image: "/lovable-uploads/9dbbaf8d-f660-4b65-96a4-34691dbb3adf.png",
      buttonText: "Start Free Trial"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-4">
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
                <div className={`${index === 0 ? "bg-callyn-blue text-white" : "bg-rosie-lightPurple text-rosie-purple"} py-2 px-6 rounded-full inline-block mb-6 font-medium`}>
                  STEP {step.number}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-rosie-darkPurple mb-6">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 max-w-lg mb-8">
                  {step.description}
                </p>
                <Button className="rounded-full bg-rosie-purple hover:bg-rosie-darkPurple text-white px-8 py-2">
                  {step.buttonText}
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src={step.image}
                  alt={`Step ${step.number}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
