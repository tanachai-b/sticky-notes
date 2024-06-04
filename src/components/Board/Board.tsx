import cx from "classnames";
import { MouseEvent, useState } from "react";

import { Backdrop, Note } from "./components";
import { useGetNewNote, useHandleMouse, useInScreenNotes } from "./hooks";

export type NoteData = {
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
  key: string;
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
  } = useHandleMouse(notes, isEditing, setIsEditing, onNotesChange);

  function handleTextChange(text: string): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], text },
    ]);
  }

  function handleColorChange(color: number): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], color },
    ]);
    setIsEditing(false);
  }

  function handleBoardMouseDown(e: MouseEvent) {
    const { button, clientX, clientY } = e;
    if (button === 0) handleMouseDown(e);
    if (button === 2) addNote(clientX, clientY);
  }

  const { getNewNote } = useGetNewNote();
  function addNote(x: number, y: number) {
    onNotesChange?.([...notes, getNewNote(x, y)]);
    setIsEditing(true);
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

      <div>
        {inScreenNotes.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index === inScreenNotes.length - 1) return;
            return (
              <Note
                key={key}
                {...{ text, color, x, y, rotate }}
                onMouseDown={
                  isDraggable
                    ? (e) => handleNoteMouseDown(e.button, index)
                    : () => moveToNote(index, notes, boardSize, onNotesChange)
                }
              />
            );
          },
        )}
      </div>

      <Backdrop isEditing={isEditing} onMouseDown={() => setIsEditing(false)} />

      <div>
        {inScreenNotes.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index !== inScreenNotes.length - 1) return;
            return (
              <Note
                key={key}
                {...{ text, color, x, y, rotate }}
                isDragging={isNoteMouseDown}
                isEditing={isEditing}
                onMouseDown={
                  isDraggable
                    ? (e) => handleNoteMouseDown(e.button, index)
                    : () => moveToNote(index, notes, boardSize, onNotesChange)
                }
                onDoubleClick={
                  isDraggable ? () => setIsEditing(true) : () => {}
                }
                onTextChange={handleTextChange}
                onColorChange={handleColorChange}
                onDelete={() => {
                  setIsEditing(false);
                  onNotesChange?.([...notes.slice(0, -1)]);
                }}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

function moveToNote(
  index: number,
  notes: NoteData[],
  boardSize: { w: number; h: number },
  onNotesChange: ((notes: NoteData[]) => void) | undefined,
) {
  let currentNotes = notes;

  const interval = setInterval(() => {
    const targetX = currentNotes[index].x;
    const targetY = currentNotes[index].y;

    const offsetX = (-targetX + boardSize.w / 2 - 250 / 2) / 2;
    const offsetY = (-targetY + boardSize.h / 2 - 250 / 2) / 2;

    if (Math.abs(offsetX) < 1 && Math.abs(offsetY) < 1) {
      clearInterval(interval);
    }

    const newNotes = currentNotes.map(({ x, y, ...rest }) => ({
      ...rest,
      x: x + Math.floor(offsetX),
      y: y + Math.floor(offsetY),
    }));

    currentNotes = newNotes;

    onNotesChange?.(newNotes);
  }, 1000 / 60);
}
