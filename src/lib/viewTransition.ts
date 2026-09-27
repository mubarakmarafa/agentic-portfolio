import { flushSync } from "react-dom";
import type { Tile, TileId } from "../data/tiles";
import {
  HOME,
  pathFromRoute,
  sameRoute,
  useNavStore,
  type Route,
} from "../store/navStore";

export type NavType = "open" | "back";

type HistoryMode = "push" | "none";

type PortfolioHistoryState = { fromHome?: boolean } | null;

const MAX_STAGGER_MS = 120;
const STAGGER_STYLE_ID = "vt-stagger";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function tileElement(id: TileId): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-tile-id="${id}"]`);
}

/** Delays the other tiles by their distance from the tile being opened or closed. */
function writeStagger(anchorId: TileId) {
  const anchor = tileElement(anchorId)?.getBoundingClientRect();
  if (!anchor) return;
  const ax = anchor.left + anchor.width / 2;
  const ay = anchor.top + anchor.height / 2;

  const distances = [...document.querySelectorAll<HTMLElement>("[data-tile-id]")]
    .filter((el) => el.dataset.tileId !== anchorId)
    .map((el) => {
      const rect = el.getBoundingClientRect();
      const d = Math.hypot(rect.left + rect.width / 2 - ax, rect.top + rect.height / 2 - ay);
      return { id: el.dataset.tileId, d };
    });
  const max = Math.max(1, ...distances.map(({ d }) => d));

  const css = distances
    .map(({ id, d }) => {
      const delay = Math.round((d / max) * MAX_STAGGER_MS);
      return `::view-transition-old(tile-${id}),::view-transition-new(tile-${id}){--vt-delay:${delay}ms}`;
    })
    .join("\n");

  let style = document.getElementById(STAGGER_STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STAGGER_STYLE_ID;
    document.head.append(style);
  }
  style.textContent = css;
}

function clearStagger() {
  document.getElementById(STAGGER_STYLE_ID)?.remove();
}

function focusWithoutScroll(el: HTMLElement | null) {
  el?.focus({ preventScroll: true });
}

let current: ViewTransition | null = null;

/**
 * The one way to change route. The state change runs inside a View
 * Transition when the browser supports it; otherwise it happens instantly.
 */
export function navigate(to: Route, type: NavType, historyMode: HistoryMode = "push") {
  const store = useNavStore.getState();
  const from = store.route;
  if (sameRoute(from, to)) return;

  if (historyMode === "push") {
    const state: PortfolioHistoryState = { fromHome: from.name === "home" };
    history.pushState(state, "", pathFromRoute(to));
  }
  if (from.name === "home") store.saveHomeScroll(window.scrollY);

  const anchorId =
    to.name === "tile" ? to.tileId : from.name === "tile" ? from.tileId : null;

  const update = () => {
    flushSync(() => useNavStore.getState().go(to));
    if (to.name === "home") {
      window.scrollTo(0, useNavStore.getState().homeScrollY);
      if (anchorId) {
        writeStagger(anchorId);
        focusWithoutScroll(tileElement(anchorId));
      }
    } else {
      window.scrollTo(0, 0);
      focusWithoutScroll(document.querySelector<HTMLElement>("[data-page-heading]"));
    }
  };

  if (typeof document.startViewTransition !== "function") {
    update();
    return;
  }

  if (from.name === "home" && anchorId) {
    // Only the clicked tile may carry the "active" class in the old snapshot.
    flushSync(() => useNavStore.setState({ lastOpenedId: anchorId }));
    writeStagger(anchorId);
  }

  const root = document.documentElement;
  root.dataset.navDir = type;

  let transition: ViewTransition;
  try {
    transition = document.startViewTransition({ update, types: [type] });
  } catch {
    // Older engines only accept the callback form (no transition types).
    transition = document.startViewTransition(update);
  }
  current = transition;

  transition.finished.finally(() => {
    if (current !== transition) return;
    current = null;
    delete root.dataset.navDir;
    clearStagger();
  });
}

export function openTile(tile: Tile) {
  navigate({ name: "tile", tileId: tile.id }, "open");
}

/** Back from a page: pop our own history entry when there is one, so Forward still works. */
export function closePage() {
  const state = history.state as PortfolioHistoryState;
  if (state?.fromHome) {
    history.back();
  } else {
    navigate(HOME, "back");
  }
}