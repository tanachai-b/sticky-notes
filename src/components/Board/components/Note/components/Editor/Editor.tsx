import cx from "classnames";
import { Icon } from "src/common-components";
import { ColorSelector } from "./ColorSelector";

export function Editor({
  visible,
  selectedColor,
  onPreviewColor,
  onSelectColor,
  onDelete,
}: {
  visible: boolean;
  selectedColor: number;
  onPreviewColor: (colorIndex?: number) => void;
  onSelectColor: (colorIndex: number) => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={cx(
        "relative",
        "-top-[10px]",
        "ml-[20px]",
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

      <div className={cx("h-[10px]")} />

      <DeleteButton onClick={onDelete} />
    </div>
  );
}

function DeleteButton({ onClick: onDelete }: { onClick: () => void }) {
  return (
    <div
      className={cx(
        "group",

        "flex",
        "flex-row",
        "items-center",

        "p-[2px]",

        "relative",
      )}
    >
      <div
        className={cx(
          "size-[30px]",
          "rounded-full",

          "border-[2px]",
          "border-[#ffffff]",

          "bg-[#202020]",
          "bg-opacity-50",

          "grid",
          "place-items-center",

          "text-[#ffffff]",
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

          "rounded-[7px]",
          "px-[5px]",
          "py-[2px]",

          "text-[15px]",
          "font-light",
          "whitespace-pre",
          "text-[#ffffff]",

          "bg-[#202020]",
          "bg-opacity-50",
        )}
      >
        Delete
      </div>
    </div>
  );
}
