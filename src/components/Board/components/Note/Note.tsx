import cx from "classnames";
import { PointerEvent, useState } from "react";
import { Backdrop, Editor, Paper, Shadings, Text } from "./components";

export function Note({
  text,
  color = 0,
  x = 0,
  y = 0,
  rotate = 0,
  isDragging,
  isEditing,
  onPointerDown,
  onDoubleClick,
  onBackdropClick,
  onTextChange,
  onColorChange,
  onDelete,
}: {
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
  isDragging: boolean;
  isEditing: boolean;
  onPointerDown: (e: PointerEvent) => void;
  onDoubleClick: () => void;
  onBackdropClick: () => void;
  onTextChange: (text: string) => void;
  onColorChange: (color: number) => void;
  onDelete: () => void;
}) {
  const [previewColor, setPreviewColor] = useState<number>();

  return (
    <>
      <Backdrop isEditing={isEditing} onPointerDown={onBackdropClick} />

      <div className={cx("absolute", "flex", "flex-row", "invisible")} style={{ left: x, top: y }}>
        <Paper
          color={previewColor ?? color}
          rotate={rotate}
          isDragging={isDragging}
          isEditing={isEditing}
          onPointerDown={onPointerDown}
          onDoubleClick={onDoubleClick}
        >
          <Shadings />

          <Text text={text} isEditing={isEditing} onChange={onTextChange} />
        </Paper>

        <Editor
          visible={isEditing}
          selectedColor={color}
          onPreviewColor={(color) => setPreviewColor(color)}
          onSelectColor={(color) => onColorChange(color)}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}
