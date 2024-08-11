import cx from "classnames";
import { useEffect, useState } from "react";
import { Draggable, Icon } from "src/common-components";

export function RotateButton({
  onDragStart,
  onDrag,
  onDragStop,
}: {
  onDragStart: ({ mx, my }: { mx: number; my: number }) => void;
  onDrag: ({ mx, my }: { mx: number; my: number }) => void;
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
      onDragStart={({ mx, my }) => {
        onDragStart({ mx, my });
        setIsDragging(true);
      }}
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
        <Icon icon="refresh" />
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
          "whitespace-pre",

          "opacity-0",
          "group-hover:opacity-100",
          "transition-all",

          "pointer-events-none",
        )}
      >
        Drag to Rotate
      </div>
    </Draggable>
  );
}
