import cx from "classnames";
import { Icon } from "src/common-components";

export function DeleteButton({ onClick: onDelete }: { onClick: () => void }) {
  return (
    <div
      className={cx(
        "group",

        "grid",
        "place-items-center",

        "p-[2px]",

        "relative",
      )}
    >
      <div
        className={cx(
          "size-[30px]",
          "rounded-full",

          "border-[2px]",
          "border-[#ffffff]",

          "bg-[#202020]",
          "bg-opacity-50",

          "grid",
          "place-items-center",

          "text-[#ffffff]",
          "text-[20px]",

          "cursor-pointer",
          "group-hover:scale-150",
          "transition-all",
        )}
        onClick={onDelete}
      >
        <Icon icon="delete" />
      </div>

      <div
        className={cx(
          "absolute",
          "top-[45px]",

          "rounded-[7px]",
          "px-[5px]",
          "py-[0px]",

          "text-[15px]",
          "font-light",
          "whitespace-pre",
          "text-[#ffffff]",

          "bg-[#202020]",
          "bg-opacity-50",

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
