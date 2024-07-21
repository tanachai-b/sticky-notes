import cx from "classnames";
import { Icon } from "src/common-components";

export function ColorSelector({
  selectedColor,
  onPreviewColor,
  onSelectColor,
}: {
  selectedColor: number;
  onPreviewColor: (colorIndex?: number) => void;
  onSelectColor: (colorIndex: number) => void;
}) {
  const colors = [
    "bg-[#ffe080]",
    "bg-[#ffb080]",
    "bg-[#ff80c0]",
    "bg-[#c080ff]",
    "bg-[#80c0ff]",
    "bg-[#80ffc0]",
    "bg-[#c0ff80]",
    "bg-[#ffffff]",
  ];

  return (
    <div className={cx("flex", "flex-col")} onPointerLeave={() => onPreviewColor()}>
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          isSelected={selectedColor === index}
          onPointerOver={() => onPreviewColor(index)}
          onClick={() => onSelectColor(index)}
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

          "border",
          "border-[#202020]",

          "bg-[#ffffff]",

          "p-[2px]",

          "group-hover:scale-150",
          "transition-all",
        )}
      >
        <div className={cx("size-full", "rounded-full", color)}>
          <div
            className={cx(
              { invisible: !isSelected },

              "text-[#202020]",
              "text-[25px]",

              "grid",
            )}
          >
            <Icon icon="check" />
          </div>
        </div>
      </div>
    </div>
  );
}
