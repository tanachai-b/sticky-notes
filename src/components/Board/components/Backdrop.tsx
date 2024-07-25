import cx from "classnames";
import { Draggable } from "src/common-components";

export function Backdrop({
  onDrag,
  onAddNote,
}: {
  onDrag: ({ dx, dy }: { dx: number; dy: number }) => void;
  onAddNote: (x: number, y: number) => void;
}) {
  return (
    <Draggable className={cx("absolute", "size-full")} onDrag={onDrag}>
      <div
        className={cx("size-full")}
        onDoubleClick={(e) => onAddNote(e.clientX, e.clientY)}
        onContextMenu={(e) => onAddNote(e.clientX, e.clientY)}
      />
    </Draggable>
  );
}
