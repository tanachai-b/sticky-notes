import cx from "classnames";
import { ReactElement } from "react";

export function IconButton({
  icon,
  text,
  active,
  onClick,
}: {
  icon: ReactElement;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cx(
        "flex",
        "flex-row",
        "items-center",
        "p-2.5",
        "gap-1",
        `${active ? "text-highlight_yellow" : "text-text_grey"}`,
        "hover:text-text_white"
      )}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className={cx("text-xs", "leading-none", { "font-bold": active })}>
        {text}
      </div>
    </button>
  );
}
