import { useTrigger } from "src/common-hooks";
import { ToastData } from "src/components";
import { NoteData } from "src/configs";
import { useNewColor } from "./useNewColor";

export function useHandleNotes({
  notes,
  boardSize,
  onNotesChange,
  addToast,
  setEditingNote,
}: {
  notes: NoteData[];
  boardSize: { width: number; height: number };
  onNotesChange: (notes: NoteData[]) => void;
  addToast: (toast: ToastData) => void;
  setEditingNote: (key?: string) => void;
}) {
  const { getNewColor } = useNewColor();

  const reviveNote = useTrigger<NoteData>((note) => {
    if (note != null) onNotesChange([...notes, note]);
  });

  function moveAllNotes(offsetX: number, offsetY: number) {
    const updatedNotes = notes.map(
      ({ x, y, ...rest }): NoteData => ({
        ...rest,
        x: x + offsetX,
        y: y + offsetY,
      }),
    );
    onNotesChange(updatedNotes);
  }

  function panToNote(key: string) {
    let currentNotes = notes;

    const interval = setInterval(() => {
      const target = currentNotes.find((note) => note.key === key) as NoteData;

      const x = target.x;
      const y = target.y;

      const dx = 0 - x;
      const dy = 0 - y;

      const vx = Math.floor(dx / 2);
      const vy = Math.floor(dy / 2);

      if (vx === 0 && vy === 0) {
        clearInterval(interval);
        return;
      }

      const updatedNotes = currentNotes.map(
        ({ x, y, ...rest }): NoteData => ({
          ...rest,
          x: x + vx,
          y: y + vy,
        }),
      );

      onNotesChange(updatedNotes);

      currentNotes = updatedNotes;
    }, 1000 / 60);
  }

  function bringNoteToFront(key: string) {
    const frontZ = notes.reduce(
      (frontZ, note) => (note.key === key ? frontZ : Math.max(note.z, frontZ)),
      -9999,
    );

    const updatedNotes = notes.map(
      (note): NoteData =>
        note.key === key ? { ...note, z: 0 } : { ...note, z: note.z - frontZ - 1 },
    );

    onNotesChange(updatedNotes);
  }

  function addNote(x: number, y: number) {
    const frontZ = notes.reduce((frontZ, note) => Math.max(note.z, frontZ), -9999);

    const newNote: NoteData = {
      key: Math.floor(Math.random() * 36 ** 4).toString(36),
      text: "",
      color: getNewColor(),
      x: x - boardSize.width / 2,
      y: y - boardSize.height / 2,
      angle: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
      z: frontZ + 1,
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
    moveAllNotes,
    panToNote,
    bringNoteToFront,
    addNote,
    editNote,
    deleteNote,
  };
}
