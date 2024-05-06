import cx from "classnames";

import { Icon } from "../components";
import { ReactNode } from "react";

export function ToolBar({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
} = {}) {
  return (
    <div
      className={cx(
        "p-x30",
        "flex",
        "items-start",

        "pointer-events-none",
        className
      )}
    >
      <div
        className={cx(
          "rounded-full",

          "bg-black-light",
          "bg-opacity-75",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "pointer-events-auto",
          "backdrop-blur-x2"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ToolButton({
  icon,
  text,
  onClick,
}: {
  icon?: string;
  text?: string;
  onClick?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "relative",

        "flex",
        "flex-row",
        "items-center",
        "p-x15",

        "first:pt-x20",
        "first:rounded-t-full",

        "last:pb-x20",
        "last:rounded-b-full",

        "text-white-dark",
        "text-opacity-25",
        "hover:text-opacity-90",

        "transition-all",
        "cursor-pointer",
        "group"
      )}
      onClick={onClick}
    >
      <Icon icon={icon} className="text-x30" />
      <div
        className={cx(
          "absolute",
          "left-[70px]",

          "rounded-x7",
          "px-x5",
          "py-x2",

          "text-x15",
          "whitespace-pre",

          "bg-black-light",
          "bg-opacity-75",

          "text-white-dark",
          "opacity-0",
          "group-hover:opacity-100",

          "transition-all",
          "cursor-default",
          "pointer-events-none"
        )}
      >
        {text}
      </div>
    </div>
  );
}
