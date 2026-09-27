import styles from "./EffectPreview.module.css";

/** backdrop-effect: a slow drifting glow behind the grid. Swap in a shader or video per tile later. */
export function EffectPreview() {
  return (
    <div className={styles.effect}>
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
    </div>
  );
}
