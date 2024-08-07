import { NoteData, Viewport } from "src/configs";
import { Save_v0_9_0 } from "./save-versions";

export function encodeSave(viewport: Viewport, notes: NoteData[]): Save_v0_9_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.9.0",
    notes: notes
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(({ text, color, x, y, z, angle }) => ({ text, color, x, y, z, angle })),
  };
}
