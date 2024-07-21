import { RefObject, useEffect } from "react";

export function useResizeObserver({
  ref,
  onResize,
}: {
  ref: RefObject<HTMLDivElement>;
  onResize: (boundingClientRect: DOMRect) => void;
}) {
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      onResize(ref.current.getBoundingClientRect());
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);
}
