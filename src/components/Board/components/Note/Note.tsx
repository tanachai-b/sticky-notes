import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import { colorTone } from "src/common-functions";
import { NoteColor, NoteData, Viewport } from "src/configs";
import {
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
  const noteRef = useRef<HTMLDivElement>(null);

  const { inScreenX, inScreenY, isInScreen } = inScreenXY();

  const [previewColor, setPreviewColor] = useState<NoteColor>();

  const { textAreaRef, focusTextArea } = useTextArea({ isEditing });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { onDragStart, onDrag } = useRotateButton({
    noteRef,
    noteAngle: data.angle,
    onRotate: (angle) => onChange({ ...data, angle }),
  });

  return (
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
          onPointerDown={isInScreen ? onBringToFront : () => {}}
          onMove={({ dx, dy }) =>
            isInScreen && onChange({ ...data, x: data.x + dx, y: data.y + dy })
          }
          onClick={isInScreen ? onStartEditing : onPanTo}
        >
          <Shadings />

          <Text
            textAreaRef={textAreaRef}
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
            focusTextArea();
          }}
        />

        <Editor isVisible={isVisible && isEditing}>
          <MoveButton
            onDrag={({ dx, dy }) => onChange({ ...data, x: data.x + dx, y: data.y + dy })}
            onDragStop={focusTextArea}
          />

          <RotateButton onDragStart={onDragStart} onDrag={onDrag} onDragStop={focusTextArea} />

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

    const minX = -(boardSize.width + 250) / 2 + peek;
    const minY = -(boardSize.height + 250) / 2 + peek;
    const maxX = (boardSize.width + 250) / 2 - peek;
    const maxY = (boardSize.height + 250) / 2 - peek;

    const inScreenX = Math.min(Math.max(data.x - viewport.x, minX), maxX);
    const inScreenY = Math.min(Math.max(data.y - viewport.y, minY), maxY);
    const isInScreen = data.x - viewport.x === inScreenX && data.y - viewport.y === inScreenY;

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
