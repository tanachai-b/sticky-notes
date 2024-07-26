import cx from "classnames";
import { ReactNode } from "react";

export function ToolBar({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "m-[30px]",

        "rounded-[10px]",
        "bg-[#101010c0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0px_#000000c0]",

        "flex",
        "flex-col",
        "py-[10px]",
      )}
    >
      {children}
    </div>
  );
}
