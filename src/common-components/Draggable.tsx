import { ReactNode, useEffect, useState } from "react";

export function Draggable({
  className,
  onDrag,
  onPointerDown,
  onPointerUp,
  children,
}: {
  className?: string;
  onDrag: (dx: number, dy: number) => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  children: ReactNode;
}) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isPointerDown) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isPointerDown, handlePointerMove, handlePointerUp]);

  function handlePointerDown(e: React.PointerEvent) {
    setIsPointerDown(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
    onPointerDown?.();
  }

  function handlePointerMove(e: PointerEvent) {
    onDrag(e.clientX - lastPosition.x, e.clientY - lastPosition.y);
    setLastPosition({ x: e.clientX, y: e.clientY });
  }

  function handlePointerUp() {
    setIsPointerDown(false);
    onPointerUp?.();
  }

  return (
    <div className={className} onPointerDown={handlePointerDown}>
      {children}
    </div>
  );
}
