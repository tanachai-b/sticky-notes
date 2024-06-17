import cx from "classnames";
import { MouseEvent, useState } from "react";

import { Note } from "./components";
import { useHandleMouse, useHandleNotes, useInScreenNotes } from "./hooks";

export type NoteData = {
  key: string;
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
};

export function Board({
  notes = [],
  onNotesChange,
}: {
  notes?: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
} = {}) {
  const { boardRef, inScreenNotes, boardSize } = useInScreenNotes(notes);

  const [editingNote, setEditingNote] = useState<string>();

  const {
    mouseDownNote,
    handleNoteMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleMouse({ notes, onNotesChange, editingNote, setEditingNote });

  const {
    handleTextChange,
    handleColorChange,
    handleDelete,
    addNote,
    moveViewPortToNote,
  } = useHandleNotes({ notes, onNotesChange, setEditingNote });

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

      {inScreenNotes.map(({ key, text, color, rotate, x, y, isInScreen }) => (
        <Note
          key={key}
          {...{ text, color, x, y, rotate }}
          isDragging={mouseDownNote === key}
          isEditing={editingNote === key}
          onMouseDown={
            isInScreen
              ? (e) => handleNoteMouseDown(e.button, key)
              : () => moveViewPortToNote(key, notes, boardSize, onNotesChange)
          }
          onDoubleClick={isInScreen ? () => setEditingNote(key) : () => {}}
          onBackdropClick={() => setEditingNote(undefined)}
          onTextChange={(text) => handleTextChange(key, text)}
          onColorChange={(color) => handleColorChange(key, color)}
          onDelete={() => handleDelete(key)}
        />
      ))}
    </div>
  );
}
