import type { Tile } from "../../data/tiles";
import { tiles } from "../../data/tiles";
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

export function BentoGrid() {
  return (
    <nav className={styles.bento} aria-label="Portfolio">
      {tiles.map((tile) => (
        <BentoSurface key={tile.id} tile={tile}>
          <TileContent tile={tile} />
        </BentoSurface>
      ))}
    </nav>
  );
}
