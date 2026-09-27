import styles from "./PlaceholderTile.module.css";

export function PlaceholderTile({ label }: { label: string }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
