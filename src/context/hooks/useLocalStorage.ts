
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T | null = null) => {
  const [value, setValue] = useState<T | null>(initialValue);

  // Load from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        setValue(JSON.parse(storedValue));
      } catch (error) {
        console.error(`Error parsing stored ${key}:`, error);
        localStorage.removeItem(key);
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

  // Update localStorage and state
  const updateValue = (newValue: T | null) => {
    setValue(newValue);
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, updateValue] as const;
};
