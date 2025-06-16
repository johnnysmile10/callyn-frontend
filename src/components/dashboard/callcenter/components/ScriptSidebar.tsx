
import { FileText, CheckCircle } from "lucide-react";

interface ScriptSection {
  step: string;
  details: string;
}

interface ScriptSidebarProps {
  scriptSections: ScriptSection[];
  currentStepIdx: number;
}

const ScriptSidebar = ({ scriptSections, currentStepIdx }: ScriptSidebarProps) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Script Guide</h2>
      </div>

      <div className="space-y-4">
        {scriptSections.map((section, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition-all ${
              idx === currentStepIdx
                ? "bg-indigo-50 border-indigo-200 shadow-sm"
                : idx < currentStepIdx
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {idx < currentStepIdx ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  idx === currentStepIdx
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-300 text-gray-400"
                }`}>
                  {idx + 1}
                </div>
              )}
              <h3 className={`font-semibold ${
                idx === currentStepIdx
                  ? "text-indigo-900"
                  : idx < currentStepIdx
                    ? "text-green-900"
                    : "text-gray-700"
              }`}>
                {section.step}
              </h3>
            </div>
            <p className={`text-sm ml-8 ${
              idx === currentStepIdx
                ? "text-indigo-700"
                : idx < currentStepIdx
                  ? "text-green-700"
                  : "text-gray-600"
            }`}>
              {section.details}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentStepIdx + 1} of {scriptSections.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIdx + 1) / scriptSections.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScriptSidebar;
