import { useState } from "react";
import { NoteColor, noteColors } from "src/configs";

export function useNewColor() {
  const [latestColors, setLatestColors] = useState<NoteColor[]>([]);

  function getNewColor() {
    let newColor;

    while (newColor == null || latestColors.includes(newColor)) {
      const index = Math.floor(noteColors.length * Math.random());
      newColor = noteColors[index];
    }

    const latestSixColors = [...latestColors, newColor].slice(-6);
    setLatestColors(latestSixColors);

    return newColor;
  }

  return { getNewColor };
}
