import cx from "classnames";
import { ReactNode } from "react";
import { Icon } from "src/common-components";

export function ToolButton({
  icon,
  tooltip,
  isEnabled,
  onClick,
}: {
  icon: string;
  tooltip: string;
  isEnabled: boolean;
  onClick: () => void;
}) {
  return (
    <Container isEnabled={isEnabled} onClick={isEnabled ? onClick : () => {}}>
      <Icon icon={icon} />

      <Tooltip>{tooltip}</Tooltip>
    </Container>
  );
}

function Container({
  isEnabled,
  children,
  onClick,
}: {
  isEnabled: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={cx(
        "p-[15px]",

        !isEnabled ? "cursor-wait" : "",

        "grid",
        "place-items-center",

        "text-[25px]",
        isEnabled ? "text-[#ffffff40]" : "text-[#ffffff20]",
        isEnabled ? "hover:text-[#ffffffc0]" : "",
        "transition-all",

        "relative",

        "group",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Tooltip({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "left-0",
        "group-hover:left-[calc(100%_+_5px)]",

        "rounded-[5px]",
        "bg-[#101010c0]",

        "px-[5px]",

        "text-[13px]",
        "text-[#ffffffc0]",
        "whitespace-pre",

        "opacity-0",
        "group-hover:opacity-100",
        "transition-all",

        "pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}
