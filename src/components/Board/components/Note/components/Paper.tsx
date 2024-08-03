import cx from "classnames";
import { PointerEvent, ReactNode, useState } from "react";
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
  const [isPointerDown, setIsPointerDown] = useState(false);

  return (
    <Draggable onDrag={!isEditing ? onMove : () => {}}>
      <div
        className={cx(
          "w-[250px]",
          "h-[250px]",

          "rounded-[5px]",

          isVisible ? ["scale-100", "opacity-100"] : ["scale-0", "opacity-0"],

          isEditing
            ? "shadow-[0_50px_100px_0px_#000000c0]"
            : isPointerDown
            ? "shadow-[0_20px_50px_0px_#000000c0]"
            : "shadow-[0_10px_20px_0px_#000000c0]",

          "transition-all",

          "overflow-clip",
          "relative",

          !isEditing ? ["cursor-grab", "active:cursor-grabbing"] : [],
        )}
        style={{ backgroundColor: color }}
        onPointerDown={(e) => {
          setIsPointerDown(true);
          onPointerDown(e);
        }}
        onPointerUp={() => setIsPointerDown(false)}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
      >
        {children}
      </div>
    </Draggable>
  );
}
