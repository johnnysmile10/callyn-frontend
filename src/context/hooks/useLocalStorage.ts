
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue || null;
    }
  });

  const setValue = (value: T | null) => {
    try {
      setStoredValue(value);
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Only set up the effect if we're in the browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue || null;
      
      // Only update if the value has actually changed
      if (JSON.stringify(parsedItem) !== JSON.stringify(storedValue)) {
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}" in effect:`, error);
    }
  }, [key]); // Remove storedValue from dependencies to prevent infinite loop

  return [storedValue, setValue] as const;
}
