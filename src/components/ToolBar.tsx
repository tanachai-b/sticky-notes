import cx from "classnames";
import { ReactNode } from "react";

export function ToolBar({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "items-start",

        "p-[30px]",

        "invisible",
      )}
    >
      <div
        className={cx(
          "visible",

          "rounded-full",

          "bg-[#202020]",
          "bg-opacity-75",

          "border",
          "border-[#e0e0e0]",
          "border-opacity-25",

          "backdrop-blur-[2px]",

          "py-[10px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
