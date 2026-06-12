import type { StickerDefinition } from "../../data/stickers";
import { DraggableSticker } from "./DraggableSticker";
import styles from "./StickerTray.module.css";

type StickerTrayProps = {
  stickers: StickerDefinition[];
  onDrop: (stickerId: string, center: { x: number; y: number }) => void;
};

export function StickerTray({ stickers, onDrop }: StickerTrayProps) {
  if (stickers.length === 0) return null;

  return (
    <div className={styles.tray} aria-label="Sticker tray">
      {stickers.map((sticker, index) => (
        <DraggableSticker
          key={sticker.id}
          sticker={sticker}
          trayIndex={index}
          isPlaced={false}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}
