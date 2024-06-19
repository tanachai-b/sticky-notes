import { MouseEvent, useState } from "react";

import { NoteData } from "../Board";

export function useHandleMouse({
  notes,
  onNotesChange,
  editingNote,
  setEditingNote,
}: {
  notes: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
  editingNote?: string;
  setEditingNote: (key: string) => void;
}) {
  const [mouseDownNote, setMouseDownNote] = useState<string>();
  const [isBoardMouseDown, setIsBoardMouseDown] = useState<boolean>(false);

  function handleNoteMouseDown(button: number, key: string) {
    if (editingNote != null) return;

    onNotesChange?.(moveNoteToTop(notes, key));

    if (button === 0) {
      setMouseDownNote(key);
    } else if (button === 2) {
      setEditingNote(key);
    }
  }

  function handleMouseDown() {
    if (editingNote != null) return;
    setIsBoardMouseDown(true);
  }

  function handleMouseMove({ movementX, movementY }: MouseEvent) {
    if (editingNote != null) return;

    if (mouseDownNote != null) {
      onNotesChange?.(moveTopNote(notes, movementX, movementY));
    } else if (isBoardMouseDown) {
      onNotesChange?.(moveAllNotes(notes, movementX, movementY));
    }
  }

  function handleMouseUp() {
    if (editingNote != null) return;

    setMouseDownNote(undefined);
    setIsBoardMouseDown(false);
  }

  return {
    mouseDownNote,
    handleNoteMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

function moveNoteToTop(notes: NoteData[], key: string): NoteData[] {
  return [
    ...notes.filter((note) => note.key !== key),
    notes.find((note) => note.key === key) as NoteData,
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
