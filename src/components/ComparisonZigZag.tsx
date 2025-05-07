
import { Card } from "@/components/ui/card";

const ComparisonZigZag = () => {
  const comparisons = [
    {
      number: "1",
      title: "No more hangups on voicemail.",
      description: "No one leaves a voicemail anymore, but everyone will talk to Callyn.",
      image: "/lovable-uploads/9dbbaf8d-f660-4b65-96a4-34691dbb3adf.png"
    },
    {
      number: "2",
      title: "10x cheaper than an answering service.",
      description: "There's no need to spend a fortune on a human answering service.",
      image: "/lovable-uploads/b9897370-78b6-4a76-98e5-43ebc0acc06d.png"
    },
    {
      number: "3",
      title: "Let's compare Callyn to voicemail.",
      description: "See how Callyn outperforms traditional voicemail in every aspect.",
      image: "/lovable-uploads/7ef44233-156c-4bad-a3b0-c950117e25ba.png"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-16">
          Let Callyn Call, Qualify, and Book for You in minutes
        </h2>

        {/* First Panel - No Hangups */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-callyn-blue text-white py-2 px-6 rounded-full inline-block mb-6 font-medium">
                STEP {comparisons[0].number}
              </div>
              <h3 className="text-3xl font-bold text-rosie-darkPurple mb-4">
                {comparisons[0].title}
              </h3>
              <p className="text-lg text-gray-600">
                {comparisons[0].description}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={comparisons[0].image} 
                alt={`Step ${comparisons[0].number} - No hangups on voicemail`}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Second Panel - Cost Savings */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={comparisons[1].image} 
                alt={`Step ${comparisons[1].number} - Cost savings`}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <div className="bg-rosie-lightPurple text-rosie-purple py-2 px-6 rounded-full inline-block mb-6 font-medium">
                STEP {comparisons[1].number}
              </div>
              <h3 className="text-3xl font-bold text-rosie-darkPurple mb-4">
                {comparisons[1].title}
              </h3>
              <p className="text-lg text-gray-600">
                {comparisons[1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Third Panel - Comparison with voicemail */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-rosie-lightPurple text-rosie-purple py-2 px-6 rounded-full inline-block mb-6 font-medium">
                STEP {comparisons[2].number}
              </div>
              <h3 className="text-3xl font-bold text-rosie-darkPurple mb-4">
                {comparisons[2].title}
              </h3>
              <p className="text-lg text-gray-600">
                {comparisons[2].description}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={comparisons[2].image} 
                alt={`Step ${comparisons[2].number} - Comparison with voicemail`}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonZigZag;
