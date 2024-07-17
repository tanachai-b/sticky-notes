import cx from "classnames";
import { ReactNode } from "react";

export function ToolBar({ children }: { children?: ReactNode } = {}) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "items-start",

        "p-x30",

        "pointer-events-none",
      )}
    >
      <div
        className={cx(
          "pointer-events-auto",

          "rounded-full",

          "bg-black-light",
          "bg-opacity-75",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "backdrop-blur-x2",

          "py-x10",
        )}
      >
        {children}
      </div>
    </div>
  );
}
