
import { Check, X } from "lucide-react";

const ComparisonTable = () => {
  const comparisonData = [
    {
      voicemail: "Missed calls go to voicemail.",
      rosie: "Every call answered."
    },
    {
      voicemail: "Up to 80% of calls going to voicemail are hung up on.",
      rosie: "Eliminates voicemail hang ups."
    },
    {
      voicemail: "Voicemails rarely have the information you need.",
      rosie: "You determine the key info for a successful message."
    },
    {
      voicemail: "Calls from advertising going unanswered means wasted money.",
      rosie: "Maximizes ROI on ads and allows for advertising during closed hours."
    },
    {
      voicemail: "Calls often missed during the day if you're on the other line or busy at a job.",
      rosie: "Answer every call, even several at once."
    }
  ];

  return (
    <section className="bg-rosie-deepPurple py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Let's Compare...
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 text-center mb-12">
          See how Rosie compares to traditional solutions.
        </p>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2">
            <button className="px-6 py-3 rounded-full bg-rosie-purple text-white focus:outline-none">
              Voicemail
            </button>
            <button className="px-6 py-3 rounded-full text-white/80 focus:outline-none">
              Answering Service
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="bg-rosie-darkPurple text-white p-4 text-center font-bold text-xl">
              Voicemail
            </div>
            <div className="bg-rosie-darkPurple text-white p-4 text-center font-bold text-xl">
              Rosie
            </div>
          </div>

          {comparisonData.map((item, index) => (
            <div key={index} className="grid grid-cols-2 border-t border-gray-200">
              <div className="p-6 text-center flex flex-col items-center">
                <X className="text-rose-500 mb-2" size={24} />
                <p>{item.voicemail}</p>
              </div>
              <div className="p-6 text-center flex flex-col items-center border-l border-gray-200">
                <Check className="text-emerald-500 mb-2" size={24} />
                <p>{item.rosie}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
