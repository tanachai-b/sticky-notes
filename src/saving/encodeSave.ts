import { NoteData, Viewport } from "src/data-types";
import { Save_v0_13_0 } from "./save-versions";

export function encodeSave(viewport: Viewport, notes: NoteData[]): Save_v0_13_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.13.0",
    viewport,
    notes: notes
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(({ x, y, z, angle, color, text, strikethrough }) => ({
        x,
        y,
        z,
        angle,
        color,
        text,
        strikethrough,
      })),
  };
}
