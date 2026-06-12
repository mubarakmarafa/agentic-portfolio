import type { CSSProperties } from "react";
import type { StickerDefinition } from "../../data/stickers";
import { useDragSticker } from "../../hooks/useDragSticker";
import styles from "./DraggableSticker.module.css";

const STICKER_SIZE = 48;

type DraggableStickerProps = {
  sticker: StickerDefinition;
  trayIndex: number;
  isPlaced: boolean;
  placedPosition?: { x: number; y: number };
  onDrop: (stickerId: string, center: { x: number; y: number }) => void;
};

export function DraggableSticker({
  sticker,
  trayIndex,
  isPlaced,
  placedPosition,
  onDrop,
}: DraggableStickerProps) {
  const { isDragging, position, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDragSticker({
      stickerSize: STICKER_SIZE,
      onDrop: (center) => onDrop(sticker.id, center),
    });

  const style: CSSProperties = isDragging && position
    ? {
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1000,
        touchAction: "none",
      }
    : isPlaced && placedPosition
      ? {
          position: "fixed",
          left: placedPosition.x - STICKER_SIZE / 2,
          top: placedPosition.y - STICKER_SIZE / 2,
          zIndex: 100,
        }
      : {
          touchAction: "none",
        };

  return (
    <button
      type="button"
      className={`${styles.sticker} ${isDragging ? styles.dragging : ""}`}
      style={style}
      aria-label={sticker.label}
      data-tray-index={trayIndex}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <span className={styles.emoji} role="img" aria-hidden="true">
        {sticker.emoji}
      </span>
    </button>
  );
}
