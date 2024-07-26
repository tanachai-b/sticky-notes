import cx from "classnames";
import { ReactNode } from "react";
import { Icon } from "src/common-components";

export function ToolButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: string;
  tooltip: string;
  onClick: () => void;
}) {
  return (
    <Container onClick={onClick}>
      <div className={cx("text-[30px]", "grid")}>
        <Icon icon={icon} />
      </div>

      <Tooltip>{tooltip}</Tooltip>
    </Container>
  );
}

function Container({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div
      className={cx(
        "p-[15px]",

        "text-[#ffffff40]",
        "hover:text-[#ffffffc0]",

        "cursor-pointer",
        "transition-all",

        "grid",
        "place-items-center",

        "relative",

        "group",
      )}
      onClick={onClick}
    >
      {children}
    </div>
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
