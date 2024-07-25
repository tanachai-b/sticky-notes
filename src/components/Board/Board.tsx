import cx from "classnames";
import { useState } from "react";
import { Resizable } from "src/common-components";
import { NoteData } from "src/configs";
import { Backdrop, Note } from "./components";
import { useHandleNotes } from "./hooks";

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
    <Resizable className={cx("size-full", "relative")} onResize={setBoardSize}>
      <Backdrop onDrag={({ dx, dy }) => moveAllNotes(dx, dy)} onAddNote={addNote} />

      {notes
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(({ key, ...rest }) => (
          <Note
            key={key}
            data={{ key, ...rest }}
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
    </Resizable>
  );
}
