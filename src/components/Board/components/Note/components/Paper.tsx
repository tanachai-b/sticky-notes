import cx from "classnames";
import { PointerEvent, ReactNode, useEffect, useState } from "react";
import { Draggable } from "src/common-components";
import { NoteColor } from "src/configs";

export function Paper({
  isVisible,
  isEditing,
  color,
  onMove,
  onPointerDown,
  onDoubleClick,
  onContextMenu,
  children,
}: {
  isVisible: boolean;
  isEditing: boolean;
  color: NoteColor;
  onMove: ({ dx, dy }: { dx: number; dy: number }) => void;
  onPointerDown: (e: PointerEvent) => void;
  onDoubleClick: () => void;
  onContextMenu: () => void;
  children: ReactNode;
}) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cursor = !isEditing && isDragging ? "grabbing" : "auto";
  }, [isDragging]);

  return (
    <Draggable
      onDragStart={() => setIsDragging(true)}
      onDrag={!isEditing ? onMove : () => {}}
      onDragStop={() => setIsDragging(false)}
    >
      <div
        className={cx(
          "w-[250px]",
          "h-[250px]",

          "rounded-[5px]",

          isVisible ? ["scale-100", "opacity-100"] : ["scale-0", "opacity-0"],

          isEditing
            ? "shadow-[0_50px_100px_0px_#000000c0]"
            : isDragging
            ? "shadow-[0_20px_50px_0px_#000000c0]"
            : "shadow-[0_10px_20px_0px_#000000c0]",

          "transition-all",

          "overflow-clip",
          "relative",

          !isEditing && !isDragging ? "cursor-grab" : "",
        )}
        style={{ backgroundColor: color }}
        onPointerDown={onPointerDown}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
      >
        {children}
      </div>
    </Draggable>
  );
}
