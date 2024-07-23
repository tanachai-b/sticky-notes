import cx from "classnames";
import { PointerEvent, ReactNode, useState } from "react";
import { Draggable } from "src/common-components";
import { NoteColor } from "src/configs";

export function Paper({
  color,
  isEditing,
  onMove,
  onPointerDown,
  onDoubleClick,
  onContextMenu,
  children,
}: {
  color: NoteColor;
  isEditing: boolean;
  onMove: ({ dx, dy }: { dx: number; dy: number }) => void;
  onPointerDown: (e: PointerEvent) => void;
  onDoubleClick: () => void;
  onContextMenu: () => void;
  children: ReactNode;
}) {
  const [isPointerDown, setIsPointerDown] = useState(false);

  return (
    <Draggable
      onDrag={!isEditing ? onMove : () => {}}
      onPointerDown={() => setIsPointerDown(true)}
      onPointerUp={() => setIsPointerDown(false)}
    >
      <div
        className={cx(
          "w-[250px]",
          "h-[250px]",

          "rounded-[5px]",

          isEditing
            ? "shadow-[0_20px_50px_0px_#00000080]"
            : isPointerDown
            ? "shadow-[0_10px_20px_0px_#00000080]"
            : "shadow-[0_5px_10px_0px_#00000080]",
          "transition-all",

          "overflow-hidden",
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
