import { getProject } from "../../../data/projects";
import type { Tile } from "../../../data/tiles";
import { ProjectHero } from "../../project/ProjectHero";
import styles from "./InfoPreview.module.css";

/** backdrop-info: the project's hero and a short summary, on the half of the screen away from the tile. */
export function InfoPreview({ tile, active }: { tile: Tile; active: boolean }) {
  const project = getProject(tile.projectSlug);
  if (!project) return null;

  return (
    <div className={styles.frame} data-placement={tile.preview?.placement ?? "bottom"}>
      <ProjectHero project={project} tileId={tile.id} named={active} className={styles.hero}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>{tile.label}</p>
          <p className={styles.title}>{project.title}</p>
          <p className={styles.summary}>{project.summary}</p>
        </div>
      </ProjectHero>
    </div>
  );
}
