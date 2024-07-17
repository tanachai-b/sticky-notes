import { NoteData } from "src/components";
import { Save_v0_2_0 } from "./save-versions";

export function generateSave(notes: NoteData[]): Save_v0_2_0 {
  return {
    appName: "sticky-notes",
    appVersion: "0.2.0",
    notes: notes,
  };
}
