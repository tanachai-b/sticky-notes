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

        "bg-[#202020]",

        isEditing ? "bg-opacity-25" : "bg-opacity-0",
        { "backdrop-blur-[2px]": isEditing },
        { invisible: !isEditing },
        "transition-all",
      )}
      onPointerDown={onPointerDown}
    />
  );
}
