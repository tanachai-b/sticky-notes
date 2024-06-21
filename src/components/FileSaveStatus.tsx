import cx from "classnames";
import { ReactNode, useState } from "react";

import { ObserveResize } from "src/base-components";

export function FileSaveStatus({
  fileName,
  isSaving,
}: {
  fileName?: string;
  isSaving?: boolean;
} = {}) {
  return (
    <SaveStatusBackdrop>
      <SaveStatusContainer>
        <FileName>{fileName ?? "Unsaved"}</FileName>

        {fileName && (
          <SavingStatus>{isSaving ? "saving..." : "saved"}</SavingStatus>
        )}
      </SaveStatusContainer>
    </SaveStatusBackdrop>
  );
}

function SaveStatusBackdrop({ children }: { children?: ReactNode } = {}) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "flex-col",
        "items-center",

        "pt-x30",

        "pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}

function SaveStatusContainer({ children }: { children?: ReactNode } = {}) {
  const [width, setWidth] = useState<number>(0);

  return (
    <div
      className={cx(
        "pointer-events-auto",

        "rounded-full",

        "bg-black-light",
        "bg-opacity-75",
        "backdrop-blur-x2",

        "border",
        "border-white-dark",
        "border-opacity-25",

        "flex",
        "flex-row",

        "transition-all",

        "overflow-hidden",
      )}
      style={{ width: `${width + 2}px` }}
    >
      <ObserveResize onResize={({ width }) => setWidth(width)}>
        <div
          className={cx(
            "flex",
            "flex-row",
            "gap-x5",

            "px-x10",
            "py-x5",
          )}
        >
          {children}
        </div>
      </ObserveResize>
    </div>
  );
}

function FileName({ children }: { children?: ReactNode } = {}) {
  return (
    <div className={cx("text-white-dark", "text-opacity-50", "whitespace-pre")}>
      {children}
    </div>
  );
}

function SavingStatus({ children }: { children?: ReactNode } = {}) {
  return <div className={cx("text-white-dark", "italic")}>{children}</div>;
}
