import { create } from "zustand";
import { findTileByPath, getTile, type TileId } from "../data/tiles";

export type Route = { name: "home" } | { name: "tile"; tileId: TileId };

export const HOME: Route = { name: "home" };

export function routeFromPath(pathname: string): Route {
  const tile = findTileByPath(pathname);
  return tile ? { name: "tile", tileId: tile.id } : HOME;
}

export function pathFromRoute(route: Route): string {
  if (route.name === "home") return "/";
  const { destination } = getTile(route.tileId);
  return destination.kind === "page" ? destination.route : "/";
}

export function sameRoute(a: Route, b: Route): boolean {
  if (a.name === "home" || b.name === "home") return a.name === b.name;
  return a.tileId === b.tileId;
}

type NavState = {
  route: Route;
  hoveredId: TileId | null;
  /**
   * Last hovered tile with a stage preview. Outlives the hover so the stage
   * can fade out with its content still in place.
   */
  previewId: TileId | null;
  /** Tile whose page was opened last; it receives the morph and focus on Back. */
  lastOpenedId: TileId | null;
  /** Home scroll offset to restore when a page closes (tablet / mobile). */
  homeScrollY: number;
  /**
   * Set when the grid comes back, so a pointer resting on (or focus landing
   * on) the returned tile doesn't pop its preview mid-transition. Cleared by
   * the next pointer move or key press.
   */
  hoverLocked: boolean;
  go: (route: Route) => void;
  setHovered: (id: TileId | null) => void;
  saveHomeScroll: (y: number) => void;
};

export const useNavStore = create<NavState>()((set) => ({
  route: typeof window === "undefined" ? HOME : routeFromPath(window.location.pathname),
  hoveredId: null,
  previewId: null,
  lastOpenedId: null,
  homeScrollY: 0,
  hoverLocked: false,

  go: (route) =>
    set((state) => ({
      route,
      hoveredId: null,
      previewId: null,
      hoverLocked: route.name === "home",
      lastOpenedId:
        route.name === "tile"
          ? route.tileId
          : state.route.name === "tile"
            ? state.route.tileId
            : state.lastOpenedId,
    })),

  setHovered: (id) =>
    set((state) => {
      if (state.hoveredId === id) return state;
      const hasStage = id !== null && getTile(id).hover !== "lift";
      return { hoveredId: id, previewId: hasStage ? id : state.previewId };
    }),

  saveHomeScroll: (y) => set({ homeScrollY: y }),
}));
