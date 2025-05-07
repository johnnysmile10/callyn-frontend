
import { Check, X } from "lucide-react";

const ComparisonTable = () => {
  const comparisonData = [
    {
      voicemail: "Missed calls go to voicemail.",
      callyn: "Every call is answered instantly, 24/7."
    },
    {
      voicemail: "80% of voicemails get ignored or hung up on.",
      callyn: "Human-sounding AI keeps callers engaged — no one hangs up."
    },
    {
      voicemail: "Voicemails rarely include useful info.",
      callyn: "Callyn captures names, numbers, reasons for calling, and more."
    },
    {
      voicemail: "Missed ad calls = wasted marketing budget.",
      callyn: "Every ad click becomes a qualified lead — even after hours."
    },
    {
      voicemail: "You still have to follow up manually.",
      callyn: "Callyn follows up via SMS and books meetings for you."
    }
  ];

  return (
    <section className="bg-callyn-darkBlue py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Let's Compare...
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 text-center mb-12">
          See how Callyn compares to traditional solutions.
        </p>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2">
            <button className="px-6 py-3 rounded-full bg-callyn-blue text-white focus:outline-none">
              Voicemail
            </button>
            <button className="px-6 py-3 rounded-full text-white/80 focus:outline-none">
              Answering Service
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              Voicemail
            </div>
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              Callyn
            </div>
          </div>

          {comparisonData.map((item, index) => (
            <div key={index} className="grid grid-cols-2 border-t border-gray-200">
              <div className="p-6 text-center flex flex-col items-center">
                <X className="text-rose-500 mb-2" size={24} />
                <p>{item.voicemail}</p>
              </div>
              <div className="p-6 text-center flex flex-col items-center border-l border-gray-200">
                <Check className="text-callyn-blue mb-2" size={24} />
                <p>{item.callyn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
