import { useGetNewNote } from ".";
import { NoteData } from "../Board";

export function useHandleNotes({
  notes,
  onNotesChange,
  setEditingNote,
}: {
  notes: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
  setEditingNote: (key?: string) => void;
}) {
  function handleTextChange(key: string, text: string): void {
    const updatedNotes = notes.map((note) =>
      note.key === key ? { ...note, text } : note,
    );
    onNotesChange?.(updatedNotes);
  }

  function handleColorChange(key: string, color: number): void {
    const updatedNotes = notes.map((note) =>
      note.key === key ? { ...note, color } : note,
    );
    onNotesChange?.(updatedNotes);
    setEditingNote(undefined);
  }

  const { getNewNote } = useGetNewNote();
  function addNote(x: number, y: number) {
    const newNote = getNewNote(x, y);
    onNotesChange?.([...notes, newNote]);
    setEditingNote(newNote.key);
  }

  function moveViewPortToNote(
    key: string,
    notes: NoteData[],
    boardSize: { w: number; h: number },
    onNotesChange: ((notes: NoteData[]) => void) | undefined,
  ) {
    let currentNotes = notes;

    const interval = setInterval(() => {
      const targetNote = currentNotes.find(
        (note) => note.key === key,
      ) as NoteData;

      const targetX = targetNote.x;
      const targetY = targetNote.y;

      const offsetX = (-targetX + boardSize.w / 2 - 250 / 2) / 2;
      const offsetY = (-targetY + boardSize.h / 2 - 250 / 2) / 2;

      if (Math.abs(offsetX) < 1 && Math.abs(offsetY) < 1) {
        clearInterval(interval);
      }

      const newNotes = currentNotes.map(({ x, y, ...rest }) => ({
        x: x + Math.floor(offsetX),
        y: y + Math.floor(offsetY),
        ...rest,
      }));

      currentNotes = newNotes;

      onNotesChange?.(newNotes);
    }, 1000 / 60);
  }

  return { handleTextChange, handleColorChange, addNote, moveViewPortToNote };
}
