import { getProject } from "../../../data/projects";
import type { Tile } from "../../../data/tiles";
import { PlaceholderTile } from "./PlaceholderTile";

export function ProjectTile({ tile }: { tile: Tile }) {
  const project = getProject(tile.projectSlug);

  return (
    <>
      <PlaceholderTile label={tile.label} />
      {project && <span className="visually-hidden">: {project.summary}</span>}
    </>
  );
}
