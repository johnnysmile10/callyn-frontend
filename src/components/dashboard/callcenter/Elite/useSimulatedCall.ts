
import { useState, useEffect, useCallback } from "react";

/**
 * Simulates a real-time call state for demo purposes.
 * Replace with real telephony/call agent integration for production.
 */
const FAKE_TRANSCRIPT = [
  { speaker: "Agent", text: "Hello, this is Callyn from ACME Outreach. Is this John?" },
  { speaker: "Lead", text: "Yes, speaking." },
  { speaker: "Agent", text: "Great! I'm calling about the new solar incentives in your area—do you have a minute?" },
  { speaker: "Lead", text: "Uh, sure, go ahead." },
  { speaker: "Agent", text: "Thank you! Are you the primary decision maker for your home energy upgrades?" },
  { speaker: "Lead", text: "I am. Why do you ask?" }
] as const;

const AGENT_INSTRUCTIONS =
  "1. Be polite and professional. 2. Clearly explain offer. 3. Handle objections with empathy. 4. Move toward booking demo call.";

const OUTCOME_GOALS =
  "Book an appointment for our Solar Savings Demo by the end of this call.";

const useSimulatedCall = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState<{ speaker: string; text: string }[]>([]);
  const [volume, setVolume] = useState(0.8);

  // Simulate transcript streaming in.
  useEffect(() => {
    if (!isConnected || isHolding) return;
    if (transcriptLines.length >= FAKE_TRANSCRIPT.length) return;
    const timer = setTimeout(() => {
      setTranscriptLines(lines => [
        ...lines,
        FAKE_TRANSCRIPT[lines.length]
      ]);
    }, 1500);
    return () => clearTimeout(timer);
  }, [transcriptLines, isConnected, isHolding]);

  const onMuteToggle = useCallback(() => setIsMuted(m => !m), []);
  const onEndCall = useCallback(() => {
    setIsConnected(false);
    setTranscriptLines([]);
  }, []);
  const onHoldToggle = useCallback(() => setIsHolding(val => !val), []);
  const onSpeak = useCallback((text: string) => {
    setTranscriptLines(lines => [...lines, { speaker: "Supervisor", text }]);
  }, []);
  const onVolumeChange = useCallback((vol: number) => setVolume(vol), []);

  return {
    isConnected,
    isMuted,
    isHolding,
    transcriptLines,
    agentInstructions: AGENT_INSTRUCTIONS,
    outcomeGoals: OUTCOME_GOALS,
    onMuteToggle,
    onEndCall,
    onHoldToggle,
    onSpeak,
    onVolumeChange
  };
};

export default useSimulatedCall;
