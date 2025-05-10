
import { Check, X } from "lucide-react";
import { useState } from "react";

const ComparisonTable = () => {
  const [activeTab, setActiveTab] = useState<"voicemail" | "answering">("voicemail");
  
  const voicemailData = [
    {
      voicemail: "Missed calls go to voicemail.",
      callyn: "Every sales call is answered instantly, 24/7."
    },
    {
      voicemail: "80% of voicemails get ignored or hung up on.",
      callyn: "Human-sounding AI keeps prospects engaged — no one hangs up."
    },
    {
      voicemail: "Voicemails rarely include useful info.",
      callyn: "Callyn captures contact details, buying intent, and key qualifying info."
    },
    {
      voicemail: "Missed ad calls = wasted marketing budget.",
      callyn: "Every lead becomes a qualified opportunity — even after hours."
    },
    {
      voicemail: "You still have to follow up manually.",
      callyn: "Callyn follows up via SMS and books sales meetings for you."
    }
  ];

  const answeringServiceData = [
    {
      traditional: "Generic call scripts that don't match your sales pitch.",
      callyn: "Callyn is trained on your exact sales scripts and objection handlers. She speaks exactly like you would."
    },
    {
      traditional: "Inconsistent qualification from inexperienced agents.",
      callyn: "Callyn delivers consistent, professional qualification — using your exact criteria 24/7."
    },
    {
      traditional: "Wasting commission potential when leads are missed or poorly qualified.",
      callyn: "Every single lead is answered, qualified, and followed up. Instantly."
    },
    {
      traditional: "You miss calls when you're with other clients or on another line.",
      callyn: "Callyn handles multiple sales calls at once — even after hours or on weekends."
    }
  ];

  const currentData = activeTab === "voicemail" ? voicemailData : answeringServiceData;
  const leftColumnTitle = activeTab === "voicemail" ? "Voicemail" : "Traditional Lead Handling";

  return (
    <section className="bg-callyn-darkBlue py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Let's Compare...
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 text-center mb-12">
          See how Callyn compares to other sales solutions.
        </p>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2">
            <button 
              className={`px-6 py-3 rounded-full ${activeTab === "voicemail" ? "bg-callyn-blue text-white" : "text-white/80"} focus:outline-none transition-colors`}
              onClick={() => setActiveTab("voicemail")}
            >
              Voicemail
            </button>
            <button 
              className={`px-6 py-3 rounded-full ${activeTab === "answering" ? "bg-callyn-blue text-white" : "text-white/80"} focus:outline-none transition-colors`}
              onClick={() => setActiveTab("answering")}
            >
              Sales Assistants
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              {leftColumnTitle}
            </div>
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              Callyn AI Sales Agent
            </div>
          </div>

          {currentData.map((item, index) => (
            <div key={index} className="grid grid-cols-2 border-t border-gray-200">
              <div className="p-6 text-center flex flex-col items-center">
                <X className="text-rose-500 mb-2" size={24} />
                <p>{activeTab === "voicemail" ? item.voicemail : item.traditional}</p>
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
