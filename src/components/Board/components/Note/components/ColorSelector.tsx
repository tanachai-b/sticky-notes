import cx from "classnames";
import { Icon } from "src/common-components";
import { NoteColor, noteColors } from "src/configs";

export function ColorSelector({
  isVisible,
  selectedColor,
  onPreviewColor,
  onSelectColor,
}: {
  isVisible: boolean;
  selectedColor: NoteColor;
  onPreviewColor: (colorIndex?: NoteColor) => void;
  onSelectColor: (colorIndex: NoteColor) => void;
}) {
  return (
    <div
      className={cx(
        "absolute",
        "place-self-center",
        "left-[calc(100%_+_10px)]",

        !isVisible ? ["invisible", "pointer-events-none", "opacity-0"] : "",
        "transition-all",

        "flex",
        "flex-col",
      )}
      onPointerLeave={() => onPreviewColor()}
    >
      {noteColors.map((color, index) => (
        <Color
          key={index}
          color={color}
          isSelected={color === selectedColor}
          onPointerOver={() => onPreviewColor(color)}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
}

function Color({
  color,
  isSelected,
  onPointerOver,
  onClick,
}: {
  color: string;
  isSelected: boolean;
  onPointerOver: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className={cx(
        "group",

        "p-[2px]",

        "cursor-pointer",
      )}
      onPointerOver={onPointerOver}
      onClick={onClick}
    >
      <div
        className={cx(
          "size-[30px]",

          "rounded-full",
          "bg-[#ffffff]",
          "shadow-[0_10px_20px_0px_#00000080]",

          "border",
          "border-[#000000]",

          "p-[2px]",

          "group-hover:scale-150",
          "transition-all",
        )}
      >
        <div className={cx("size-full", "rounded-full")} style={{ backgroundColor: color }}>
          <div
            className={cx(
              { invisible: !isSelected },

              "grid",

              "text-[#202020]",
              "text-[25px]",
            )}
          >
            <Icon icon="check" />
          </div>
        </div>
      </div>
    </div>
  );
}
