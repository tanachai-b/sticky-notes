import cx from "classnames";
import { useState } from "react";
import { NoteData } from "../../Board";
import { Backdrop, Editor, Paper, Shadings, Text } from "./components";

export function Note({
  noteData,
  isEditing,
  boardSize,
  onPanTo,
  onBringToFront,
  onStartEditing,
  onStopEditing,
  onChange,
  onDelete,
}: {
  noteData: NoteData;
  isEditing: boolean;
  boardSize: { width: number; height: number };
  onPanTo: () => void;
  onBringToFront: () => void;
  onStartEditing: () => void;
  onStopEditing: () => void;
  onChange: (noteData: NoteData) => void;
  onDelete: () => void;
}) {
  const [previewColor, setPreviewColor] = useState<number>();

  const { inScreenX, inScreenY, isInScreen } = inScreen();

  return (
    <>
      <Backdrop isEditing={isEditing} onPointerDown={onStopEditing} />

      <div
        className={cx("absolute", "flex", "flex-row", "invisible")}
        style={{
          left: inScreenX + (boardSize.width - 250) / 2,
          top: inScreenY + (boardSize.height - 250) / 2,
        }}
      >
        <Paper
          color={previewColor ?? noteData.color}
          rotate={noteData.rotate}
          isEditing={isEditing}
          onMove={(dx, dy) => onChange({ ...noteData, x: noteData.x + dx, y: noteData.y + dy })}
          onPointerDown={isInScreen ? onBringToFront : onPanTo}
          onDoubleClick={onStartEditing}
          onContextMenu={onStartEditing}
        >
          <Shadings />

          <Text
            text={noteData.text}
            isEditing={isEditing}
            onChange={(text) => onChange({ ...noteData, text })}
          />
        </Paper>

        <Editor
          visible={isEditing}
          selectedColor={noteData.color}
          onPreviewColor={setPreviewColor}
          onSelectColor={(color) => {
            onChange({ ...noteData, color });
            onStopEditing();
          }}
          onDelete={onDelete}
        />
      </div>
    </>
  );

  function inScreen() {
    const peek = 20;

    const minX = -(boardSize.width + 250) / 2 + peek;
    const minY = -(boardSize.height + 250) / 2 + peek;
    const maxX = (boardSize.width + 250) / 2 - peek;
    const maxY = (boardSize.height + 250) / 2 - peek;

    const inScreenX = Math.min(Math.max(noteData.x, minX), maxX);
    const inScreenY = Math.min(Math.max(noteData.y, minY), maxY);
    const isInScreen = noteData.x === inScreenX && noteData.y === inScreenY;

    return { inScreenX, inScreenY, isInScreen };
  }
}
