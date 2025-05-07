
import { Target, Zap } from "lucide-react";

interface AddOnsSectionProps {
  addOns: Array<{
    minutes: string;
    price: string;
  }>;
}

const AddOnsSection = ({ addOns }: AddOnsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 rounded-xl p-8 text-white mt-12">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-callyn-blue" />
          <h3 className="text-xl font-bold">Need more minutes?</h3>
        </div>
        <div className="space-y-2">
          {addOns.map((addon, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-callyn-blue"></span>
              <span className="text-gray-300">+{addon.minutes} minutes = {addon.price}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-callyn-blue" />
          <h3 className="text-xl font-bold">Start with 50 free minutes</h3>
        </div>
        <p className="text-gray-300 mb-2">No credit card required</p>
        <p className="text-sm text-gray-400">Try Callyn risk-free and see the benefits firsthand</p>
      </div>
    </div>
  );
};

export default AddOnsSection;
