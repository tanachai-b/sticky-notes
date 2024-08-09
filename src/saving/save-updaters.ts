import {
  noteColor_v0_4_0,
  NoteColor_v0_4_0,
  NoteColor_v0_9_0,
  noteColors_v0_9_0,
} from "./save-colors";
import {
  Save_v0_11_0,
  Save_v0_1_0,
  Save_v0_2_0,
  Save_v0_3_0,
  Save_v0_4_0,
  Save_v0_8_0,
  Save_v0_9_0,
} from "./save-versions";

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
    notes: oldSave.notes.map((note) => ({ ...note, color: noteColor_v0_4_0[note.color] })),
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

export function updateTo_v0_9_0(oldSave: Save_v0_8_0): Save_v0_9_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.9.0",
    notes: oldSave.notes.map(({ text, color, x, y, z, angle }) => ({
      text,
      color: convertColorTo_v0_9_0(color),
      x,
      y,
      z,
      angle,
    })),
  };

  function convertColorTo_v0_9_0(color: NoteColor_v0_4_0): NoteColor_v0_9_0 {
    const index = noteColor_v0_4_0.indexOf(color);
    return noteColors_v0_9_0[index] ?? noteColors_v0_9_0[0];
  }
}

export function updateTo_v0_11_0(oldSave: Save_v0_9_0): Save_v0_11_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.11.0",
    viewport: { x: 0, y: 0, zoom: 0 },
    notes: oldSave.notes,
  };
}
