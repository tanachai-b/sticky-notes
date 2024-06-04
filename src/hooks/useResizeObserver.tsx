import { useEffect, useRef, useState } from "react";

export function useResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;

      const { x, y, width, height } = ref.current.getBoundingClientRect();

      setX(x);
      setY(y);
      setWidth(width);
      setHeight(height);
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return { ref, x, y, width, height };
}
