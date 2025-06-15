
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, SendHorizontal } from "lucide-react";

/**
 * AI Assistant Panel for real-time prompting/instructions.
 * Stores conversation locally for now.
 */
const EXAMPLE_RESPONSES = [
  "Got it! I'll keep your instructions in mind for this call.",
  "Here are ways you can approach the next objection.",
  "Here's a sample phrasing for your pitch.",
];

interface Message {
  role: "user" | "assistant";
  text: string;
}

const AIAssistantPanel = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Simulate AI response (replace with real API later)
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { role: "user", text: input },
    ]);
    setLoading(true);
    setInput("");
    setTimeout(() => {
      const resp =
        EXAMPLE_RESPONSES[
          Math.floor(Math.random() * EXAMPLE_RESPONSES.length)
        ];
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", text: resp },
      ]);
      setLoading(false);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border border-blue-100 rounded-lg shadow px-4 py-6 min-h-[340px] flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="h-5 w-5 text-blue-700" />
        <h3 className="font-semibold text-blue-900 text-base">AI Assistant</h3>
      </div>
      <div className="text-xs text-blue-700 mb-3">
        Ask the AI for help, feedback, or instructions in real time.
      </div>
      <div className="flex-1 overflow-y-auto pr-1 mb-2 space-y-3 max-h-60">
        {messages.length === 0 && (
          <div className="text-gray-400 mt-6 text-center text-xs">
            Send your first message! Example: "Suggest an opener for a Solar call."
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col items-${m.role === "user" ? "end" : "start"}`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-sm whitespace-pre-line max-w-[90%] ${
                m.role === "user"
                  ? "bg-blue-50 text-blue-900 shadow mr-1"
                  : "bg-gray-100 text-gray-700 shadow-sm ml-1"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-start">
            <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm shadow-sm animate-pulse w-[70%]">
              AI is thinking…
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type idea, question, or instruction…"
          className="text-sm resize-none"
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={loading}
          aria-label="AI Assistant prompt input"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="flex gap-1 px-3 py-1 h-9 text-sm"
            variant="default"
            tabIndex={0}
            aria-label="Send to AI"
          >
            <SendHorizontal className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
