import cx from "classnames";
import { colorTone } from "src/common-functions";
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

        "rounded-[10px]",
        "bg-[#181818c0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0_#000000c0]",

        "flex",
        "flex-col",

        "p-[10px]",
        "gap-[10px]",
      )}
    >
      {noteColors.map((color, index) => (
        <Color
          key={index}
          color={color}
          isSelected={color === selectedColor}
          onPointerOver={() => onPreviewColor(color)}
          onPointerLeave={() => onPreviewColor()}
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
  onPointerLeave,
  onClick,
}: {
  color: string;
  isSelected: boolean;
  onPointerOver: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
}) {
  return (
    <button
      className={cx(
        "size-[25px]",
        "rounded-full",

        "grid",
        "place-items-center",

        "group",
      )}
      style={{ backgroundColor: color }}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <div
        className={cx(
          "rounded-full",
          "size-[13px]",
          colorTone(color) === "light" ? "bg-[#00000080]" : "bg-[#ffffff80]",

          isSelected ? "opacity-100" : "opacity-0",
          "group-hover:opacity-100",
          "transition-all",
        )}
      />
    </button>
  );
}
