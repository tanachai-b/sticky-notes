import { RefObject, useEffect, useState } from "react";

export function useDraggable({
  ref,
  onDrag,
}: {
  ref: RefObject<HTMLDivElement>;
  onDrag: (dx: number, dy: number) => void;
}) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    ref.current?.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      ref.current?.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [ref.current, onPointerMove, onPointerUp]);

  function onPointerDown(e: PointerEvent) {
    setIsPointerDown(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  }

  function onPointerMove(e: PointerEvent) {
    if (!isPointerDown) return;
    onDrag(e.clientX - lastPos.x, e.clientY - lastPos.y);
    setLastPos({ x: e.clientX, y: e.clientY });
  }

  function onPointerUp() {
    setIsPointerDown(false);
  }

  return { isPointerDown };
}
