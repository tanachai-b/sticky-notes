export type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

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
  "#ffa080",
  "#ff80c0",
  "#c080ff",
  "#80c0ff",
  "#80ffc0",
  "#c0ff80",
] as const;
