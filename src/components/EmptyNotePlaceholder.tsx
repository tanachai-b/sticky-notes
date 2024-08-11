import cx from "classnames";
import { Icon } from "src/common-components";

export function EmptyNotePlaceholder({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={cx(
        "absolute",
        "place-self-center",
        "pointer-events-none",

        !isVisible ? ["invisible", "opacity-0"] : "",
        "transition-all",

        "size-[250px]",
        "border-[1px]",
        "rounded-[10px]",
        "border-[#ffffff20]",

        "flex",
        "flex-col",
        "justify-center",
        "items-center",

        "text-[#ffffff20]",
      )}
    >
      <div className={cx("text-[70px]", "grid")}>
        <Icon icon="add" />
      </div>

      <div className={cx("text-[30px]", "font-handwriting")}>Add Note...</div>
    </div>
  );
}
