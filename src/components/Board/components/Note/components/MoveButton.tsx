import cx from "classnames";
import { useEffect, useState } from "react";
import { Draggable, Icon } from "src/common-components";

export function MoveButton({
  onDrag,
  onDragStop,
}: {
  onDrag: ({ dx, dy }: { dx: number; dy: number }) => void;
  onDragStop: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isDragging ? "grabbing" : "auto";
  }, [isDragging]);

  return (
    <Draggable
      className={cx(
        "grid",
        "place-items-center",

        "cursor-grab",
        "active:cursor-grabbing",

        "relative",
        "group",
      )}
      onDragStart={() => setIsDragging(true)}
      onDrag={onDrag}
      onDragStop={() => {
        onDragStop();
        setIsDragging(false);
      }}
    >
      <div
        className={cx(
          "grid",

          "text-[25px]",
          "text-[#ffffff40]",
          "group-hover:text-[#ffffffc0]",
          "transition-all",
        )}
      >
        <Icon icon="drag_pan" />
      </div>

      <div
        className={cx(
          "absolute",
          "top-0",
          "group-hover:top-[calc(100%_+_15px)]",

          "rounded-[5px]",
          "bg-[#101010c0]",

          "px-[5px]",

          "text-[13px]",
          "text-[#ffffffc0]",

          "opacity-0",
          "group-hover:opacity-100",
          "transition-all",

          "pointer-events-none",
        )}
      >
        Move
      </div>
    </Draggable>
  );
}
