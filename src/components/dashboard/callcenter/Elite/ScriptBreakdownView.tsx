
interface Section {
  step: string;
  details: string;
}

interface ScriptBreakdownViewProps {
  scriptSections: Section[];
  currentStepIdx: number;
}

const ScriptBreakdownView = ({ scriptSections, currentStepIdx }: ScriptBreakdownViewProps) => (
  <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-4 mb-3 shadow-sm">
    <h3 className="font-semibold text-blue-900 mb-2 text-base">Script Breakdown</h3>
    <ol className="space-y-2">
      {scriptSections.map((s, i) => (
        <li
          key={i}
          className={`p-2 rounded transition ${
            i === currentStepIdx
              ? "bg-blue-100/80 border-blue-500 border-l-4"
              : "bg-white border-transparent"
          }`}
        >
          <span className="font-medium text-blue-800">{s.step}</span>
          <div className="text-xs text-gray-700">{s.details}</div>
        </li>
      ))}
    </ol>
  </div>
);

export default ScriptBreakdownView;
