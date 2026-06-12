import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PlacedSticker = {
  x: number;
  y: number;
  inTray: boolean;
};

const PERSISTENT_EFFECTS = new Set(["hero-glow", "secret-message"]);
const ONE_SHOT_EFFECTS = new Set(["confetti"]);

type UnlockState = {
  unlockedEffects: string[];
  placedStickers: Record<string, PlacedSticker>;
  activeOneShots: string[];
  unlock: (effectIds: string[]) => void;
  placeSticker: (id: string, position: PlacedSticker) => void;
  returnToTray: (id: string) => void;
  hasEffect: (id: string) => boolean;
  clearOneShot: (id: string) => void;
};

const sessionStorageAdapter = {
  getItem: (name: string) => sessionStorage.getItem(name),
  setItem: (name: string, value: string) => sessionStorage.setItem(name, value),
  removeItem: (name: string) => sessionStorage.removeItem(name),
};

export const useUnlockStore = create<UnlockState>()(
  persist(
    (set, get) => ({
      unlockedEffects: [],
      placedStickers: {},
      activeOneShots: [],

      unlock: (effectIds) =>
        set((state) => {
          const persistent = effectIds.filter((id) =>
            PERSISTENT_EFFECTS.has(id),
          );
          const oneShots = effectIds.filter((id) => ONE_SHOT_EFFECTS.has(id));

          return {
            unlockedEffects: [
              ...new Set([...state.unlockedEffects, ...persistent]),
            ],
            activeOneShots: [
              ...new Set([...state.activeOneShots, ...oneShots]),
            ],
          };
        }),

      placeSticker: (id, position) =>
        set((state) => ({
          placedStickers: {
            ...state.placedStickers,
            [id]: position,
          },
        })),

      returnToTray: (id) =>
        set((state) => {
          const next = { ...state.placedStickers };
          delete next[id];
          return { placedStickers: next };
        }),

      hasEffect: (id) => {
        const state = get();
        return (
          state.unlockedEffects.includes(id) ||
          state.activeOneShots.includes(id)
        );
      },

      clearOneShot: (id) =>
        set((state) => ({
          activeOneShots: state.activeOneShots.filter((effect) => effect !== id),
        })),
    }),
    {
      name: "portfolio-lite-unlocks",
      storage: createJSONStorage(() => sessionStorageAdapter),
      partialize: (state) => ({
        unlockedEffects: state.unlockedEffects,
        placedStickers: state.placedStickers,
      }),
    },
  ),
);
