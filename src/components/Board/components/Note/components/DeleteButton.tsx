import cx from "classnames";
import { Icon } from "src/common-components";

export function DeleteButton({ onClick: onDelete }: { onClick: () => void }) {
  return (
    <button
      className={cx(
        "grid",
        "place-items-center",

        "relative",
        "group",
      )}
      onClick={onDelete}
    >
      <div
        className={cx(
          "grid",

          "text-[25px]",
          "text-[#ffffff40]",
          "group-hover:text-[#ffffffc0]",
          "transition-all",
        )}
      >
        <Icon icon="delete" />
      </div>

      <div
        className={cx(
          "absolute",
          "top-0",
          "group-hover:top-[calc(100%_+_15px)]",

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
    </button>
  );
}
