import cx from "classnames";

import { useResizeObserver } from "../hooks";

export function FileSaveStatus({
  fileName,
  isSaving,
}: {
  fileName?: string;
  isSaving?: boolean;
} = {}) {
  const { ref, width } = useResizeObserver();

  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "flex-col",
        "items-center",

        "pt-x30",

        "pointer-events-none",
      )}
    >
      <div
        className={cx(
          "pointer-events-auto",

          "rounded-full",

          "bg-black-light",
          "bg-opacity-75",
          "backdrop-blur-x2",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "flex",
          "flex-row",

          "transition-all",
        )}
        style={{ width: `${width + 2}px` }}
      >
        <div
          ref={ref}
          className={cx(
            "flex",
            "flex-row",
            "gap-x10",

            "px-x10",
            "py-x5",
          )}
        >
          <div
            className={cx(
              "text-white-dark",
              "text-opacity-50",
              "whitespace-pre",
            )}
          >
            {fileName ?? "Unsaved"}
          </div>

          {fileName && (
            <div className={cx("text-white-dark", "italic")}>
              {isSaving ? "saving..." : "saved"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
