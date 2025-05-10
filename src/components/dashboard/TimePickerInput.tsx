
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TimePickerInputProps {
  defaultValue?: string;
  onChange?: (time: string) => void;
}

export const TimePickerInput = ({ defaultValue = "09:00", onChange }: TimePickerInputProps) => {
  const [time, setTime] = useState(defaultValue);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      type="time"
      value={time}
      onChange={handleTimeChange}
      className="w-full"
    />
  );
};
