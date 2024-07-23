import { NoteData } from "src/configs";
import { Save_v0_4_0 } from "./save-versions";

export function generateSave(notes: NoteData[]): Save_v0_4_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.4.0",
    notes: notes.sort((a, b) => a.text.localeCompare(b.text)),
  };
}
