import cx from "classnames";
import { useEffect, useRef } from "react";

export function Text({
  text,
  isEditing,
  onChange,
}: {
  text: string;
  isEditing: boolean;
  onChange: (text: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing) return;

    setTimeout(() => {
      ref.current?.focus();
      ref.current?.setSelectionRange(ref.current.value.length, ref.current.value.length);
    }, 0);
  }, [isEditing]);

  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "items-center",
        "justify-center",

        "overflow-hidden",
      )}
    >
      <div
        className={cx(
          "w-full",
          "min-h-[5rem]",

          "text-x30",
          "font-handwriting",
          "font-light",
          "text-black-light",

          "text-center",
          "whitespace-pre-wrap",

          "relative",
        )}
      >
        <div
          className={cx(
            "p-x10",

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

            "p-x10",
            "text-center",

            "overflow-hidden",
          )}
          hidden={!isEditing}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
