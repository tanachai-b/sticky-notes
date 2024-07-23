import cx from "classnames";
import { useState } from "react";
import { NoteColor, NoteData } from "src/configs";
import { Backdrop, ColorSelector, DeleteButton, Editor, Paper, Shadings, Text } from "./components";

export function Note({
  data,
  isEditing,
  boardSize,
  onPanTo,
  onBringToFront,
  onStartEditing,
  onStopEditing,
  onChange,
  onDelete,
}: {
  data: NoteData;
  isEditing: boolean;
  boardSize: { width: number; height: number };
  onPanTo: () => void;
  onBringToFront: () => void;
  onStartEditing: () => void;
  onStopEditing: () => void;
  onChange: (noteData: NoteData) => void;
  onDelete: () => void;
}) {
  const [previewColor, setPreviewColor] = useState<NoteColor>();

  const { inScreenX, inScreenY, isInScreen } = inScreen();

  return (
    <>
      <Backdrop isEditing={isEditing} onPointerDown={onStopEditing} />

      <div
        className={cx("absolute", "grid")}
        style={{
          left: inScreenX + (boardSize.width - 250) / 2,
          top: inScreenY + (boardSize.height - 250) / 2,
          transform: `rotate(${data.rotate}deg)`,
        }}
      >
        <Paper
          color={previewColor ?? data.color}
          isEditing={isEditing}
            onMove={({ dx, dy }) => onChange({ ...data, x: data.x + dx, y: data.y + dy })}
          onPointerDown={isInScreen ? onBringToFront : onPanTo}
          onDoubleClick={onStartEditing}
          onContextMenu={onStartEditing}
        >
          <Shadings />

          <Text
            text={data.text}
            isEditing={isEditing}
            onChange={(text) => onChange({ ...data, text })}
          />
        </Paper>

        <Editor
          visible={isEditing}
          colorSelector={
            <ColorSelector
              selectedColor={data.color}
              onPreviewColor={setPreviewColor}
              onSelectColor={(color) => {
                onChange({ ...data, color });
                onStopEditing();
              }}
            />
          }
          deleteButton={<DeleteButton onClick={onDelete} />}
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

    const inScreenX = Math.min(Math.max(data.x, minX), maxX);
    const inScreenY = Math.min(Math.max(data.y, minY), maxY);
    const isInScreen = data.x === inScreenX && data.y === inScreenY;

    return { inScreenX, inScreenY, isInScreen };
  }
}
