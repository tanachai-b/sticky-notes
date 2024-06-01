import { useState } from "react";

export function useGetNewNote() {
  const [lastColors, setLastColors] = useState<number[]>([]);

  function getNewNote(x: number, y: number) {
    let newColor = Math.floor(8 * Math.random());
    while (lastColors.includes(newColor)) {
      newColor = Math.floor(8 * Math.random());
    }

    const lastSixColors = [...lastColors, newColor].slice(
      Math.max(lastColors.length - 6 + 1, 0),
    );
    setLastColors(lastSixColors);

    return {
      text: "",
      color: newColor,
      x: x - 250 / 2,
      y: y - 250 / 2,
      rotate: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
      key: Math.floor(Math.random() * 1000000).toString(36),
    };
  }

  return { getNewNote };
}
