import { NoteData, Viewport } from "src/configs";
import { Save_v0_11_0 } from "./save-versions";

export function encodeSave(viewport: Viewport, notes: NoteData[]): Save_v0_11_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.11.0",
    viewport,
    notes: notes
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(({ text, color, x, y, z, angle }) => ({ text, color, x, y, z, angle })),
  };
}
