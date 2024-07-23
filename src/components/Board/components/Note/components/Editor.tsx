import cx from "classnames";
import { ReactNode } from "react";

export function Editor({
  visible,
  colorSelector,
  deleteButton,
}: {
  visible: boolean;
  colorSelector: ReactNode;
  deleteButton: ReactNode;
}) {
  return (
    <div
      className={cx(
        { visible: visible },
        { "pointer-events-none": !visible },

        "relative",
        "-top-[10px]",
        "ml-[20px]",

        "flex",
        "flex-col",
        "gap-[10px]",

        visible ? "opacity-100" : "opacity-0",
        "transition-all",
      )}
    >
      {colorSelector}

      {deleteButton}
    </div>
  );
}
