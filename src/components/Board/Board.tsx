import cx from "classnames";
import { useState } from "react";
import { Resizable } from "src/common-components";
import { NoteData, Viewport } from "src/configs";
import { ToastData } from "../Toasts";
import { Backdrop, Note } from "./components";
import { useHandleNotes } from "./hooks";

export function Board({
  viewport,
  notes,
  onViewportChange,
  onNotesChange,
  addToast,
}: {
  viewport: Viewport;
  notes: NoteData[];
  onViewportChange: (viewport: Viewport) => void;
  onNotesChange: (notes: NoteData[]) => void;
  addToast: (props: ToastData) => void;
}) {
  const [boardSize, setBoardSize] = useState({ width: 9999, height: 9999 });
  const [editingNote, setEditingNote] = useState<string>();

  const { panToNote, bringNoteToFront, addNote, editNote, deleteNote } = useHandleNotes({
    viewport,
    notes,
    boardSize,
    onViewportChange,
    onNotesChange,
    addToast,
    setEditingNote,
  });

  return (
    <Resizable className={cx("size-full", "relative")} onResize={setBoardSize}>
      <Backdrop
        onDrag={({ dx, dy }) => {
          setEditingNote(undefined);

          const { x, y, zoom } = viewport;
          onViewportChange({ x: x - dx, y: y - dy, zoom });
        }}
        onAddNote={(x, y) => (editingNote != null ? setEditingNote(undefined) : addNote(x, y))}
      />

      {notes
        .sort((a, b) => a.z - b.z)
        .map(({ key, ...rest }) => (
          <Note
            key={key}
            viewport={viewport}
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
