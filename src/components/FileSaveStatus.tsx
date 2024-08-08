import cx from "classnames";
import { ReactNode, useState } from "react";
import { Resizable } from "src/common-components";

export function FileSaveStatus({ fileName, isSaving }: { fileName?: string; isSaving: boolean }) {
  return (
    <Container>
      <FileName>{fileName ?? "Unsaved"}</FileName>

      {fileName != null && <SaveStatus>{isSaving ? "saving..." : "saved"}</SaveStatus>}
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState<number>(0);

  return (
    <div
      className={cx(
        "absolute",

        "self-start",
        "justify-self-center",
        "m-[30px]",

        "rounded-[10px]",
        "bg-[#101010c0]",
        "backdrop-blur-[10px]",
        "shadow-[0_10px_20px_0_#202020c0]",

        "grid",
        "overflow-clip",

        "transition-all",
      )}
      style={{ width: `${width}px` }}
    >
      <Resizable
        className={cx(
          "size-fit",

          "flex",
          "flex-row",
          "gap-[5px]",

          "px-[10px]",
          "py-[5px]",

          "text-[13px]",
        )}
        onResize={({ width }) => setWidth(width)}
      >
        {children}
      </Resizable>
    </div>
  );
}

function FileName({ children }: { children: ReactNode }) {
  return <div className={cx("text-[#ffffff60]", "whitespace-pre")}>{children}</div>;
}

function SaveStatus({ children }: { children: ReactNode }) {
  return <div className={cx("text-[#ffffffc0]", "italic")}>{children}</div>;
}
