
import { MonitorSpeaker, Headphones } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface LiveListenProps {
  isConnected: boolean;
  onSpeak: (text: string) => void;
  onVolumeChange: (v: number) => void;
}

const LiveListen = ({ isConnected, onSpeak, onVolumeChange }: LiveListenProps) => {
  return (
    <div className="rounded-lg shadow-md bg-white p-5 flex flex-col gap-5 border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <Headphones className="h-6 w-6 text-blue-600" />
        <span className="font-semibold text-lg text-blue-900">Live Listen</span>
        <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded
          ${isConnected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {isConnected ? "Connected to Agent" : "Not Connected"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 mt-2 mb-1">
          Output Volume
        </label>
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={[80]}
          onValueChange={vals => onVolumeChange(vals[0] / 100)}
          className="w-full"
        />
      </div>
      <form
        className="flex gap-2 mt-3"
        onSubmit={e => {
          e.preventDefault();
          const text = (e.target as any).sayText.value.trim();
          if (text) {
            onSpeak(text);
            (e.target as any).reset();
          }
        }}
      >
        <input
          name="sayText"
          className="flex-1 px-3 py-2 rounded border border-gray-200 text-sm outline-none"
          placeholder="Type message to play to agent…"
          autoComplete="off"
          disabled={!isConnected}
        />
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 font-semibold text-sm transition"
          type="submit"
          disabled={!isConnected}
        >
          Speak
        </button>
      </form>
    </div>
  );
};

export default LiveListen;
