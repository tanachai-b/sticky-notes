import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import { colorTone } from "src/common-functions";
import { NoteColor, NoteData } from "src/configs";
import {
  Backdrop,
  ColorSelector,
  DeleteButton,
  Editor,
  MoveButton,
  Paper,
  RotateButton,
  Shadings,
  Text,
} from "./components";
import { useRotateButton } from "./useRotateButton";

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

  const { onDragStart, onDrag } = useRotateButton({
    noteRef,
    noteAngle: data.angle,
    onRotate: (angle) => onChange({ ...data, angle }),
  });

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
        <div className={cx("relative", "grid")} style={{ transform: `rotate(${data.angle}deg)` }}>
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
              theme={colorTone(previewColor ?? data.color)}
              isEditing={isEditing}
              onChange={(text) => onChange({ ...data, text })}
            />
          </Paper>

          <ColorSelector
            isVisible={isVisible && isEditing}
            selectedColor={data.color}
            onPreviewColor={setPreviewColor}
            onSelectColor={(color) => {
              onChange({ ...data, color });
              focusText();
            }}
          />

          <Editor isVisible={isVisible && isEditing}>
            <MoveButton
              onDrag={({ dx, dy }) => onChange({ ...data, x: data.x + dx, y: data.y + dy })}
              onDragStop={focusText}
            />

            <RotateButton onDragStart={onDragStart} onDrag={onDrag} onDragStop={focusText} />

            <DeleteButton
              onClick={() => {
                setIsVisible(false);
                setTimeout(onDelete, 150);
              }}
            />
          </Editor>
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
