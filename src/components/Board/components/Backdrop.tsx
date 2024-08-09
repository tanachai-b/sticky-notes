import cx from "classnames";
import { useEffect, useState } from "react";
import { Clickable, Draggable } from "src/common-components";

export function Backdrop({
  onDrag,
  onAddNote,
}: {
  onDrag: ({ dx, dy }: { dx: number; dy: number }) => void;
  onAddNote: (x: number, y: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isDragging ? "grabbing" : "auto";
  }, [isDragging]);

  return (
    <Draggable
      className={cx(
        "absolute",
        "size-full",

        "cursor-grab",
        "active:cursor-grabbing",
      )}
      onDragStart={() => setIsDragging(true)}
      onDrag={onDrag}
      onDragStop={() => setIsDragging(false)}
    >
      <Clickable className={cx("size-full")} onClick={(e) => onAddNote(e.clientX, e.clientY)} />
    </Draggable>
  );
}
