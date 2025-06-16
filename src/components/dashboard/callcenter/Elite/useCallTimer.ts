
import { useState, useEffect } from "react";

export function useCallTimer(isConnected: boolean) {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let interval: any = null;
    if (isConnected) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);
  
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return isConnected ? `${mm}:${ss}` : null;
}
