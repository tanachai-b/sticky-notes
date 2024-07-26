import cx from "classnames";
import { useRef, useState } from "react";
import { NoteColor, NoteData } from "src/configs";
import {
  Backdrop,
  ColorSelector,
  DeleteButton,
  Paper,
  RotateButton,
  Shadings,
  Text,
} from "./components";

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
  const noteRef = useRef<HTMLDivElement>(null);

  const [previewColor, setPreviewColor] = useState<NoteColor>();

  const { inScreenX, inScreenY, isInScreen } = inScreen();

  return (
    <>
      <Backdrop isEditing={isEditing} onPointerDown={onStopEditing} />

      <div
        ref={noteRef}
        className={cx("absolute")}
        style={{
          left: inScreenX + (boardSize.width - 250) / 2,
          top: inScreenY + (boardSize.height - 250) / 2,
        }}
      >
        <div className={cx("relative", "grid")} style={{ transform: `rotate(${data.rotate}deg)` }}>
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

          <RotateButton
            isVisible={isEditing}
            onDrag={onDragRotateButton}
            onPointerUp={onStopEditing}
          />

          <DeleteButton isVisible={isEditing} onClick={onDelete} />

          <ColorSelector
            isVisible={isEditing}
            selectedColor={data.color}
            onPreviewColor={setPreviewColor}
            onSelectColor={(color) => {
              onChange({ ...data, color });
              onStopEditing();
            }}
          />
        </div>
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

  function onDragRotateButton({ cx, cy }: { cx: number; cy: number }) {
    const { x: rx = 0, y: ry = 0 } = noteRef.current?.getBoundingClientRect() ?? {};

    const x = cx - (rx + 250 / 2);
    const y = cy - (ry + 250 / 2);

    const newAngle = (Math.atan2(x, -y) / 2 / Math.PI) * 360;
    const clampedAngle = Math.min(Math.max(newAngle, -60), 60);
    const roundedAngle = Math.round(clampedAngle * 10) / 10;

    onChange({ ...data, rotate: roundedAngle });
  }
}
