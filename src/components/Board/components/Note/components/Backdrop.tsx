import cx from "classnames";

export function Backdrop({
  isEditing,
  onPointerDown,
}: {
  isEditing: boolean;
  onPointerDown: () => void;
}) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "transition-all",

        "bg-black-light",
        isEditing ? "bg-opacity-25" : "bg-opacity-0",

        { "backdrop-blur-x2": isEditing },
        { "pointer-events-none": !isEditing },
      )}
      onPointerDown={onPointerDown}
    />
  );
}
