import React from 'react';

/**
 * React hook that returns the previous value
 * @param {any} value
 */
export function usePrevious<T = any>(value: T, initialValue: T): T {
  const ref = React.useRef(initialValue);

  // Store current value in ref, only update if the value changes
  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
