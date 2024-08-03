import { noteColors } from "src/configs";
import { Save_v0_1_0, Save_v0_2_0, Save_v0_3_0, Save_v0_4_0, Save_v0_8_0 } from "./save-versions";

export function updateTo_v0_2_0(oldSave: Save_v0_1_0): Save_v0_2_0 {
  return {
    appName: "sticky-notes",
    appVersion: "0.2.0",
    notes: oldSave,
  };
}

export function updateTo_v0_3_0(oldSave: Save_v0_2_0): Save_v0_3_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.3.0",
    notes: oldSave.notes.map((note, index) => ({ ...note, zIndex: index })),
  };
}

export function updateTo_v0_4_0(oldSave: Save_v0_3_0): Save_v0_4_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.4.0",
    notes: oldSave.notes.map((note) => ({ ...note, color: noteColors[note.color] })),
  };
}

export function updateTo_v0_8_0(oldSave: Save_v0_4_0): Save_v0_8_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.8.0",
    notes: oldSave.notes.map(({ text, color, x, y, rotate, zIndex }) => ({
      text,
      color,
      x,
      y,
      z: zIndex,
      angle: rotate,
    })),
  };
}
