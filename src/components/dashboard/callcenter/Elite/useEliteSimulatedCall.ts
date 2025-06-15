
import { useState, useEffect, useCallback } from "react";

/**
 * Types for call state and transcript.
 */
export interface TranscriptLine {
  speaker: "Agent" | "Lead" | "Supervisor";
  text: string;
}

export interface EliteSimulatedCallHook {
  isConnected: boolean;
  isMuted: boolean;
  isHolding: boolean;
  transcriptLines: TranscriptLine[];
  agentInstructions: string;
  outcomeGoals: string;
  onMuteToggle: () => void;
  onEndCall: () => void;
  onHoldToggle: () => void;
  onSpeak: (text: string) => void;
  onVolumeChange: (vol: number) => void;
}

/**
 * Custom hook: Simulates a real-time Elite Call Center call session.
 * Useful for development/demo purposes. Replace with the production integration for real calls.
 */
const FAKE_TRANSCRIPT: TranscriptLine[] = [
  { speaker: "Agent", text: "Hello, this is Callyn from ACME Outreach. Is this John?" },
  { speaker: "Lead", text: "Yes, speaking." },
  { speaker: "Agent", text: "Great! I'm calling about the new solar incentives in your area—do you have a minute?" },
  { speaker: "Lead", text: "Uh, sure, go ahead." },
  { speaker: "Agent", text: "Thank you! Are you the primary decision maker for your home energy upgrades?" },
  { speaker: "Lead", text: "I am. Why do you ask?" }
];

const AGENT_INSTRUCTIONS =
  "1. Be polite and professional. 2. Clearly explain offer. 3. Handle objections with empathy. 4. Move toward booking demo call.";
const OUTCOME_GOALS =
  "Book an appointment for our Solar Savings Demo by the end of this call.";

export function useEliteSimulatedCall(): EliteSimulatedCallHook {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [transcriptLines, setTranscriptLines] = useState<TranscriptLine[]>([]);
  const [volume, setVolume] = useState<number>(0.8);

  // Simulate transcript streaming in, unless holding/disconnected.
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
}
