import styles from "./PinWall.module.css";

export function PinWall() {
  return (
    <div className={styles.pinWall} aria-hidden="true">
      <img
        className={styles.crystal}
        src="/assets/crystal-badge.png"
        alt=""
      />
      <img className={styles.flame} src="/assets/flame-badge.png" alt="" />
    </div>
  );
}
