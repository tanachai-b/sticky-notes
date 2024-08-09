import cx from "classnames";
import { ChangeEventHandler, LegacyRef, ReactNode } from "react";

export function Text({
  textAreaRef,
  text,
  strikethrough,
  theme,
  isEditing,
  onChange,
}: {
  textAreaRef: LegacyRef<HTMLTextAreaElement>;
  text: string;
  strikethrough: boolean;
  theme: "light" | "dark";
  isEditing: boolean;
  onChange: (text: string) => void;
}) {
  return (
    <Container strikethrough={strikethrough} theme={theme}>
      <StaticText text={text} isVisible={!isEditing} />

      <TextArea
        textAreaRef={textAreaRef}
        isVisible={isEditing}
        text={text}
        strikethrough={strikethrough}
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  );
}

function Container({
  strikethrough,
  theme,
  children,
}: {
  strikethrough: boolean;
  theme: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        "flex",
        "items-center",
        "justify-center",
      )}
    >
      <div
        className={cx(
          "w-full",
          "min-h-[5rem]",

          "text-[30px]",
          "font-handwriting",
          strikethrough ? "line-through" : "",

          theme === "light" ? "text-[#000000e0]" : "text-[#ffffffe0]",
          "transition-all",

          "text-center",
          "whitespace-pre-wrap",

          "relative",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function StaticText({ text, isVisible }: { text: string; isVisible: boolean }) {
  return (
    <div
      className={cx(
        "p-[10px]",

        "break-words",

        { "opacity-0": !isVisible },
      )}
    >
      {text}
    </div>
  );
}

function TextArea({
  textAreaRef,
  text,
  strikethrough,
  isVisible,
  onChange,
}: {
  textAreaRef: LegacyRef<HTMLTextAreaElement>;
  text: string;
  strikethrough: boolean;
  isVisible: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <textarea
      ref={textAreaRef}
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
        strikethrough ? "line-through" : "",
      )}
      hidden={!isVisible}
      value={text}
      onChange={onChange}
    />
  );
}
