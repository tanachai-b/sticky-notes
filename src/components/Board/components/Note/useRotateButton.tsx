import { RefObject, useState } from "react";

export function useRotateButton({
  noteRef,
  noteAngle,
  onRotate,
}: {
  noteRef: RefObject<HTMLDivElement>;
  noteAngle: number;
  onRotate: (angle: number) => void;
}) {
  const [lastAngle, setLastAngle] = useState(0);

  function onDragStart({ mx, my }: { mx: number; my: number }) {
    const angle = getAngle({ mx, my });
    setLastAngle(angle);
  }

  function onDrag({ mx, my }: { mx: number; my: number }) {
    const newAngle = getAngle({ mx, my });
    const diffAngle = newAngle - lastAngle;

    const newNoteAngle = ((((noteAngle + diffAngle) % 360) + 360 + 180) % 360) - 180;
    const clampedAngle = Math.min(Math.max(newNoteAngle, -60), 60);
    const roundedAngle = Math.round(clampedAngle * 10) / 10;
    onRotate(roundedAngle);

    setLastAngle(newAngle);

    document.body.style.cursor = "grabbing";
  }

  function getAngle({ mx, my }: { mx: number; my: number }) {
    const { x: noteX = 0, y: noteY = 0 } = noteRef.current?.getBoundingClientRect() ?? {};

    const cx = noteX + 250 / 2;
    const cy = noteY + 250 / 2;

    const x = mx - cx;
    const y = my - cy;

    const angle = (Math.atan2(x, -y) / 2 / Math.PI) * 360;

    return angle;
  }

  function onDragStop() {
    document.body.style.cursor = "auto";
  }

  return { onDragStart, onDrag, onDragStop };
}
