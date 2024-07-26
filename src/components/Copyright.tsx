import cx from "classnames";

export function Copyright() {
  return (
    <div
      className={cx(
        "absolute",

        "justify-self-center",
        "self-end",

        "rounded-t-[5px]",
        "bg-[#101010c0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0px_#000000c0]",

        "px-[5px]",
        "py-[2px]",

        "text-[11px]",
        "text-[#ffffff60]",
      )}
    >
      Copyright © 2024 Tanachai Bunlutangtum. All rights reserved.
    </div>
  );
}
