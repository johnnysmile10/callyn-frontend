
import { useState, useRef, useEffect } from "react";
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

/**
 * CallOutcomeButtons - Logs call outcome with keyboard and accessibility features.
 * Layout: always horizontal, scrollable on small screens, wraps on large.
 */
const CallOutcomeButtons = ({ onOutcomeSelect }: CallOutcomeButtonsProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  // Keyboard accessibility: focus management
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (selected && btnRefs.current) {
      const idx = OUTCOMES.findIndex(o => o.id === selected);
      if (btnRefs.current[idx]) {
        btnRefs.current[idx]?.focus();
      }
    }
  }, [selected]);

  return (
    // Use flex-row and scrolling for x-overflow on small screens, wrap on lg
    <div
      className="flex flex-row gap-2 mb-2 mt-4 overflow-x-auto whitespace-nowrap lg:flex-wrap scrollbar-thin"
      role="group"
      aria-label="Log Call Outcome"
      style={{ WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}
    >
      {OUTCOMES.map((o, idx) => (
        <Button
          key={o.id}
          className={`!inline-flex !w-auto min-w-[110px] justify-center px-3 py-1 text-sm font-semibold rounded transition-all shadow-sm ${o.color} text-white ${selected === o.id ? "ring-2 ring-offset-1 ring-blue-400 scale-105" : ""}`}
          onClick={() => {
            setSelected(o.id);
            onOutcomeSelect(o.id);
          }}
          ref={el => btnRefs.current[idx] = el}
          aria-pressed={selected === o.id}
          aria-label={o.label}
          tabIndex={0}
          variant="ghost"
          type="button"
          onKeyDown={e => {
            // Allow left/right navigation between buttons
            if (e.key === "ArrowRight") {
              const next = (idx + 1) % OUTCOMES.length;
              btnRefs.current[next]?.focus();
              e.preventDefault();
            } else if (e.key === "ArrowLeft") {
              const prev = (idx - 1 + OUTCOMES.length) % OUTCOMES.length;
              btnRefs.current[prev]?.focus();
              e.preventDefault();
            }
          }}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
};

export default CallOutcomeButtons;
