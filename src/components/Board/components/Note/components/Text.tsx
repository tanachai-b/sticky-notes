import cx from "classnames";
import { ForwardedRef, forwardRef } from "react";

export { RefText as Text };
const RefText = forwardRef(Text);
function Text(
  {
    text,
    isEditing,
    onChange,
  }: {
    text: string;
    isEditing: boolean;
    onChange: (text: string) => void;
  },
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "items-center",
        "justify-center",

        "overflow-clip",
      )}
    >
      <div
        className={cx(
          "w-full",
          "min-h-[5rem]",

          "text-[30px]",
          "font-handwriting",
          "text-[#000000e0]",

          "text-center",
          "whitespace-pre-wrap",

          "relative",
        )}
      >
        <div
          className={cx(
            "p-[10px]",

            "break-words",

            { "opacity-0": isEditing },
          )}
        >
          {text}
        </div>

        <textarea
          ref={ref}
          className={cx(
            "absolute",
            "left-0",
            "top-0",

            "size-full",

            "resize-none",
            "outline-none",
            "bg-transparent",

            "p-[10px]",
            "text-center",

            "overflow-clip",
          )}
          hidden={!isEditing}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
