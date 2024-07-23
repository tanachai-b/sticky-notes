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
        "invisible",

        visible ? "opacity-100" : "opacity-0",
        "transition-all",

        "absolute",
        "grid",
        "size-full",
      )}
    >
      <div
        className={cx(
          visible ? "visible" : "",

          "absolute",
          "place-self-center",

          "left-[calc(100%_+_10px)]",
        )}
      >
        {colorSelector}
      </div>

      <div
        className={cx(
          visible ? "visible" : "",

          "absolute",
          "place-self-center",

          "top-[calc(100%_+_10px)]",
        )}
      >
        {deleteButton}
      </div>
    </div>
  );
}
