
interface QuickActionsBarProps {
  isConnected: boolean;
  isMuted: boolean;
  isHolding: boolean;
  onMuteToggle: () => void;
  onEndCall: () => void;
  onHoldToggle: () => void;
}

const QuickActionsBar = ({
  isConnected,
  isMuted,
  isHolding,
  onMuteToggle,
  onEndCall,
  onHoldToggle
}: QuickActionsBarProps) => {
  return (
    <div className="bg-gray-50 px-4 py-3 rounded-lg flex flex-row justify-between gap-2 border border-gray-200 shadow">
      <button
        type="button"
        onClick={onMuteToggle}
        className={`rounded px-4 py-2 text-sm font-semibold transition
        ${isMuted ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-900 hover:bg-blue-200"}`}
        disabled={!isConnected}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <button
        type="button"
        onClick={onHoldToggle}
        className={`rounded px-4 py-2 text-sm font-semibold transition
        ${isHolding ? "bg-yellow-100 text-yellow-900" : "bg-gray-100 text-gray-900 hover:bg-yellow-100"}`}
        disabled={!isConnected}
      >
        {isHolding ? "Resume" : "Hold"}
      </button>
      <button
        type="button"
        onClick={onEndCall}
        className="rounded px-4 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
        disabled={!isConnected}
      >
        End Call
      </button>
    </div>
  );
};

export default QuickActionsBar;
