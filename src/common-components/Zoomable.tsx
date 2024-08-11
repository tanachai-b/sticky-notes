import { ReactNode, useEffect, useState, WheelEvent } from "react";

export function Zoomable({
  className,
  zoom,
  onZoom,
  children,
}: {
  className: string;
  zoom: number;
  onZoom: (zoom: number) => void;
  children: ReactNode;
}) {
  const [zoomTarget, setZoomTarget] = useState(zoom);

  useEffect(() => {
    let currentZoom = zoom;

    const interval = setInterval(() => {
      const diffZoom = Math.round(((zoomTarget - currentZoom) / 2) * 100) / 100;

      if (diffZoom === 0) {
        clearInterval(interval);
        return;
      }

      const newZoom = currentZoom + diffZoom;
      onZoom(newZoom);

      currentZoom = newZoom;
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [zoomTarget]);

  const onWheel = ({ deltaY }: WheelEvent) => {
    const newZoom = zoom - deltaY / 100 / 2;
    const roundedZoom = Math.round(newZoom * 2) / 2;
    setZoomTarget(roundedZoom);
  };

  const { onPointerDown } = usePinchZoom({ zoom, onZoom });

  return (
    <div className={className} onWheel={onWheel} onPointerDown={onPointerDown}>
      {children}
    </div>
  );
}

function usePinchZoom({ zoom, onZoom }: { zoom: number; onZoom: (zoom: number) => void }) {
  const [pointers, setPointer] = useState<(PointerEvent | React.PointerEvent)[]>([]);
  const [lastDist, setLastDist] = useState(0);

  useEffect(() => {
    if (pointers.length > 0) {
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
      document.addEventListener("pointerout", onPointerUp);
      document.addEventListener("pointerleave", onPointerUp);

      return () => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
        document.removeEventListener("pointerout", onPointerUp);
        document.removeEventListener("pointerleave", onPointerUp);
      };
    }
  }, [pointers, onPointerMove, onPointerUp]);

  function onPointerDown(e: React.PointerEvent) {
    const updatedPointers = [...pointers, e];

    if (updatedPointers.length === 2) {
      const dx = Math.abs(updatedPointers[1].clientX - updatedPointers[0].clientX);
      const dy = Math.abs(updatedPointers[1].clientY - updatedPointers[0].clientY);
      const pointerDist = Math.max(dx, dy);
      setLastDist(pointerDist);
    }

    setPointer(updatedPointers);
  }

  function onPointerMove(e: PointerEvent) {
    const updatedPointers = [...pointers.filter(({ pointerId }) => pointerId !== e.pointerId), e];

    if (updatedPointers.length === 2) {
      const dx = Math.abs(updatedPointers[1].clientX - updatedPointers[0].clientX);
      const dy = Math.abs(updatedPointers[1].clientY - updatedPointers[0].clientY);
      const pointerDist = Math.max(dx, dy);

      const distDiff = pointerDist / (lastDist || pointerDist);
      const newZoom = Math.log(2 ** zoom * distDiff) / Math.log(2);
      onZoom(newZoom);

      setLastDist(pointerDist);
    }

    setPointer(updatedPointers);
  }

  function onPointerUp(e: PointerEvent) {
    const updatedPointers = pointers.filter(({ pointerId }) => pointerId !== e.pointerId);
    setPointer(updatedPointers);
  }

  return { onPointerDown };
}
