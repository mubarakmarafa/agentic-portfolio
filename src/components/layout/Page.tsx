import { Hero } from "./Hero";
import styles from "./Page.module.css";

export function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
      </main>
    </div>
  );
}
