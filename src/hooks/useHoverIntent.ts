import { useCallback, useEffect, useRef } from "react";
import type { FocusEvent, PointerEvent as ReactPointerEvent } from "react";
import type { TileId } from "../data/tiles";
import { useNavStore } from "../store/navStore";

/** Stops the stage flickering as the pointer sweeps across the grid. */
const ENTER_DELAY_MS = 80;
/** Longer than the enter delay, so crossing a gap swaps previews without passing through idle. */
const LEAVE_DELAY_MS = 140;

export function useHoverIntent() {
  const setHovered = useNavStore((state) => state.setHovered);
  const enterTimer = useRef<number | undefined>(undefined);
  const leaveTimer = useRef<number | undefined>(undefined);

  const enter = useCallback(
    (id: TileId) => {
      if (useNavStore.getState().hoverLocked) return;
      window.clearTimeout(leaveTimer.current);
      window.clearTimeout(enterTimer.current);
      enterTimer.current = window.setTimeout(() => setHovered(id), ENTER_DELAY_MS);
    },
    [setHovered],
  );

  const leave = useCallback(() => {
    window.clearTimeout(enterTimer.current);
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHovered(null), LEAVE_DELAY_MS);
  }, [setHovered]);

  useEffect(() => {
    const unlock = (event: Event) => {
      if (!useNavStore.getState().hoverLocked) return;
      useNavStore.setState({ hoverLocked: false });
      if (event instanceof PointerEvent && event.pointerType !== "touch") {
        const tile = (event.target as Element | null)?.closest<HTMLElement>("[data-tile-id]");
        if (tile) enter(tile.dataset.tileId as TileId);
      }
    };
    window.addEventListener("pointermove", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointermove", unlock);
      window.removeEventListener("keydown", unlock);
      window.clearTimeout(enterTimer.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, [enter]);

  return useCallback(
    (id: TileId) => ({
      onPointerEnter: (event: ReactPointerEvent<HTMLAnchorElement>) => {
        if (event.pointerType !== "touch") enter(id);
      },
      onPointerLeave: (event: ReactPointerEvent<HTMLAnchorElement>) => {
        if (event.pointerType !== "touch") leave();
      },
      onFocus: (event: FocusEvent<HTMLAnchorElement>) => {
        if (event.currentTarget.matches(":focus-visible")) enter(id);
      },
      onBlur: leave,
    }),
    [enter, leave],
  );
}
