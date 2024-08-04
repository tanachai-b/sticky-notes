import cx from "classnames";
import { useState } from "react";
import { Resizable } from "src/common-components";
import { NoteData } from "src/configs";
import { ToastData } from "../Toasts";
import { Backdrop, Note } from "./components";
import { useHandleNotes } from "./hooks";

export function Board({
  notes = [],
  onNotesChange,
  addToast,
}: {
  notes: NoteData[];
  onNotesChange: (notes: NoteData[]) => void;
  addToast: (props: ToastData) => void;
}) {
  const [boardSize, setBoardSize] = useState({ width: 9999, height: 9999 });
  const [editingNote, setEditingNote] = useState<string>();

  const { moveAllNotes, panToNote, bringNoteToFront, addNote, editNote, deleteNote } =
    useHandleNotes({
      notes,
      boardSize,
      onNotesChange,
      addToast,
      setEditingNote,
    });

  return (
    <Resizable className={cx("size-full", "relative")} onResize={setBoardSize}>
      <Backdrop
        onDrag={({ dx, dy }) => {
          setEditingNote(undefined);
          moveAllNotes(dx, dy);
        }}
        onAddNote={(x, y) => (editingNote != null ? setEditingNote(undefined) : addNote(x, y))}
      />

      {notes
        .sort((a, b) => a.z - b.z)
        .map(({ key, ...rest }) => (
          <Note
            key={key}
            data={{ key, ...rest }}
            isEditing={editingNote === key}
            boardSize={boardSize}
            onPanTo={() => {
              setEditingNote(undefined);
              panToNote(key);
            }}
            onBringToFront={() => {
              if (key !== editingNote) setEditingNote(undefined);
              bringNoteToFront(key);
            }}
            onStartEditing={() => setEditingNote(key)}
            onChange={(noteData) => editNote(key, noteData)}
            onDelete={() => deleteNote(key)}
          />
        ))}
    </Resizable>
  );
}
