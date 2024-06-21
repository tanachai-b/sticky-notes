import { PointerEvent, useState } from "react";

import { NoteData } from "../Board";

export function useHandlePointer({
  notes,
  onNotesChange,
  editingNote,
  setEditingNote,
}: {
  notes: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
  editingNote?: string;
  setEditingNote: (key?: string) => void;
}) {
  const [pointerDownNote, setPointerDownNote] = useState<string>();
  const [isBoardPointerDown, setIsBoardPointerDown] = useState<boolean>(false);

  function handleNotePointerDown(button: number, key: string) {
    onNotesChange?.(moveNoteToTop(notes, key));

    if (button === 0) setPointerDownNote(key);
  }

  function handleNoteDoubleClick(key: string) {
    onNotesChange?.(moveNoteToTop(notes, key));
    setEditingNote(key);
  }

  function handlePointerDown() {
    setIsBoardPointerDown(true);
  }

  function handlePointerMove({ movementX, movementY }: PointerEvent) {
    if (pointerDownNote != null) {
      if (editingNote != null) return;
      onNotesChange?.(moveTopNote(notes, movementX, movementY));
    } else if (isBoardPointerDown) {
      onNotesChange?.(moveAllNotes(notes, movementX, movementY));
    }
  }

  function handlePointerUp() {
    setPointerDownNote(undefined);
    setIsBoardPointerDown(false);
  }

  return {
    pointerDownNote,
    handleNotePointerDown,
    handleNoteDoubleClick,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
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
