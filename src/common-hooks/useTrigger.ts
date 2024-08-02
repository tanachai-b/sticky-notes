import { useEffect, useState } from "react";

export function useTrigger<T>(callback: (prop?: T) => void) {
  const [triggered, setTriggered] = useState<{ prop?: T }>({});

  useEffect(() => {
    callback(triggered.prop);
  }, [triggered]);

  return (prop: T) => setTriggered({ prop });
}
