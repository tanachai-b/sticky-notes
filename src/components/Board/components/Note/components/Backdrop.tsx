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

        isEditing ? ["bg-[#00000040]", "backdrop-blur-[2px]"] : "",
        !isEditing ? "invisible" : "",
        "transition-all",
      )}
      onPointerDown={onPointerDown}
    />
  );
}
