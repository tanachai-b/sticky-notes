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

        "bg-[#202020]",
        isEditing ? "bg-opacity-25" : "bg-opacity-0",

        { "backdrop-blur-[2px]": isEditing },
        { "pointer-events-none": !isEditing },
      )}
      onPointerDown={onPointerDown}
    />
  );
}
