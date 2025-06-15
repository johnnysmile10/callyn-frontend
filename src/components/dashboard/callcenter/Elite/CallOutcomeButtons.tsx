
import { useState } from "react";
import { Button } from "@/components/ui/button";

const OUTCOMES = [
  { id: "apmt", label: "Booked Appt", color: "bg-green-500" },
  { id: "interested", label: "Interested", color: "bg-blue-500" },
  { id: "callback", label: "Callback", color: "bg-yellow-400" },
  { id: "not_interested", label: "No Interest", color: "bg-gray-300" },
  { id: "wrong_number", label: "Wrong #", color: "bg-red-400" },
];

interface CallOutcomeButtonsProps {
  onOutcomeSelect: (outcome: string) => void;
}

const CallOutcomeButtons = ({ onOutcomeSelect }: CallOutcomeButtonsProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex gap-2 flex-wrap mb-2 mt-4">
      {OUTCOMES.map((o) => (
        <Button
          key={o.id}
          className={`px-3 py-1 text-sm font-semibold rounded transition-all shadow-sm ${o.color} text-white ${selected === o.id ? "ring-2 ring-offset-1 ring-blue-400 scale-105" : ""}`}
          onClick={() => {
            setSelected(o.id);
            onOutcomeSelect(o.id);
          }}
          variant="ghost"
          type="button"
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
};

export default CallOutcomeButtons;
