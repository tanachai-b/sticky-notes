import { NoteData } from "src/components";
import { Save_v0_3_0 } from "./save-versions";

export function generateSave(notes: NoteData[]): Save_v0_3_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.3.0",
    notes: notes.sort((a, b) => a.text.localeCompare(b.text)),
  };
}
