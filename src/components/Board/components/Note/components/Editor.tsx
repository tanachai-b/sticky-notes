import cx from "classnames";
import { ReactNode } from "react";

export function Editor({
  scale,
  isVisible,
  children,
}: {
  scale: number;
  isVisible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "visible",

        "absolute",
        "place-self-center",

        !isVisible ? ["invisible", "opacity-0"] : "",
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
      style={{
        top: `calc(${50 + 50 * scale}% + ${isVisible ? 10 : 50}px)`,
      }}
    >
      {children}
    </div>
  );
}
