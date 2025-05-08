
import React from "react";
import { MessageSquare } from "lucide-react";

const HybridModeExplainer: React.FC = () => {
  return (
    <div className="mt-12 mb-16 max-w-3xl mx-auto bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-callyn-blue/20 p-2 rounded-full">
          <MessageSquare className="w-5 h-5 text-callyn-blue" />
        </div>
        <h3 className="text-lg font-semibold text-white">What's Hybrid Mode?</h3>
      </div>
      <p className="text-gray-300 ml-10">
        With Callyn, you're never locked out of the call. If you want to take over live, 
        just jump in. AI when you want it. Human when it counts.
      </p>
    </div>
  );
};

export default HybridModeExplainer;
