import cx from "classnames";
import { useRef } from "react";
import { useDraggable } from "src/common-hooks";

export function Backdrop({
  onDrag,
  onAddNote,
}: {
  onDrag: (dx: number, dy: number) => void;
  onAddNote: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDraggable({ ref, onDrag });

  return (
    <div
      ref={ref}
      className={cx("absolute", "size-full")}
      onDoubleClick={(e) => onAddNote(e.clientX, e.clientY)}
      onContextMenu={(e) => onAddNote(e.clientX, e.clientY)}
    />
  );
}
