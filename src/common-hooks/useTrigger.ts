import { useEffect, useState } from "react";

export function useTrigger(callback: () => void) {
  const [triggered, setTriggered] = useState<object>();

  useEffect(() => {
    callback();
  }, [triggered]);

  return () => setTriggered({});
}
