import { BentoGrid } from "../bento/BentoGrid";
import styles from "./Home.module.css";

export function Home() {
  return (
    <main className={styles.home}>
      <h1 className="visually-hidden">Moby · Mubarak Marafa</h1>
      <BentoGrid />
    </main>
  );
}
