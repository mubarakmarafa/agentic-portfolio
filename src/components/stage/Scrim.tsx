import { getTile } from "../../data/tiles";
import { useNavStore } from "../../store/navStore";
import styles from "./Scrim.module.css";

/** Dims everything except the hovered tile, for the `lift` hover variant. */
export function Scrim() {
  const active = useNavStore(
    (state) => state.hoveredId !== null && getTile(state.hoveredId).hover === "lift",
  );

  return <div className={styles.scrim} data-active={active || undefined} aria-hidden="true" />;
}
