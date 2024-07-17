import cx from "classnames";
import { PointerEvent, useState } from "react";
import { Note } from "./components";
import { useHandleNotes, useHandlePointer, useInScreenNotes } from "./hooks";

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
  notes: NoteData[];
  onNotesChange: (notes: NoteData[]) => void;
}) {
  const { boardRef, inScreenNotes, boardSize } = useInScreenNotes(notes);

  const [editingNote, setEditingNote] = useState<string>();

  const {
    pointerDownNote,
    handleNotePointerDown,
    handleNoteDoubleClick,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useHandlePointer({ notes, onNotesChange, editingNote, setEditingNote });

  const { handleTextChange, handleColorChange, handleDelete, addNote, moveViewPortToNote } =
    useHandleNotes({ notes, onNotesChange, setEditingNote });

  function handleBoardPointerDown(e: PointerEvent) {
    if (e.button === 0) handlePointerDown();
  }

  return (
    <div
      ref={boardRef}
      className={cx(
        "h-full",

        "bg-black-light",
        "overflow-hidden",

        "relative",

        "touch-none",
      )}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className={cx("absolute", "size-full")}
        onPointerDown={handleBoardPointerDown}
        onDoubleClick={(e) => addNote(e.clientX, e.clientY)}
        onContextMenu={(e) => addNote(e.clientX, e.clientY)}
      />

      {inScreenNotes.map(({ key, text, color, rotate, x, y, isInScreen }) => (
        <Note
          key={key}
          {...{ text, color, x, y, rotate }}
          isDragging={pointerDownNote === key}
          isEditing={editingNote === key}
          onPointerDown={
            isInScreen
              ? (e) => handleNotePointerDown(e.button, key)
              : () => moveViewPortToNote(key, notes, boardSize, onNotesChange)
          }
          onDoubleClick={isInScreen ? () => handleNoteDoubleClick(key) : () => {}}
          onBackdropClick={() => setEditingNote(undefined)}
          onTextChange={(text) => handleTextChange(key, text)}
          onColorChange={(color) => handleColorChange(key, color)}
          onDelete={() => handleDelete(key)}
        />
      ))}
    </div>
  );
}
