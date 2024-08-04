import { NoteColor, noteColors } from "src/configs";

export type NoteColor_v0_4_0 = (typeof noteColor_v0_4_0)[number];
export const noteColor_v0_4_0 = [
  "#ffe080",
  "#ffb080",
  "#ff80c0",
  "#c080ff",
  "#80c0ff",
  "#80ffc0",
  "#c0ff80",
  "#ffffff",
] as const;

export type NoteColor_v0_9_0 = NoteColor;
export const noteColors_v0_9_0 = noteColors;
