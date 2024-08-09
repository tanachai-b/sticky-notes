import cx from "classnames";
import { Icon } from "src/common-components";

export function StrikethroughButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      className={cx(
        "grid",
        "place-items-center",

        "relative",
        "group",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "grid",

          "text-[25px]",
          active ? "text-[#ffffffc0]" : "text-[#ffffff40]",
          "transition-all",
        )}
      >
        <Icon icon="format_strikethrough" />
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
        Strikethrough
      </div>
    </button>
  );
}
