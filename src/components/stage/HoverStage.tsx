import { useEffect } from "react";
import { getProject } from "../../data/projects";
import { getTile } from "../../data/tiles";
import { preloadImage } from "../../lib/preloadImage";
import { useNavStore } from "../../store/navStore";
import styles from "./HoverStage.module.css";
import { EffectPreview } from "./previews/EffectPreview";
import { InfoPreview } from "./previews/InfoPreview";

/** Full-bleed layer behind the grid that shows what's behind the hovered tile. */
export function HoverStage() {
  const hoveredId = useNavStore((state) => state.hoveredId);
  const previewId = useNavStore((state) => state.previewId);

  const tile = previewId ? getTile(previewId) : null;
  const active = tile !== null && hoveredId === previewId;

  useEffect(() => {
    if (!hoveredId) return;
    const hero = getProject(getTile(hoveredId).projectSlug)?.hero;
    if (hero) void preloadImage(hero);
  }, [hoveredId]);

  return (
    <div className={styles.stage} data-active={active || undefined} aria-hidden="true">
      {tile?.hover === "backdrop-info" && (
        <InfoPreview key={tile.id} tile={tile} active={active} />
      )}
      {tile?.hover === "backdrop-effect" && <EffectPreview key={tile.id} />}
    </div>
  );
}
