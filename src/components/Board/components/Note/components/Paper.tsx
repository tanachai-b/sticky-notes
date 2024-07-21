import cx from "classnames";
import { PointerEvent, ReactNode } from "react";

export function Paper({
  color = 0,
  rotate,
  isDragging,
  isEditing,
  onPointerDown,
  onDoubleClick,
  children,
}: {
  color: number;
  rotate: number;
  isDragging: boolean;
  isEditing: boolean;
  onPointerDown: (e: PointerEvent) => void;
  onDoubleClick: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
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
          : isDragging
          ? "shadow-[0_10px_20px_0px_#00000080]"
          : "shadow-[0_5px_10px_0px_#00000080]",
        "transition-all",

        "overflow-hidden",

        "pointer-events-auto",
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      onContextMenu={onDoubleClick}
    >
      {children}
    </div>
  );
}
