interface RealtimeMonitorPanelProps {
  isConnected: boolean;
  transcriptLines: { speaker: string; text: string }[];
}

/**
 * RealtimeMonitorPanel - displays the real-time transcript.
 * Shows loading skeleton while isConnected and transcript not yet loaded.
 */
const RealtimeMonitorPanel = ({ isConnected, transcriptLines }: RealtimeMonitorPanelProps) => {
  if (isConnected && !transcriptLines.length) {
    return (
      <div className="rounded-xl bg-white border border-blue-100 p-6 shadow-lg min-h-[340px] flex flex-col justify-center items-center animate-pulse">
        <div className="w-2/3 h-10 rounded bg-blue-100/70 mb-4" />
        <div className="w-full h-6 rounded bg-gray-100/80 mb-2" />
        <div className="w-5/6 h-6 rounded bg-gray-100/80 mb-2" />
        <div className="w-4/6 h-6 rounded bg-gray-100/80 mb-2" />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-blue-100 p-6 shadow-lg min-h-[340px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-block w-3 h-3 rounded-full
          ${isConnected ? "bg-green-500" : "bg-gray-400"}`} />
        <span className="font-medium text-blue-900">
          {isConnected ? "CALL ACTIVE" : "Waiting for call…"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 max-h-80 animate-fade-in">
        {transcriptLines.length === 0 ? (
          <div className="text-gray-400 mt-10 text-center">No conversation yet</div>
        ) : (
          <ul className="space-y-2">
            {transcriptLines.map((line, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className={`text-sm font-bold
                  ${line.speaker === "Agent" ? "text-blue-700" : "text-gray-900"}`}>
                  {line.speaker}:
                </span>
                <span className="text-sm">{line.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RealtimeMonitorPanel;
