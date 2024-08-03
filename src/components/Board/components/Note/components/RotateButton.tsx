import cx from "classnames";
import { Draggable, Icon } from "src/common-components";

export function RotateButton({
  isVisible,
  onDrag,
  onDragStop,
}: {
  isVisible: boolean;
  onDrag: ({ mx, my }: { mx: number; my: number }) => void;
  onDragStop: ({ mx, my }: { mx: number; my: number }) => void;
}) {
  return (
    <Draggable
      className={cx(
        "absolute",
        "place-self-center",
        "bottom-[calc(100%_+_10px)]",

        !isVisible ? ["invisible", "pointer-events-none", "opacity-0"] : "",
        "transition-all",

        "grid",
        "place-items-center",

        "group",
      )}
      onDrag={onDrag}
      onDragStop={onDragStop}
    >
      <div
        className={cx(
          "size-[30px]",

          "rounded-full",
          "bg-[#10101080]",
          "shadow-[0_10px_20px_0px_#00000080]",

          "border-[2px]",
          "border-[#ffffff]",

          "grid",
          "place-items-center",

          "text-[20px]",
          "text-[#ffffff]",

          "cursor-grab",
          "group-hover:scale-150",
          "transition-all",
        )}
      >
        <Icon icon="refresh" />
      </div>

      <div
        className={cx(
          "absolute",
          "bottom-0",
          "group-hover:bottom-[calc(100%_+_10px)]",

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
