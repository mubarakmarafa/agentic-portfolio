export type StickerDefinition = {
  id: string;
  label: string;
  emoji: string;
};

export const stickers: StickerDefinition[] = [
  { id: "star", label: "Star sticker", emoji: "⭐" },
  { id: "heart", label: "Heart sticker", emoji: "❤️" },
  { id: "sparkle", label: "Sparkle sticker", emoji: "✨" },
];
