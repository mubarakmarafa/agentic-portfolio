import { useCallback } from "react";
import { secretZones } from "../../data/secrets";
import { stickers } from "../../data/stickers";
import { findMatchingSecret } from "../../lib/secretZones";
import { useUnlockStore } from "../../store/unlockStore";
import { DraggableSticker } from "./DraggableSticker";
import { StickerTray } from "./StickerTray";

type StickerLayerProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
};

export function StickerLayer({ heroRef, footerRef }: StickerLayerProps) {
  const placedStickers = useUnlockStore((state) => state.placedStickers);
  const placeSticker = useUnlockStore((state) => state.placeSticker);
  const unlock = useUnlockStore((state) => state.unlock);

  const handleDrop = useCallback(
    (stickerId: string, center: { x: number; y: number }) => {
      const match = findMatchingSecret(
        center,
        stickerId,
        secretZones,
        {
          hero: heroRef.current?.getBoundingClientRect() ?? null,
          footer: footerRef.current?.getBoundingClientRect() ?? null,
        },
      );

      if (match) {
        unlock(match.unlocks);
      }

      placeSticker(stickerId, {
        x: center.x,
        y: center.y,
        inTray: false,
      });
    },
    [footerRef, heroRef, placeSticker, unlock],
  );

  const trayStickers = stickers.filter((sticker) => !placedStickers[sticker.id]);
  const placed = stickers.filter((sticker) => placedStickers[sticker.id]);

  return (
    <>
      {placed.map((sticker, index) => {
        const position = placedStickers[sticker.id];
        return (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            trayIndex={index}
            isPlaced
            placedPosition={{ x: position.x, y: position.y }}
            onDrop={handleDrop}
          />
        );
      })}

      <StickerTray stickers={trayStickers} onDrop={handleDrop} />
    </>
  );
}
