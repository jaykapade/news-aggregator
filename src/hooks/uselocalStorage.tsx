import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get item from localStorage
      const item = window.localStorage.getItem(key);
      // Parse and return item if it exists, otherwise return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Save to localStorage whenever the value changes
  useEffect(() => {
    try {
      // Save state to localStorage as a string
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  // Return the state and setter function
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
