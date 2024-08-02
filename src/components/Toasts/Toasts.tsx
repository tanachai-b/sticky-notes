import cx from "classnames";
import { ReactNode } from "react";
import { Icon } from "src/common-components";

export function Toasts({ toasts }: { toasts: ReactNode[] }) {
  return (
    <div
      className={cx(
        "absolute",
        "justify-self-center",
        "self-end",

        "w-full",
        "max-w-[500px]",

        "flex",
        "flex-col-reverse",
        "items-stretch",

        "p-[15px]",
        "gap-[15px]",

        "invisible",
      )}
    >
      {toasts}
    </div>
  );
}

export function Toast({
  content,
  onClose,
  onUndo,
}: {
  content: ReactNode;
  onClose: () => void;
  onUndo: () => void;
}) {
  return (
    <div
      className={cx(
        "visible",

        "rounded-[10px]",
        "bg-[#181818e0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0_#000000c0]",

        "p-[10px]",
        "gap-[10px]",

        "flex",
        "flex-row",
        "items-center",

        "text-[14px]",
      )}
    >
      <button
        className={cx(
          "text-[20px]",
          "text-[#ffffff40]",
          "hover:text-[#ffffffc0]",
          "transition-all",

          "grid",
        )}
        onClick={onClose}
      >
        <Icon icon="close" />
      </button>

      <div className={cx("grow", "text-[#ffffff80]", "overflow-hidden", "text-ellipsis")}>
        {content}
      </div>

      <button
        className={cx("text-[#ffffff40]", "hover:text-[#ffffffc0]", "transition-all")}
        onClick={onUndo}
      >
        Undo
      </button>
    </div>
  );
}
