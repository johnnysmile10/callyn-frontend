
import { Check, X } from "lucide-react";
import { useState } from "react";

const ComparisonTable = () => {
  const [activeTab, setActiveTab] = useState<"voicemail" | "answering">("voicemail");
  
  const voicemailData = [
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

  const answeringServiceData = [
    {
      traditional: "Low-quality calls from agents who don't know your business.",
      callyn: "Callyn is trained on your Google profile, website, and scripts. She knows your business inside and out."
    },
    {
      traditional: "Inconsistent caller experience from humans who forget or fumble.",
      callyn: "Callyn delivers consistent, professional, and polite responses — 24/7."
    },
    {
      traditional: "Wasting money on ads because calls are missed or poorly handled.",
      callyn: "Every single lead is answered, qualified, and followed up. Instantly."
    },
    {
      traditional: "You miss calls when you're busy, out on a job, or on another line.",
      callyn: "Callyn handles multiple calls at once — even after hours or on weekends."
    }
  ];

  const currentData = activeTab === "voicemail" ? voicemailData : answeringServiceData;
  const leftColumnTitle = activeTab === "voicemail" ? "Voicemail" : "Traditional Call Handling";

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
              Answering Service
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              {leftColumnTitle}
            </div>
            <div className="bg-callyn-darkBlue text-white p-4 text-center font-bold text-xl">
              Callyn AI Voice Agent
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
