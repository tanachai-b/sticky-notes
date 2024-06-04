import { useEffect, useState } from "react";

export function useInterval(callback: () => void, interval: number) {
  const [isTriggered, trigger] = useState({});

  useEffect(() => {
    const saveInterval = setInterval(() => trigger({}), interval);
    return () => clearInterval(saveInterval);
  }, []);

  useEffect(() => {
    callback();
  }, [isTriggered]);
}
