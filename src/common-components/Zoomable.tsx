import { ReactNode, useEffect, useState } from "react";

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

  return (
    <div
      className={className}
      onWheel={({ deltaY }) => {
        const newZoom = zoom - deltaY / 100 / 2;
        const roundedZoom = Math.round(newZoom * 2) / 2;
        return setZoomTarget(roundedZoom);
      }}
    >
      {children}
    </div>
  );
}
