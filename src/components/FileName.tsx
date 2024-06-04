import cx from "classnames";

import { useResizeObserver } from "../hooks";

export function FileName({
  className,
  fileName,
  isSaving,
}: { className?: string; fileName?: string; isSaving?: boolean } = {}) {
  const { ref, width } = useResizeObserver();

  return (
    <div
      className={cx(
        "p-x30",

        "flex",
        "items-start",
        "justify-center",

        "pointer-events-none",

        className,
      )}
    >
      <div
        className={cx(
          "rounded-full",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "bg-black-light",
          "bg-opacity-75",

          "backdrop-blur-x2",

          "transition-all",

          "flex",
          "flex-row",

          "whitespace-pre",
          "overflow-hidden",
        )}
        style={{ width: `${width + 2}px` }}
      >
        <div
          ref={ref}
          className={cx(
            "px-x10",
            "py-x5",

            "flex",
            "flex-row",
            "gap-x10",
          )}
        >
          <div className={cx("text-white-dark", "text-opacity-50")}>
            {fileName ?? "Unsaved"}
          </div>

          {fileName ? (
            <div
              className={cx("text-white-dark", "text-opacity-100", "italic")}
            >
              {isSaving ? "saving..." : "saved"}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
