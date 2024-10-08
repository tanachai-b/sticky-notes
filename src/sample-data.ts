import { NoteData, Viewport } from "./data-types";

export const sampleViewportData: Viewport = {
  x: 0,
  y: 0,
  zoom: 0,
};

export const sampleNotes: NoteData[] = [
  {
    key: "k06p",
    x: -54,
    y: -214,
    z: -2,
    angle: -1.4,
    color: "#ffe080",
    text: "Buy\neggs, pork, vegetables",
    strikethrough: false,
  },
  {
    key: "jo9f",
    x: 17,
    y: 224,
    z: 0,
    angle: -0.3,
    color: "#80c0ff",
    text: "call Fred\n123-456-7890",
    strikethrough: false,
  },
  {
    key: "b4pl",
    x: 52,
    y: 8,
    z: -1,
    angle: 1.7,
    color: "#c0ff80",
    text: "Dentist\n2024-01-20\n11:00",
    strikethrough: false,
  },
];
