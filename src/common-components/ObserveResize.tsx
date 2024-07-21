import { ReactNode, useEffect, useRef } from "react";

export function ObserveResize({
  onResize,
  children,
}: {
  onResize: (boundingClientRect: DOMRect) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      onResize(ref.current.getBoundingClientRect());
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  return <div ref={ref}>{children}</div>;
}
