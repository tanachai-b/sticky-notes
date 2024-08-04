import { ReactNode, useState } from "react";

export function Clickable({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: ReactNode;
  onClick: React.PointerEventHandler;
}) {
  const [start, setStart] = useState({ x: 0, y: 0 });

  return (
    <div
      className={className}
      onPointerDown={({ clientX, clientY }) => setStart({ x: clientX, y: clientY })}
      onPointerUp={(e) => {
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) === 0 && Math.abs(dy) === 0) onClick(e);
        console.log("asdf");
      }}
    >
      {children}
    </div>
  );
}
