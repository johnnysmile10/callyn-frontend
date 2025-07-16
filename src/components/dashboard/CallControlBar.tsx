
import { useState } from "react";
import { Play, SkipForward, Repeat, Clock, ListChecks, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface CallControlBarProps {
  isActive: boolean;
}

const CallControlBar = ({ isActive }: CallControlBarProps) => {
  const [autoCallEnabled, setAutoCallEnabled] = useState(true);

  if (!isActive) return null;

  const handlePlayAI = () => {
    // Implementation would connect to actual voice replay functionality
  };

  const handleNextCall = () => {
    // Implementation would trigger the next call in sequence
  };

  const handleToggleAutoCall = (enabled: boolean) => {
    setAutoCallEnabled(enabled);
    // Implementation would toggle actual auto-calling behavior
  };

  const handleCallbackSchedule = (time: string) => {
    // Implementation would connect to actual callback scheduling
  };

  const handleLogOutcome = (outcome: string) => {
    // Implementation would log the actual call outcome
  };

  const handleSkip = (isDNC: boolean) => {
    // Implementation would skip or mark lead as do-not-call
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 text-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
          {/* Left section with active status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Callyn is calling</span>
            </div>
          </div>

          {/* Controls section */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Play/Replay button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-slate-800"
                    onClick={handlePlayAI}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Play</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Replay the AI message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Next Call button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-slate-800"
                    onClick={handleNextCall}
                  >
                    <SkipForward className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Next Call</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move to next lead</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Auto-Call Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Repeat className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm whitespace-nowrap">Auto-Call:</span>
                    <Switch
                      checked={autoCallEnabled}
                      onCheckedChange={handleToggleAutoCall}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle auto-calling mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Call Back Later dropdown */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-slate-800"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Call Back</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCallbackSchedule("1 hour")}>
                        In 1 hour
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCallbackSchedule("tomorrow")}>
                        Tomorrow
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleCallbackSchedule("custom")}>
                        Custom time...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Schedule call-back for this lead</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Log Outcome dropdown */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-slate-800"
                      >
                        <ListChecks className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Log Outcome</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleLogOutcome("Interested")}>
                        Interested
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLogOutcome("Booked")}>
                        Appointment Booked
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLogOutcome("Not Interested")}>
                        Not Interested
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLogOutcome("No Answer")}>
                        No Answer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Label this call's result</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Skip / DNC button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-slate-800"
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Skip/DNC</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSkip(false)}>
                        Skip this lead
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleSkip(true)} className="text-red-500">
                        Mark as Do Not Call
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Skip or block this lead</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallControlBar;
