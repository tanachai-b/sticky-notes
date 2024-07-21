import { useState } from "react";
import { Backdrop, Container, Note } from "./components";
import { useHandleNotes } from "./hooks";

export type NoteData = {
  key: string;
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
};

export function Board({
  notes = [],
  onNotesChange,
}: {
  notes: NoteData[];
  onNotesChange: (notes: NoteData[]) => void;
}) {
  const [boardSize, setBoardSize] = useState({ width: 9999, height: 9999 });
  const [editingNote, setEditingNote] = useState<string>();

  const { moveAllNotes, panToNote, bringNoteToFront, addNote, editNote, deleteNote } =
    useHandleNotes({
      notes,
      boardSize,
      onNotesChange,
      setEditingNote,
    });

  return (
    <Container onResize={setBoardSize}>
      <Backdrop onDrag={(dx, dy) => moveAllNotes(dx, dy)} onAddNote={addNote} />

      {notes
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(({ key, ...rest }) => (
          <Note
            key={key}
            noteData={{ key, ...rest }}
            isEditing={editingNote === key}
            boardSize={boardSize}
            onPanTo={() => panToNote(key)}
            onBringToFront={() => bringNoteToFront(key)}
            onStartEditing={() => setEditingNote(key)}
            onStopEditing={() => setEditingNote(undefined)}
            onChange={(noteData) => editNote(key, noteData)}
            onDelete={() => deleteNote(key)}
          />
        ))}
    </Container>
  );
}
