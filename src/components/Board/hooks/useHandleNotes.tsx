import { useGetNewNote } from ".";
import { NoteData } from "../Board";

export function useHandleNotes({
  notes,
  onNotesChange,
  setIsEditing,
}: {
  notes: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
  setIsEditing: (isEditing: boolean) => void;
}) {
  function handleTextChange(text: string): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], text },
    ]);
  }

  function handleColorChange(color: number): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], color },
    ]);
    setIsEditing(false);
  }

  const { getNewNote } = useGetNewNote();
  function addNote(x: number, y: number) {
    onNotesChange?.([...notes, getNewNote(x, y)]);
    setIsEditing(true);
  }

  function moveViewPortToNote(
    index: number,
    notes: NoteData[],
    boardSize: { w: number; h: number },
    onNotesChange: ((notes: NoteData[]) => void) | undefined,
  ) {
    let currentNotes = notes;

    const interval = setInterval(() => {
      const targetX = currentNotes[index].x;
      const targetY = currentNotes[index].y;

      const offsetX = (-targetX + boardSize.w / 2 - 250 / 2) / 2;
      const offsetY = (-targetY + boardSize.h / 2 - 250 / 2) / 2;

      if (Math.abs(offsetX) < 1 && Math.abs(offsetY) < 1) {
        clearInterval(interval);
      }

      const newNotes = currentNotes.map(({ x, y, ...rest }) => ({
        ...rest,
        x: x + Math.floor(offsetX),
        y: y + Math.floor(offsetY),
      }));

      currentNotes = newNotes;

      onNotesChange?.(newNotes);
    }, 1000 / 60);
  }

  return { handleTextChange, handleColorChange, addNote, moveViewPortToNote };
}
