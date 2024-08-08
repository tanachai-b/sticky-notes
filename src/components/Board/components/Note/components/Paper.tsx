import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { Clickable, Draggable } from "src/common-components";
import { NoteColor } from "src/configs";

export function Paper({
  isVisible,
  isEditing,
  color,
  children,
  onPointerDown,
  onMove,
  onClick,
}: {
  isVisible: boolean;
  isEditing: boolean;
  color: NoteColor;
  children: ReactNode;
  onPointerDown: () => void;
  onMove: ({ dx, dy }: { dx: number; dy: number }) => void;
  onClick: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cursor = !isEditing && isDragging ? "grabbing" : "auto";
  }, [isDragging]);

  return (
    <Draggable
      onDragStart={() => {
        onPointerDown();
        setIsDragging(true);
      }}
      onDrag={!isEditing ? onMove : () => {}}
      onDragStop={() => setIsDragging(false)}
    >
      <Clickable onClick={onClick}>
        <div
          className={cx(
            "w-[250px]",
            "h-[250px]",

            "rounded-[5px]",

            isVisible ? ["scale-100", "opacity-100"] : ["scale-0", "opacity-0"],

            isEditing || isDragging
              ? "shadow-[0_20px_50px_0_#000000c0]"
              : "shadow-[0_10px_20px_0_#000000c0]",

            "transition-all",

            "overflow-clip",
            "relative",

            !isEditing && !isDragging ? "cursor-grab" : "",
          )}
          style={{ backgroundColor: color }}
        >
          {children}
        </div>
      </Clickable>
    </Draggable>
  );
}
