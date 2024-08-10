import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type Coordinates = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  mx: number;
  my: number;
};

export function Draggable({
  className,
  style,
  onDragStart,
  onDrag,
  onDragStop,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  onDragStart?: ({ x, y, dx, dy, mx, my }: Coordinates) => void;
  onDrag: ({ x, y, dx, dy, mx, my }: Coordinates) => void;
  onDragStop?: ({ x, y, dx, dy, mx, my }: Coordinates) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isPointerDown) {
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);

      return () => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };
    }
  }, [isPointerDown, onPointerMove, onPointerUp]);

  function onPointerDown({ clientX, clientY }: React.PointerEvent) {
    setIsPointerDown(true);

    const coordinates = getCoordinates(clientX, clientY, { x: clientX, y: clientY });
    onDragStart?.(coordinates);

    setLastPosition({ x: clientX, y: clientY });
  }

  function onPointerMove({ clientX, clientY }: PointerEvent) {
    const coordinates = getCoordinates(clientX, clientY);
    onDrag(coordinates);

    setLastPosition({ x: clientX, y: clientY });
  }

  function onPointerUp({ clientX, clientY }: PointerEvent) {
    const coordinates = getCoordinates(clientX, clientY);
    onDragStop?.(coordinates);

    setIsPointerDown(false);
  }

  function getCoordinates(
    clientX: number,
    clientY: number,
    { x: lastX, y: lastY } = lastPosition,
  ): Coordinates {
    const { x: parentX = 0, y: parentY = 0 } = ref.current?.getBoundingClientRect() ?? {};

    return {
      x: clientX - parentX,
      y: clientY - parentY,
      dx: clientX - lastX,
      dy: clientY - lastY,
      mx: clientX,
      my: clientY,
    };
  }

  return (
    <div ref={ref} className={className} style={style} onPointerDown={onPointerDown}>
      {children}
    </div>
  );
}
