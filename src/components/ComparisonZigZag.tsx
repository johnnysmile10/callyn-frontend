
import { Card } from "@/components/ui/card";

const ComparisonZigZag = () => {
  const comparisons = [
    {
      description: "Callyn is there anytime you're not around to answer calls.",
      image: "/lovable-uploads/b4d33bbd-2e33-45bb-ba2f-0fbe65f0bd78.png",
      comparison: [
        { voicemail: "Missed calls go to voicemail.", callyn: "Every call answered." },
        { voicemail: "80% of calls going to voicemail are hung up on.", callyn: "Eliminates voicemail hang up." },
        { voicemail: "Voicemails rarely have the information you need.", callyn: "You determine the key info for a success!" },
        { voicemail: "Missed advertising going unanswered means wasted money.", callyn: "Maximizes ROI on ads and allows for after-hours closed hours." },
        { voicemail: "Calls are missed during the day if you're on the other line or busy at a job.", callyn: "Answer every call, even several at once." },
      ]
    },
    {
      title: "No more hangups on voicemail.",
      description: "No one leaves a voicemail anymore, but everyone will talk to Callyn.",
      image: "/lovable-uploads/9dbbaf8d-f660-4b65-96a4-34691dbb3adf.png"
    },
    {
      title: "10x cheaper than an answering service.",
      description: "There's no need to spend a fortune on a human answering service.",
      image: "/lovable-uploads/b9897370-78b6-4a76-98e5-43ebc0acc06d.png"
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-16">
          Never miss an opportunity because you can't answer the phone.
        </h2>

        {/* Second Panel - Comparison Table (now first) */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={comparisons[0].image} 
                alt="Voicemail vs Callyn comparison"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple mb-4">
                Never miss another call or opportunity.
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {comparisons[0].description}
              </p>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="bg-indigo-900 text-white p-3 text-center font-semibold">
                    Voicemail
                  </div>
                  <div className="bg-indigo-900 text-white p-3 text-center font-semibold">
                    Callyn
                  </div>
                </div>
                {comparisons[0].comparison?.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-2 border-t border-gray-200">
                    <div className="p-3 text-sm border-r border-gray-200">
                      {item.voicemail}
                    </div>
                    <div className="p-3 text-sm font-medium text-callyn-blue">
                      {item.callyn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Panel - No Hangups (now second) */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-rosie-darkPurple mb-4">
                {comparisons[1].title}
              </h3>
              <p className="text-lg text-gray-600">
                {comparisons[1].description}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={comparisons[1].image} 
                alt="No hangups on voicemail"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Fourth Panel - Cost Savings (now third) */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={comparisons[2].image} 
                alt="Cost savings"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-rosie-darkPurple mb-4">
                {comparisons[2].title}
              </h3>
              <p className="text-lg text-gray-600">
                {comparisons[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonZigZag;
