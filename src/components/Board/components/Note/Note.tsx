import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import { colorTone } from "src/common-functions";
import { NoteColor, NoteData, Viewport } from "src/data-types";
import {
  ColorSelector,
  DeleteButton,
  Editor,
  MoveButton,
  Paper,
  RotateButton,
  Shadings,
  StrikethroughButton,
  Text,
} from "./components";
import { useRotateButton } from "./useRotateButton";

export function Note({
  viewport,
  data,
  isEditing,
  boardSize,
  onPanTo,
  onBringToFront,
  onStartEditing,
  onChange,
  onDelete,
}: {
  viewport: Viewport;
  data: NoteData;
  isEditing: boolean;
  boardSize: { width: number; height: number };
  onPanTo: () => void;
  onBringToFront: () => void;
  onStartEditing: () => void;
  onChange: (noteData: NoteData) => void;
  onDelete: () => void;
}) {
  const scale = 2 ** viewport.zoom;

  const noteRef = useRef<HTMLDivElement>(null);

  const { inScreenX, inScreenY, isInScreen } = inScreenXY();

  const [previewColor, setPreviewColor] = useState<NoteColor>();

  const { textAreaRef, focusTextArea } = useTextArea({ isEditing });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    if (!isEditing && data.text.length === 0) {
      setIsVisible(false);
      setTimeout(onDelete, 150);
    }
  }, [isEditing]);

  const { onDragStart, onDrag } = useRotateButton({
    noteRef,
    noteAngle: data.angle,
    onRotate: (angle) => onChange({ ...data, angle }),
  });

  return (
    <div
      ref={noteRef}
      className={cx("absolute", "invisible")}
      style={{
        left: boardSize.width / 2 + inScreenX + -250 / 2,
        top: boardSize.height / 2 + inScreenY + -250 / 2,
      }}
    >
      <div className={cx("relative", "grid")} style={{ transform: `rotate(${data.angle}deg)` }}>
        <Paper
          scale={scale}
          isVisible={isVisible}
          isEditing={isEditing}
          color={previewColor ?? data.color}
          onPointerDown={isInScreen ? onBringToFront : () => {}}
          onMove={({ dx, dy }) =>
            isInScreen && onChange({ ...data, x: data.x + dx / scale, y: data.y + dy / scale })
          }
          onClick={isInScreen ? onStartEditing : onPanTo}
        >
          <Shadings />

          <Text
            textAreaRef={textAreaRef}
            text={data.text}
            strikethrough={data.strikethrough}
            theme={colorTone(previewColor ?? data.color)}
            isEditing={isEditing}
            onChange={(text) => onChange({ ...data, text })}
          />
        </Paper>

        <ColorSelector
          scale={scale}
          isVisible={isVisible && isEditing}
          selectedColor={data.color}
          onPreviewColor={setPreviewColor}
          onSelectColor={(color) => {
            onChange({ ...data, color });
            focusTextArea();
          }}
        />

        <Editor scale={scale} isVisible={isVisible && isEditing}>
          <MoveButton
            onDrag={({ dx, dy }) =>
              onChange({ ...data, x: data.x + dx / scale, y: data.y + dy / scale })
            }
            onDragStop={focusTextArea}
          />

          <RotateButton onDragStart={onDragStart} onDrag={onDrag} onDragStop={focusTextArea} />

          <StrikethroughButton
            active={data.strikethrough}
            onClick={() => onChange({ ...data, strikethrough: !data.strikethrough })}
          />

          <DeleteButton
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDelete, 150);
            }}
          />
        </Editor>
      </div>
    </div>
  );

  function inScreenXY() {
    const peek = 20;

    const x = (data.x - viewport.x) * scale;
    const y = (data.y - viewport.y) * scale;

    const minX = -boardSize.width / 2 + (-250 / 2 + peek) * scale;
    const minY = -boardSize.height / 2 + (-250 / 2 + peek) * scale;
    const maxX = boardSize.width / 2 + (250 / 2 - peek) * scale;
    const maxY = boardSize.height / 2 + (250 / 2 - peek) * scale;

    const inScreenX = Math.min(Math.max(x, minX), maxX);
    const inScreenY = Math.min(Math.max(y, minY), maxY);
    const isInScreen = x === inScreenX && y === inScreenY;

    return { inScreenX, inScreenY, isInScreen };
  }
}

function useTextArea({ isEditing }: { isEditing: boolean }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) focusTextArea();
  }, [isEditing]);

  function focusTextArea() {
    if (!textAreaRef.current) return;

    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(
      textAreaRef.current.value.length,
      textAreaRef.current.value.length,
    );
  }

  return { textAreaRef, focusTextArea };
}
