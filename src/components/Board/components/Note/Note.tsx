import cx from "classnames";
import { useEffect, useRef, useState } from "react";
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

  const { inScreenX, inScreenY, isInScreen } = inScreenXY();

  const [previewColor, setPreviewColor] = useState<NoteColor>();

  const { textRef, focusText } = useNoteText({ isEditing });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <>
      <Backdrop isEditing={isVisible && isEditing} onPointerDown={onStopEditing} />

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
            isVisible={isVisible}
            isEditing={isEditing}
            color={previewColor ?? data.color}
            onMove={({ dx, dy }) => onChange({ ...data, x: data.x + dx, y: data.y + dy })}
            onPointerDown={isInScreen ? onBringToFront : onPanTo}
            onDoubleClick={onStartEditing}
            onContextMenu={onStartEditing}
          >
            <Shadings />

            <Text
              ref={textRef}
              text={data.text}
              isEditing={isEditing}
              onChange={(text) => onChange({ ...data, text })}
            />
          </Paper>

          <RotateButton
            isVisible={isVisible && isEditing}
            onDrag={onDragRotateButton}
            onPointerUp={data.text.length > 0 ? onStopEditing : focusText}
          />

          <ColorSelector
            isVisible={isVisible && isEditing}
            selectedColor={data.color}
            onPreviewColor={setPreviewColor}
            onSelectColor={(color) => {
              onChange({ ...data, color });
              data.text.length > 0 ? onStopEditing() : focusText();
            }}
          />

          <DeleteButton
            isVisible={isVisible && isEditing}
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDelete, 150);
            }}
          />
        </div>
      </div>
    </>
  );

  function inScreenXY() {
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

function useNoteText({ isEditing }: { isEditing: boolean }) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) focusText();
  }, [isEditing]);

  function focusText() {
    if (!textRef.current) return;

    textRef.current.focus();
    textRef.current.setSelectionRange(textRef.current.value.length, textRef.current.value.length);
  }

  return { textRef, focusText };
}
