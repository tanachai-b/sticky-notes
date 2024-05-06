import cx from "classnames";
import { MouseEvent, useState } from "react";

import { Paper } from "./Paper";
import { Shadings } from "./Shadings";
import { Text } from "./Text";
import { Editor } from "./Editor";

export function Note({
  text,
  color = 0,
  x = 0,
  y = 0,
  rotate = 0,
  isDragging,
  isEditing,
  onMouseDown,
  onDoubleClick,
  onTextChange,
  onColorChange,
  onDelete,
}: {
  text?: string;
  color?: number;
  x?: number;
  y?: number;
  rotate?: number;
  isDragging?: boolean;
  isEditing?: boolean;
  onMouseDown?: (e: MouseEvent) => void;
  onDoubleClick?: () => void;
  onTextChange?: (text: string) => void;
  onColorChange?: (color: number) => void;
  onDelete?: () => void;
} = {}) {
  const [previewColor, setPreviewColor] = useState<number>();

  return (
    <div
      className={cx("absolute", "flex", "flex-row", "pointer-events-none")}
      style={{ left: x, top: y }}
    >
      <Paper
        color={previewColor ?? color}
        rotate={rotate}
        isDragging={isDragging}
        isEditing={isEditing}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <Shadings />
        <Text text={text} isEditing={isEditing} onChange={onTextChange} />
      </Paper>
      <Editor
        visible={isEditing}
        selectedColor={color}
        onPreviewColor={(color) => setPreviewColor(color)}
        onSelectColor={(color) => onColorChange?.(color)}
        onDelete={onDelete}
      />
    </div>
  );
}
