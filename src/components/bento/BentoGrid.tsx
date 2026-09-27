import type { MouseEvent } from "react";
import type { Tile } from "../../data/tiles";
import { getTile, tiles } from "../../data/tiles";
import { useHoverIntent } from "../../hooks/useHoverIntent";
import { openTile } from "../../lib/viewTransition";
import { useNavStore } from "../../store/navStore";
import { BentoSurface } from "./BentoSurface";
import styles from "./BentoGrid.module.css";
import { IntroTile } from "./tiles/IntroTile";
import { PlaceholderTile } from "./tiles/PlaceholderTile";
import { ProjectTile } from "./tiles/ProjectTile";

function TileContent({ tile }: { tile: Tile }) {
  switch (tile.content) {
    case "intro":
      return <IntroTile />;
    case "project":
      return <ProjectTile tile={tile} />;
    default:
      return <PlaceholderTile label={tile.label} />;
  }
}

function onOpen(tile: Tile, event: MouseEvent<HTMLAnchorElement>) {
  if (tile.destination.kind === "external") return;
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openTile(tile);
}

export function BentoGrid() {
  const hoveredId = useNavStore((state) => state.hoveredId);
  const lastOpenedId = useNavStore((state) => state.lastOpenedId);
  const hoverHandlers = useHoverIntent();
  const hoverVariant = hoveredId ? getTile(hoveredId).hover : undefined;

  return (
    <nav className={styles.bento} aria-label="Portfolio" data-hover={hoverVariant}>
      {tiles.map((tile) => (
        <BentoSurface
          key={tile.id}
          tile={tile}
          hovered={tile.id === hoveredId}
          active={tile.id === lastOpenedId}
          onOpen={onOpen}
          {...hoverHandlers(tile.id)}
        >
          <TileContent tile={tile} />
        </BentoSurface>
      ))}
    </nav>
  );
}
