import cx from "classnames";
import { MouseEvent, ReactNode } from "react";

export function Paper({
  color = 0,
  rotate,
  isDragging,
  isEditing,
  onMouseDown,
  onDoubleClick,
  children,
}: {
  color?: number;
  rotate?: number;
  isDragging?: boolean;
  isEditing?: boolean;
  onMouseDown?: (e: MouseEvent) => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
} = {}) {
  return (
    <div
      className={cx(
        "w-[250px]",
        "h-[250px]",

        "rounded-x5",
        [
          "bg-yellow-light",
          "bg-orange-light",
          "bg-red-light",
          "bg-purple-light",
          "bg-blue-light",
          "bg-green-bluish-light",
          "bg-green-yellowish-light",
          "bg-white",
        ][color],

        isEditing ? "shadow-x50" : isDragging ? "shadow-x20" : "shadow-x10",
        "transition-all",

        "overflow-hidden",

        "pointer-events-auto",
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}
