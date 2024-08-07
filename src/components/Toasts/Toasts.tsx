import cx from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
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
        "pb-[20px]",

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
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div
      className={cx("transition-all")}
      style={{
        marginBottom: isVisible ? "15px" : 0,
        height: isVisible ? ref.current?.clientHeight : 0,
      }}
    >
      <div
        ref={ref}
        className={cx(
          "rounded-[10px]",
          "bg-[#101010c0]",
          "backdrop-blur-[10px]",
          "shadow-[0_5px_10px_0_#202020c0]",

          "p-[10px]",
          "gap-[10px]",

          "flex",
          "flex-row",
          "items-center",

          "text-[14px]",

          "relative",
          isVisible
            ? ["top-0", "opacity-100", "visible"]
            : ["top-[100px]", "opacity-0", "invisible"],
          "transition-all",
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
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 150);
          }}
        >
          <Icon icon="close" />
        </button>

        <div className={cx("grow", "text-[#ffffff80]", "overflow-hidden", "text-ellipsis")}>
          {content}
        </div>

        <button
          className={cx("text-[#ffffff40]", "hover:text-[#ffffffc0]", "transition-all")}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onUndo, 150);
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
}
