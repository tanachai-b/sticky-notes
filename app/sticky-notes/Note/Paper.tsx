import cx from "classnames";
import { MouseEvent, ReactNode } from "react";

export function Paper({
  color = 0,
  rotate,
  isDragging: dragging,
  isEditing: editing,
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

        "text-x30",
        "font-light",
        "text-black-light",
        "font-handwriting",
        "select-none",
        "whitespace-pre-wrap",
        "text-center",
        "overflow-hidden",

        "flex",
        "flex-col",
        "items-center",
        "justify-center",

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
        editing ? "shadow-x50" : dragging ? "shadow-x20" : "shadow-x10",
        "transition-all",

        "pointer-events-auto"
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}
