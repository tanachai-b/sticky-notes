import cx from "classnames";
import { Draggable, Icon } from "src/common-components";

export function RotateButton({
  onDragStart,
  onDrag,
  onDragStop,
}: {
  onDragStart: ({ mx, my }: { mx: number; my: number }) => void;
  onDrag: ({ mx, my }: { mx: number; my: number }) => void;
  onDragStop: ({ mx, my }: { mx: number; my: number }) => void;
}) {
  return (
    <Draggable
      className={cx(
        "grid",
        "place-items-center",

        "cursor-grab",
        "active:cursor-grabbing",

        "relative",
        "group",
      )}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
    >
      <div
        className={cx(
          "grid",

          "text-[25px]",
          "text-[#ffffff40]",
          "group-hover:text-[#ffffffc0]",
          "transition-all",
        )}
      >
        <Icon icon="refresh" />
      </div>

      <div
        className={cx(
          "absolute",
          "top-0",
          "group-hover:top-[calc(100%_+_15px)]",

          "rounded-[5px]",
          "bg-[#101010c0]",

          "px-[5px]",

          "text-[13px]",
          "text-[#ffffffc0]",

          "opacity-0",
          "group-hover:opacity-100",
          "transition-all",

          "pointer-events-none",
        )}
      >
        Rotate
      </div>
    </Draggable>
  );
}
