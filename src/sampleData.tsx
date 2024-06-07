import { NoteData } from "./components";

export const sampleNotes: NoteData[] = [
  {
    key: "k06p",
    text: "Buy\neggs, pork, pancake mix",
    color: 0,
    x: 173,
    y: 89,
    rotate: -1.4,
    zIndex: 0,
  },
  {
    key: "b4pl",
    text: "Dentist\n2024-01-20\n11:00",
    color: 6,
    x: 279,
    y: 311,
    rotate: 1.7,
    zIndex: 1,
  },
  {
    key: "jo9f",
    text: "call Fred\n123-456-7809",
    color: 4,
    x: 244,
    y: 527,
    rotate: -0.3,
    zIndex: 2,
  },
];

export const sampleNotes2 = {
  appVersion: "0.0.1",
  viewport: { x: 173, y: 89 },
  notes: [
    {
      key: "k06p",
      text: "Buy\neggs, pork, pancake mix",
      color: 0,
      angle: -1.4,
      position: { x: 173, y: 89, z: 0 },
    },
    {
      key: "b4pl",
      text: "Dentist\n2024-01-20\n11:00",
      color: 6,
      angle: 1.7,
      position: { x: 279, y: 311, z: 1 },
    },
    {
      key: "jo9f",
      text: "call Fred\n123-456-7809",
      color: 4,
      angle: -0.3,
      position: { x: 244, y: 527, z: 2 },
    },
  ],
};
