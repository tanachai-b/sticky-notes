import cx from "classnames";
import { ReactNode } from "react";
import { Icon } from "src/common-components";

export function ToolButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <ButtonContainer onClick={onClick}>
      <div className={cx("text-[30px]", "grid")}>
        <Icon icon={icon} />
      </div>

      <ButtonLabel>{label}</ButtonLabel>
    </ButtonContainer>
  );
}

function ButtonContainer({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div
      className={cx(
        "group",

        "flex",
        "flex-row",
        "items-center",

        "p-[15px]",

        "text-[#e0e0e0]",
        "text-opacity-25",
        "hover:text-opacity-90",

        "cursor-pointer",
        "transition-all",

        "relative",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "left-[70px]",

        "rounded-[7px]",
        "px-[5px]",
        "py-[2px]",

        "text-[15px]",
        "whitespace-pre",

        "bg-[#202020]",
        "bg-opacity-75",

        "text-[#e0e0e0]",
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
