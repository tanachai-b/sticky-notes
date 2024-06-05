import cx from "classnames";

import { Icon } from "src/base-components";
import { ColorSelector } from "./components";

export function Editor({
  visible,
  selectedColor,
  onPreviewColor,
  onSelectColor,
  onDelete,
}: {
  visible?: boolean;
  selectedColor?: number;
  onPreviewColor?: (colorIndex?: number) => void;
  onSelectColor?: (colorIndex: number) => void;
  onDelete?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "relative",
        "-top-x10",
        "ml-x20",
        "flex",
        "flex-col",
        visible ? "opacity-100" : "opacity-0",
        "transition-all",
        { "pointer-events-auto": visible },
      )}
    >
      <ColorSelector
        selectedColor={selectedColor}
        onPreviewColor={onPreviewColor}
        onSelectColor={onSelectColor}
      />

      <div className={cx("h-x10")} />

      <DeleteButton onClick={onDelete} />
    </div>
  );
}

function DeleteButton({ onClick: onDelete }: { onClick?: () => void } = {}) {
  return (
    <div
      className={cx(
        "group",

        "flex",
        "flex-row",
        "items-center",

        "p-x2",

        "relative",
      )}
    >
      <div
        className={cx(
          "size-x30",
          "rounded-full",

          "border-x2",
          "border-white",

          "bg-black-light",
          "bg-opacity-50",

          "flex",
          "items-center",
          "justify-center",

          "text-white",
          "text-[25px]",

          "cursor-pointer",
          "group-hover:scale-150",
          "transition-all",
        )}
        onClick={onDelete}
      >
        <Icon icon="close" />
      </div>

      <div
        className={cx(
          "absolute",
          "left-[40px]",

          "rounded-x7",
          "px-x5",
          "py-x2",

          "text-x15",
          "font-light",
          "whitespace-pre",
          "text-white",

          "bg-black-light",
          "bg-opacity-50",
        )}
      >
        Delete
      </div>
    </div>
  );
}
