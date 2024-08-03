export function colorTone(color: string) {
  const red = parseInt(color.substring(1, 3), 16) / 255;
  const green = parseInt(color.substring(3, 5), 16) / 255;
  const blue = parseInt(color.substring(5, 7), 16) / 255;

  const brightness = (blue + red * 2 + green * 4) / 7;

  return brightness > 0.5 ? "light" : "dark";
}
