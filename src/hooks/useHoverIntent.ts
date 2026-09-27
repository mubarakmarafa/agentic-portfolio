import { useCallback, useEffect, useRef } from "react";
import type { FocusEvent, PointerEvent } from "react";
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

  useEffect(
    () => () => {
      window.clearTimeout(enterTimer.current);
      window.clearTimeout(leaveTimer.current);
    },
    [],
  );

  return useCallback(
    (id: TileId) => {
      const enter = () => {
        window.clearTimeout(leaveTimer.current);
        window.clearTimeout(enterTimer.current);
        enterTimer.current = window.setTimeout(() => setHovered(id), ENTER_DELAY_MS);
      };
      const leave = () => {
        window.clearTimeout(enterTimer.current);
        window.clearTimeout(leaveTimer.current);
        leaveTimer.current = window.setTimeout(() => setHovered(null), LEAVE_DELAY_MS);
      };

      return {
        onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => {
          if (event.pointerType !== "touch") enter();
        },
        onPointerLeave: (event: PointerEvent<HTMLAnchorElement>) => {
          if (event.pointerType !== "touch") leave();
        },
        onFocus: (event: FocusEvent<HTMLAnchorElement>) => {
          if (event.currentTarget.matches(":focus-visible")) enter();
        },
        onBlur: leave,
      };
    },
    [setHovered],
  );
}
