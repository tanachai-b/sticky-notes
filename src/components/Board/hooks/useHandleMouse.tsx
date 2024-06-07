import { MouseEvent, useState } from "react";

import { NoteData } from "../Board";

export function useHandleMouse({
  notes,
  onNotesChange,
  isEditing,
  setIsEditing,
}: {
  notes: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const [isNoteMouseDown, setIsNoteMouseDown] = useState<boolean>(false);
  const [isBoardMouseDown, setIsBoardMouseDown] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleNoteMouseDown(button: number, index: number) {
    if (isEditing) return;

    onNotesChange?.(moveNoteToTop(notes, index));

    if (button === 0) {
      setIsNoteMouseDown(true);
    } else if (button === 2) {
      setIsEditing(true);
    }
  }

  function handleMouseDown({ clientX, clientY }: MouseEvent) {
    if (isEditing) return;

    setIsBoardMouseDown(true);
    setMouse({ x: clientX, y: clientY });
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (isEditing) return;

    const offsetX = clientX - mouse.x;
    const offsetY = clientY - mouse.y;

    if (isNoteMouseDown) {
      onNotesChange?.(moveTopNote(notes, offsetX, offsetY));
    } else if (isBoardMouseDown) {
      onNotesChange?.(moveAllNotes(notes, offsetX, offsetY));
    }
    setMouse({ x: clientX, y: clientY });
  }

  function handleMouseUp() {
    if (isEditing) return;

    setIsNoteMouseDown(false);
    setIsBoardMouseDown(false);
  }

  return {
    isNoteMouseDown,
    handleNoteMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

function moveNoteToTop(notes: NoteData[], index: number) {
  return [
    ...notes.filter((_value, noteIndex) => noteIndex !== index),
    notes[index],
  ];
}

function moveTopNote(notes: NoteData[], offsetX: number, offsetY: number) {
  const { x, y, ...rest } = notes[notes.length - 1];
  return [...notes.slice(0, -1), { ...rest, x: x + offsetX, y: y + offsetY }];
}

function moveAllNotes(notes: NoteData[], offsetX: number, offsetY: number) {
  return notes.map(({ x, y, ...rest }) => ({
    ...rest,
    x: x + offsetX,
    y: y + offsetY,
  }));
}
