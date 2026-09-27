import type { ReactNode } from "react";
import type { Project } from "../../data/projects";
import type { TileId } from "../../data/tiles";
import styles from "./ProjectHero.module.css";

type Props = {
  project: Project;
  tileId: TileId;
  /** Carry the shared `hero-<id>` transition name (only one element may hold it at a time). */
  named: boolean;
  className?: string;
  children?: ReactNode;
};

/** The project's hero surface, shared by the hover preview and the case-study page. */
export function ProjectHero({ project, tileId, named, className, children }: Props) {
  const [from, to] = project.heroTint;

  return (
    <div
      className={[styles.hero, className].filter(Boolean).join(" ")}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
        viewTransitionName: named ? `hero-${tileId}` : undefined,
      }}
      data-vt-hero
    >
      {project.hero && <img className={styles.image} src={project.hero} alt="" />}
      {children}
    </div>
  );
}
