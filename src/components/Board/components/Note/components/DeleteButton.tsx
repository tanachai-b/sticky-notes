import cx from "classnames";
import { Icon } from "src/common-components";

export function DeleteButton({
  isVisible,
  onClick: onDelete,
}: {
  isVisible: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cx(
        "absolute",
        "place-self-center",
        "top-[calc(100%_+_10px)]",

        !isVisible ? ["invisible", "pointer-events-none", "opacity-0"] : "",
        "transition-all",

        "grid",
        "place-items-center",

        "group",
      )}
    >
      <button
        className={cx(
          "size-[30px]",

          "rounded-full",
          "bg-[#10101080]",
          "shadow-[0_10px_20px_0px_#00000080]",

          "border-[2px]",
          "border-[#ffffff]",

          "grid",
          "place-items-center",

          "text-[20px]",
          "text-[#ffffff]",

          "group-hover:scale-150",
          "transition-all",
        )}
        onClick={onDelete}
      >
        <Icon icon="delete" />
      </button>

      <div
        className={cx(
          "absolute",
          "top-0",
          "group-hover:top-[calc(100%_+_10px)]",

          "rounded-[5px]",
          "bg-[#101010c0]",

          "px-[5px]",

          "text-[13px]",
          "text-[#ffffffc0]",

          "opacity-0",
          "group-hover:opacity-100",
          "transition-all",

          "pointer-events-none",
        )}
      >
        Delete
      </div>
    </div>
  );
}
