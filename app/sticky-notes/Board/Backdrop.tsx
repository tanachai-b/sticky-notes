import cx from "classnames";

export function Backdrop({
  isEditing,
  onMouseDown,
}: {
  isEditing?: boolean;
  onMouseDown?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "absolute",
        "w-full",
        "h-full",
        "transition-all",
        "bg-black-light",
        isEditing ? "bg-opacity-25" : "bg-opacity-0",
        { "backdrop-blur-x2": isEditing },
        { "pointer-events-none": !isEditing }
      )}
      onMouseDown={onMouseDown}
    />
  );
}
