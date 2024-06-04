import cx from "classnames";

import { Icon } from "../../components";

export function ColorSelector({
  selectedColor,
  onPreviewColor,
  onSelectColor,
}: {
  selectedColor?: number;
  onPreviewColor?: (colorIndex?: number) => void;
  onSelectColor?: (colorIndex: number) => void;
}) {
  const colors = [
    "bg-yellow-light",
    "bg-orange-light",
    "bg-red-light",
    "bg-purple-light",
    "bg-blue-light",
    "bg-green-bluish-light",
    "bg-green-yellowish-light",
    "bg-white",
  ];

  return (
    <div
      className={cx("flex", "flex-col")}
      onMouseLeave={() => onPreviewColor?.()}
    >
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          isSelected={selectedColor === index}
          onMouseOver={() => onPreviewColor?.(index)}
          onClick={() => onSelectColor?.(index)}
        />
      ))}
    </div>
  );
}

function Color({
  color,
  isSelected,
  onMouseOver,
  onClick,
}: {
  color?: string;
  isSelected?: boolean;
  onMouseOver?: () => void;
  onClick?: () => void;
} = {}) {
  return (
    <div
      className={cx("p-x2", "group", "cursor-pointer")}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      <div
        className={cx(
          "size-x30",
          "rounded-full",
          "border",
          "border-black-light",
          "bg-white",
          "p-x2",
          "transition-all",
          "group-hover:scale-150"
        )}
      >
        <div className={cx("size-full", "rounded-full", color)}>
          <Icon
            icon="check"
            className={cx("text-black-light", "text-[25px]", {
              invisible: !isSelected,
            })}
          />
        </div>
      </div>
    </div>
  );
}
