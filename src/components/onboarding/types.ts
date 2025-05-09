
export interface ScenarioProps {
  title: string;
  script: string;
  audioSrc?: string; // In a real implementation, this would point to actual audio files
}

export interface VoicePreviewProps {
  greeting: string;
  message: string;
  audioSrc?: string;
}
