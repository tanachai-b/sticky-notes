import { default as cx } from "classnames";
import { useState } from "react";
import { Resizable, Zoomable } from "src/common-components";
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
  const scale = 2 ** viewport.zoom;

  const [boardSize, setBoardSize] = useState({ width: 9999, height: 9999 });
  const [editingNote, setEditingNote] = useState<string>();

  const { panToNote, bringNoteToFront, addNote, editNote, deleteNote } = useHandleNotes({
    viewport,
    notes,
    editingNote,
    onViewportChange,
    onNotesChange,
    addToast,
    setEditingNote,
  });

  return (
    <Resizable onResize={setBoardSize}>
      <Zoomable
        className={cx("size-full", "relative")}
        zoom={viewport.zoom}
        onZoom={(zoom) => {
          setEditingNote(undefined);
          onViewportChange({ ...viewport, zoom });
        }}
      >
        <Backdrop
          onDrag={({ dx, dy }) => {
            setEditingNote(undefined);

            const { x, y, zoom } = viewport;
            onViewportChange({ x: x - dx / scale, y: y - dy / scale, zoom });
          }}
          onAddNote={(x, y) =>
            editingNote != null
              ? setEditingNote(undefined)
              : addNote((x - boardSize.width / 2) / scale, (y - boardSize.height / 2) / scale)
          }
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
                if (key !== editingNote) {
                  setEditingNote(undefined);
                  bringNoteToFront(key);
                }
              }}
              onStartEditing={() => setEditingNote(key)}
              onChange={(noteData) => editNote(key, noteData)}
              onDelete={() => deleteNote(key)}
            />
          ))}
      </Zoomable>
    </Resizable>
  );
}
