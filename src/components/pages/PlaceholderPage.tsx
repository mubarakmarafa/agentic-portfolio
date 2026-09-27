import type { Tile } from "../../data/tiles";
import styles from "./PlaceholderPage.module.css";
import { TilePage } from "./TilePage";

export function PlaceholderPage({ tile }: { tile: Tile }) {
  return (
    <TilePage tile={tile} title={tile.label}>
      <p className={styles.note}>This page is a placeholder. Real content is on the way.</p>
    </TilePage>
  );
}
