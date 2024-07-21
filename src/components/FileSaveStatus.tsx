import cx from "classnames";
import { ReactNode, useState } from "react";
import { ObserveResize } from "src/common-components";

export function FileSaveStatus({ fileName, isSaving }: { fileName?: string; isSaving: boolean }) {
  return (
    <SaveStatusBackdrop>
      <SaveStatusContainer>
        <FileName>{fileName ?? "Unsaved"}</FileName>

        {fileName && <SavingStatus>{isSaving ? "saving..." : "saved"}</SavingStatus>}
      </SaveStatusContainer>
    </SaveStatusBackdrop>
  );
}

function SaveStatusBackdrop({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "flex-col",
        "items-center",

        "pt-[30px]",

        "pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}

function SaveStatusContainer({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState<number>(0);

  return (
    <div
      className={cx(
        "pointer-events-auto",

        "rounded-full",

        "bg-[#202020]",
        "bg-opacity-75",
        "backdrop-blur-[2px]",

        "border",
        "border-[#e0e0e0]",
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
            "gap-[5px]",

            "px-[10px]",
            "py-[5px]",
          )}
        >
          {children}
        </div>
      </ObserveResize>
    </div>
  );
}

function FileName({ children }: { children: ReactNode }) {
  return (
    <div className={cx("text-[#e0e0e0]", "text-opacity-50", "whitespace-pre")}>{children}</div>
  );
}

function SavingStatus({ children }: { children: ReactNode }) {
  return <div className={cx("text-[#e0e0e0]", "italic")}>{children}</div>;
}
