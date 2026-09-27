export type TileId =
  | "exp1"
  | "exp2"
  | "map"
  | "social"
  | "proj1"
  | "intro"
  | "video"
  | "cv"
  | "about"
  | "photo"
  | "proj2"
  | "quote"
  | "contact";

/** What hovering (or focusing) a tile previews. */
export type HoverVariant = "backdrop-info" | "backdrop-effect" | "lift";

export type TileContent = "intro" | "project" | "placeholder";

export type PageKind = "case-study" | "placeholder";

export type TileDestination =
  | { kind: "page"; route: string; page: PageKind }
  | { kind: "external"; href: string };

/** Half of the screen the stage preview uses; pick the half the tile isn't in. */
export type StagePlacement = "top" | "bottom";

export type TilePreview = {
  placement?: StagePlacement;
  effect?: "glow";
};

export type Tile = {
  id: TileId;
  /** Matches a name in the BentoGrid area maps. */
  area: string;
  /** Figma placeholder label. */
  label: string;
  content: TileContent;
  hover: HoverVariant;
  preview?: TilePreview;
  /** For project tiles: key into `projects`. */
  projectSlug?: string;
  destination: TileDestination;
};

export const tiles: Tile[] = [
  {
    id: "exp1",
    area: "exp1",
    label: "Experiment",
    content: "placeholder",
    hover: "backdrop-effect",
    preview: { effect: "glow" },
    destination: { kind: "page", route: "/lab/experiment-one", page: "placeholder" },
  },
  {
    id: "exp2",
    area: "exp2",
    label: "Experiment",
    content: "placeholder",
    hover: "backdrop-effect",
    preview: { effect: "glow" },
    destination: { kind: "page", route: "/lab/experiment-two", page: "placeholder" },
  },
  {
    id: "map",
    area: "map",
    label: "Map",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/map", page: "placeholder" },
  },
  {
    id: "social",
    area: "social",
    label: "Social",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/social", page: "placeholder" },
  },
  {
    id: "proj1",
    area: "proj1",
    label: "Project",
    content: "project",
    hover: "backdrop-info",
    preview: { placement: "bottom" },
    projectSlug: "project-one",
    destination: { kind: "page", route: "/work/project-one", page: "case-study" },
  },
  {
    id: "intro",
    area: "intro",
    label: "Intro",
    content: "intro",
    hover: "lift",
    destination: { kind: "page", route: "/intro", page: "placeholder" },
  },
  {
    id: "video",
    area: "video",
    label: "Video",
    content: "placeholder",
    hover: "backdrop-effect",
    preview: { effect: "glow" },
    destination: { kind: "page", route: "/video", page: "placeholder" },
  },
  {
    id: "cv",
    area: "cv",
    label: "CV",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/cv", page: "placeholder" },
  },
  {
    id: "about",
    area: "about",
    label: "About",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/about", page: "placeholder" },
  },
  {
    id: "photo",
    area: "photo",
    label: "Photo",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/photo", page: "placeholder" },
  },
  {
    id: "proj2",
    area: "proj2",
    label: "Project",
    content: "project",
    hover: "backdrop-info",
    preview: { placement: "top" },
    projectSlug: "project-two",
    destination: { kind: "page", route: "/work/project-two", page: "case-study" },
  },
  {
    id: "quote",
    area: "quote",
    label: "Quote",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/quote", page: "placeholder" },
  },
  {
    id: "contact",
    area: "contact",
    label: "Contact",
    content: "placeholder",
    hover: "lift",
    destination: { kind: "page", route: "/contact", page: "placeholder" },
  },
];

const tilesById = new Map(tiles.map((tile) => [tile.id, tile]));

export function getTile(id: TileId): Tile {
  const tile = tilesById.get(id);
  if (!tile) throw new Error(`Unknown tile: ${id}`);
  return tile;
}

export function findTileByPath(pathname: string): Tile | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  return tiles.find(
    (tile) => tile.destination.kind === "page" && tile.destination.route === path,
  );
}

export function tileHref(tile: Tile): string {
  return tile.destination.kind === "page" ? tile.destination.route : tile.destination.href;
}
