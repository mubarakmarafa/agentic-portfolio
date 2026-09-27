import { getProject } from "../../data/projects";
import type { Tile } from "../../data/tiles";
import { ProjectHero } from "../project/ProjectHero";
import styles from "./CaseStudyPage.module.css";
import { PlaceholderPage } from "./PlaceholderPage";
import { TilePage } from "./TilePage";

export function CaseStudyPage({ tile }: { tile: Tile }) {
  const project = getProject(tile.projectSlug);
  if (!project) return <PlaceholderPage tile={tile} />;

  return (
    <TilePage
      tile={tile}
      title={project.title}
      hero={
        <ProjectHero
          project={project}
          tileId={tile.id}
          named={tile.hover === "backdrop-info"}
          className={styles.hero}
        />
      }
    >
      <p className={styles.summary}>{project.summary}</p>
      {project.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          <p className={styles.body}>{section.body}</p>
        </section>
      ))}
    </TilePage>
  );
}
