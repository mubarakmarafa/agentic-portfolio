import { BentoGrid } from "../bento/BentoGrid";
import { HoverStage } from "../stage/HoverStage";
import { Scrim } from "../stage/Scrim";
import styles from "./Home.module.css";

/** Three layers: the hover stage (back), the dim scrim (middle), the grid (front). */
export function Home() {
  return (
    <main className={styles.home}>
      <h1 className="visually-hidden">Moby · Mubarak Marafa</h1>
      <HoverStage />
      <Scrim />
      <BentoGrid />
    </main>
  );
}
