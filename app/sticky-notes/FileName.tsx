"use client";
import cx from "classnames";
import { useEffect, useRef, useState } from "react";

export function FileName({
  className,
  fileName,
  isSaving,
}: {
  className?: string;
  fileName?: string;
  isSaving?: boolean;
} = {}) {
  const { ref, size } = useObserveSize();

  return (
    <div
      className={cx(
        "pointer-events-none",
        "p-x30",
        "flex",
        "items-start",
        "justify-center",
        className
      )}
    >
      <div
        className={cx(
          "rounded-full",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "bg-black-light",
          "bg-opacity-75",

          "backdrop-blur-x2",

          "transition-all",

          "flex",
          "flex-row",

          "whitespace-pre",
          "overflow-hidden"
        )}
        style={{ width: `${size.w + 2}px` }}
      >
        <div
          ref={ref}
          className={cx(
            "px-x10",
            "py-x5",

            "flex",
            "flex-row",
            "gap-x10"
          )}
        >
          <div className={cx("text-white-dark", "text-opacity-50")}>
            {fileName ?? "Unsaved"}
          </div>

          {fileName ? (
            <div
              className={cx("text-white-dark", "text-opacity-100", "italic")}
            >
              {isSaving ? "saving..." : "saved"}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

function useObserveSize() {
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => observeSize(ref.current, setSize), [ref.current]);

  function observeSize(
    component: HTMLDivElement | null,
    onChange: (size: { w: number; h: number }) => void
  ) {
    if (!component) return;
    new ResizeObserver(() =>
      onChange({ w: component.offsetWidth, h: component.offsetHeight })
    ).observe(component);
  }

  return { ref, size };
}
