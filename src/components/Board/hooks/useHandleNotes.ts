import { useTrigger } from "src/common-hooks";
import { ToastData } from "src/components";
import { NoteData, Viewport } from "src/configs";
import { useNewColor } from "./useNewColor";

export function useHandleNotes({
  viewport,
  notes,
  boardSize,
  onViewportChange,
  onNotesChange,
  addToast,
  setEditingNote,
}: {
  viewport: Viewport;
  notes: NoteData[];
  boardSize: { width: number; height: number };
  onViewportChange: (viewport: Viewport) => void;
  onNotesChange: (notes: NoteData[]) => void;
  addToast: (toast: ToastData) => void;
  setEditingNote: (key?: string) => void;
}) {
  const { getNewColor } = useNewColor();

  const reviveNote = useTrigger<NoteData>((note) => {
    if (note != null) onNotesChange([...notes, note]);
  });

  function panToNote(key: string) {
    let currentViewport = viewport;

    const interval = setInterval(() => {
      const { x: tx = 0, y: ty = 0 } = notes.find((note) => note.key === key) ?? {};
      const { x, y, zoom } = currentViewport;

      const dx = tx - x;
      const dy = ty - y;

      const vx = Math.floor(dx / 2);
      const vy = Math.floor(dy / 2);

      if (vx === 0 && vy === 0) {
        clearInterval(interval);
        return;
      }

      const updatedViewport = { x: x + vx, y: y + vy, zoom };
      onViewportChange(updatedViewport);
      currentViewport = updatedViewport;
    }, 1000 / 60);
  }

  function bringNoteToFront(key: string) {
    const frontNote = notes.reduce<NoteData | undefined>(
      (frontNote, note) => (frontNote == null || note.z > frontNote.z ? note : frontNote),
      undefined,
    );
    const { key: frontKey = key, z: frontZ = 0 } = frontNote ?? {};
    if (key === frontKey) return;

    const updatedNotes = notes.map(
      (note): NoteData => (note.key === key ? { ...note, z: frontZ + 1 } : note),
    );

    onNotesChange(updatedNotes);
  }

  function addNote(x: number, y: number) {
    const frontNote = notes.reduce<NoteData | undefined>(
      (frontNote, note) => (frontNote == null || note.z > frontNote.z ? note : frontNote),
      undefined,
    );
    const { z: frontZ = 0 } = frontNote ?? {};

    const newNote: NoteData = {
      key: Math.floor(Math.random() * 36 ** 4).toString(36),
      text: "",
      color: getNewColor(),
      x: x + viewport.x - boardSize.width / 2,
      y: y + viewport.y - boardSize.height / 2,
      z: frontZ + 1,
      angle: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
    };

    onNotesChange([...notes, newNote]);
    setEditingNote(newNote.key);
  }

  function editNote(key: string, noteData: NoteData) {
    const updatedNotes = notes.map((note) => (note.key === key ? noteData : note));
    onNotesChange(updatedNotes);
  }

  function deleteNote(key: string) {
    const updatedNotes = notes.filter((note) => note.key !== key);
    onNotesChange(updatedNotes);
    setEditingNote(undefined);

    const deletedNote = notes.find((note) => note.key === key);

    if (deletedNote == null || deletedNote.text.length === 0) return;

    const noteText =
      deletedNote.text.length > 30 ? `${deletedNote.text.substring(0, 30)}...` : deletedNote.text;

    addToast({ content: `“${noteText}” is deleted`, onUndo: () => reviveNote(deletedNote) });
  }

  return {
    panToNote,
    bringNoteToFront,
    addNote,
    editNote,
    deleteNote,
  };
}
