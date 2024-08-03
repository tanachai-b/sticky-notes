export type NoteData = {
  key: string;
  text: string;
  color: NoteColor;
  x: number;
  y: number;
  z: number;
  angle: number;
};

export type NoteColor = (typeof noteColors)[number];

export const noteColors = [
  "#ffe080",
  "#ffb080",
  "#ff80c0",
  "#c080ff",
  "#80c0ff",
  "#80ffc0",
  "#c0ff80",
  "#ffffff",
] as const;
