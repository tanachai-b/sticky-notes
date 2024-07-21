import cx from "classnames";
import { PointerEvent, ReactNode, useRef } from "react";
import { useDraggable } from "src/common-hooks";

export function Paper({
  color,
  rotate,
  isEditing,
  onMove,
  onPointerDown,
  onDoubleClick,
  onContextMenu,
  children,
}: {
  color: number;
  rotate: number;
  isEditing: boolean;
  onMove: (dx: number, dy: number) => void;
  onPointerDown: (e: PointerEvent) => void;
  onDoubleClick: () => void;
  onContextMenu: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isPointerDown } = useDraggable({ ref, onDrag: !isEditing ? onMove : () => {} });

  return (
    <div
      ref={ref}
      className={cx(
        "visible",

        "w-[250px]",
        "h-[250px]",

        "rounded-[5px]",
        [
          "bg-[#ffe080]",
          "bg-[#ffb080]",
          "bg-[#ff80c0]",
          "bg-[#c080ff]",
          "bg-[#80c0ff]",
          "bg-[#80ffc0]",
          "bg-[#c0ff80]",
          "bg-[#ffffff]",
        ][color],

        isEditing
          ? "shadow-[0_20px_50px_0px_#00000080]"
          : isPointerDown
          ? "shadow-[0_10px_20px_0px_#00000080]"
          : "shadow-[0_5px_10px_0px_#00000080]",
        "transition-all",

        "overflow-hidden",
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
}
