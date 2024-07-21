import { useState } from "react";

export function useNewColor() {
  const [latestColors, setLatestColors] = useState<number[]>([]);

  function getNewColor() {
    let newColor;

    while (newColor == null || latestColors.includes(newColor)) {
      newColor = Math.floor(8 * Math.random());
    }

    const latestSixColors = [...latestColors, newColor].slice(
      Math.max(latestColors.length - 6 + 1, 0),
    );
    setLatestColors(latestSixColors);

    return newColor;
  }

  return { getNewColor };
}
