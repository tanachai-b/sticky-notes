import { ReactNode, useEffect, useRef, useState } from "react";

export function Draggable({
  className,
  onDrag,
  onPointerDown,
  onPointerUp,
  children,
}: {
  className?: string;
  onDrag: ({
    x,
    y,
    dx,
    dy,
    cx,
    cy,
  }: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    cx: number;
    cy: number;
  }) => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

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

  function handlePointerDown({ clientX, clientY }: React.PointerEvent) {
    setIsPointerDown(true);
    setLastPosition({ x: clientX, y: clientY });
    onPointerDown?.();
  }

  function handlePointerMove({ clientX, clientY }: PointerEvent) {
    const { x: rx = 0, y: ry = 0 } = ref.current?.getBoundingClientRect() ?? {};
    onDrag({
      x: clientX - rx,
      y: clientY - ry,
      dx: clientX - lastPosition.x,
      dy: clientY - lastPosition.y,
      cx: clientX,
      cy: clientY,
    });
    setLastPosition({ x: clientX, y: clientY });
  }

  function handlePointerUp() {
    setIsPointerDown(false);
    onPointerUp?.();
  }

  return (
    <div ref={ref} className={className} onPointerDown={handlePointerDown}>
      {children}
    </div>
  );
}
