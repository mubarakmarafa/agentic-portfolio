import styles from "./AvatarSlot.module.css";

/**
 * Reserved slot for a future 3D avatar (React Three Fiber).
 * Replace this component body with a <Canvas> and your GLB model when ready.
 */
export function AvatarSlot() {
  return (
    <section className={styles.slot} aria-hidden="true">
      <span className={styles.label}>3D avatar slot</span>
    </section>
  );
}
