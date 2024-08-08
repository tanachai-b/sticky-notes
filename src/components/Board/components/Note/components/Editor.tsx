import cx from "classnames";
import { ReactNode } from "react";

export function Editor({ isVisible, children }: { isVisible: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "place-self-center",
        "top-[calc(100%_+_10px)]",

        !isVisible ? ["invisible", "pointer-events-none", "opacity-0"] : "",
        "transition-all",

        "rounded-[10px]",
        "bg-[#101010c0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0_#202020c0]",

        "flex",
        "flex-row",

        "p-[10px]",
        "gap-[10px]",
      )}
    >
      {children}
    </div>
  );
}
