import cx from "classnames";
import { ReactNode, useRef } from "react";
import { useResizeObserver } from "src/common-hooks";

export function Container({
  onResize,
  children,
}: {
  onResize: (boundingClientRect: DOMRect) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useResizeObserver({ ref, onResize });

  return (
    <div ref={ref} className={cx("size-full", "relative")}>
      {children}
    </div>
  );
}
