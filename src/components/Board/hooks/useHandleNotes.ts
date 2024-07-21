import { NoteData } from "../Board";
import { useNewColor } from "./useNewColor";

export function useHandleNotes({
  notes,
  boardSize,
  onNotesChange,
  setEditingNote,
}: {
  notes: NoteData[];
  boardSize: { width: number; height: number };
  onNotesChange: (notes: NoteData[]) => void;
  setEditingNote: (key?: string) => void;
}) {
  const { getNewColor } = useNewColor();

  function moveAllNotes(offsetX: number, offsetY: number) {
    const updatedNotes = notes.map(({ x, y, ...rest }) => ({
      ...rest,
      x: x + offsetX,
      y: y + offsetY,
    }));
    onNotesChange(updatedNotes);
  }

  function panToNote(key: string) {
    let currentNotes = notes;

    const interval = setInterval(() => {
      const target = currentNotes.find((note) => note.key === key) as NoteData;

      const x = target.x;
      const y = target.y;

      const cx = boardSize.width / 2 - 250 / 2;
      const cy = boardSize.height / 2 - 250 / 2;

      const dx = cx - x;
      const dy = cy - y;

      const vx = Math.floor(dx / 2);
      const vy = Math.floor(dy / 2);

      if (vx === 0 && vy === 0) {
        clearInterval(interval);
        return;
      }

      const updatedNotes = currentNotes.map(({ x, y, ...rest }) => ({
        ...rest,
        x: x + vx,
        y: y + vy,
      }));

      onNotesChange(updatedNotes);

      currentNotes = updatedNotes;
    }, 1000 / 60);
  }

  function bringNoteToFront(key: string) {
    const updatedNotes = [
      ...notes.filter((note) => note.key !== key),
      notes.find((note) => note.key === key) as NoteData,
    ];
    onNotesChange(updatedNotes);
  }

  function addNote(x: number, y: number) {
    const newNote: NoteData = {
      key: Math.floor(Math.random() * 1000000).toString(36),
      text: "",
      color: getNewColor(),
      x: x - 250 / 2,
      y: y - 250 / 2,
      rotate: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
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
