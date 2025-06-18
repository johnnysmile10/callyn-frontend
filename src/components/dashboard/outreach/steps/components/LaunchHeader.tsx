
import { Rocket } from "lucide-react";

const LaunchHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
        <Rocket className="h-8 w-8 text-white" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Ready to Launch!</h2>
        <p className="text-gray-600 mt-2">
          Review your campaign settings and launch your AI-powered outreach
        </p>
      </div>
    </div>
  );
};

export default LaunchHeader;
