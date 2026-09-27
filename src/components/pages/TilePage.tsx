import type { MouseEvent, ReactNode } from "react";
import type { Tile } from "../../data/tiles";
import { closePage } from "../../lib/viewTransition";
import styles from "./TilePage.module.css";

type Props = {
  tile: Tile;
  title: string;
  hero?: ReactNode;
  children?: ReactNode;
};

function onBack(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  closePage();
}

/** Shared page shell. Its root carries the tile's transition name so the tile grows into it. */
export function TilePage({ tile, title, hero, children }: Props) {
  return (
    <article
      className={styles.page}
      style={{ viewTransitionName: `tile-${tile.id}` }}
      aria-labelledby="page-title"
    >
      <header className={styles.header}>
        <a className={styles.back} href="/" onClick={onBack}>
          Back
          <kbd className={styles.kbd}>Esc</kbd>
        </a>
        <p className={styles.eyebrow}>{tile.label}</p>
      </header>

      {hero}

      <div className={styles.body}>
        <h1 id="page-title" className={styles.title} tabIndex={-1} data-page-heading>
          {title}
        </h1>
        {children}
      </div>
    </article>
  );
}
