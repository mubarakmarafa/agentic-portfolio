import { useCallback, useRef, useState } from "react";

type DragPosition = {
  x: number;
  y: number;
};

type UseDragStickerOptions = {
  onDrop: (position: DragPosition) => void;
  stickerSize?: number;
};

export function useDragSticker({
  onDrop,
  stickerSize = 48,
}: UseDragStickerOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<DragPosition | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();

      offsetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      setIsDragging(true);
      setPosition({
        x: event.clientX - offsetRef.current.x,
        y: event.clientY - offsetRef.current.y,
      });

      target.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!isDragging) return;

      setPosition({
        x: event.clientX - offsetRef.current.x,
        y: event.clientY - offsetRef.current.y,
      });
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!isDragging || !position) return;

      event.currentTarget.releasePointerCapture(event.pointerId);
      setIsDragging(false);

      onDrop({
        x: position.x + stickerSize / 2,
        y: position.y + stickerSize / 2,
      });
    },
    [isDragging, onDrop, position, stickerSize],
  );

  return {
    isDragging,
    position,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
