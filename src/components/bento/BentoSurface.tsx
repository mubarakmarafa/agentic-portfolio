import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { tileHref, type Tile } from "../../data/tiles";
import styles from "./BentoSurface.module.css";

type Props = {
  tile: Tile;
  hovered?: boolean;
  /** The tile whose page was last opened; it carries the morph on the way back. */
  active?: boolean;
  onOpen?: (tile: Tile, event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
} & Pick<
  HTMLAttributes<HTMLAnchorElement>,
  "onPointerEnter" | "onPointerLeave" | "onFocus" | "onBlur"
>;

export function BentoSurface({
  tile,
  hovered = false,
  active = false,
  onOpen,
  children,
  ...handlers
}: Props) {
  const external = tile.destination.kind === "external";

  return (
    <a
      {...handlers}
      className={styles.surface}
      href={tileHref(tile)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      data-tile-id={tile.id}
      data-hover-variant={tile.hover}
      data-hovered={hovered || undefined}
      data-active={active || undefined}
      data-external={external || undefined}
      style={{ gridArea: tile.area, viewTransitionName: `tile-${tile.id}` }}
      onClick={(event) => onOpen?.(tile, event)}
    >
      {children}
      {external && (
        <>
          <span className={styles.outbound} aria-hidden="true">
            ↗
          </span>
          <span className="visually-hidden">(opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
