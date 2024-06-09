import cx from "classnames";
import { MouseEvent, useState } from "react";

import { Note } from "./components";
import { useHandleMouse, useHandleNotes, useInScreenNotes } from "./hooks";

export type NoteData = {
  text: string;
  color: number;
  key: string;
  rotate: number;
  x: number;
  y: number;
};

export function Board({
  notes = [],
  onNotesChange,
}: {
  notes?: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
} = {}) {
  const { boardRef, inScreenNotes, boardSize } = useInScreenNotes(notes);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    isNoteMouseDown,
    handleNoteMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleMouse({ notes, onNotesChange, isEditing, setIsEditing });

  const { handleTextChange, handleColorChange, addNote, moveViewPortToNote } =
    useHandleNotes({ notes, onNotesChange, setIsEditing });

  function handleBoardMouseDown(e: MouseEvent) {
    const { button, clientX, clientY } = e;
    if (button === 0) handleMouseDown(e);
    if (button === 2) addNote(clientX, clientY);
  }

  return (
    <div
      ref={boardRef}
      className={cx(
        "h-full",

        "bg-black-light",
        "overflow-hidden",

        "relative",
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={cx("absolute", "size-full")}
        onMouseDown={handleBoardMouseDown}
        onDoubleClick={(e) => addNote(e.clientX, e.clientY)}
      />

      {inScreenNotes.map(({ key, text, color, rotate, x, y, isDraggable }) => (
        <Note
          key={key}
          {...{ text, color, x, y, rotate }}
          isDragging={isNoteMouseDown}
          isEditing={isEditing}
          onMouseDown={
            isDraggable
              ? (e) => handleNoteMouseDown(e.button, key)
              : () => moveViewPortToNote(key, notes, boardSize, onNotesChange)
          }
          onDoubleClick={isDraggable ? () => setIsEditing(true) : () => {}}
          onBackdropClick={() => setIsEditing(false)}
          onTextChange={(text) => handleTextChange(key, text)}
          onColorChange={(color) => handleColorChange(key, color)}
          onDelete={() => {
            setIsEditing(false);

            const updatedNotes = notes.filter((note) => note.key !== key);
            onNotesChange?.(updatedNotes);
          }}
        />
      ))}
    </div>
  );
}
